<template>
    <div class="interview-card">
        <div v-if="user" class="admin-artconfig">
            <input type="number" v-model="newStandOut">
            <button @click="updateStandOutArticles">Trocar Artigo</button>
        </div>
        <img :src="imgUrl || `../../assets/article.png`" alt="Imagem do artigo">
        <h4>{{article.name}}</h4>
        <span class="info">em <strong>{{publishingDate}}</strong></span>
        <p>{{article.description}}</p>
        <router-link :to="{ name: 'articleById', params: {slug: article.slug} }" class="button">LEIA MAIS</router-link>
        <hr>
        <span class="interview-category">
            <i class="fa fa-folder"></i>
            <router-link :to="`/categorias/9`"> Entrevistas</router-link>
        </span>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import { baseApiUrl, showError, toStandardDate } from '@/global'
import axios from 'axios'

export default {
    name: 'InterviewCard',
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
            return baseApiUrl + "/" + this.article.image.filename
        }
    },
    methods: {
        updateStandOutArticles() {
            const paramsStandOut = {
                key: 'interviews',
                index: this.standOutIndex,
                article: this.newStandOut
            }
            axios.put(`${baseApiUrl}/standOutArticles`, paramsStandOut)
                .then(() => this.$toasted.global.defaultSuccess())
                .then(window.location.reload())
                .catch(showError)         
        }
    },
}
</script>

<style>

    .interview-card {
        position: relative;
        background-color: rgb(242, 242, 242, 1);
        margin: 10px 10px;
        border-radius: 4px;
        padding: 6px;
        padding-bottom: 10px;
        max-width: 350px;
        box-shadow: 0px 1px 5px 1px rgba(0,0,0, 0.2)
    }

    .interview-card img {
        width: 100%;
        border-radius: 4px;
    }

    .interview-card h4 {
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

    .interview-card p {
        padding: 20px 10px 10px 10px;
        font-family: Verdana;
        font-size: 0.8rem;
        line-height: 170%;
    }

    .interview-card .button {
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

    .interview-card .button:hover {
        background-color: #1d7fd8;
        color: #f2f2f2;
    }

    .interview-card hr {
        height: 1px;
        margin-bottom: 5px;
    }

    .interview-category {
        padding-left: 10px;
        font-size: 0.7rem;
        color: rgba(0,0,0,0.6);
    }

    .interview-category a {
        text-decoration: none;
        color: rgba(0,0,0,0.6);
    }

    .interview-category a:hover {
        color: #1d7fd8;
    }

    .admin-artconfig {
        position: absolute;
        top: 10px;
        left: 10px;

        visibility: hidden;
        opacity: 0;
    }

    .interview-card:hover .admin-artconfig {
        visibility: visible;
        opacity: 1;
    }

    .admin-artconfig input {
        max-width: 4rem;
    }

    .admin-artconfig button {
        background-color: #1d7fd8;
        color: #fafafa;
    }


</style>
