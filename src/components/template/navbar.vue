<template>
	<nav class="navbar">
		<ul class="navbar__menu" role="menu">
			<li class="navbar__item" role="menuitem">
				<g-link to="/" rel="nofollow"
					class="navbar__link"
					:class="{ 'navbar__link-selected': $route.fullPath === '/' }"
					>INÍCIO
				</g-link>
			</li>
			<li class="navbar__item" role="menuitem">
				<g-link
					to="/artigos/"
					class="navbar__link"
					:class="{
						'navbar__link-selected': (
							$route.fullPath.includes('/artigos') ||
							$route.fullPath.includes('/artigo/') ||
							$route.fullPath.match(
								/\/categorias\/([0-2]|[4-9]|(\d\d+))/
							)
						) && articleCategory.id != 3,
					}"
					>ARTIGOS
				</g-link>
			</li>
			<li class="navbar__item" role="menuitem">
				<g-link
					to="/categorias/3/"
					class="navbar__link"
					:class="{
						'navbar__link-selected': 
							$route.fullPath.match(/\/categorias\/3/) ||
							$route.fullPath.includes('/entrevista/') ||
							articleCategory.id == 3,
					}"
					>ENTREVISTAS
				</g-link>
			</li>
			<li class="navbar__item" role="menuitem">
				<g-link
					to="/sobre/"
					class="navbar__link"
					:class="{ 'navbar__link-selected': $route.fullPath.includes('/sobre') }"
					>SOBRE
				</g-link>
			</li>
			<li class="navbar__item" role="menuitem">
				<g-link
					to="/contato/"
					class="navbar__link"
					:class="{ 'navbar__link-selected': $route.fullPath.includes('/contato') }"
					>CONTATO
				</g-link>
			</li>
		</ul>
	</nav>
</template>

<script>
import { mapState } from 'vuex'

export default {
	name: 'Navbar',
	computed: mapState(['articleCategory'])
}
</script>

<style>
.navbar__menu {
	display: flex;
	justify-content: space-between;
	margin: 0px;
	padding: 0px;
	margin-right: 10px;
}

.navbar__item {
	list-style-type: none;
	font-size: 0.8rem;
}

.navbar__link {
	color: rgba(255, 255, 255, 0.5);
	text-decoration: none;
	padding: 10px 20px;
	border-bottom: solid 2px transparent;
}

.navbar__link:hover {
	color: #fff;
	text-decoration: none;
	border-bottom: solid 1px #1d7fd8;
}

.navbar__link-selected {
	color: #fff;
	border-bottom: solid 1px #1d7fd8;
}

@media (max-width: 855px) {
	.navbar__menu {
		margin-right: 0px;
	}

	.navbar__link {
		padding: 10px 2vw;
	}
}
</style>
