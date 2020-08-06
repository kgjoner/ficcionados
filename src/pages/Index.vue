<template>
	<div class="home" ref="home">
		<Hero />
		<HomeCalls />

		<div class="home__section">
			<div class="home__title-container">
				<div class="home__icon-box">
					<div class="home__icon heart"></div>
				</div>
				<h2 class="home__heading">
					Artigos Recomendados
				</h2>
			</div>
			<ArticleList :articles="favArticles" vertical />
		</div>

		<HomeBanner ref="banner" />

		<div class="home__section home__section--decoration">
			<div class="home__title-container">
				<div class="home__icon-box">
					<div class="home__icon magnifier"></div>
				</div>
				<h2 class="home__heading">
					Entrevistas
				</h2>
			</div>
			<div class="interview-card-list">
				<div v-for="(interview, i) in interviewArticles" :key="interview.id">
					<InterviewCard :slot="`${i}`" :article="interview" />
				</div>
			</div>
		</div>

		<div class="home__section">
			<div class="home__title-container">
				<div class="home__icon-box">
					<div class="home__icon sword"></div>
				</div>
				<h2 class="home__heading">
					Artigos Recentes
				</h2>
			</div>
			<ArticleList :articles="recentArticles" />
			<div class="home__center-container">
				<router-link to="/artigos/2" class="btn btn-lg btn-outline-primary">
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
import Hero from '@/components/home/Hero'
import HomeCalls from '@/components/home/HomeCalls'
import InterviewCard from '@/components/home/InterviewCard'
import HomeBanner from '@/components/home/HomeBanner'
import ArticleList from '@/components/utils/ArticleList'

export default {
	name: 'Home',
	components: {
		Hero,
		HomeCalls,
		InterviewCard,
		HomeBanner,
		ArticleList,
	},
	metaInfo: {
		titleTemplate: 'Ficcionados » Trazendo a ficção para a realidade.',
		mete: [
			{
				name: 'description',
				content:
					'Coloque suas histórias no papel sem medo. Aqui você encontra dicas de escrita, roteiro e publicação e conversas com a galera do nicho literário nacional. o/ ',
			},
		],
	},
	computed: {
		standoutArticles() {
			return this.$page.standout.edges.map(a => a.node)
		},
		recentArticles() {
			return this.$page.recent.edges.map(a => a.node)
		},
		favArticles() {
			return this.standoutArticles.filter(
				a => a.category.name !== 'Entrevistas'
			)
		},
		interviewArticles() {
			return this.standoutArticles.filter(
				a => a.category.name === 'Entrevistas'
			)
		},
	},
}
</script>

<style>
.home__section {
	background-color: #fdfdfd;
	padding: 100px 50px 50px 50px;
}

.home__title-container {
	display: flex;
	align-items: flex-end;
	margin-bottom: 30px;
}

.home__icon-box {
	height: 60px;
	width: 60px;
	display: flex;
	align-items: center;
	justify-content: center;
	background-color: var(--main-color);
	border-radius: 4px;
	border-top-right-radius: 30%;
	border-bottom-right-radius: 0;
}

.home__icon {
	mask-image: url('../assets/heart.svg');
	mask-repeat: no-repeat;
	mask-size: contain;
	background-color: #fff;
	height: 100%;
	width: 100%;
	padding: 0;
}

.home__icon.heart {
	mask-image: url('../assets/heart.svg');
	height: calc(100% - 8px);
	width: calc(100% - 8px);
}

.home__icon.magnifier {
	mask-image: url('../assets/magnifier.svg');
}

.home__icon.sword {
	mask-image: url('../assets/sword.svg');
}

.home__heading {
	padding: 8px 15px 0 10px;
	margin-bottom: 0;
	font-family: 'Kaushan Script';
	font-size: 2.4rem;
	color: rgba(50, 50, 50, 0.8);
	border-bottom: 3px solid var(--main-color);
}

.home__section--decoration {
	position: relative;
	overflow: hidden;
}

.home__section--decoration > * {
	position: relative;
	z-index: 1;
}

.home__section--decoration::before {
	content: ' ';
	position: absolute;
	top: -15vw;
	left: -15vw;
	transform: rotate(-10deg);
	width: 150vw;
	height: 400px;
	background-color: #1d7fd8;
}

.home__section--decoration::after {
	content: ' ';
	position: absolute;
	bottom: -15vw;
	right: -4vw;
	transform: rotate(10deg);
	width: 150vw;
	height: 400px;
	background-color: #1d7fd8;
}

.home__section--decoration .home__icon-box {
	background-color: var(--dark-color);
}

.home__section--decoration .home__heading {
	color: #f2f2f2;
	border-color: var(--dark-color);
}

.home__center-container {
	display: flex;
	justify-content: center;
	position: relative;
	top: -40px;
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

@media (max-width: 1000px) {
	.home__section {
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
	.home__section {
		padding: 50px 10px;
	}

	.home__title-container {
		padding-left: 0;
	}

	.home__heading {
		font-size: 2.2rem;
	}
}
</style>
