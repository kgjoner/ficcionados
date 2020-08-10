<template>
	<div class="search-page">
		<PageTitle :main="$route.query.term" sub="Buscar por:" />
		<ArticleList 
			:articles="articles"
			:pageInfo="pageInfo"
		/>
		<Loading v-show="isLoading" large />
	</div>
</template>

<script>
import { searchForArticles } from '@/api/backend'
import displayError from '@/utils/displayError'

import PageTitle from '@/components/template/PageTitle'
import ArticleList from '@/components/utils/ArticleList'
import Loading from '@/components/utils/Loading'

export default {
	name: 'SearchArticles',
	components: { PageTitle, ArticleList, Loading },
	metaInfo: {
		title: 'Busca',
	},
	data: function() {
		return {
			articles: [],
			pageInfo: {
				currentPage: 1,
				totalItems: 1,
				totalPages: 1
			},
			isLoading: false
		}
	},
	methods: {
		getArticles() {
			this.isLoading = true
			searchForArticles(this.$route.query)
				.then(
					data => {
						console.log(data)
						this.articles = [ ...data.articles ]
						this.pageInfo = { ...data.pageInfo }
					},
					e => displayError(e)
				)
				.finally(() => this.isLoading = false)
		}
	},
	watch: {
		$route() {
			if (!process.isClient) return
			this.articles = []
			this.pageInfo.totalPages = 1
			this.getArticles()
		},
	},
	mounted() {
		this.getArticles()
	},
}
</script>

<style>
.search-page {
	min-height: 80vh;
}
</style>
