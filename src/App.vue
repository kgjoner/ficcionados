<template>
	<div id="app" :class="{'showMenu': isMenuVisible, 'loginScreen': hideHeader}">
		<Header v-if="!hideHeader" 
			:hideToggle="this.$route.fullPath === 'insert-url-with-no-menu'" 
			:hideUserDropdown="!user"></Header>
		<Menu />
		<Content />
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
	metaInfo: { 
    titleTemplate: '%s » Ficcionados',
    meta: [
      { 
        name: 'viewport', 
        key: 'viewport',
        content: 'width=device-width, initial-scale=1.0, maximum-scale=5.0' 
      },
      {
        name: 'description',
        content: 'Coloque suas histórias no papel sem medo. Aqui você encontra dicas de escrita, roteiro e publicação e conversas com a galera do nicho literário nacional. o/ '
      }
    ],
  },
	data: function() {
		return {
			maintenance: false,
		}
	},
	computed: {
		...mapState(['isMenuVisible', 'user']),
		hideHeader() {
			return this.$route.fullPath === '/desbloqueando-a-escrita'
				|| this.$route.fullPath === '/manutencao' || this.maintenance
		}
	},
	beforeRouteEnter(to, from, next) {
		next(vm => {
			if(vm.maintenance) {
				next({ path: '/manutencao'})
			}
		})
	}
}
</script>

<style>

	@font-face {
		font-family: 'Roboto';
		font-display: auto;
		src: url('./assets/fonts/Roboto-Regular.ttf')
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
		grid-template-rows: 60px 2fr 1fr;
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