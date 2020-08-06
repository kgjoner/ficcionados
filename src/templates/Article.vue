<template>
	<div class="article">
		<div
			class="article__cover"
			:class="{ 'article__cover--long-title': $page.article.name.length > 50 }"
		>
			<div v-show="articleLoaded">
				<p class="article__category">
					{{ $page.article.category.name }} >
				</p>
				<h1 class="article__title">
					{{ $page.article.name }}
				</h1>
				<em class="article__publishing">
					{{ publishedAt }}
				</em>
			</div>
			<div v-show="!articleLoaded">
				<div class="article__not-loaded">
					<div class="category-block text-block"></div>
					<div class="title-block text-block"></div>
					<div class="publish-block text-block"></div>
				</div>
			</div>
		</div>
		<div v-show="articleLoaded" class="article__pre-content">
			<Gravatar :email="$page.article.author.email" alt="Autor" />
			<span>{{ $page.article.author.name }}</span>
			<em>{{ readingTime }}min de leitura</em>
			<hr />
		</div>
		<div v-show="!articleLoaded" class="article__pre-content">
			<div class="article__not-loaded">
				<div class="pre-block text-block"></div>
			</div>
			<hr />
		</div>
		<div
			v-show="articleLoaded"
			class="article-content"
			v-html="$page.article.content"
		></div>
		<div class="article__post-content" ref="postArticle">
			<hr />
			<AuthorBox v-if="$page.article.author" 
				:author="author" />
			<RelatedArticles
				v-if="$page.article.category.parentId"
				:parentId="$page.article.category.parentId || 1"
				:currentArticle="$page.article.id"
			/>
			<div v-if="showDisqus" class="article__comments">
				<vue-disqus
					shortname="ficcionados"
					:identifier="this.$route.params.slug"
					:url="'https://www.ficcionados.com.br' + this.$route.fullPath"
				></vue-disqus>
			</div>
		</div>
	</div>
</template>

<page-query>
query ($id: ID!) {
  article(id: $id) {
    id
    name
    description
    publishedAt
    content
    order
    category {
      id
      name
      parentId
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
      bio
      email
      website
      facebook
      instagram
      twitter
      wattpad
      sweek
    }
  }
}
</page-query>

<script>
import { BASE_IMG_URL } from '@/constants'
import formatDate from '@/utils/formatDate'

import AuthorBox from '@/components/article/AuthorBox'
import RelatedArticles from '@/components/article/RelatedArticles'
import Gravatar from 'vue-gravatar'

export default {
	name: 'ArticleById',
	components: {
		AuthorBox,
		RelatedArticles,
		Gravatar,
	},
	metaInfo() {
		return {
			title: this.$page.article.name || 'Artigo',
			meta: [
				{
					name: 'description',
					content:
						this.$page.article.description ||
						'Coloque suas histórias no papel sem medo. Aqui você encontra dicas de escrita, roteiro e publicação e conversas com a galera do nicho literário nacional. o/',
				},
				{
					p: 'og:image',
					c: `${BASE_IMG_URL}/${this.$page.article.image.filename}`,
				},
			],
			link: () => [
				{
					rel: 'canonical',
					href: `https://www.ficcionados.com.br${this.$route.fullPath}`,
					id: 'canonical',
				},
			],
			script: [
				{ src: `/articleFunctions.js`, defer: true },
			],
		}
	},
	data: function() {
		return {
			showDisqus: false,
			articleLoaded: false,
		}
	},
	computed: {
		author() {
			return this.$page.article.author
		},
		readingTime() {
			const artWords = this.$page.article.content.split(' ').length
			return Math.ceil(artWords / 200)
		},
		publishedAt() {
			return formatDate(this.$page.article.publishedAt)
		},
	},
	methods: {
		articleSetupRoutine() {
			this.$store.dispatch('hideMenu')

			this.$el.style.setProperty(
				'--bkg-image',
				`url(${BASE_IMG_URL}/${this.$page.article.image.filename})`
			)

			this.$store.dispatch('updateSelectedCategory', {
				name: this.$page.article.category.name,
				id: this.$page.article.category.id,
				order: this.$page.article.order,
			})

			this.checkActiveAccordions()

			if (window['IntersectionObserver']) {
				this.createObserver()
			} else {
				this.showDisqus = true
			}

			this.articleLoaded = true
		},

		checkActiveAccordions() {
			const activeEls = process.isClient
				? document.getElementsByClassName('accordion active')
				: []
			Array.from(activeEls).forEach((el) => {
				const panel = el.nextElementSibling
				panel.style.maxHeight = panel.scrollHeight + 'px'
			})
		},

		createObserver() {
			const disqusObserver = new IntersectionObserver(
				this.handleIntersect,
				{ root: null, threshold: '0' }
			)
			disqusObserver.observe(this.$refs.postArticle)
		},

		handleIntersect(entries, observer) {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					this.showDisqus = true
					observer.unobserve(this.$refs.postArticle)
				}
			})
		},
	},
	watch: {
		$route() {
			this.showDisqus = false
			this.articleLoaded = false
			this.articleSetupRoutine()
		},
	},
	mounted() {
		this.articleSetupRoutine()
	},
	destroyed() {
		this.$store.dispatch('updateSelectedCategory', {})
	}
}
</script>

