<template>
	<div class="hero">
		<div class="hero__content">
			<h1 class="hero__title">Trazendo a ficção para a realidade.</h1>
			<p class="hero__subtitle">Pelo sonho de viver escrevendo.</p>
			<div class="hero__actions">
				<g-link to="/sobre/" 
					class="hero__action hero__action--main">
					O MANIFESTO
				</g-link>
				<g-link to="/artigos/" 
					class="hero__action hero__action--sec">
					ARTIGOS RECENTES
				</g-link>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'Hero',
}
</script>

<style>
.hero {
	position: relative;
	height: 90vh;
	width: 100%;
	background-image: url('../../assets/homecover.jpg');
	background-size: cover;
	background-position: center bottom;
}

.webp .hero {
	background-image: url('../../assets/homecover.webp');
}

.hero__content {
	position: absolute;
	bottom: 0px;
	padding-bottom: 28vh;
	padding-left: 20vw;
}

.hero__title {
	font-family: 'Kaushan Script', cursive;
	color: rgba(255, 255, 255, 0.9);
	font-size: 3rem;
	letter-spacing: 1px;
	line-height: 140%;
}

.hero__subtitle {
	color: rgba(255, 255, 255, 0.7);
	font-size: 1rem;
	line-height: 140%;
	padding: 10px;
	letter-spacing: 0.8px;
	margin-bottom: 8px;
	font-style: italic;
	text-transform: uppercase;
}

.hero__actions {
	display: flex;
	align-items: center;
}

.hero__action {
	height: 60px;
	width: 34vw;
	min-width: 160px;
	max-width: 200px;
	margin-top: 40px;
	font-size: 15px;

	display: flex;
	justify-content: center;
	align-items: center;
	text-decoration: none;
	outline: 0;
}

.hero__action--main {
	margin-right: 20px;
	background-color: #4d4d4d;
	color: #fff;
	border: none;
	border-radius: 5px;
	box-shadow: 0px 0px 2px 0px #333;
}

.hero__action--main:hover {
	background-color: #fff;
	color: #4d4d4d;
}

.hero__action--sec {
	background-color: transparent;
	color: #fff;
	border: solid 1px #fff;
	border-radius: 5px;
	box-shadow: 0px 0px 2px 0px #333;
}

.hero__action--sec:hover {
	background-color: #fff;
	color: #1d7fd8;
}

@media (max-width: 1140px) {
	.hero__content {
		padding-left: 20vw;
		padding-right: 20px;
	}
}

@media (max-width: 960px) {
	.hero__content {
		padding-left: 15vw;
		padding-right: 20px;
	}
}

@media (max-width: 768px) {
	.hero {
		background-image: url('../../assets/homecover-66.jpg');
	}

	.webp .hero {
		background-image: url('../../assets/homecover-66.webp');
	}

	.hero__content {
		padding-left: 12vw;
		padding-right: 10vw;
	}
}

@media (max-width: 576px) {
	.hero__content {
		padding-left: 5vw;
		padding-right: 5vw;
		padding-bottom: 23vh;
	}
}

@media (max-width: 396px) {
	.hero {
		background-image: url('../../assets/homecover-vt.jpg');
	}

	.hero__content {
		padding-bottom: 20vh;
		padding-left: 10px;
		padding-right: 5px;
	}
}

@media (max-width: 850px) and (max-height: 500px) {
	.hero__content {
		padding-bottom: 23vh;
	}

	.hero__action {
		height: 40px;
		margin-top: 10px;
		font-size: 13px;
		width: 160px;
	}

	.hero__title {
		font-size: 2.3rem;
		line-height: 120%;
	}

	.hero__subtitle {
		font-size: 0.9rem;
		line-height: 120%;
	}
}

@media (max-width: 325px) {
	.hero__action {
		margin-top: 20px;
		font-size: 12px;
		min-width: 135px;
	}

	.hero__title {
		font-size: 2.3rem;
		line-height: 120%;
	}

	.hero__subtitle {
		font-size: 0.9rem;
		line-height: 120%;
	}
}
</style>
