<template>
	<div class="app">
		<Header />
		<slot></slot>
		<Footer />
	</div>
</template>

<script>
import { mapState } from 'vuex'
import Header from '../components/template/Header'
import Content from '../components/template/Content'
import Footer from '../components/template/Footer'

export default {
	name: 'App',
	metaInfo: {
		titleTemplate: '%s » Ficcionados',
		meta: [
			{
				name: 'viewport',
				key: 'viewport',
				content: 'width=device-width, initial-scale=1.0, maximum-scale=5.0',
			},
			{
				name: 'description',
				content:
					'Coloque suas histórias no papel sem medo. Aqui você encontra dicas de escrita, roteiro e publicação e conversas com a galera do nicho literário nacional. o/ ',
			},
		],
	},
	components: { Header, Content, Footer },
	methods: {
		checkWidth() {
			this.$store.commit('changeWidth')
		},
		setTabUser(e) {
			if (e.key === 'Tab') {
				document.body.classList.add('tab-user')
				window.removeEventListener('keydown', this.setTabUser)
				window.addEventListener('mousedown', this.setMouseUser)
			}
		},
		setMouseUser() {
			document.body.classList.remove('tab-user')
			window.removeEventListener('mousedown', this.setMouseUser)
			window.addEventListener('keydown', this.setTabUser)
		},
	},
	mounted() {
		window.addEventListener('resize', this.checkWidth)
		window.addEventListener('keydown', this.setTabUser)
	},
}
</script>

<style>
body {
	margin: 0;
	overflow-x: hidden;
}

.app {
	font-family: 'Avenir', Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #2c3e50;
	background-color: #eeeae7;

	min-height: 100vh;
	width: 100%;
	display: grid;
	grid-template-rows: 1fr 40px;
	grid-template-areas:
		'content'
		'footer';
}

.app__container {
	width: 100%;
	padding: 0 20px;
}

@media (max-width: 780px) {
	.app__container {
		padding: 0 10px;
	}
}

@media (max-width: 400px) {
	.app__container {
		padding: 0 8px;
	}
}

.app__container > * {
	max-width: 1200px;
	width: 100%;
	margin: 0 auto;
}

.app__heading {
	font-family: 'Baloo 2';
	text-transform: uppercase;
	position: relative;
	margin-bottom: 40px;
	text-align: left;
}

.app__heading::before {
	content: '';
	position: absolute;
	top: -5px;
	left: 0;
	width: 40px;
	height: 4px;
	border-radius: 2px;
	background-color: var(--main-color);
}
</style>