<style>
:root {
	--bkg-image: url('../assets/article.png');
}

.article {
	background-color: #fafafa;
}

.article__cover {
	position: relative;
	padding-top: 20px;
	color: #fafafa;
	min-height: 70vh;
	overflow: hidden;

	background-color: rgb(39, 68, 95);
	border: solid 4px rgb(39, 68, 95);

	display: flex;
	justify-content: center;
	align-items: flex-end;
}

.article__cover--long-title {
	height: auto;
	padding-top: 40px;
}

.article__cover::before {
	content: '';
	position: absolute;
	height: 100%;
	width: 100%;
	bottom: 0;
	top: 0;

	display: block;
	background-image: linear-gradient(
			to right,
			rgba(39, 68, 95, 0.8),
			rgba(39, 68, 95, 0.8)
		),
		var(--bkg-image);
	background-size: cover !important;
	background-position: center center;

	filter: blur(8px);
}

.article__cover > div {
	padding-left: 20px;
	padding-right: 20px;
	margin-bottom: 15vh;
	width: 45rem;
	z-index: 1;
}

.article__title {
	font-family: 'Kaushan Script', 'PT Serif', cursive;
	font-size: 3.4rem;
	color: rgba(255, 255, 255, 0.9);
	letter-spacing: 1px;
	line-height: 140%;
}

.article__category {
	text-transform: uppercase;
	margin-bottom: 5px;
	font-size: 0.9rem;
}

.article__pre-content,
.article__post-content {
	margin-left: auto;
	margin-right: auto;
	max-width: 45rem;
	margin-top: 50px;
	color: #808080;
}

.article__pre-content > *,
.article__post-content > * {
	margin-left: 20px;
	margin-right: 20px;
}

.article__pre-content img {
	max-height: 35px;
	margin-right: 0px;
	border-radius: 50%;
}

.article__pre-content em {
	float: right;
}

.article__comments {
	max-width: 50rem;
	margin: 0px auto;
	padding: 20px 0;
}

.article__not-loaded {
	animation: text-load 1.5s;
	overflow: hidden;
	margin-bottom: 0;
}

.article__not-loaded .text-block {
	background-color: #fafafaaa;
	margin-bottom: 8px;
}

.article__not-loaded .category-block {
	height: 18px;
	width: 8rem;
}

.article__not-loaded .title-block {
	height: 73px;
	width: 30rem;
}

.article__not-loaded .publish-block {
	height: 16px;
	width: 12rem;
}

.article__not-loaded .pre-block {
	height: 20px;
	margin-left: 20px;
	width: 40rem;
	background-color: #e7e7e7;
}

@keyframes text-load {
	0% {
		width: 0;
	}
	100% {
		width: 100%;
	}
}

@media (max-width: 450px), (max-width: 850px) and (max-height: 500px) {
	.article__cover {
		height: auto;
		padding-top: 40px;
	}

	.article__cover > div {
		margin-bottom: 10vh;
	}

	.article__title {
		font-size: 2.7rem;
	}

	.article__category {
		font-size: 0.8rem;
	}
}

#disqus_thread {
	padding-bottom: 40px;
}
</style>
