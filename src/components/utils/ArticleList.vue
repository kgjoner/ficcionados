<template>
	<div class="article-list" :class="{ 'article-list--vertical': vertical || $mq == 'sm'|| $mq == 'xs' }">
		<ul>
			<li v-for="article in articles" :key="article.id">
				<ArticleCard :article="article" 
					:vertical="vertical || $mq == 'sm'|| $mq == 'xs'" />
			</li>
		</ul>

		<b-pagination
			v-if="pageInfo && pageInfo.totalPages > 1"
			:value="pageInfo.currentPage"
			@input="this.changePage"
			:total-rows="pageInfo.totalItems"
			:per-page="10"
		></b-pagination>
	</div>
</template>

<script>
import ArticleCard from '@/components/utils/ArticleCard'

export default {
	name: 'ArticleList',
	props: {
		articles: Array,
		pageInfo: Object,
		vertical: Boolean,
	},
	components: { ArticleCard },
	methods: {
		changePage(page) {
			if(this.$route.path.includes('busca')) {
				this.$router.push({
					path: `/busca?s=${this.$route.query.s}&page=${page}`,
				})
			} else if(this.$route.path.includes('categorias')) {
				const path = this.$route.path.replace(
					/(\/categorias\/\d+)\/?(\?page=(\d+))?/,
					`$1?page=${page}`
				)
				this.$router.push({ path })
			} else {
				const complement = page == 1 ? '' : `/${page}`
				const path = this.$route.path.replace(
					/(\/(categorias\/)?[\w-]+)(\/\d+)?/,
					`$1${complement}`
				)
				this.$router.push({ path })
			}
		},
	},
	created() {
		if (this.pageInfo && this.pageInfo.currentPage > this.pageInfo.totalPages) {
			this.changePage(this.pageInfo.totalPages)
		}
	},
}
</script>

<style>
.article-list {
	padding: 50px 20px;
	max-width: 60rem;
	margin-left: auto;
	margin-right: auto;
}

.article-list ul {
	list-style-type: none;
	padding: 0;
}

.article-list--vertical {
	width: 100%;
	max-width: none;
}

.article-list--vertical ul {
	width: 100%;
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
}

.article-list--vertical li {
	width: 32%;
	min-width: 300px;
	margin: 0 7px;
}

.b-pagination .page-link {
	width: 100%;
}
</style>
