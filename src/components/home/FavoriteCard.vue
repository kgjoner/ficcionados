<template>
    <div class="favorite-card">
        <div v-if="user" class="admin-artconfig">
            <input type="number" v-model="newStandOut">
            <button @click="updateStandOutArticles">Trocar Artigo</button>
        </div>
        <img :src="article.imageUrl || `../../assets/article.png`" alt="Imagem do artigo">
        <h4>{{article.name}}</h4>
        <span class="info">por <strong>{{article.author}}</strong> em <strong>{{article.publishedAt}}</strong></span>
        <p>{{article.description}}</p>
        <router-link :to="`/articles/${article.id}`" class="button">LEIA MAIS</router-link>
        <hr>
        <span class="fav-category">
            <i class="fa fa-folder"></i>
            <router-link :to="`/categories/${category.id}/articles`"> {{category.name}}</router-link>
        </span>
    </div>
</template>

<script>

import { mapState } from 'vuex'
import { baseApiUrl, showError, toStandardDate } from '@/global'
import axios from 'axios'

export default {
    name: 'FavoriteCard',
    props: ['whichArticle', 'standOutIndex'],
    data: function() {
        return {
            article: '',
            category: '',
            newStandOut: null,
        }
    },
    computed: mapState(['user']), 
    methods: {
        getArticle() {
            axios.get(`${baseApiUrl}/articles/${this.whichArticle}`)
                .then(res => {
                    res.data.publishedAt = toStandardDate(res.data.publishedAt)
                    this.article = res.data
                    axios.get(`${baseApiUrl}/categories/${this.article.categoryId}`)
                        .then(res => this.category = res.data)
                })
        },
        updateStandOutArticles() {
            const paramsStandOut = {
                key: 'recommended',
                index: this.standOutIndex,
                article: this.newStandOut
            }
            axios.put(`${baseApiUrl}/standOutArticles`, paramsStandOut)
                .then(this.$toasted.global.defaultSuccess())
                .then(window.location.reload())
                .catch(showError)         
        }
    },
    watch: {
        whichArticle() {
            this.getArticle()
        }
    },
}
</script>

<style>

    .favorite-card {
        position: relative;
        background-color: rgb(255, 255, 255, 0.6);
        margin: 10px 10px;
        border-radius: 4px;
        padding: 6px;
        padding-bottom: 10px;
        max-width: 350px;
        box-shadow: 0px 1px 5px 1px rgba(0,0,0, 0.2)
    }

    .favorite-card img {
        width: 100%;
        border-radius: 4px;
    }

    .favorite-card h4 {
        font-family: 'PT Serif';
        padding-top: 15px;
        padding-left: 10px;
        margin: 0px;
        font-size: 1.5rem;
    }

    .info {
        padding-left: 10px;
        font-size: 0.9rem;
        color: rgba(0,0,0,0.6);
    }

    .favorite-card p {
        padding: 20px 10px 10px 10px;
        font-family: Verdana;
        font-size: 0.8rem;
        line-height: 170%;
    }

    .favorite-card .button {
        height: 40px;
        width: 160px;
        margin-left: 10px;
        margin-bottom: 10px;
        font-size: 15px;
        background-color: #4c4c4c;
        color: #f2f2f2;
        border: none;
        border-radius: 5px;
        box-shadow: 0px 0px 2px 0px #333;

		display: flex;
        justify-content: center;
        align-items: center;
        text-decoration: none;
        outline: 0;

    }

    .favorite-card .button:hover {
        background-color: #d14e4e;
        color: #f2f2f2;
    }

    .favorite-card hr {
        height: 1px;
        margin-bottom: 5px;
    }

    .fav-category {
        padding-left: 10px;
        font-size: 0.7rem;
        color: rgba(0,0,0,0.6);
    }

    .fav-category a {
        text-decoration: none;
        color: rgba(0,0,0,0.6);
    }

    .fav-category a:hover {
        color: #d14e4e;
    }

    .admin-artconfig {
        position: absolute;
        top: 10px;
        left: 10px;

        visibility: hidden;
        opacity: 0;
    }

    .favorite-card:hover .admin-artconfig {
        visibility: visible;
        opacity: 1;
    }

    .admin-artconfig input {
        max-width: 4rem;
    }

    .admin-artconfig button {
        background-color: #1d7fd8;
        color: #fafafa;
        border-color: #1d7fd8;
    }


</style>
