<template>
	<div class="not-found">
		<PageTitle 
			main="Página não encontrada" 
			sub="Erro 404"
			center
		/>
		<div class="not-found__body">
			<div class="not-found__text">
				<p>A página que procura não existe ou nunca existiu.</p>
				<p>
					Você pode ir para a <a href="/">página inicial</a> ou usar a pesquisa
					abaixo:
				</p>
			</div>
			<SearchBox dark />
		</div>
	</div>
</template>

<script>
import PageTitle from '@/components/template/PageTitle'
import SearchBox from '@/components/utils/SearchBox'

export default {
	name: 'NotFound',
	components: { PageTitle, SearchBox },
	metaInfo: {
		title: '404',
	},
}
</script>

<style>
.not-found__body {
	margin: 80px auto 100px auto;
	max-width: 45rem;
	font-size: 1.15em;
	letter-spacing: 0.8px;
	line-height: 175%;
}

.not-found__text {
	margin-bottom: 40px;
}
</style>
