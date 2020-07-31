<template>
	<div class="recent-articles">
		<PageTitle main="Artigos Recentes" />
		<ul>
			<li v-for="article in articles" :key="article.id">
				<ArticleCard :article="article" :didGetImg="true" />
			</li>
		</ul>
		<div class="load-more">
			<Pager :info="$page.articles.pageInfo" />
		</div>
	</div>
</template>

<page-query>
query($page: Int) {
	articles: allArticle(sortBy: "publishedAt", order: DESC,
	perPage: 10, page: $page) @paginate {
		pageInfo {
			totalPages
			currentPage
		}
		edges {
			node {
				id
				name
				description
				publishedAt
				slug
				category {
					id
					name
				}
				image {
					filename
					title
					alt
					url
					format
				}
				author {
					name
				}
			}
		}
	}
}
</page-query>

<script>
import { baseApiUrl } from '@/global'
import axios from 'axios'

import { Pager } from 'gridsome'
import PageTitle from '@/components/template/pageTitle'
import ArticleCard from '@/components/article/ArticleCard'

export default {
	name: 'RecentArticles',
	components: { Pager, PageTitle, ArticleCard },
	metaInfo: {
		title: 'Artigos Recentes',
		meta: [
			{
				name: 'description',
				content: 'Confira os últimos artigos publicados!',
			},
		],
	},
	data: function() {
		return {
			page: 1,
			loadMore: true,
			imgQuery: false,
			loading: false,
		}
	},
	computed: {
		articles() {
			return this.$page.articles.edges.map((a) => a.node)
		},
	},
	methods: {
		// getArticles() {
		//     this.loading = true
		//     this.imgQuery = false
		//     const url = `${baseApiUrl}/articles?page=${this.page}&order=publishedAt`
		//     axios(url).then(res => {
		//         this.articles = this.articles.concat(res.data.data)
		//         const imageIds = this.articles.map(a => a.imageId)
		//         this.getImages(imageIds)
		//         this.$emit('updateHead')
		//         this.page++
		//         this.loading = false
		//         if (res.data.data.length < 10) this.loadMore = false
		//     })
		//.then(document.getElementsByClassName('content')[0].classList.add('content-ready'))
		// },
		// getImages(ids) {
		//     const url = `${baseApiUrl}/cardimages?ids=${ids}`
		//     axios.get(url)
		//         .then(res => {
		//             res.data.sort((a,b) => {
		//                 return ids.indexOf(a._id) - ids.indexOf(b._id)
		//             })
		//             this.articles.forEach((a, i) => {
		//                 a.image = res.data[i]
		//             })
		//             this.imgQuery = true
		//         })
		// },
		alreadyLoaded(i) {
			return this.articles[i].loaded
		},
	},
	watch: {
		$route() {
			if (!process.isClient) return
			this.articles = []
			this.page = 1
			this.loadMore = true
			this.imgQuery = false
			this.loading = false
		},
		$mq() {
			if (this.$mq != 'xs' && this.$mq != 'sm') {
				this.$store.commit('toggleMenu', true)
			} else {
				this.$store.commit('toggleMenu', false)
			}
		},
	},
	created() {
		if (this.$mq != 'xs' && this.$mq != 'sm') {
			this.$store.commit('toggleMenu', true)
		}
	},
}
</script>

<style>
.recent-articles ul {
	list-style-type: none;
	padding: 50px 20px 0px 20px;
	max-width: 60rem;
	margin-left: auto;
	margin-right: auto;
}

.recent-articles .load-more {
	display: flex;
	flex-direction: column;
	align-items: center;
	margin: 25px 0px;
}
</style>
