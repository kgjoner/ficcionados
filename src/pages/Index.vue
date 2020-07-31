<template>
	<div class="home" ref="home">
		<Cover />
		<Directives />
		<div class="favorite-articles">
			<div class="art-title">
				<img
					src="@/assets/badge-heart.svg"
					alt="Ícone de coração"
					height="70px"
				/>
				<div>
					<h2>Artigos Recomendados</h2>
					<hr />
				</div>
			</div>
			<div class="fav-card-list">
				<div v-for="(article, i) in favArticles" :key="article.slug">
					<FavoriteCard :article="article" :standOutIndex="i" />
				</div>
			</div>
		</div>

		<HomeBanner ref="banner" />

		<div class="interviews">
			<div class="art-title">
				<img
					src="@/assets/badge-magnifier.svg"
					alt="Ícone de lupa"
					height="70px"
				/>
				<div>
					<h2>Entrevistas</h2>
					<hr />
				</div>
			</div>
			<div class="interview-card-list">
				<div v-for="(interview, i) in interviewArticles" :key="interview.slug">
					<InterviewCard
						:slot="`${i}`"
						:article="interview"
						:standOutIndex="i"
					/>
				</div>
			</div>
		</div>

		<div class="recent-art">
			<div class="art-title">
				<img src="@/assets/badge-sword.svg" alt="Ícone de lupa" height="70px" />
				<div>
					<h2>Artigos Recentes</h2>
					<hr />
				</div>
			</div>
			<ul>
				<li v-for="rarticle in recentArticles" :key="rarticle.id">
					<ArticleCard :article="rarticle" :didGetImg="true" />
				</li>
			</ul>
			<div class="load-more">
				<router-link to="/artigos" class="btn btn-lg btn-outline-primary">
					Mais
				</router-link>
			</div>
		</div>
	</div>
</template>

<page-query>
query {
	standout: allArticle(filter: { standout: { eq: true } }) {
		edges {
			node {
				...articleFields
			}
		}
	}
	recent: allArticle(sortBy: "publishedAt", order: DESC, limit: 10) {
		edges {
			node {
				...articleFields
			}
		}
	}
}

fragment articleFields on Article {
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
</page-query>

<script>
import { baseApiUrl } from '@/global'
import axios from 'axios'

import Cover from '@/components/home/Cover'
import Directives from '@/components/home/Directives'
import FavoriteCard from '@/components/home/FavoriteCard'
import InterviewCard from '@/components/home/InterviewCard'
import HomeBanner from '@/components/home/HomeBanner'
import ArticleCard from '@/components/article/ArticleCard'

export default {
	name: 'Home',
	components: {
		Cover,
		Directives,
		FavoriteCard,
		InterviewCard,
		HomeBanner,
		ArticleCard,
	},
	metaInfo: {
		titleTemplate: 'Ficcionados » Trazendo a ficção para a realidade.',
	},
	data: function() {
		return {
			page: 1,
			loadMore: true,
			imgQuery: true,
			imgQuery2: true,
			loading: false,
		}
	},
	computed: {
		standoutArticles() {
			return this.$page.standout.edges.map((a) => a.node)
		},
		recentArticles() {
			return this.$page.recent.edges.map((a) => a.node)
		},
		favArticles() {
			return this.standoutArticles.filter(
				(a) => a.category.name !== 'entrevista'
			)
		},
		interviewArticles() {
			return this.standoutArticles.filter(
				(a) => a.category.name === 'entrevista'
			)
		},
	},
	methods: {
		canUseWebP() {
			var elem = document.createElement('canvas')

			if (elem.getContext && elem.getContext('2d')) {
				if (elem.toDataURL('image/webp').indexOf('data:image/webp') == 0) {
					this.$refs.home.classList.add('webp')
				}
			}
		},
	},
	mounted() {
		this.canUseWebP()
	},
}
</script>

<style>
.favorite-articles {
	background-color: #fdfdfd;
	padding: 50px 50px;
}

.art-title {
	display: flex;
	align-items: center;
	padding-left: 20px;
	margin-bottom: 30px;
}

.art-title div {
	vertical-align: top;
	display: flex;
	flex-direction: column;
	justify-content: flex-end;
	padding-left: 15px;
}

.art-title h2 {
	flex: 1;
	margin-top: 20px;
	font-family: 'Kaushan Script';
	font-size: 2.4rem;
	color: rgba(50, 50, 50, 0.8);
}

.art-title hr {
	width: 250px;
	margin-top: 0;
	height: 1px;
	border: none;
	background: linear-gradient(
		to right,
		rgba(50, 50, 50, 0),
		rgba(50, 50, 50, 0.6),
		rgba(50, 50, 50, 0.6),
		rgba(50, 50, 50, 0.6),
		rgba(50, 50, 50, 0)
	);
}

.fav-card-list {
	display: flex;
	justify-content: center;
	align-items: stretch;
	flex-wrap: wrap;
}

.interview-card-list {
	display: flex;
	flex-direction: column;
	align-items: center;
}

[slot='1'] {
	border-top-right-radius: 0;
	border-bottom-right-radius: 0;
	border-top-left-radius: 4px;
	border-bottom-left-radius: 4px;
}

[slot='1'] a {
	flex-direction: row-reverse;
}

.interviews {
	/* background-image: url('../../assets/blankcover.jpg'); */
	padding: 50px 50px;
	position: relative;
	overflow: hidden;
}

.interviews:before {
	content: ' ';
	position: absolute;
	top: -15vw;
	left: -15vw;
	transform: rotate(-10deg);
	width: 150vw;
	height: 400px;
	background-color: #1d7fd8;
}

.interviews:after {
	content: ' ';
	position: absolute;
	bottom: -15vw;
	right: -4vw;
	transform: rotate(10deg);
	width: 150vw;
	height: 400px;
	background-color: #1d7fd8;
}

.interviews .art-title img {
	z-index: 2;
}

.interviews .art-title h2 {
	color: #f2f2f2;
	z-index: 2;
}

.interviews .art-title hr {
	width: 150px;
	z-index: 2;
	background: linear-gradient(
		to right,
		rgba(250, 250, 250, 0.4),
		rgba(250, 250, 250, 0.8),
		rgba(250, 250, 250, 0.8),
		rgba(250, 250, 250, 0.8),
		rgba(250, 250, 250, 0.4)
	);
}

.recent-art {
	padding: 50px;
}

.recent-art ul {
	padding-top: 5px;
	max-width: 60rem;
	margin-left: auto;
	margin-right: auto;
	list-style-type: none;
}

.recent-art .load-more {
	display: flex;
	flex-direction: column;
	align-items: center;
	margin: 25px 0px;
}

@media (max-width: 1000px) {
	.favorite-articles,
	.interviews,
	.recent-art {
		padding: 50px 20px;
	}

	.fav-card-list {
		flex-wrap: wrap;
	}
}

@media (max-width: 768px) {
	[slot='1'] a {
		flex-direction: column;
	}
}

@media (max-width: 400px) {
	.art-title {
		padding-left: 0;
	}

	.art-title div {
		padding-left: 10px;
	}

	img[height] {
		height: 60px;
	}

	.art-title h2 {
		font-size: 2.2rem;
	}

	.art-title hr {
		width: 200px;
	}

	.favorite-articles,
	.interviews,
	.recent-art {
		padding: 50px 10px;
	}
}
</style>
