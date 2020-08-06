<template>
	<div class="about">
		<div class="about__cover">
			<div class="about__title">
				<p>a que viemos...</p>
				<h1>O Manifesto do Escritor de Ficção</h1>
			</div>
		</div>

		<div class="article-content" v-html="content"></div>

		<div class="about__post-content">
			<hr />
			<div class="article-content">
				<p>Curtiu? Você também é um ficcionado?</p>
				<p>Então fique por dentro de tudo o que acontece aqui no blog!</p>
			</div>
			<i class="about__icon fa fa-angle-double-down"></i>
		</div>
	</div>
</template>

<script>
export default {
	name: 'About',
	metaInfo: {
		title: 'O Manifesto do Escritor de Ficção',
		meta: [
			{
				name: 'description',
				content:
					'Apaixonado pela escrita? Já pensou em escrever um conto ou dois? Um livro? Talvez já tenha começado? Terminado?',
			},
		],
	},
	data: function() {
		return {
			content: `
<p>Apaixonado pela escrita?</p>
<p>Já pensou em escrever um conto ou dois? Um livro?</p>
<p>Talvez já tenha começado? Terminado?</p>
<br> 
<p>Se você respondeu sim ou com certeza para uma dessas perguntas, pode relaxar… as chances são que você também seja um ficcionado.</p>
<br>
<br>
<h3><strong>Uma Insatisfação Positiva</strong></h3>
<hr>
<p>Esse é um projeto que começou com uma paixão… um sonho… uma dor. Talvez a dor seja a mais importante, pois ela se esconde por trás da paixão e do sonho; é a dor de um vazio não preenchido, de uma realidade que não satisfaz.</p>
<br><p>Se ela não incomodasse tanto e não nos tocasse lá no fundo, jamais teríamos tirado esse projeto do papel.</p>
<br><p>E que dor é essa?</p>
<br><p>O caminho aparentemente tortuoso e árduo enfrentado por um aspirante a autor de ficção.</p>
<br><p>Colocando isso de uma outra forma, o quão propenso você estaria para largar o emprego, a faculdade ou o cursinho a fim de escrever e publicar aquele romance que sempre sonhou?</p>
<br><p>Sim, sim, estou falando de alguém que queira ganhar a vida apenas escrevendo livros de ficção.</p>
<br><p>Improvável? Talvez. Possível? Com certeza.</p>
<br><p>Aqui tocamos no ponto-chave. Se é realmente possível, como podemos masterizar essa arte de modo que o caminho trilhado não pareça tão desencorajador? De que forma essa dor pode ser atenuada?</p>
<br><p>Uma resposta curta e direta poderia ser: olhando para aqueles que conseguiram.</p>
<br><p>É um ponto de partida. Mas quem sabe você pense que isso é um lance de sorte.</p>
<br><p>Bem, a sorte ajuda. Mas a habilidade também. E não apenas a da escrita em si, como também a do pensamento, ao meu ver empreendedor, de saber o que fazer com ela.</p>
<br><p>O cenário nacional pode não ser dos mais animadores. Porém ao olhar para fora, conseguimos enxergar uma amostragem maior de autores que estão conseguindo tirar proveito da era digital para se lançarem no mercado. Muitos deles, inclusive, oferecem dicas aos aventureiros no início da jornada.</p>
<br><p>Aventureiros como eu, você, nós, ficcionados.</p>
<br>
<br>
<h3><strong>O Propósito</strong></h3>
<hr>
<p>Nós, aqui, estamos em busca de publicar nossos livros.</p>
<br><p>Ao mesmo tempo que escrevemos, também passamos a consumir bastante material, tanto sobre a escrita quanto sobre o seu lado empreendedor. E muito desse material é estrangeiro.</p>
<br><p>Assim sendo, criamos esse site com dois propósitos:</p>
<ul>
<li> Encontrar pessoas como você; 🙂</li>
<li> E compartilhar o que estamos descobrindo ao longo do caminho.</li>
</ul>
<br><p>O primeiro é o mais importante, afinal, se você não estivesse aqui, o último seria inconsistente.</p>
<br><p>Quanto ao conteúdo, vamos compartilhá-lo em duas frentes:</p>
<br><ul>
<li><strong>Escrita:</strong> a arte de escrever em si.<ul>
<li>Forma: questões de prosa e estilo</li>
<li>Roteiro: questões de enredo</li></ul></li>
<br>
<li><strong>Metaescrita:</strong> o lado empreendedor de viver da escrita.<ul>
<li>Desenvolvimento: sobre se tornar um escritor melhor</li>
<li>Publicação: sobre colocar sua história na frente de outras pessoas</li></ul></li>
</ul>`,
		}
	},
}
</script>

<style>
.about__cover {
	height: 70vh;
	padding-top: 20px;
	color: #fafafa;
	background-color: rgb(0, 0, 0, 0.2);

	display: flex;
	justify-content: center;
	align-items: flex-end;
	position: relative;
}

.about__cover::before {
	content: '';
	position: absolute;
	height: 100%;
	width: 100%;
	bottom: 0;
	top: 0;

	background-image: linear-gradient(
			to right,
			rgba(0, 0, 0, 0.2),
			rgba(0, 0, 0, 0.2)
		),
		url('../assets/homecover.jpg');
	background-size: cover;
	background-position: bottom center;

	filter: opacity(0.9);
}

.about__title {
	padding-left: 20px;
	padding-right: 20px;
	margin-bottom: 20vh;
	max-width: 45rem;
	z-index: 1;
}

.about__title h1 {
	font-family: 'Kaushan Script', 'PT Serif', cursive;
	font-size: 3rem;
	color: rgba(255, 255, 255, 0.9);
	letter-spacing: 1px;
	line-height: 140%;
}

.about__title p {
	text-transform: uppercase;
	margin-bottom: 5px;
	font-size: 0.9rem;
}

.about__post-content {
	padding-left: 20px;
	padding-right: 20px;
	margin: 100px auto 50px auto;
	max-width: 45rem;
	line-height: 100%;
}

.about__icon {
	margin-top: 50px;
	margin-left: 20vw;
	font-size: 4rem;
	font-weight: bold;
	color: rgba(0, 0, 0, 0.6);
}

@media (max-width: 850px) and (max-height: 500px), (max-width: 400px) {
	.about__title h1 {
		font-size: 2.7rem;
	}
}
</style>
