<template>
	<div class="articles-by-query">
		<PageTitle :main="$route.query.s" sub="Buscar por:" />
		<ul>
			<li v-for="article in articles" :key="article.id">
				<ArticleCard :article="article" :didGetImg="didGetImg" />
			</li>
		</ul>
		<div class="load-more">
			<button
				v-if="loadMore"
				class="btn btn-lg btn-outline-primary"
				@click="getArticles"
			>
				Mais
			</button>
		</div>
	</div>
</template>

<script>
import { baseApiUrl } from '@/global'
import axios from 'axios'
import PageTitle from '@/components/template/pageTitle'
import ArticleCard from '@/components/article/ArticleCard'

export default {
	name: 'SearchArticles',
	components: { PageTitle, ArticleCard },
	data: function() {
		return {
			articles: [],
			page: 1,
			loadMore: true,
			imgQuery: false,
		}
	},
	computed: {
		didGetImg() {
			return this.imgQuery
		},
	},
	methods: {
		getArticles() {
			const url = `${baseApiUrl}/search?s=${this.$route.query.s}&page=${
				this.page
			}`
			axios(url).then((res) => {
				this.articles = this.articles.concat(res.data)
				const imageIds = this.articles.map((a) => a.imageId)
				this.getImages(imageIds)
				this.page++

				if (res.data.length < 10) this.loadMore = false
			})
		},
		getImages(ids) {
			const url = `${baseApiUrl}/cardimages?ids=${ids}`
			axios.get(url).then((res) => {
				res.data.sort((a, b) => {
					return ids.indexOf(a._id) - ids.indexOf(b._id)
				})
				this.articles.forEach((a, i) => (a.image = res.data[i]))
				this.imgQuery = true
			})
		},
	},
	watch: {
		$route() {
			if (!process.isClient) return
			this.articles = []
			this.page = 1
			this.loadMore = true
			this.imgQuery = false
			this.getArticles()
		},
		$mq() {
			if (this.$mq != 'xs' && this.$mq != 'sm') {
				this.$store.commit('toggleMenu', true)
			} else {
				this.$store.commit('toggleMenu', false)
			}
		},
	},
	mounted() {
		this.getArticles()
		if (this.$mq != 'xs' && this.$mq != 'sm') {
			this.$store.commit('toggleMenu', true)
		}
	},
}
</script>

<style>
.articles-by-query ul {
	list-style-type: none;
	padding: 50px 20px 0px 20px;
	max-width: 60rem;
	margin-left: auto;
	margin-right: auto;
}

.articles-by-query .load-more {
	display: flex;
	flex-direction: column;
	align-items: center;
	margin: 25px 0px;
}
</style>
