<template>
	<div class="articles-by-category">
		<PageTitle
			icon="fa fa-folder-o"
			:main="$page.category.name"
			sub="Categoria"
		/>
		<div class="showing-up-order">
			<label class="radio-container"
				>Mais recentes
				<input
					type="radio"
					name="orderParam"
					value="publishedAt"
					v-model="orderParam"
				/>
				<span class="custom-radio-button"></span>
			</label>
			<label class="radio-container"
				>Ordem didática
				<input
					type="radio"
					name="orderParam"
					value="order"
					v-model="orderParam"
				/>
				<span class="custom-radio-button"></span>
			</label>
			<hr />
		</div>
		<ul>
			<li v-for="article in articles" :key="article.id">
				<ArticleCard :article="article" :didGetImg="true" />
			</li>
		</ul>
		<!-- <div class="load-more">
            <button v-if="loadMore"
                class="btn btn-lg btn-outline-primary"
                @click="getArticles">Mais</button>
        </div> -->
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
		belongsTo(sortBy: "publishedAt", order: DESC) {
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
import { baseApiUrl } from '@/global'
import axios from 'axios'
import PageTitle from '@/components/template/pageTitle'
import ArticleCard from '@/components/article/ArticleCard'

export default {
	name: 'ArticlesByCategory',
	components: { PageTitle, ArticleCard },
	metaInfo() {
		return {
			title: this.$page.category.name || 'Categoria',
		}
	},
	data: function() {
		return {
			orderParam: 'publishedAt',
		}
	},
	computed: {
		articles() {
			if (this.orderParam === 'publishedAt') {
				return this.$page.category.belongsTo.edges.map((a) => a.node)
			} else {
				return this.$page.category.belongsTo.edges
					.map((a) => a.node)
					.sort((a, b) => a.order - b.order)
			}
		},
	},
	watch: {
		$mq() {
			if (this.$mq != 'xs' && this.$mq != 'sm') {
				this.$store.commit('toggleMenu', true)
			} else {
				this.$store.commit('toggleMenu', false)
			}
		},
	},
	mounted() {
		if (this.$mq != 'xs' && this.$mq != 'sm') {
			this.$store.commit('toggleMenu', true)
		}
	},
}
</script>

<style>
.articles-by-category ul {
	list-style-type: none;
	padding: 50px 20px 0px 20px;
	max-width: 60rem;
	margin-left: auto;
	margin-right: auto;
}

.showing-up-order {
	padding: 50px 20px 0px 50px;
}

.articles-by-category .load-more {
	display: flex;
	flex-direction: column;
	align-items: center;
	margin: 25px 0px;
	padding-bottom: 20vh;
}

/* Customize the label (the container) */
.radio-container {
	position: relative;
	padding-left: 30px;
	margin-right: 35px;
	margin-bottom: 12px;
	cursor: pointer;
	-webkit-user-select: none;
	-moz-user-select: none;
	-ms-user-select: none;
	user-select: none;
	color: #4c4c4c;
}

/* Hide the browser's default radio button */
.radio-container input {
	position: absolute;
	opacity: 0;
	cursor: pointer;
	height: 0;
	width: 0;
}

/* Create a custom radio button */
.custom-radio-button {
	position: absolute;
	top: 0;
	left: 0;
	height: 25px;
	width: 25px;
	background-color: #d2d2d2;
	border-radius: 2px;
}

/* On mouse-over, add a grey background color */
.radio-container:hover input ~ .custom-radio-button {
	background-color: #c2c2c2;
}

/* When the radio button is checked, add a blue background */
.radio-container input:checked ~ .custom-radio-button {
	background-color: #1d7fd8;
}

/* Create the indicator (the dot/circle - hidden when not checked) */
.custom-radio-button:after {
	content: '';
	position: absolute;
	display: none;
}

/* Show the indicator (dot/circle) when checked */
.radio-container input:checked ~ .custom-radio-button:after {
	display: block;
}

/* Style the indicator (dot/circle) */
.radio-container .custom-radio-button:after {
	left: 9px;
	top: 3px;
	width: 8px;
	height: 16px;
	border: solid white;
	border-width: 0 3px 3px 0;
	-webkit-transform: rotate(45deg);
	-ms-transform: rotate(45deg);
	transform: rotate(45deg);
}
</style>
