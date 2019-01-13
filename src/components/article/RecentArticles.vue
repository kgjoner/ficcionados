<template>
    <div class="recent-articles">
        <PageTitle main="Artigos Recentes" />
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
    name: 'RecentArticles',
    components: { PageTitle, ArticleCard },
    data: function() {
        return {
            articles: [],
            page: 1,
            loadMore: true,
        }
    },
    methods: {
        getArticles() {
            const url = `${baseApiUrl}/articles?page=${this.page}&order=publishedAt`
            axios(url).then(res => {
                this.articles = this.articles.concat(res.data.data)
                this.page++

                if (res.data.length === 0) this.loadMore = false
            })
        }
    },
    watch: {
        $route(to){
            this.articles = []
            this.page = 1
            this.loadMore = true

            this.getArticles()
        },
        $mq() {
            if(this.$mq != 'xs' && this.$mq != 'sm') {
                this.$store.commit('toggleMenu', true)
            } else {
                this.$store.commit('toggleMenu', false)
            }
        },
    },
    mounted() {
        this.getArticles()
        if(this.$mq != 'xs' && this.$mq != 'sm') {
            this.$store.commit('toggleMenu', true)
        }
    }
}
</script>

<style>

    .recent-articles ul {
        list-style-type: none;
        padding: 50px 20px 0px 20px;
        max-width: 60rem;
        margin-left: auto;
        margin-right: auto;
    }

    .recent-articles .load-more {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin: 25px 0px;
    }

</style>
