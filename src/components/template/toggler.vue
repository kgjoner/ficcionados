<template>
	<div
		class="toggler"
		:class="{ 'toggler--on': isMenuVisible }"
	>
		<button v-if="(isMenuVisible || keepToggler)
			&& $mq !== 'sm' && $mq !== 'xs'" 
			class="toggler__button"
			@click="toggleMenu">
				<i class="fa fa-sort-up toggler__icon"></i>
		</button>
	</div>
</template>

<script>
import { mapState } from 'vuex'
import { ROUTES_WITH_MENU_DISPLAYED_BY_DEFAULT } from '@/constants'

export default {
	name: 'Toggler',
	computed: {
		...mapState(['isMenuVisible']),
		keepToggler() {
			return !!ROUTES_WITH_MENU_DISPLAYED_BY_DEFAULT.find(route => {
				return this.$route.fullPath.match(route)
			})
		},
	},
	methods: {
		toggleMenu() {
			this.$store.dispatch('toggleMenu')
		},
	},
}
</script>

<style>
.toggler {
	height: 50px;
	width: 10px;
	position: fixed;
	bottom: 50px;
	z-index: 4;
}

.toggler:hover {
	width: 20px;
}

.toggler__button {
	height: 50px;
	width: 20px;
	background-color: #1d7fd8;
	border: none;
	border-bottom-right-radius: 5px;
	border-top-right-radius: 5px;
	transition: 0.5s;

	position: relative;
	left: -9px;
	cursor: pointer;
}

body:not(.tab-user) .toggler__button:focus {
	outline: none;
}

.toggler__button:hover {
	left: 0;
	outline: none;
}

.toggler__icon {
	color: #fafafa;
	transform: rotate(90deg);
	transition: 0.5s;
	position: relative;
	left: 1px;
}

.toggler--on .toggler__icon {
	transform: rotate(-90deg);
	left: 7px;
}
</style>
