<template>
	<article class="interview-card">
		<g-link 
			:to="`/artigo/${article.slug}/`" 
			class="interview-card__container"
		>
			<div 
				v-lazyload="'background'" 
				class="interview-card__picture" 
				:data-url="imgUrl"
			>
			</div>

			<div class="interview-card__info">
				<p class="interview-card__description"> 
					{{ article.description }}
				</p>
				<hr class="interview-card__rule" />
				<div>
					<h3 class="interview-card__heading">
						{{ article.name }}
					</h3>
					<span class="interview-card__publishing-date">
						em <strong>{{ publishedAt }}</strong>
					</span>
					<button class="interview-card__btn" tabindex="-1">
						Leia
					</button>
				</div>
				
			</div>
		</g-link>
	</article>
</template>

<script>
import { BASE_IMG_URL } from '@/constants'
import formatDate from '@/utils/formatDate'

export default {
	name: 'InterviewCard',
	props: ['article'],
	computed: {
		publishedAt() {
			return formatDate(this.article.publishedAt)
		},
		imgUrl() {
			return BASE_IMG_URL + this.article.image.filename.split('.').join('-480w.')
		},
	},
}
</script>

<style>
.interview-card {
	position: relative;
	margin: 10px 10px 40px;
	background-color: #fafafa;
	border-top-right-radius: 4px;
	border-bottom-right-radius: 4px;
	max-width: 800px;
	border: solid 1px #ccc;
	z-index: 2;
}

.interview-card:hover {
	border-color: #4c4c4c;
}

a.interview-card__container {
	display: flex;
	text-decoration: none;
	color: inherit;
}

.interview-card__picture {
	position: relative;
	flex-grow: 2;
	min-width: 180px;
	height: 250px;
	background-position: 0% 20%;
	background-repeat: no-repeat;
	background-size: cover;
}

.interview-card__info {
	padding: 5px 15px 5px;
	display: flex;
	flex-direction: column;
	position: relative;
}

.interview-card__description {
	padding: 15px 0 8px;
	font-size: 1.1rem;
	font-style: italic;
	line-height: 170%;
	margin-bottom: 10px;
	color: #444;
}

.interview-card__rule {
	height: 1px;
	margin: 5px 0;
}

.interview-card__heading {
	font-family: 'Philosopher';
	padding-top: 5px;
	margin: 0px;
	font-weight: 600;
	color: #777;
	font-size: 1.4rem;
}

.interview-card__publishing-date {
	font-size: 0.8rem;
	color: #777;
}

.interview-card__publishing-date strong {
	text-transform: uppercase;
	font-size: 0.7rem;
}

.interview-card__btn {
	width: 100px;
	border: solid 1px #bbb;
	border-radius: 4px;
	text-transform: uppercase;
	font-size: 0.9rem;
	background-color: #fafafa;
	padding: 5px;
	color: #4c4c4c;
	position: absolute;
	right: 15px;
	bottom: 20px;
	cursor: pointer;
}

.interview-card:hover .interview-card__btn {
	background-color: #4c4c4c;
	border-color: #4c4c4c;
	color: #fafafa;
}

@media (max-width: 768px) {
	a.interview-card__container {
		display: flex;
		flex-direction: column;
		max-width: 380px;
	}

	.interview-card__info {
		padding-bottom: 50px;
	}
}
</style>
