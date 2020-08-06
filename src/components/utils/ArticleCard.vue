<template>
	<div class="article-card"
		:class="{'article-card--vertical': vertical}"
	>
		<g-link 
			:to="`/artigo/${article.slug}/`"
			class="article-card__container"
		>
			<figure class="article-card__picture">
				<img v-if="article.image && !vertical"
					v-lazyload
					:data-url="imgUrl"
					src=""
					:alt="article.image.alt"
					:title="article.image.title"
				/>
				<img v-else-if="article.image"
					:src="imgUrl"
					:alt="article.image.alt"
					:title="article.image.title"
				/>
			</figure>
			<div class="article-card__info">
				<h4 class="article-card__heading">
					{{ article.name }}
				</h4>
				<div class="article-card__flex-swap">
					<p class="article-card__description"> 
						{{ article.description }}
					</p>
					<p class="article-card__publishing">
						por <strong>{{ article.author.name }} </strong> em
						<strong>{{ publishedAt }}</strong>
					</p>
				</div>
				<button class="article-card__btn">
					Leia
				</button>
			</div>
		</g-link>
		<div class="article-card__container">
			<g-link v-if="vertical"
				class="article-card__category"
				:to="`/categorias/${article.category.id}/`"
			>
				<i class="fa fa-folder"></i>
				{{ article.category.name }}
			</g-link>
		</div>
	</div>
</template>

<script>
import { BASE_IMG_URL } from '@/constants'
import formatDate from '@/utils/formatDate'

export default {
	name: 'ArticleCard',
	props: ['article', 'vertical'],
	computed: {
		publishedAt() {
			return formatDate(this.article.publishedAt)
		},
		imgUrl() {
			if(!this.article.image) return ''
			const reducer = this.article.image.format === 'svg' ? '.' : 
				this.vertical ? '-480w.' : '-240w.'
			return `${BASE_IMG_URL}/${this.article.image.filename
				.split('.')
				.join(reducer)}`
		},
	},
}
</script>

<style>
.article-card {
	margin-bottom: 20px;
	background-color: #fff;
	border-radius: 8px;
	border: solid 1px rgba(0, 0, 0, 0.2);
	box-shadow: 0px 1px 5px rgba(0, 0, 0, 0.15);
}

.article-card:hover {
	border-color: var(--main-color);
}

a.article-card__container {
	padding: 20px;
	display: flex;
	align-items: flex-start;
	justify-content: center;
	flex-wrap: wrap;
	text-decoration: none;
	color: #000;
}

.article-card--vertical .article-card__container {
	flex-direction: column;
	padding-bottom: 10px;
}

.article-card__picture {
	height: 150px;
	min-width: 200px;
	margin-right: 20px;
	margin-bottom: 0;
	padding-right: 0;
	align-self: center;
	background-color: rgba(0, 0, 0, 0.25);
	border-radius: 5px;
	overflow: hidden;
	display: flex;
	align-items: center;
	justify-content: center;
}

.article-card--vertical .article-card__picture {
	margin: 0;
	width: 100%;
}

.article-card__picture img {
	height: 100%;
	border-radius: 5px;
}

.article-card--vertical .article-card__picture img {
	height: auto;
	width: 100%;
}

.article-card__info {
	flex: 1;
	min-width: 240px;
	padding-left: 20px;
	border-left: solid 1px rgba(0, 0, 0, 0.2);

	display: flex;
	flex-direction: column;
	align-self: stretch;
	justify-content: flex-end;
	position: relative;
}

.article-card--vertical .article-card__info {
	margin-top: 20px;
	border: none;
	padding: 0;
	padding-bottom: 15px;
	border-bottom: 1px solid #eee;
}

.article-card__heading {
	font-family: 'PT Serif';
	color: #444;
	font-weight: 500;
	font-size: 1.65rem;
	margin-bottom: 0;
}

.article-card--vertical .article-card__heading {
	font-size: 1.5rem;
	line-height: 120%;
	margin-bottom: 5px;
}

.article-card__flex-swap {
	flex: 1;
	display: flex;
	flex-direction: column;
}

.article-card--vertical .article-card__flex-swap {
	flex-direction: column-reverse;
}

.article-card__description {
	flex: 5;
	color: #555;
	margin-top: 0.5rem;
	margin-bottom: 10px;
}

.article-card--vertical .article-card__description {
	/* font-size: 0.9rem; */
	margin-top: 15px;
}

.article-card__publishing {
	font-size: 0.8rem;
	line-height: 150%;
	margin-bottom: 0;
	width: 65%;
}

.article-card--vertical .article-card__publishing {
	width: 100%;
}

.article-card__publishing strong {
	text-transform: uppercase;
	padding: 0px 5px;
}

.article-card--vertical .article-card__publishing {
	color: #777;
}

.article-card--vertical .article-card__publishing strong {
	font-size:  0.7rem;
	padding: 0;
}

.article-card__btn {
	width: 100px;
	border: solid 1px #bbb;
	border-radius: 4px;
	text-transform: uppercase;
	font-size: 0.9rem;
	background-color: #fff;
	padding: 5px;
	color: #4c4c4c;
	position: absolute;
	right: 15px;
	cursor: pointer;
}

.article-card:hover .article-card__btn {
	background-color: var(--main-color);
	border-color: var(--main-color);
	color: #fafafa;
}

.article-card--vertical .article-card__btn {
	position: relative;
	align-self: flex-end;
}

.article-card__category {
	text-decoration: none;
	padding-left: 22px;
	margin-bottom: 10px;
	font-size: 0.8rem;
	color: rgba(0, 0, 0, 0.6);
}

.article-card__category:hover {
	color: var(--main-color);
}

@media (max-width: 700px) {
	a.article-card__container {
		padding: 10px;
		flex-direction: column;
	}

	.article-card__info {
		border-top: solid 1px rgba(0, 0, 0, 0.2);
		padding-top: 20px;
		padding-left: 0px;
		border-left: none;
		margin-left: none;
	}
}

@media (max-width: 480px) {
	.article-card__publishing {
		width: 50%;
	}
}
</style>
