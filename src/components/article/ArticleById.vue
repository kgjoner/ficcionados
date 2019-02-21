<template>
    <div class="article-by-id">
        <div class="artpage-title">         
            <div>
                <p>{{article.category}} ></p>
                <h1> {{article.name}}</h1>
                <em>{{article.publishedAt}}</em>
            </div>  
        </div> 
        <div class="pre-article">
            <Gravatar :email="article.email" alt="Autor" />
            <span>{{article.author}}</span>
            <em>{{readingTime}}min de leitura</em>
            <hr>
        </div>
        <div class="article-content" v-html="article.content"></div>
        <div v-if="article.author" class="post-article">
            <hr>
            <AuthorBox :author="author"></AuthorBox>
            <RelatedArticles v-if="article.parentId" :parentId="article.parentId || 3" :currentArticle="article.id" />
        </div>
        <div class="comments">
            <vue-disqus shortname="ficcionados" :identifier="this.$route.params.slug" :url="'https://www.ficcionados.com.br' + this.$route.fullPath"></vue-disqus>
        </div>
    </div>
</template>

<script>

import { baseApiUrl, baseImgUrl, toStandardDate } from '@/global'
import axios from 'axios'
import AuthorBox from './AuthorBox'
import RelatedArticles from './RelatedArticles'
import Gravatar from 'vue-gravatar'

export default {
    name: 'ArticleById',
    components: { AuthorBox, RelatedArticles, Gravatar },
    head: {
        title: function() {
            return {
            inner: this.article.name,
            separator: "»",
            complement: "Ficcionados"
            }
        },
        meta: function() {
            return [
                {name: "description", content: this.article.description}
            ]
        },
        link: function() {
            return [
                {rel: 'canonical', href: `https://www.ficcionados.com.br${this.$route.fullPath}`, id: 'canonical' }
            ]
        }
    },
    data: function() {
        return {
            article: {},
            readingTime: '',
        }
    },
    computed: {
        author() {
            return {
                name: this.article.author,
                email: this.article.email,
                bio: this.article.bio,
                website: this.article.website,
                facebook: this.article.facebook,
                twitter: this.article.twitter,
                instagram: this.article.instagram,
                wattpad: this.article.wattpad,
                sweek: this.article.sweek
            }
        },
    },
    methods: {
        getArticle() {
            const url = `${baseApiUrl}/${this.$route.params.slug}`
            axios.get(url)
                .then(res => {
                    this.getImage(res.data.imageId)
                    res.data.publishedAt = toStandardDate(res.data.publishedAt)
                    if (res.data.name.length>50) {
                        document.getElementsByClassName("artpage-title")[0].classList.add("long-title")
                    }
                    this.article = res.data
                    this.$store.state.articleCategory = res.data.category
                    this.$emit('updateHead')
                })
                .then(() => {
                    const artWords = this.article.content.split(' ').length
                    this.readingTime = Math.ceil(artWords/200)
                    this.checkActiveAccordions()
                })
                .catch(() => this.$router.push({name: '404', params: {slug: this.$route.params.slug}}))
        },
        getImage(id) {
            axios.get(`${baseApiUrl}/images/${id}`)
                .then(res => {
                    this.article.image = res.data
                    this.$el.style.setProperty('--bkg-image', `url(${baseImgUrl}/${this.article.image.filename})`)
                })
        },
        checkActiveAccordions() {
            const activeEls = document.getElementsByClassName('accordion active')
            Array.from(activeEls).forEach(el => {
                const panel = el.nextElementSibling;
                panel.style.maxHeight = panel.scrollHeight + "px";
            })
        },
    },
    watch: {
        $route(){
            this.article = {}
            this.readingTime = ''
            this.getArticle()
            this.$store.commit('toggleMenu', false)
        }
    },
    created() {
        this.getArticle()
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
        overflow: hidden;

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
        margin-top: 50px;
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
        align-content: center;
    }

    .article-content :last-child {
        margin-bottom: 0px;
    }

    .article-content hr {
        color: #4c4c4c
    }

    .long-title.artpage-title {
        height: auto;
        padding-top: 40px;
    }

    .comments {
        max-width: 50rem;
        margin: 0px auto;
        padding: 20px 0;
    }


    @media(max-width:450px), (max-width:850px) and (max-height:500px) {

        .artpage-title {
            height: auto;
            padding-top: 40px;
        }

        .artpage-title div {
            margin-bottom: 10vh;
        }

        .artpage-title h1 {       
            font-size: 2.7rem;
        }

        .artpage-title p {
            font-size: 0.8rem;
        }
    }

    .img-align-left {
        float: left;
        margin: 10px 20px 10px 0px;
    }

    .img-align-right {
        float: right;
        margin: 10px 0 10px 20px;
    }

    .img-align-center {
        display: block;
        margin: 10px auto 10px auto;
    }

    #disqus_thread {
        padding-bottom: 40px;
    }

</style>