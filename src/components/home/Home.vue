<template>
    <div class="home">
        <Cover />
        <Directives />
        <div class="favorite-articles">
            <div class="art-title">
                <img src="@/assets/badge-heart.svg" alt="Ícone de coração" height="70px">
                <div>
                    <h2>Artigos Recomendados</h2>
                    <hr>
                </div>
            </div>
            <div v-if="didGetImg" class="fav-card-list">
                <div v-for="(article, i) in favArticles" :key="article.slug">
                    <FavoriteCard :article="article" :standOutIndex="i"/>
                </div>
            </div>
        </div>

        <HomeBanner />

        <div class="interviews">
            <div class="art-title">
                <img src="@/assets/badge-magnifier.svg" alt="Ícone de lupa" height="70px">
                <div>
                    <h2>Entrevistas</h2>
                    <hr>
                </div>
            </div>
            <div v-if="didGetImg" class="interview-card-list">
                <div v-for="(interview, i) in interviewArticles" :key="interview.slug">
                    <InterviewCard :slot="`${i}`" :article="interview" :standOutIndex="i"/>
                </div>
            </div>
        </div>

        <div class="recent-art">
            <div class="art-title">
                <img src="@/assets/badge-sword.svg" alt="Ícone de lupa" height="70px">
                <div>
                    <h2>Artigos Recentes</h2>
                    <hr>
                </div>
            </div>
            <ul>
                <li v-for="rarticle in recentArticles" :key="rarticle.id">
                    <ArticleCard :article="rarticle" :didGetImg="didGetImg2" />
                </li>
            </ul>
            <div class="load-more">
                <button v-if="loadMore"
                    class="btn btn-lg btn-outline-primary"
                    @click="getRecentArticles">Mais</button>
                <img v-show="loading" class="loading-art" src="@/assets/loading2.gif">
            </div>
        </div>
    </div>
</template>

<script>

import { baseApiUrl } from '@/global'
import axios from 'axios'

import Cover from './Cover'
import Directives from './Directives'
import FavoriteCard from './FavoriteCard'
import InterviewCard from './InterviewCard'
import HomeBanner from './HomeBanner'
import ArticleCard from '../article/ArticleCard'

export default {
    name: 'Home',
    components: { Cover, Directives, FavoriteCard, InterviewCard, HomeBanner, ArticleCard },
    head: {
        title: {
            inner: "Ficcionados",
            separator: "»",
            complement: "Trazendo a ficção para a realidade"
        },
        meta: [
            {name: "description", content: `Coloque suas histórias no papel sem medo. Aqui você encontra dicas
            de escrita, roteiro e publicação e conversas com a galera do nicho literário nacional. o/ `}
        ]
    },
    data: function() {
        return {
            standOutArticlesIds: {
                recommended: [],
                interviews: [],
            },
            standOutArticles: [],
            recentArticles:[],
            page: 1,
            loadMore: true,
            imgQuery: false,
            imgQuery2: false,
            loading: false
        }
    },
    computed: {
        favArticles() {
            const filtered = this.standOutArticles.filter(a => {
                return this.standOutArticlesIds.recommended.includes(a.id)
            })
            return filtered.sort((a,b) => {
                this.standOutArticlesIds.recommended.indexOf(a.id) - this.standOutArticlesIds.recommended.indexOf(b.id)
            })
        },
        interviewArticles() {
            const filtered = this.standOutArticles.filter(a => {
                return this.standOutArticlesIds.interviews.includes(a.id)
            })
            return filtered.sort((a,b) => {
                this.standOutArticlesIds.interviews.indexOf(a.id) - this.standOutArticlesIds.interviews.indexOf(b.id)
            })
        },
        didGetImg() {
            return this.imgQuery
        },
        didGetImg2() {
            return this.imgQuery2
        }
    },
    methods: {
        getStandOutArticlesIds() {
            axios.get(`${baseApiUrl}/standOutArticles`)
                .then(res => {
                    this.standOutArticlesIds = res.data
                    this.getStandOutArticles()
                })
        },
        getStandOutArticles() {
            let favIds = [...this.standOutArticlesIds.recommended, ...this.standOutArticlesIds.interviews]
            axios.get(`${baseApiUrl}/favarticles?articles=[${favIds}]`)
                .then(res => {
                    res.data.sort((a,b) => {
                        return favIds.indexOf(a.id) - favIds.indexOf(b.id)
                    })
                    this.standOutArticles = res.data
                    const imageIds = this.standOutArticles.map(a => a.imageId)
                    this.getImages(imageIds, 'standOut')
                })
                .then(this.getRecentArticles())
        },
        getRecentArticles() {
            this.loading = true
            this.imgQuery2 = false
            const url = `${baseApiUrl}/articles?page=${this.page}&order=publishedAt`
            axios(url).then(res => {
                this.recentArticles = this.recentArticles.concat(res.data.data)
                const imageIds = this.recentArticles.map(a => a.imageId)
                this.getImages(imageIds)
                this.page++
                this.loading = false
                if (res.data.data.length < 10) this.loadMore = false
            })
        },
        getImages(ids, set) {
            const url = `${baseApiUrl}/cardimages?ids=${ids}`
            axios.get(url)
                .then(res => {
                    res.data.sort((a,b) => {
                        return ids.indexOf(a._id) - ids.indexOf(b._id)
                    })
                    if(set==="standOut") {
                        this.standOutArticles.forEach((a, i) => a.image = res.data[i] )
                        this.imgQuery = true
                    } else {
                        this.recentArticles.forEach((a, i) => a.image = res.data[i] )
                        this.imgQuery2 = true
                    }
                })
        }
    },
    created() {
        //this.$store.commit('toggleMenu', false)
        this.getStandOutArticlesIds()
    }
}
</script>

<style>

    .favorite-articles {
        background-color: #fdfdfd;
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
        font-size: 2.4rem;
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
        flex-wrap: wrap;
    }

    .interview-card-list {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    [slot="1"] {
        border-top-right-radius: 0;
        border-bottom-right-radius: 0;
        border-top-left-radius: 4px;
        border-bottom-left-radius: 4px;
    }

    [slot='1'] a {
        flex-direction: row-reverse;
    }

    .interviews {
        /* background-image: url('../../assets/blankcover.jpg'); */
        padding: 50px 50px;
        position: relative;
        overflow: hidden;
    }

    .interviews:before {
        content: " ";
        position: absolute;
        top: -15vw;
        left: -15vw;
        transform: rotate(-10deg);
        width: 150vw;
        height: 400px;
        background-color: #1d7fd8;
    }

    .interviews:after {
        content: " ";
        position: absolute;
        bottom: -15vw;
        right: -4vw;
        transform: rotate(10deg);
        width: 150vw;
        height: 400px;
        background-color: #1d7fd8;
    }

    .interviews .art-title img {
        z-index: 2;
    }

    .interviews .art-title h2 {
        color: #f2f2f2;
        z-index: 2;
    }

    .interviews .art-title hr {
        width: 150px;
        z-index: 2;
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

         img[height] {
             height: 60px;
         }

         .art-title h2 {
             font-size: 2.2rem;
         }

         .art-title hr {
             width: 200px;
         }

         .favorite-articles, .interviews, .recent-art {
            padding: 50px 10px;
        }
     }


</style>