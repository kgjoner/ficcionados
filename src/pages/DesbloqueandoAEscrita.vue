<template>
	<div class="landing">
		<div class="landing__picture">
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

		<div v-if="!hasSubscribed" class="landing__container">
			<h2 class="landing__title">
				Liberte As Suas Histórias!
			</h2>
			<div class="landing__content">
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
				<span>&nbsp;</span>
				<p>E aí, preparado?</p>
			</div>

			<MailchimpForm 
				btnMessage="Quero Desbloquear a Escrita!"
				@subscribe="toggleSubscribed"
				addToList
			/>

			<p class="landing__trust">
				<i class="fa fa-lock" style="font-size:14px; color:#FFF;"></i>
				Respeitamos sua privacidade.
			</p>
		</div>

		<div v-else class="landing__container landing__container--subscribed">
			<h2 class="landing__title">
				Seu ebook está pronto...
			</h2>
			<div class="landing__content">
				<p>
					Não se preocupe caso não possa baixá-lo agora, enviaremos também para o
					seu email.
				</p>
				<p><span>😉</span></p>
			</div>
			<a
				href="https://gallery.mailchimp.com/27613588b850606cebd9fa4cd/files/1ae73482-973f-4e1a-b9c4-14d8e8d1d853/Desbloqueando_a_Escrita_Ficcionados.pdf"
			>
				<i class="fa fa-download"></i>
				Baixar "Desbloqueando a Escrita"
			</a>
		</div>
	</div>
</template>

<script>
import MailchimpForm from '@/components/utils/MailchimpForm'

export default {
	name: 'Landing',
	components: { MailchimpForm },
	metaInfo: {
		title: "Desbloqueando a Escrita"
	},
	data: function() {
		return {
			hasSubscribed: false
		}
	},
	methods: {
		toggleSubscribed() {
			this.hasSubscribed = true
		}
	},
}
</script>

<style>
.landing {
	padding: 10px 0;
	display: flex;
	justify-content: center;
	align-items: stretch;
	flex-wrap: wrap;
	background-color: #fff;
	height: 100vh;
	position: relative;
}

.landing::after {
	content: '';
	position: absolute;
	top: 0;
	left: 0;
	height: 100%;
	width: 100%;
	background-color: rgba(0,0,0,0.05);
}

.landing__picture {
	margin: 10px 0;
	background-color: #fff;
	margin-right: 10px;
	padding: 0 50px;
	overflow: hidden;
	width: 40vw;

	display: flex;
	justify-content: center;
	align-items: center;
}

.landing__picture img {
	max-height: 500px;
	max-width: 408px;
}

.landing__container {
	background-color: rgba(0,0,0,0.55);
	color: #f2f2f2;
	padding: 30px 30px 10px 30px;
	max-width: 500px;
	min-width: 335px;
	width: 40vw;
	border-radius: 4px;
	position:relative;
	z-index: 2;
}

.landing__title {
	text-align: center;
	color: #fff;
	font-family: 'Philosopher';
	font-weight: 600;
	margin-bottom: 25px;
}

.landing__content {
	margin-bottom: 20px;
}

.landing__content ul {
	padding-left: 20px;
	margin-top: 15px;
}

.landing__content li {
	letter-spacing: 0.4px;
	font-size: 1.1rem;
}

.landing__content p {
	line-height: 135%;
	letter-spacing: 0.4px;
	font-size: 1.1rem;
	margin-bottom: 5px;
}

.landing__trust {
	margin-top: 5px;
	font-size: 90%;
	text-align: left; 
	padding-left: 7px;
}

@media (max-width: 768px) {
	.landing {
		background-color: #fff;
	}

	.landing__container {
		width: 90vw;
	}

	.landing__picture {
		width: 90vw;
	}
}

.landing__container--subscribed {
	padding-top: 20vh;
	padding-bottom: 20vh;
}

.landing__container--subscribed .landing__content {
	margin-bottom: 10vh;
}

.landing__container--subscribed p {
	text-align: center;
}

.landing__container--subscribed span {
	font-size: 2.5rem;
	line-height: 150%;
}

.landing__container--subscribed a {
	text-decoration: none;
	color: #f2f2f2;
	background-color: #1d7fd8;
	padding: 20px;
	margin-left: 18%;
	border-radius: 5px;
	border: solid 1px #1269b9;
}

.landing__container--subscribed a:hover {
	background-color: #3289db;
}

.landing__container--subscribed i {
	margin-right: 7px;
}
</style>
