<template>
	<div class="not-found">
		<PageTitle main="Página não encontrada" sub="Erro 404" />
		<div class="not-found-body">
			<p>A página que procura não existe ou nunca existiu.</p>
			<p>
				Você pode ir para a <a href="/">página inicial</a> ou usar a pesquisa
				abaixo:
			</p>
			<QueryField />
		</div>
	</div>
</template>

<script>
import PageTitle from '@/components/template/pageTitle'
import QueryField from '@/components/template/queryField'

export default {
	name: 'NotFound',
	components: { PageTitle, QueryField },
	metaInfo: {
		title: '404',
	},
	watch: {
		$route(to) {
			if (!to.path.includes('artigo')) {
				this.$router.push({ path: `artigo/${to.path}` })
			}
		},
	},
	created() {
		if (!this.$route.path.includes('artigo')) {
			this.$router.push({ path: `artigo/${this.$route.path}` })
		}
	},
}
</script>

<style>
.not-found-body {
	margin: 40px auto;
	max-width: 45rem;
	font-size: 1.15em;
	letter-spacing: 0.8px;
	line-height: 175%;
}

.not-found .query-field {
	margin-top: 50px;
	max-width: 20rem;
	background-color: #fcfcfc;
	border: none;
}

.not-found .query-field input {
	color: #4c4c4c;
}

.not-found .query-button {
	background-color: #1d7fd8;
}
</style>
