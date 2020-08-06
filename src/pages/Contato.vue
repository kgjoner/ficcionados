<template>
	<div class="contact">
		<PageTitle
			main="Envie sua Mensagem!"
			sub="Tem algo a dizer?"
			center
		/>
		<b-form
			class="contact__form"
			name="Contact"
			@submit.prevent="handleSubmit"
			method="post"
			data-netlify="true"
			data-netlify-honeypot="bot-field"
		>
			<input type="hidden" name="form-name" value="Contact" />

			<b-col md="6" sm="12">
				<b-form-group label="Nome:" label-for="contact-name">
					<b-form-input
						id="contact-name"
						type="text"
						v-model="contact.name"
						required
					/>
				</b-form-group>
				<b-form-group label="E-mail:" label-for="contact-email">
					<b-form-input
						id="contact-email"
						type="text"
						v-model="contact.from"
						required
					/>
				</b-form-group>
				<b-form-group label="Assunto:" label-for="contact-subject">
					<b-form-input
						id="contact-subject"
						type="text"
						v-model="contact.subject"
						required
						placeholder=""
					/>
				</b-form-group>
			</b-col>

			<b-col md="10" sm="12">
				<b-form-group label="Mensagem:" label-for="contact-content">
					<b-form-textarea 
						id="contact-content" 
						class="contact__content"
						v-model="contact.content" />
				</b-form-group>
			</b-col>

			<b-col>
				<b-button type="submit" variant="primary">
					<Loading v-if="sending" />
					<span v-else>Enviar</span>
				</b-button>
			</b-col>
		</b-form>
	</div>
</template>

<script>
import PageTitle from '@/components/template/pageTitle'
import Loading from '@/components/utils/Loading'
import displayError from '@/utils/displayError'
import axios from 'axios'

export default {
	name: 'ContactPage',
	components: { PageTitle, Loading },
	metaInfo: {
		title: 'Contato',
	},
	data: function() {
		return {
			contact: {},
			sending: false,
		}
	},
	methods: {
		encode(data) {
			return Object.keys(data)
				.map(
					(key) => `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`
				)
				.join('&')
		},

		handleSubmit() {
			this.sending = true
			const axiosConfig = {
				header: { 'Content-Type': 'application/x-www-form-urlencoded' },
			}
			axios
				.post(
					'/',
					this.encode({
						'form-name': 'Contact',
						...this.contact,
					}),
					axiosConfig
				)
				.then(() =>
					this.$toasted.success('Mensagem enviada!', { icon: 'check' })
				)
				.then(() => this.reset())
				.catch(displayError)
				.finally(() => (this.sending = false))
		},
	},
}
</script>

<style>
.contact__form {
	padding: 20px;
	margin: 20px auto;
	background-color: #fff;
	border: 1px solid rgba(0, 0, 0, 0.125);
	border-radius: 0.25rem;
	max-width: 45rem;
}

.contact__content {
	min-height: 200px;
}
</style>
