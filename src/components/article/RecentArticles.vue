<template>
    <div class="recent-articles">
        <PageTitle main="Artigos Recentes" />
        <ul>
            <li v-for="article in articles" :key="article.id">
                <ArticleCard :article="article" :didGetImg="didGetImg"/>
            </li>
        </ul>
        <div class="load-more">
            <button v-if="loadMore"
                class="btn btn-lg btn-outline-primary"
                @click="getArticles">Mais</button>
            <img v-show="loading" class="loading-art" src="@/assets/loading2.gif">
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
    head: {
        title: function() {
            return {
            inner: "Artigos Recentes",
            separator: "»",
            complement: "Ficcionados"
            }
        },
        meta: function() {
            return [
                {name: "description", content: "Confira os últimos artigos publicados!"}
            ]
        }
    },
    data: function() {
        return {
            articles: [],
            page: 1,
            loadMore: true,
            imgQuery: false,
            loading: false,
        }
    },
    computed: {
        didGetImg() {
            return this.imgQuery
        },
    },
    methods: {
        getArticles() {
            this.loading = true
            this.imgQuery = false
            const url = `${baseApiUrl}/articles?page=${this.page}&order=publishedAt`
            axios(url).then(res => {
                this.articles = this.articles.concat(res.data.data)
                const imageIds = this.articles.map(a => a.imageId)
                this.getImages(imageIds)
                this.$emit('updateHead')
                this.page++
                this.loading = false
                if (res.data.data.length < 10) this.loadMore = false
            })
        },
        getImages(ids) {
            const url = `${baseApiUrl}/cardimages?ids=${ids}`
            axios.get(url)
                .then(res => {
                    res.data.sort((a,b) => {
                        return ids.indexOf(a._id) - ids.indexOf(b._id)
                    })
                    this.articles.forEach((a, i) => {
                        a.image = res.data[i]
                    })
                    this.imgQuery = true
                })
        },
        alreadyLoaded(i){
            return this.articles[i].loaded
        }
    },
    watch: {
        $route(){
            this.articles = []
            this.page = 1
            this.loadMore = true
            this.imgQuery = false
            this.loading = false

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
    created() {
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
