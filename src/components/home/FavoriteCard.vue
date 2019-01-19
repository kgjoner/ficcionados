<template>
    <div class="favorite-card">
        <div v-if="user" class="admin-artconfig">
            <input type="number" v-model="newStandOut">
            <button @click="updateStandOutArticles">Trocar Artigo</button>
        </div>
        <router-link :to="{ name: 'articleById', params: {slug: article.slug} }" class="art-link">
        <img :src="imgUrl || `../../assets/article.png`" alt="Imagem do artigo">
        <div class="info">
            <h4>{{article.name}}</h4>
            <span class="publish">por <strong>{{article.author}}</strong> em <strong>{{publishingDate}}</strong></span>
            <p>{{article.description}}</p>
        </div>    
        </router-link>
        <div class="info">
            <hr>
            <span class="fav-category">
                <i class="fa fa-folder"></i>
                <router-link :to="`/categorias/${article.categoryId}`"> {{article.category}}</router-link>
            </span>
        </div>
    </div>
</template>

<script>

import { mapState } from 'vuex'
import { baseApiUrl, baseImgUrl, showError, toStandardDate } from '@/global'
import axios from 'axios'

export default {
    name: 'FavoriteCard',
    props: ['article', 'standOutIndex'],
    data: function() {
        return {
            category: '',
            newStandOut: null,
        }
    },
    computed: {
        ...mapState(['user']),
        publishingDate() {
            return toStandardDate(this.article.publishedAt)
        },
        imgUrl() {
            return baseImgUrl + this.article.image.filename.split('.').join('-480w.')
        }
    },
    methods: {
        updateStandOutArticles() {
            const paramsStandOut = {
                key: 'recommended',
                index: this.standOutIndex,
                article: this.newStandOut
            }
            axios.put(`${baseApiUrl}/standoutarticles`, paramsStandOut)
                .then(this.$toasted.global.defaultSuccess())
                .then(window.location.reload())
                .catch(showError)         
        }
    }
}
</script>

<style>

    .favorite-card {
        position: relative;
        background-color: rgb(255, 255, 255, 0.8);
        margin: 10px 10px;
        border-radius: 4px;
        max-width: 350px;
    }

    .favorite-card:hover {
        box-shadow: 0px 8px 20px #d14e4e55
    }

    .favorite-card .art-link {
        text-decoration: none;
    }

    .favorite-card img {
        width: 100%;
    }

    .favorite-card .info {
        padding: 5px 15px 15px;
    }

    .favorite-card h4 {
        font-family: 'Philosopher';
        padding-top: 15px;
        margin: 0px;
        font-weight: 600;
        color: #4c4c4c;
        font-size: 1.4rem;
    }

    .favorite-card .publish {
        font-size: 0.8rem;
        color: #777;
    }

    .favorite-card .publish strong {
        text-transform: uppercase;
        font-size: 0.7rem;
    }

    .favorite-card p {
        padding: 15px 0;
        font-size: 0.9rem;
        line-height: 170%;
        margin-bottom: 0px;
        color: #444;
    }

    .favorite-card hr {
        height: 1px;
        margin: 5px 0;
    }

    .fav-category {
        font-size: 0.8rem;
        color: rgba(0,0,0,0.5);
    }

    .fav-category a {
        text-decoration: none;
        padding-left: 2px;
        color: rgba(0,0,0,0.6);
    }

    .fav-category:hover, .fav-category:hover a {
        color: #d14e4e;
    }

    .admin-artconfig {
        position: absolute;
        bottom: 10px;
        right: 10px;

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
