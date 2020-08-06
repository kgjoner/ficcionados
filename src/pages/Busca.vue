<template>
	<div class="search-page">
		<PageTitle :main="$route.query.s" sub="Buscar por:" />
		<ArticleList 
			:articles="articles"
			:pageInfo="pageInfo"
		/>
		<Loading v-show="isLoading" large />
	</div>
</template>

<script>
import axios from 'axios' 
import { BASE_API_URL } from '@/constants'
import displayError from '@/utils/displayError'

import PageTitle from '@/components/template/pageTitle'
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
			const url = `${BASE_API_URL}/search?s=${this.$route.query.s}&page=${
				this.$route.query.page
			}`
			axios(url).then(async res => {
				let articles = res.data.articles
				const imageIds = articles.map(a => a.imageId)
				const imageData = await this.getImages(imageIds)
				this.articles = articles.map((a, i) => ({
					...a,
					author: { name: a.author },
					image: imageData[i]
				}))

				this.pageInfo = { ...res.data.pageInfo }
			})
			.catch(e => displayError(e))
			.finally(() => this.isLoading = false)
		},
		getImages(ids) {
			const url = `${BASE_API_URL}/cardimages?ids=${ids}`
			return new Promise(resolve => {
				axios.get(url).then(res => {
					res.data.sort((a, b) => {
						return ids.indexOf(a._id) - ids.indexOf(b._id)
					})
					resolve(res.data)
				})
			})
		},
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
