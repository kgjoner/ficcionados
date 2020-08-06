<template>
	<div class="category">
		<PageTitle :main="$page.category.name" sub="Categoria" />
		<RadioGroup
			name="orderParam"
			:options="radioOptions"
			v-model="orderParam"
		/>
		<hr />
		<ArticleList :articles="articles" :pageInfo="pageInfo" />
	</div>
</template>

<page-query>
query($id: ID!) {
	category(id: $id) {
		id
		name
		parentId
		order
		breadcrumb
		children
		belongsTo(sortBy: "publishedAt", order: DESC)  {
			edges {
				node {
					... on Article {
						id
						name
						order
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
	}
}
</page-query>

<script>
import PageTitle from '@/components/template/pageTitle'
import RadioGroup from '@/components/utils/RadioGroup'
import ArticleList from '@/components/utils/ArticleList'

export default {
	name: 'ArticlesByCategory',
	components: { PageTitle, RadioGroup, ArticleList },
	metaInfo() {
		return {
			title: this.$page.category.name || 'Categoria',
		}
	},
	data: function() {
		return {
			orderParam: 'publishedAt',
			radioOptions: [
				{ label: 'Mais Recentes', value: 'publishedAt' },
				{ label: 'Ordem Didática', value: 'order' },
			],
			perPage: 10,
		}
	},
	computed: {
		articles() {
			const page = this.$route.query.page || 1
			let articles = this.$page.category.belongsTo.edges.map(a => a.node)
			if (this.orderParam === 'order') {
				articles = articles.sort((a, b) => a.order - b.order)
			}
			return articles.filter(
				(a, i) => i >= (page - 1) * this.perPage && i < page * this.perPage
			)
		},
		pageInfo() {
			console.log(this.$route.query.page)
			return {
				currentPage: this.$route.query.page || 1,
				totalItems: this.$page.category.belongsTo.edges.length,
				totalPages: Math.ceil(
					this.$page.category.belongsTo.edges.length / this.perPage
				),
			}
		},
	},
}
</script>

<style>
.category .load-more {
	display: flex;
	flex-direction: column;
	align-items: center;
	margin: 25px 0px;
	padding-bottom: 20vh;
}
</style>
