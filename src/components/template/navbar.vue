<template>
	<div class="navbar">
		<ul>
			<li>
				<a href="/" :class="{ 'navbar-selected': this.$route.fullPath === '/' }"
					>INÍCIO</a
				>
			</li>
			<li>
				<a
					href="/artigos"
					:class="{
						'navbar-selected':
							this.$route.fullPath === '/artigos' ||
							this.$route.fullPath.match(
								/\/categorias\/([0-2]|[4-9]|(\d\d+))/
							) ||
							this.$route.fullPath.includes('/artigo/'),
					}"
					>ARTIGOS</a
				>
			</li>
			<li>
				<a
					href="/categorias/3"
					:class="{
						'navbar-selected':
							this.$route.fullPath.match(/\/categorias\/3/) ||
							this.$route.fullPath.includes('/entrevista/'),
					}"
					>ENTREVISTAS</a
				>
			</li>
			<li>
				<a
					href="/sobre"
					:class="{ 'navbar-selected': this.$route.fullPath === '/sobre' }"
					>SOBRE</a
				>
			</li>
			<li>
				<a
					href="/contato"
					:class="{ 'navbar-selected': this.$route.fullPath === '/contato' }"
					>CONTATO</a
				>
			</li>
		</ul>
	</div>
</template>

<script>
export default {
	name: 'Navbar',
}
</script>

<style>
.navbar ul {
	display: flex;
	justify-content: space-between;
	margin: 0px;
	padding: 0px;
	margin-right: 10px;
}

.navbar li {
	list-style-type: none;
	font-size: 0.8rem;
}

.navbar a {
	color: rgba(255, 255, 255, 0.5);
	text-decoration: none;
	padding: 10px 20px;
	border-bottom: solid 2px transparent;
}

.navbar a:hover {
	color: #fff;
	text-decoration: none;
	border-bottom: solid 1px #1d7fd8;
}

.navbar .navbar-selected {
	color: #fff;
	border-bottom: solid 1px #1d7fd8;
}

@media (max-width: 855px) {
	.navbar a {
		padding: 10px 2vw;
	}

	.navbar ul {
		margin-right: 0px;
	}
}
</style>
