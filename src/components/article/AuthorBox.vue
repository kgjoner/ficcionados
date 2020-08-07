<template>
	<section class="author-box">
		<header class="author-box__header">
			<h2>Sobre o Autor</h2>
		</header>

		<div class="author-box__container">
			<Gravatar
				class="author-box__picture"
				:email="author.email"
				alt="Autor"
			/>
			<div class="author-box__content">
				<h3>{{ author.name }}</h3>
				<p>{{ author.bio }}</p>
			</div>
		</div>

		<address class="author-box__external-links">
			<div class="author-box__social-links">
				<a
					class="author-box__link-icon"
					v-if="author.facebook"
					:href="author.facebook"
					title="Facebook"
				>
					<i class="fa fa-facebook-f"></i
				></a>
				<a
					class="author-box__link-icon"
					v-if="author.twitter"
					:href="author.twitter"
					title="Twitter"
				>
					<i class="fa fa-twitter"></i
				></a>
				<a
					class="author-box__link-icon"
					v-if="author.instagram"
					:href="author.instagram"
					title="Instagram"
				>
					<i class="fa fa-instagram"></i
				></a>
			</div>
			<div class="author-box__author-links">
				<p>Suas histórias:</p>
				<!-- <a :href="/"><i class="fa fa-amazon"></i></a> -->
				<a
					class="author-box__link-icon"
					v-if="author.wattpad"
					:href="author.wattpad"
					title="Wattpad"
				>
					<i class="icon-wattpad"></i
				></a>
				<a
					class="author-box__link-icon"
					v-if="author.sweek"
					:href="author.sweek"
					title="Sweek"
				>
					<i class="icon-sweek"></i
				></a>
				<a
					class="author-box__website-btn"
					:href="author.website"
					title="Website"
				>
					<i v-if="author.name.includes('Kaio')" class="icon-velgard"></i>SITE
				</a>
			</div>
		</address>
	</section>
</template>

<script>
import Gravatar from 'vue-gravatar'

export default {
	name: 'AuthorBox',
	components: { Gravatar },
	props: ['author'],
}
</script>

<style>
.author-box {
	position: relative;
	margin: 40px auto 0px auto;
	padding-bottom: 100px;
	max-width: 45rem;
}

.author-box__header {
	position: relative;
	padding: 10px 10px 10px 20px;
	width: 11rem;
	background-color: #1d7fd8;
	border-top-left-radius: 6px;
	border-top-right-radius: 6px;
}

.author-box__header h2 {
	letter-spacing: 0.8px;
	line-height: 150%;
	font-size: 1.2em;
	margin: 0;
	color: #fafafa;
}

.author-box__container {
	border: solid 1px #ddd;
	border-top-right-radius: 4px;
	padding: 40px 20px;

	display: flex;
	align-items: flex-start;
}

.author-box__picture {
	float: left;
	width: 80px;
	margin-right: 20px;
	border-radius: 4px;
}

.author-box__content h3 {
	font-family: 'PT Serif';
	color: #5c5c5c;
	font-size: 1.5em;
}

.author-box__content p {
	line-height: 175%;
	letter-spacing: 0.8px;
	color: #4c4c4c;
	font-style: italic;
	margin: 0;
}

.author-box__external-links {
	background-color: #eaeaea;
	height: 100%;

	display: flex;
	align-items: center;
	justify-content: space-between;
	flex-wrap: wrap;
}

.author-box__external-links > div {
	display: flex;
	align-items: center;
	padding: 0.5rem 20px 0.5rem 10px;
}

.author-box__link-icon {
	height: 2.5rem;
	width: 2.5rem;
	background-color: #fafafa;
	border-radius: 50%;
	margin-left: 10px;

	color: #4c4c4c;
	text-decoration: none;
	font-size: 1.3rem;

	display: flex;
	align-items: center;
	justify-content: center;
}

.author-box__link-icon:hover {
	background-color: #4c4c4c;
	text-decoration: none;
	color: #fafafa;
}

.author-box__author-links p {
	flex-grow: 1;
	text-align: right;
	font-size: 0.9em;
	letter-spacing: 0.8px;
	color: #4c4c4c;
	margin-bottom: 0;
}

.author-box__website-btn {
	min-width: 8rem;
	height: 2.5rem;
	float: right;
	margin-left: 10px;

	background-color: #1d7fd8;
	color: #fafafa;
	text-decoration: none;
	border-radius: 8px;
	border: none;
	padding: 0 10px;

	display: flex;
	align-items: center;
	justify-content: center;
}

body:not(.tab-user) .author-box__website-btn:focus {
	outline: 0;
}

.author-box__website-btn:hover {
	background-color: #1d7ed8d0;
	text-decoration: none;
	color: #fafafa;
}

.icon-velgard:before {
	font-size: 1.4rem;
	padding-right: 5px;
}

@media (max-width: 610px) {
	.author-box__external-links {
		justify-content: flex-end;
	}

	.author-box__social-links {
		display: none;
	}
}
</style>
