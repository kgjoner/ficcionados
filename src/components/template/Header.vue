<template>
	<header class="header">
		<div>
			<button
				class="header__action" 
				@click="toggleMenu"
				aria-label="Abrir menu">
				<img
					src="@/assets/img/logomarca.svg"
					class="header__logomark"
					alt="ficcionados logomarca"
					:class="{ 'header__logomark--selected': isMenuVisible }"
				/>
			</button>
		</div>
		<g-link to="/" class="header__logotype">
			Ficcionados
		</g-link>
		<div class="header__nav">
			<NavDropdown v-if="this.$mq == 'xs' || this.$mq == 'sm'"></NavDropdown>
			<Navbar v-else></Navbar>
		</div>
	</header>
</template>

<script>
import { mapState } from 'vuex'
import Navbar from '@/components/template/Navbar'
import NavDropdown from '@/components/template/NavDropdown'

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
	},
}
</script>

<style>
.header {
	grid-area: header;
	background-color: #4d4d4d;

	display: flex;
	align-items: center;
	max-width: 100vw;
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

body:not(.tab-user) .header__action:focus {
	outline: none;
}

.tab-user .header__action:focus {
	background-color: rgba(0, 0, 0, 0.2);
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
	margin-left: 5px;
	color: rgba(255, 255, 255, 0.9);
	font-family: 'Kaushan Script', sans-serif;
	font-size: 40px;
	padding-right: 5px;
}

body:not(.tab-user) .header__logotype:focus {
	outline: none
}

.header__nav {
	flex-grow: 1;
	display: flex;
	justify-content: flex-end;
}

@media (max-width: 916px) {
	a.header__logotype {
		margin-left: 0;
	}
}

@media (max-width: 350px) {
	a.header__logotype > span {
		font-size: 32px;
	}
}
</style>
