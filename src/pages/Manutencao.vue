<template>
	<div class="maintenance">
		<div class="maintenance__container">
			<img src="@/assets/logomarca.svg" alt="Ficcionados" />
			<h1 class="maintenance__title">
				Ops... Estamos em manutenção
			</h1>
			<hr />
			<p class="maintenance__content">
				Voltamos em breve com um site novinho!
			</p>
			
			<MailchimpForm 
				btnMessage="Seja o primeiro a saber!"
				fullWidthBtn
			/>
		</div>
	</div>
</template>

<script>
import { MAINTENANCE } from '@/constants'
import MailchimpForm from '@/components/utils/MailchimpForm'

export default {
	name: 'Maintenance',
	components: { MailchimpForm },
	metaInfo: {
		title: 'Manutenção',
		meta: [{ name: 'robots', content: 'noindex' }],
	},
	created() {
		if(!MAINTENANCE) {
			this.$router.push({ path: '/' })
		}
	}
}
</script>

<style>
.maintenance {
	background-image: url('../assets/blankcover.jpg');
	background-size: cover;
	min-height: 100vh;
	padding: 20px;
}

.maintenance__container {
	background-color: rgba(0, 0, 0, 0.5);
	max-width: 40rem;
	margin-left: auto;
	margin-right: auto;
	border-radius: 8px;

	display: flex;
	flex-direction: column;
	align-items: center;
	padding: 20px;
	padding-bottom: 60px;
}

.maintenance img {
	height: 60px;
	margin: 20px;
	opacity: 0.8;
}

.maintenance__title {
	font-family: 'Kaushan Script';
	text-align: center;
	color: #f2f2f2;
	font-size: 2.5rem;
	letter-spacing: 1px;
	line-height: 140%;
}

.maintenance hr {
	width: 80%;
	height: 1px;
	border: none;
	background: linear-gradient(
		to right,
		rgba(250, 250, 250, 0.4),
		rgba(250, 250, 250, 0.8),
		rgba(250, 250, 250, 0.8),
		rgba(250, 250, 250, 0.8),
		rgba(250, 250, 250, 0.4)
	);
}

.maintenance__content {
	margin-top: 20px;
	margin-bottom: 40px;
	color: #f2f2f2;
	font-size: 1.2rem;
	line-height: 160%;
	letter-spacing: 0.8px;
	font-style: italic;
	text-align: center;
}
</style>
