<template>
	<div class="related-articles">
		<h4 class="related-articles__title">
			Artigos Relacionados
		</h4>
		<hr class="related-articles__rule" />
		<ul class="related-articles__list">
			<li v-for="article in articles" :key="article.id">
				<g-link :to="`/artigo/${article.slug}/`">
					<div class="related-articles__proper-link">
						<span>{{ article.name }}</span>
					</div>
				</g-link>
			</li>
		</ul>
	</div>
</template>

<script>
import { BASE_API_URL } from '@/constants'
import axios from 'axios'
import displayError from '@/utils/displayError'

export default {
	name: 'RelatedArticles',
	props: {
		parentId: {
			type: Number,
			default: 1,
		},
		currentArticle: String,
	},
	data: function() {
		return {
			articles: [],
		}
	},
	methods: {
		getArticles() {
			const url = `${BASE_API_URL}/categories/${this.parentId}/articles?page=${
				this.currentArticle
			}&order=random`
			axios(url)
				.then(res => {
					this.articles = [...res.data]
				})
				.catch(e => displayError(e))
		},
	},
	watch: {
		currentArticle() {
			if (!process.isClient) return
			this.getArticles()
		},
	},
	mounted() {
		this.getArticles()
	},
}
</script>

<style>
.related-articles {
	padding: 0 20px 50px 20px;
	margin-bottom: 0;
}

.related-articles__title {
	color: #4c4c4c;
	font-family: 'Philosopher';
}

.related-articles__rule {
	margin-top: 8px;
}

.related-articles__list {
	padding-left: 0;
	list-style-type: none;
}

.related-articles__proper-link {
	padding: 12px 0 12px 15px;
	margin: 5px 10px 5px 10px;
	color: #5c5c5c;
}

.related-articles__proper-link:hover {
	background-color: rgba(0, 0, 0, 0.035);
	border-radius: 4px;
}

.related-articles__proper-link span {
	margin-bottom: 5px;
	font-size: 1.3rem;
	border-bottom: solid 1px #1d7fd8aa;
}

.related-articles__proper-link span::before {
	font-family: 'custicons';
	content: 'q';
	font-size: 0.8em;
	margin-right: 8px;
	color: #1d7fd8;
}
</style>
