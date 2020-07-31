<template>
	<div class="article-by-id">
		<div
			class="artpage-title"
			:class="{ 'long-title': $page.article.name.length > 50 }"
		>
			<div v-show="articleLoaded">
				<p>{{ $page.article.category.name }} ></p>
				<h1>{{ $page.article.name }}</h1>
				<em>{{ publishedAt }}</em>
			</div>
			<div v-show="!articleLoaded" class="not-loaded">
				<div class="not-loaded">
					<div class="category-block text-block"></div>
					<div class="title-block text-block"></div>
					<div class="publish-block text-block"></div>
				</div>
			</div>
		</div>
		<div v-show="articleLoaded" class="pre-article">
			<ClientOnly>
				<Gravatar :email="$page.article.email" alt="Autor" />
			</ClientOnly>
			<span>{{ $page.article.author.name }}</span>
			<em>{{ readingTime }}min de leitura</em>
			<hr />
		</div>
		<div v-show="!articleLoaded" class="pre-article">
			<div class="not-loaded">
				<div class="pre-block text-block"></div>
			</div>
			<hr />
		</div>
		<div
			v-show="articleLoaded"
			class="article-content"
			v-html="$page.article.content"
		></div>
		<div v-if="$page.article.author" class="post-article" ref="postArticle">
			<hr />
			<AuthorBox :author="author"></AuthorBox>
			<RelatedArticles
				v-if="$page.article.category.parentId"
				:parentId="$page.article.category.parentId || 1"
				:currentArticle="$page.article.id"
			/>
		</div>
		<div v-if="showDisqus" class="comments">
			<vue-disqus
				shortname="ficcionados"
				:identifier="this.$route.params.slug"
				:url="'https://www.ficcionados.com.br' + this.$route.fullPath"
			></vue-disqus>
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
import { baseApiUrl, baseImgUrl, toStandardDate } from '@/global'
import axios from 'axios'
import AuthorBox from '@/components/article/AuthorBox'
import RelatedArticles from '@/components/article/RelatedArticles'
// import Gravatar from 'vue-gravatar'

export default {
	name: 'ArticleById',
	components: {
		AuthorBox,
		RelatedArticles,
		Gravatar: () => import('vue-gravatar'),
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
					c: `${baseImgUrl}/${this.$page.article.image.filename}`,
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
				{ src: `http://localhost:8080/articleFunctions.js`, defer: true },
				// { src: `${baseApiUrl}/articleFunctions.js`, defer: true }
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
			return toStandardDate(this.$page.article.publishedAt)
		},
	},
	methods: {
		formatQueriedData() {
			this.$store.commit('setArticleCategory', {
				name: this.$page.article.category.name,
				id: this.$page.article.category.id,
				order: this.$page.article.order.toString(),
			})
			this.$el.style.setProperty(
				'--bkg-image',
				`url(${baseImgUrl}/${this.$page.article.image.filename})`
			)
			this.checkActiveAccordions()
			if (this.author.name) {
				if (window['IntersectionObserver']) {
					this.createObserver()
				} else {
					this.showDisqus = true
				}
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
		handleIntersect(entries, observer) {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					this.showDisqus = true
					observer.unobserve(this.$refs.postArticle)
				}
			})
		},
		createObserver() {
			const options = {
				root: null,
				threshold: '0',
			}
			const disqusObserver = new IntersectionObserver(
				this.handleIntersect,
				options
			)
			disqusObserver.observe(this.$refs.postArticle)
		},
	},
	watch: {
		$route() {
			this.showDisqus = false
			this.articleLoaded = false
			this.$store.commit('toggleMenu', false)
		},
	},
	mounted() {
		this.formatQueriedData()
		this.$store.commit('toggleMenu', false)
	},
}
</script>

<style>
.artpage-title div .not-loaded,
.pre-article .not-loaded {
	animation: text-load 1.5s;
	overflow: hidden;
	margin-bottom: 0;
}

.artpage-title > div .text-block {
	background-color: #fafafaaa;
	margin-bottom: 8px;
}

.artpage-title > div .category-block {
	height: 18px;
	width: 8rem;
}

.artpage-title > div .title-block {
	height: 73px;
	width: 30rem;
}

.artpage-title > div .publish-block {
	height: 16px;
	width: 12rem;
}

.pre-block {
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

:root {
	--bkg-image: url('../assets/article.png');
}

.article-by-id {
	background-color: #fafafa;
}

.artpage-title::before {
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

.artpage-title {
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

.artpage-title > div {
	padding-left: 20px;
	padding-right: 20px;
	margin-bottom: 15vh;
	width: 45rem;
	z-index: 1;
}

.artpage-title h1 {
	font-family: 'Kaushan Script', 'PT Serif', cursive;
	font-size: 3.4rem;
	color: rgba(255, 255, 255, 0.9);
	letter-spacing: 1px;
	line-height: 140%;
}

.artpage-title p {
	text-transform: uppercase;
	margin-bottom: 5px;
	font-size: 0.9rem;
}

.pre-article,
.post-article {
	margin-left: auto;
	margin-right: auto;
	max-width: 45rem;
	margin-top: 50px;
	color: #808080;
}

.pre-article > *,
.post-article > * {
	margin-left: 20px;
	margin-right: 20px;
}

.pre-article img {
	max-height: 35px;
	margin-right: 0px;
	border-radius: 50%;
}

.pre-article em {
	float: right;
}

.long-title.artpage-title {
	height: auto;
	padding-top: 40px;
}

.comments {
	max-width: 50rem;
	margin: 0px auto;
	padding: 20px 0;
}

@media (max-width: 450px), (max-width: 850px) and (max-height: 500px) {
	.artpage-title {
		height: auto;
		padding-top: 40px;
	}

	.artpage-title > div {
		margin-bottom: 10vh;
	}

	.artpage-title h1 {
		font-size: 2.7rem;
	}

	.artpage-title p {
		font-size: 0.8rem;
	}
}

#disqus_thread {
	padding-bottom: 40px;
}
</style>
