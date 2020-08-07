<template>
	<div class="home-calls">
		<g-link to="/categorias/1/" class="home-calls__option">
			<div class="home-calls__icon-box">
				<i class="icon-quill"></i>
			</div>
			<h2 class="home-calls__title">
				Sobre Escrita
			</h2>
			<hr class="home-calls__rule" />
			<p class="home-calls__description">
				Dicas para refinar seus roteiros, encontrar seu estilo e ganhar
				confiança em seus textos.
			</p>
			<button class="home-calls__btn" tabindex="-1">
				Saiba Mais
			</button>
		</g-link>
		<g-link to="/categorias/2" class="home-calls__option">
			<div class="home-calls__icon-box">
				<i class="icon-book"></i>
			</div>
			<h2 class="home-calls__title">
				Sobre Publicação
			</h2>
			<hr class="home-calls__rule" />
			<p class="home-calls__description">
				Confira as etapas pelas quais um livro deve passar, desde a primeira
				palavra escrita até tê-lo em suas mãos.
			</p>
			<button class="home-calls__btn" tabindex="-1">
				Saiba Mais
			</button>
		</g-link>
	</div>
</template>

<script>
export default {
	name: 'HomeCalls',
}
</script>

<style>
.home-calls {
	display: flex;
	justify-content: center;
	align-items: center;

	padding: 40px;
	background-color: #f2f2f2;
}

a.home-calls__option {
	display: flex;
	flex-direction: column;
	align-items: center;
	text-decoration: none;
	color: #000;
	padding: 60px 30px 40px 30px;
	max-width: 27rem;
}

.home-calls__icon-box {
	display: flex;
	justify-content: center;
	align-items: center;
	background-color: #3c3c3c;
	color: #f2f2f2;
	height: 80px;
	width: 80px;
	padding: 30px;
	margin-bottom: 20px;
	border-radius: 4px;
	border-top-right-radius: 30%;
}

.home-calls__icon-box i {
	font-size: 1.9rem;
}

.home-calls__title {
	font-family: 'Philosopher';
	font-size: 1.8rem;
	text-align: center;
}

.home-calls__rule {
	width: 200px;
	height: 1px;
	margin-top: 5px;
	border: none;
	text-align: center;
	background: linear-gradient(
		to right,
		rgba(54, 54, 54, 0),
		rgba(54, 54, 54, 0.75),
		rgba(54, 54, 54, 0.75),
		rgba(54, 54, 54, 0.75),
		rgba(54, 54, 54, 0)
	);
}

.home-calls__description {
	text-align: center;
	font-family: 'Verdana';
	font-size: 1rem;
	color: rgba(0, 0, 0, 0.7);
	padding: 0px 20px;
}

.home-calls__option:hover .home-calls__icon-box {
	background-color: #1d7fd8;
}

.home-calls__option:hover .home-calls__rule {
	background: linear-gradient(
		to right,
		rgba(29, 127, 216, 0.1),
		rgba(29, 127, 216, 1),
		rgba(29, 127, 216, 1),
		rgba(29, 127, 216, 1),
		rgba(29, 127, 216, 0.1)
	);
}

.home-calls__btn {
	opacity: 0;
	transition-duration: 0.6s;
	background-color: #1d7fd8;
	color: #f2f2f2;
	border: none;
	border-radius: 4px;
	padding: 5px 10px;
	cursor: pointer;
}

.home-calls__option:hover .home-calls__btn {
	opacity: 1;
}

@media (max-width: 768px) {
	.home-calls {
		flex-wrap: wrap;
	}
}
</style>
