<template>
    <div class="article-by-id">
        <div class="artpage-title">         
            <div>
                <p>{{articleCategory.name}} ></p>
                <h1> {{article.name}}</h1>
                <em>{{article.publishedAt}}</em>
            </div>  
        </div> 
        <div class="pre-article">
            <Gravatar :email="author.email" alt="Author" />
            <span>{{author.name}}</span>
            <em>{{readingTime}}min de leitura</em>
            <hr>
        </div>
        <div class="article-content" v-html="article.content"></div>
        <div class="post-article">
            <hr>
            <AuthorBox :author="author"></AuthorBox>
        </div>
    </div>
</template>

<script>

import { baseApiUrl, toStandardDate } from '@/global'
import { mapState } from 'vuex'
import axios from 'axios'
import AuthorBox from './AuthorBox'
import Gravatar from 'vue-gravatar'

export default {
    name: 'ArticleById',
    components: { AuthorBox, Gravatar },
    data: function() {
        return {
            article: {},
            author: {},
            readingTime: '',
        }
    },
    computed: mapState(['articleCategory']), 
    mounted() {
        const url = `${baseApiUrl}/articles/${this.$route.params.id}`
        axios.get(url)
            .then(res => {
                this.$el.style.setProperty('--bkg-image', `url(${res.data.imageUrl})`)
                res.data.publishedAt = toStandardDate(res.data.publishedAt)
                this.article = res.data
            })
            .then(() => axios.get(`${baseApiUrl}/categories/${this.article.categoryId}`)
                .then(res => {
                    this.$store.state.articleCategory = res.data
                }))
            .then(() => {
                axios.get(`${baseApiUrl}/users/${this.article.userId}`)
                .then(res => this.author = res.data)
            })
            .then(() => {
                const artWords = this.article.content.split(' ').length
                this.readingTime = Math.ceil(artWords/200)
            })
        this.$store.commit('toggleMenu', false)   
    }
}

</script>

<style>

    :root {
        --bkg-image: url('');
    }

    .article-by-id {
        background-color: #fafafa;
    }

    .artpage-title::before {
        content: "";
        position: absolute;
        height: 100%;
        width: 100%;
        bottom: 0;
        top: 0;

        display: block;
        background-image: linear-gradient(to right, rgba(39, 68, 95,0.8), rgba(39, 68, 95,0.8)), var(--bkg-image);
        background-size: cover !important;
        background-position: center center;

        filter: blur(8px)
    }

    .artpage-title {
        position: relative;
        padding-top: 20px;
        color: #fafafa;
        height: 70vh;

        background-color:rgb(39, 68, 95);
        border: solid 4px rgb(39, 68, 95);

        display: flex;
        justify-content: center;
        align-items: flex-end;
    }

    .artpage-title div {
        padding-left: 20px;
        padding-right: 20px;
        margin-bottom: 15vh;
        width: 45rem;
        z-index: 1;
    }

    .artpage-title h1 {       
        font-family: 'Kaushan Script', 'PT Serif', cursive;
        font-size: 3.4rem;
        color: rgba(255,255,255,0.9);
        letter-spacing: 1px;
        line-height: 140%;
    }

    .artpage-title p {
        text-transform: uppercase;
        margin-bottom: 5px;
        font-size: 0.9rem;
    }

    .pre-article, .post-article {
        margin-left: auto;
        margin-right: auto;     
        max-width: 45rem;
        margin-top: 30px;
        color: #808080;
    }

    .pre-article > *, .post-article > * {
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

    .article-content {
        margin-left: auto;
        margin-right: auto;
        max-width: 45rem;
        margin-top: 50px;

        font-size: 1.15em;
        line-height: 175%;
        letter-spacing: 0.8px;
        color: #434343;
    }

    .article-content > * {
        margin-left: 20px;
        margin-right: 20px;
    }

    .article-content a {
        text-decoration: none;
        color: #1d7fd8 !important;
    }

    .article-content a:hover {
        text-decoration: none;
        color: #2d7bc4c9 !important;
    }

    .article-content > p:first-of-type {
        font-size: 1.3em;
        line-height: 170%;
    }

    .article-content::first-letter {
        font-size: 3em;
        font-weight: bold;
        color: #1d7fd8;
        float: left;
        padding-top: 1rem;
        padding-right: 10px;
    }

    .article-content p {
        margin-bottom: 5px;
    }

    .article-content pre {
        padding: 20px;
        border-radius: 8px;
        font-size: 1.2rem;
    }

    .article-content img {
        max-width: 100%;
    }

    .article-content :last-child {
        margin-bottom: 0px;
    }

</style>