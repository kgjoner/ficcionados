<template>
	<div id="app" :class="{'showMenu': isMenuVisible, 'loginScreen': hideHeader}">
		<Header v-if="!hideHeader" 
			:hideToggle="this.$route.fullPath === 'insert-url-with-no-menu'" 
			:hideUserDropdown="!user"></Header>
		<Menu />
		<Loading v-if="validatingToken" />
		<Content v-else />
		<GoToTop />
		<Footer v-if="!hideHeader"/>
	</div>
</template>

<script>
import axios from 'axios'
import { baseApiUrl, userKey } from '@/global'
import { mapState } from 'vuex'

import Header from '@/components/template/Header'
import Menu from '@/components/template/Menu'
import Content from '@/components/template/Content'
import Footer from '@/components/template/Footer'
import Loading from '@/components/template/Loading'
import GoToTop from '@/components/template/goToTop'

export default {
	name: "App",
	components: { Header, Menu, Content, Footer, Loading, GoToTop },
	data: function() {
		return {
			validatingToken: false,
			isLoginScreen: false,
			maintenance: false,
		}
	},
	computed: {
		...mapState(['isMenuVisible', 'user']),
		hideHeader() {
			return this.$route.fullPath === '/admin' || this.$route.fullPath === '/desbloqueando-a-escrita'
				|| this.$route.fullPath === '/manutencao' || this.maintenance
		}
	},
	methods: {
		async validateToken() {
			this.validatingToken = true

			const json = localStorage.getItem(userKey)
			const userData = JSON.parse(json)
			this.$store.commit('setUser', null)

			if(!userData) {
				this.validatingToken = false
				if(this.$route.fullPath.includes('/admin')) {
					this.$router.push({ name: 'admin' })
					this.maintenance = false
				} else if (this.maintenance) {
					this.$router.push({ name: 'maintenance' })
				}
				return
			}

			const res = await axios.post(`${baseApiUrl}/validateToken`, userData)

			if(res.data) {
				this.$store.commit('setUser', userData)
				this.maintenance = false
				if(this.$route.fullPath === '/admin') {
					this.$store.commit('toggleMenu', false)
					this.$router.push({ name: 'board' })
				}
			} else {
				localStorage.removeItem(userKey)
				this.$router.push({ name: 'admin' })
			}

			this.$store.commit('toggleMenu', false)

			this.validatingToken = false
		},
	},
	
	created() {
		if(this.$route.fullPath.includes('/admin') || 
		this.$route.fullPath === '/' || this.maintenance) {
			this.validateToken()
		}
	}
}
</script>

<style>

	@font-face {
		font-family: 'Roboto';
		font-display: auto;
		src: url('./assets/fonts/Roboto-Regular.ttf')
	}

	@font-face {
		font-family: 'Kaushan Script';
		font-display: auto;
		src: url('./assets/fonts/KaushanScript-Regular.ttf');
	}

	@font-face {
		font-family: 'Philosopher';
		font-display: auto;
		src: url('./assets/fonts/Philosopher-Regular.ttf');
	}
	@font-face {
		font-family: 'Philosopher';
		font-display: auto;
		src: url('./assets/fonts/Philosopher-Italic.ttf');
		font-style: italic;
	}
	@font-face {
		font-family: 'Philosopher';
		font-display: auto;
		src: url('./assets/fonts/Philosopher-Bold.ttf');
		font-weight: bold;
	}
	@font-face {
		font-family: 'Philosopher';
		font-display: auto;
		src: url('./assets/fonts/Philosopher-Bold.ttf');
		font-weight: 600;
	}
	@font-face {
		font-family: 'Philosopher';
		font-display: auto;
		src: url('./assets/fonts/Philosopher-BoldItalic.ttf');
		font-weight: bold;
		font-style: italic;
	}
	@font-face {
		font-family: 'Philosopher';
		font-display: auto;
		src: url('./assets/fonts/Philosopher-BoldItalic.ttf');
		font-weight: 600;
		font-style: italic;
	}

	@font-face {
		font-family: 'Lato';
		font-display: auto;
		src: url('./assets/fonts/Lato-Regular.ttf');
	}
	@font-face {
		font-family: 'Lato';
		font-display: auto;
		src: url('./assets/fonts/Lato-Italic.ttf');
		font-style: italic;
	}
	@font-face {
		font-family: 'Lato';
		font-display: auto;
		src: url('./assets/fonts/Lato-Bold.ttf');
		font-weight: bold;
	}
	@font-face {
		font-family: 'Lato';
		font-display: auto;
		src: url('./assets/fonts/Lato-Bold.ttf');
		font-weight: 600;
	}
	@font-face {
		font-family: 'Lato';
		font-display: auto;
		src: url('./assets/fonts/Lato-BoldItalic.ttf');
		font-weight: bold;
		font-style: italic;
	}


	* {
		font-family: "Lato", sans-serif;
	}

	body {
		margin: 0px;
	}

	#app {
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;

		height: 100vh;
		display: grid;
		grid-template-rows: 60px 1fr 1fr;
		grid-template-columns: 230px 1fr;
		grid-template-areas:
			"header header"
			"content content"
			"footer footer"
	}


	#app.showMenu {
		grid-template-areas:
			"header header"
			"menu content"
			"menu footer";
	}

	@media (max-width: 767px) {
		#app.showMenu {
			grid-template-columns: 1fr;
			grid-template-rows: 60px 1fr 1fr 40px;
			grid-template-areas:
				"header"
				"menu"
				"content"
				"footer";
		}
	}

	#app.loginScreen {
		grid-template-areas:
			"content content"
			"content content"
			"content content";
	}

</style>