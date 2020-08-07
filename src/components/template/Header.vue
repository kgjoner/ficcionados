<template>
	<header class="header">
		<button class="header__action" @click="toggleMenu" v-if="!hideToggle">
			<img
				src="@/assets/logomarca.svg"
				class="header__logomark"
				alt="ficcionados logomarca"
				:class="{ 'header__logomark--selected': isMenuVisible }"
			/>
		</button>
		<g-link to="/" class="header__action" v-else>
			<img
				src="@/assets/logomarca.svg"
				class="header__logomark"
				alt="ficcionados logomarca"
			/>
		</g-link>
		<g-link to="/" class="header__logotype">
			Ficcionados
			<!-- <img
				src="@/assets/logotipo.svg"
				alt="ficcionados logotipo"
				class="logotype"
			/> -->
		</g-link>
		<Navbar v-if="this.$mq != 'xs' && this.$mq != 'sm'"></Navbar>
		<NavDropdown v-else></NavDropdown>
	</header>
</template>

<script>
import { mapState } from 'vuex'
import Navbar from './Navbar'
import NavDropdown from './NavDropdown'

export default {
	name: 'Header',
	components: { Navbar, NavDropdown },
	props: ['hideToggle'],
	computed: {
		...mapState(['isMenuVisible'])
	},
	methods: {
		toggleMenu() {
			this.$store.dispatch('toggleMenu')
		},
	}
}
</script>

<style>
.header {
	grid-area: header;
	background-color: #4d4d4d;

	display: flex;
	align-items: center;
}

.header__action {
	width: 60px;
	height: 100%;
	min-width: 60px;
	padding: 0;
	color: #fff;
	background-color: transparent;
	border: none;
	justify-self: flex-start;
	text-decoration: none;

	display: flex;
	justify-content: center;
	align-items: center;
}

.header__action:hover {
	background-color: rgba(0, 0, 0, 0.2);
}

a.header__action:hover {
	background-color: transparent;
}

.header__action:focus {
	outline: none;
}

.header__logomark {
	height: 100%;
	width: 100%;
	padding: 10px;
}

.header__logomark--selected {
	background-color: rgba(0, 0, 0, 0.4);
}

a.header__logotype {
	flex-grow: 1;
	color: rgba(255, 255, 255, 0.9);
	font-family: 'Kaushan Script';
	font-size: 40px;
	margin-left: 5px;
}

@media (max-width: 916px) {
	a.header__logotype {
		margin-left: 0;
	}
}
</style>
