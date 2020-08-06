<template>
	<div class="app" 
		:class="{ 'app--with-menu': isMenuVisible, 
			'app--no-header': hideHeader }">
		<Header
			v-if="!hideHeader"
			:hideToggle="this.$route.fullPath === 'insert-url-with-no-menu'"
		></Header>
		<Menu />
		<Content />
		<GoToTop />
		<Footer v-if="!hideHeader" />
	</div>
</template>

<script>
import { mapState } from 'vuex'
import { 
	MAINTENANCE, 
	ROUTES_WITH_NO_HEADER,
	ROUTES_WITH_MENU_DISPLAYED_BY_DEFAULT 
} from '@/constants'

import Header from '@/components/template/Header'
import Menu from '@/components/template/Menu'
import Content from '@/components/template/Content'
import Footer from '@/components/template/Footer'
import GoToTop from '@/components/template/goToTop'

export default {
	name: 'App',
	components: { Header, Menu, Content, Footer, GoToTop },
	metaInfo: {
		titleTemplate: '%s » Ficcionados',
		meta: [
			{
				name: 'viewport',
				key: 'viewport',
				content: 'width=device-width, initial-scale=1.0, maximum-scale=5.0',
			}
		],
	},
	computed: {
		...mapState(['isMenuVisible', 'isHeaderVisible']),
		hideHeader() {
			return !!ROUTES_WITH_NO_HEADER.find(route => {
				return this.$route.fullPath.match(route)
			})
		},
		shouldDisplayMenu() {
			return !!ROUTES_WITH_MENU_DISPLAYED_BY_DEFAULT.find(route => {
				return this.$route.fullPath.match(route)
			})
		}
	},
	methods: {
		controlMenu() {
			const isSmallViewport = this.$mq == 'xs' || this.$mq == 'sm'
			if(isSmallViewport) {
				this.$store.dispatch('hideMenu')
			} else if(this.shouldDisplayMenu) {
				this.$store.dispatch('showMenu')
			}
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
		canUseWebP() {
			const elem = document.createElement('canvas')
			if (elem.getContext && elem.getContext('2d')) {
				if (elem.toDataURL('image/webp').indexOf('data:image/webp') == 0) {
					document.body.classList.add('webp')
				}
			}
		},
	},
	watch: {
		$mq() {
			this.controlMenu()
		},
		$route() {
			this.controlMenu()
		}
	},
	created() {
		if(MAINTENANCE) {
			this.$router.push({ path: '/manutencao' })
		}
	},
	mounted() {
		window.addEventListener('keydown', this.setTabUser)
		this.canUseWebP()
		this.controlMenu()
	},
}
</script>

<style>
.app {
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;

	height: 100vh;
	display: grid;
	grid-template-rows: 60px 2fr 1fr;
	grid-template-columns: 230px 1fr;
	grid-template-areas:
		'header header'
		'content content'
		'footer footer';
}

.app--with-menu {
	grid-template-areas:
		'header header'
		'menu content'
		'menu footer';
}

.app--no-header {
	grid-template-areas:
		'content content'
		'content content'
		'footer footer';
}

@media (max-width: 780px) {
	.app--with-menu {
		grid-template-columns: 1fr;
		grid-template-rows: 60px 1fr 1fr 40px;
		grid-template-areas:
			'header'
			'menu'
			'content'
			'footer';
	}
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
</style>
