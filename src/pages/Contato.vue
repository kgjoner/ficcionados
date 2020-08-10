<template>
	<div class="contact">
		<PageTitle main="Envie sua Mensagem!" sub="Tem algo a dizer?" center />
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
				<b-form-group label-for="contact-name">
					<label for="contact-name" class="contact__label">
						Nome:
					</label>
					<b-form-input
						id="contact-name"
						name="name"
						type="text"
						v-model="contact.name"
						required
					/>
				</b-form-group>
				<b-form-group label-for="contact-email">
					<label for="contact-email" class="contact__label">
						E-mail:
					</label>
					<b-form-input
						id="contact-email"
						name="email"
						type="text"
						v-model="contact.email"
						required
					/>
				</b-form-group>
				<b-form-group label-for="contact-subject">
					<label for="contact-subject" class="contact__label">
						Assunto:
					</label>
					<b-form-input
						id="contact-subject"
						name="subject"
						type="text"
						v-model="contact.subject"
						required
					/>
				</b-form-group>
			</b-col>

			<b-col md="10" sm="12">
				<b-form-group label-for="contact-content">
					<label for="contact-content" class="contact__label">
						Mensagem:
					</label>
					<b-form-textarea
						id="contact-content"
						class="contact__content"
						name="content"
						v-model="contact.content"
					/>
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
import { submitFormToNetlify } from '@/api/netlifyForms'
import displayError from '@/utils/displayError'

import PageTitle from '@/components/template/PageTitle'
import Loading from '@/components/utils/Loading'

export default {
	name: 'ContactPage',
	components: { PageTitle, Loading },
	metaInfo: {
		title: 'Contato',
	},
	data: function() {
		return {
			contact: {
				name: '',
				email: '',
				subject: '',
				content: '',
			},
			sending: false,
		}
	},
	methods: {
		handleSubmit() {
			this.sending = true
			submitFormToNetlify(this.contact)
				.then(
					() => {
						this.$toasted.success('Mensagem enviada!', { icon: 'check' })
						this.contact = { name: '', email: '', subject: '', content: '' }
					},
					e => displayError(e)
				)
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
