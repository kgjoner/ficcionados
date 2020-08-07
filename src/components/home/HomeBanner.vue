<template>
	<section class="home-banner">
		<div>
			<h2 class="home-banner__heading">
				Liberte suas <strong>histórias</strong>
			</h2>
			<p class="home-banner__copy">
				Nem sempre é fácil colocar uma história no papel. Pode ser que você mal
				consiga tempo para escrever, e quando o faz, as palavras lhe escapam. Se
				esse for o caso...
			</p>
		</div>
		<g-link class="home-banner__btn" 
			to="/desbloqueando-a-escrita/" target="_blank">
			Descubra Mais
		</g-link>
	</section>
</template>

<script>
export default {
	name: 'HomeBanner',
}
</script>

<style>
.home-banner {
	background-image: url('../../assets/homebanner.jpg');
	background-repeat: no-repeat;
	background-size: cover;
	background-attachment: fixed;
	background-position: center center;
	padding: 150px 0px 100px 0;
	display: flex;
	justify-content: space-between;
	align-content: center;
}

.webp .home-banner {
	background-image: url('../../assets/homebanner.webp');
}

.home-banner__heading {
	font-size: 2.5rem;
	font-family: 'Kaushan Script';
	color: #f2f2f2;
	letter-spacing: 2px;
	margin-left: 18vw;
	font-weight: bold;
}

.home-banner__heading strong {
	color: #3ba0ff;
	font-family: 'Kaushan Script';
}

.home-banner__copy {
	max-width: 40vw;
	margin: 40px 0 0 18vw;
	color: #eee;
	font-size: 1.2rem;
}

.home-banner__btn {
	margin-right: 10vw;
	background-color: #f2f2f2;
	padding: 15px 40px;
	height: 100%;
	border-radius: 8px;
	font-size: 0.9rem;
	text-decoration: none;
	color: #000;
	text-transform: uppercase;
	margin-top: 4rem;
}

.home-banner__btn:hover {
	background-color: #1d7fd8;
	color: #f2f2f2;
}

@media (max-width: 900px) {
	.home-banner__heading,
	.home-banner__copy {
		margin-left: 10vw;
	}

	.home-banner__btn {
		margin-right: 5vw;
	}
}

@media (max-width: 768px) {
	.home-banner {
		flex-direction: column;
		justify-content: center;
		align-items: center;
		background-image: url('../../assets/homebanner-66.jpg');
	}

	.webp .home-banner {
		background-image: url('../../assets/homebanner-66.webp');
	}

	.home-banner__heading,
	.home-banner__copy {
		margin-left: 0;
		max-width: 70vw;
	}

	.home-banner__btn {
		margin-right: 0;
	}
}
</style>
