<template>
	<div class="recent-articles">
		<PageTitle main="Artigos Recentes" />
		<ArticleList 
			:articles="articles"
			:pageInfo="$page.articles.pageInfo"
		/>
	</div>
</template>

<page-query>
query($page: Int) {
	articles: allArticle(sortBy: "publishedAt", order: DESC,
	perPage: 10, page: $page) @paginate {
		pageInfo {
			totalPages
			totalItems
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
import { Pager } from 'gridsome'
import PageTitle from '@/components/template/PageTitle'
import ArticleList from '@/components/utils/ArticleList'

export default {
	name: 'RecentArticles',
	components: { Pager, PageTitle, ArticleList },
	metaInfo: {
		title: 'Artigos Recentes',
		meta: [
			{
				name: 'description',
				content: 'Confira os últimos artigos publicados!',
			},
		],
	},
	computed: {
		articles() {
			return this.$page.articles.edges.map((a) => a.node)
		},
	},
}
</script>

<style>

</style>
