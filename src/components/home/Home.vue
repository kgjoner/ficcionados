<template>
    <div class="home">
        <Cover />
        <Directives />
        <div class="favorite-articles">
            <div class="art-title">
                <img src="@/assets/badge-heart.png" alt="Ícone de coração" height="70px">
                <div>
                    <h2>ARTIGOS RECOMENDADOS</h2>
                    <hr>
                </div>
            </div>
            <div class="fav-card-list">
                <FavoriteCard :whichArticle="standOutArticles.recommended[0]" standOutIndex="0"/>
                <FavoriteCard :whichArticle="standOutArticles.recommended[1]" standOutIndex="1"/>
                <FavoriteCard :whichArticle="standOutArticles.recommended[2]" standOutIndex="2"/>
            </div>
        </div>

        <div class="interviews">
            <div class="art-title">
                <img src="@/assets/badge-magnifier.png" alt="Ícone de lupa" height="70px">
                <div>
                    <h2>ENTREVISTAS</h2>
                    <hr>
                </div>
            </div>
            <div class="fav-card-list">
                <InterviewCard :whichArticle="standOutArticles.interviews[0]" standOutIndex="0"/>
                <InterviewCard :whichArticle="standOutArticles.interviews[1]" standOutIndex="1"/>
                <InterviewCard :whichArticle="standOutArticles.interviews[2]" standOutIndex="2"/>
            </div>
        </div>

        <div class="recent-art">
            <div class="art-title">
                <img src="@/assets/badge-magnifier.png" alt="Ícone de lupa" height="70px">
                <div>
                    <h2>ARTIGOS RECENTES</h2>
                    <hr>
                </div>
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
    </div>
</template>

<script>

import Cover from './Cover'
import Directives from './Directives'
import FavoriteCard from './FavoriteCard'
import InterviewCard from './InterviewCard'
import ArticleCard from '../article/ArticleCard'
import { baseApiUrl } from '@/global'
import axios from 'axios'

export default {
    name: 'Home',
    components: { Cover, Directives, FavoriteCard, InterviewCard, ArticleCard },
    data: function() {
        return {
            standOutArticles: {
                recommended: [],
                interviews: [],
            },
            articles:[],
            page: 1,
            loadMore: true,
        }
    },
    methods: {
        getStandOutArticles() {
            axios.get(`${baseApiUrl}/standOutArticles`)
                .then(res => this.standOutArticles = res.data)
        },
        getArticles() {
            const url = `${baseApiUrl}/articles?page=${this.page}&order=publishedAt`
            axios(url).then(res => {
                this.articles = this.articles.concat(res.data.data)
                this.page++

                if (res.data.length === 0) this.loadMore = false
            })
        }
    },
    created() {
        //this.$store.commit('toggleMenu', false)
        this.getStandOutArticles()
        this.getArticles()
    }
}
</script>

<style>

    .favorite-articles {
        background-color: rgba(182, 150, 150, 0.2);
        padding: 50px 50px;
    }

    .art-title {
        display: flex;
        align-items: center;
        padding-left: 20px;
        margin-bottom: 30px;
    }

    .art-title div {
        vertical-align: top;
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        padding-left: 15px;
    }

    .art-title h2 {
        flex: 1;
        margin-top: 20px;
        font-family: 'Kaushan Script';
        color: rgba(50,50,50,0.8);
    }

    .art-title hr {
        width: 250px;
        margin-top: 0;
        height: 1px;
        border: none;
        background: linear-gradient(to right, rgba(50,50,50,0), rgba(50,50,50, 0.6),
            rgba(50,50,50, 0.6), rgba(50,50,50, 0.6), rgba(50,50,50,0));
    }

    .fav-card-list {
        display: flex;
        justify-content: center;
        align-items: stretch;
    }

    .interviews {
        background-image: url('../../assets/blankcover.png');
        background-size: cover;
        background-position: center bottom;
        padding: 50px 50px;
    }

    .interviews .art-title h2 {
        color: #f2f2f2;
    }

    .interviews .art-title hr {
        width: 150px;
        background: linear-gradient(to right, rgba(250,250,250,0.4), rgba(250,250,250, 0.8),
            rgba(250,250,250, 0.8), rgba(250,250,250, 0.8), rgba(250,250,250,0.4));
    }

    .recent-art {
        padding: 50px;
    }

    .recent-art ul  {
        padding-top: 5px;
        max-width: 60rem;
        margin-left: auto;
        margin-right: auto;
        list-style-type: none;
    }

    .recent-art .load-more {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin: 25px 0px;
    }


    @media (max-width: 1000px) {
        .favorite-articles, .interviews, .recent-art {
            padding: 50px 20px;
        }

        .fav-card-list {
            flex-wrap:wrap;
        }
    }

    @media (max-width: 400px) {
        .art-title {
            padding-left: 0;
        }

        .art-title div {
            padding-left: 10px;
        }

        .interviews {
            padding: 50px 20px;
        }
    }


</style>
