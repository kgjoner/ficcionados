<template>
	<div class="ebook-lp">
		<div class="ebook-img">
			<iframe
				width="800"
				height="800"
				border="0"
				name="dummyframe"
				id="dummyframe"
				style="display:none"
			></iframe>
			<img src="../assets/desbloqueando-a-escrita.jpg" alt="" />
		</div>
		<div v-if="!hasSubscribed" class="ebook-form">
			<h2>Liberte As Suas Histórias!</h2>
			<p>Esse é um apanhado com nossos artigos sobre:</p>
			<ul>
				<li>Inspiração</li>
				<li>Hábito</li>
				<li>Profissionalismo</li>
				<li>Bloqueio</li>
			</ul>
			<p style="padding-left: 15px;">
				<strong>+ 30 Novas Writing Prompts</strong> para ajudar você nos dias
				mais difíceis!&nbsp;
			</p>
			<p>&nbsp;</p>
			<p>E aí, preparado?</p>

			<div id="mc_embed_signup">
				<form
					action="//ficcionados.us15.list-manage.com/subscribe/post?u=27613588b850606cebd9fa4cd&amp;id=c022e8edfb"
					method="post"
					id="mc-embedded-subscribe-form"
					name="mc-embedded-subscribe-form"
					class="validate"
					target="dummyframe"
					novalidate
				>
					<div id="mc_embed_signup_scroll">
						<div class="mc-field-group">
							<input
								type="text"
								v-model="name"
								value=""
								name="FNAME"
								class="required"
								id="mce-FNAME"
								placeholder="Nome"
							/>
						</div>
						<div class="mc-field-group">
							<input
								type="email"
								v-model="email"
								value=""
								name="EMAIL"
								class="required email"
								id="mce-EMAIL"
								placeholder="E-mail"
							/>
						</div>
						<input
							type="checkbox"
							value="4"
							name="group[3581][4]"
							id="mce-group[3581]-3581-0"
							checked="true"
							style="display:none"
						/>
						<div id="mce-responses" class="clear">
							<div
								class="response"
								id="mce-error-response"
								style="display:none"
							></div>
							<div
								class="response"
								id="mce-success-response"
								style="display:none"
							></div>
						</div>
						<!-- real people should not fill this in and expect good things - do not remove this or risk form bot signups-->
						<div style="position: absolute; left: -5000px;" aria-hidden="true">
							<input
								type="text"
								name="b_27613588b850606cebd9fa4cd_c022e8edfb"
								tabindex="-1"
								value=""
							/>
						</div>

						<div class="clear">
							<input
								type="submit"
								value="Quero Desbloquear a Escrita!"
								name="subscribe"
								id="mc-embedded-subscribe"
								@click.prevent="afterSubscription"
								class="button"
							/>
						</div>
					</div>
				</form>
			</div>
			<h6 style="text-align: left; padding-left: 7px;">
				<i class="fa fa-lock" style="font-size:14px; color:#FFF;"></i>
				Respeitamos sua privacidade.
			</h6>
		</div>
		<div v-else class="ebook-form subscribed">
			<h2>Seu ebook está pronto...</h2>
			<p>
				Não se preocupe caso não possa baixá-lo agora, enviaremos também para o
				seu email.
			</p>
			<a
				href="https://gallery.mailchimp.com/27613588b850606cebd9fa4cd/files/1ae73482-973f-4e1a-b9c4-14d8e8d1d853/Desbloqueando_a_Escrita_Ficcionados.pdf"
				><i class="fa fa-download"></i>Baixar "Desbloqueando a Escrita"</a
			>
		</div>
	</div>
</template>

<script>
import { showError } from '@/global'

export default {
	name: 'EbookLP',
	data: function() {
		return {
			hasSubscribed: false,
			name: '',
			email: '',
		}
	},
	methods: {
		afterSubscription() {
			try {
				this.existOrError(this.name, 'O nome não foi informado.')
				this.existOrError(this.email, 'O e-mail não foi informado.')
			} catch (e) {
				return showError(e)
			}

			document.getElementById('mc-embedded-subscribe-form').submit()
			this.hasSubscribed = true
		},
		existOrError(value, msg) {
			if (!value) throw msg
			if (Array.isArray(value) && value.length == 0) throw msg
			if (typeof value === 'string' && !value.trim()) throw msg
		},
	},
}
</script>

<style>
.ebook-lp {
	padding: 10px 0;
	display: flex;
	justify-content: center;
	align-items: stretch;
	flex-wrap: wrap;
	background-color: #f2f2f2;
}

.ebook-img {
	margin: 10px 0;
	background-color: #fff;
	margin-right: 10px;
	padding: 0 50px;
	overflow: hidden;
	width: 50vw;

	display: flex;
	justify-content: center;
	align-items: center;
}

.ebook-img img {
	max-height: 500px;
	max-width: 408px;
}

.ebook-form {
	margin: 10px 0;
	background-color: #727272;
	color: #f2f2f2;
	padding: 20px 25px 10px 25px;
	max-width: 500px;
	min-width: 335px;
	width: 40vw;
}

.ebook-lp .ebook-form h2 {
	text-align: center;
	color: #fff;
	font-family: 'Philosopher';
	font-weight: 600;
	margin-bottom: 25px;
}

.ebook-form ul {
	padding-left: 20px;
}

.ebook-form li {
	letter-spacing: 0.4px;
	font-size: 1.1rem;
}

.ebook-form p {
	line-height: 140%;
	letter-spacing: 0.4px;
	font-size: 1.1rem;
	margin-bottom: 5px;
}

.ebook-lp #mc_embed_signup {
	padding-top: 0;
	max-width: 100%;
}

.ebook-lp #mc_embed_signup form {
	padding-left: 0;
}

.ebook-lp #mc_embed_signup .mc-field-group input {
	margin-bottom: 10px;
}

.ebook-lp #mc_embed_signup .mc-field-group input:focus {
	outline-color: #5cb85c;
}

.ebook-lp #mc_embed_signup .button {
	background-color: #5cb85c;
	border: solid 1px #3d8b3d;
	text-transform: none;
	font-size: 1.1rem;
	margin: 5px 0;
}

.ebook-lp #mc_embed_signup .button:hover {
	background-color: #3d8b3d;
	border-color: #386e38;
}

.ebook-lp h6 {
	font-size: 90%;
}

@media (max-width: 768px) {
	.ebook-lp {
		background-color: #fff;
	}

	.ebook-form {
		width: 90vw;
	}

	.ebook-img {
		width: 90vw;
	}
}

.ebook-lp .subscribed {
	padding-top: 20vh;
	padding-bottom: 20vh;
}

.ebook-lp .subscribed p {
	margin-bottom: 10vh;
}

.ebook-lp .subscribed i {
	margin-right: 7px;
}

.ebook-lp .subscribed a {
	text-decoration: none;
	color: #f2f2f2;
	background-color: #1d7fd8;
	padding: 20px;
	margin-left: 18%;
	border-radius: 5px;
	border: solid 1px #1269b9;
}

.ebook-lp .subscribed a:hover {
	background-color: #3289db;
}
</style>
