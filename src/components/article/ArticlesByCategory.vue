<template>
    <div class="articles-by-category">
        <PageTitle icon="fa fa-folder-o"
            :main="category.name" sub="Categoria" />
        <div class="showing-up-order">
            <label class="radio-container">Mais recentes
                <input type="radio" name="orderParam" value='publishedAt' v-model="orderParam">
                <span class="custom-radio-button"></span>
            </label>
            <label class="radio-container">Ordem didática
                <input type="radio" name="orderParam" value='order' v-model="orderParam">
                <span class="custom-radio-button"></span>
            </label>
            <hr>
        </div>
        <ul>
            <li v-for="article in articles" :key="article.id">
                <ArticleCard :article="article" />
            </li>
        </ul>
        <div class="load-more">
            <button v-if="loadMore"
                class="btn btn-lg btn-outline-primary"
                @click="getArticles">Mais</button>
        </div>
    </div>
</template>

<script>

import { baseApiUrl } from '@/global'
import axios from 'axios'
import PageTitle from '../template/pageTitle'
import ArticleCard from './ArticleCard'


export default {
    name: 'ArticlesByCategory',
    components: { PageTitle, ArticleCard },
    data: function() {
        return {
            category: {},
            articles: [],
            page: 1,
            loadMore: true,
            orderParam: 'publishedAt',
        }
    },
    methods: {
        getCategory() {
            const url = `${baseApiUrl}/categories/${this.category.id}`
            axios(url).then(res => this.category = res.data)
        },
        getArticles() {
            const url = `${baseApiUrl}/categories/${this.category.id}/articles?page=${this.page}&order=${this.orderParam}`
            axios(url).then(res => {
                this.articles = this.articles.concat(res.data)
                this.page++

                if (res.data.length === 0) this.loadMore = false
            })
        }
    },
    watch: {
        $route(to){
            this.category.id = to.params.id
            this.articles = []
            this.page = 1
            this.loadMore = true

            this.getCategory()
            this.getArticles()
        },
        $mq() {
            if(this.$mq != 'xs' && this.$mq != 'sm') {
                this.$store.commit('toggleMenu', true)
            } else {
                this.$store.commit('toggleMenu', false)
            }
        },
        orderParam() {
            this.articles = []
            this.page = 1
            this.loadMore = true

            this.getArticles()
        }
    },
    mounted() {
        this.category.id = this.$route.params.id
        this.getCategory()
        this.getArticles()
        if(this.$mq != 'xs' && this.$mq != 'sm') {
            this.$store.commit('toggleMenu', true)
        }
    }
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
    content: "";
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
