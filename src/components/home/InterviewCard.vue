<template>
    <div class="interview-card">
        <router-link :to="{ name: 'articleById', params: {slug: article.slug} }" class="art-link">
        <div v-if="user" class="admin-artconfig">
            <input type="number" v-model="newStandOut">
            <button @click="updateStandOutArticles">Trocar Artigo</button>
        </div>
        <img :src="imgUrl || `../../assets/article.png`" alt="Imagem do artigo">
        <div class="info">
            <h4>{{article.name}}</h4>
            <span class="publish">em <strong>{{publishingDate}}</strong></span>
            <p>{{article.description}}</p>
        </div>
        </router-link>
        <div class="info">
            <hr>
            <span class="interview-category">
                <i class="fa fa-folder"></i>
                <router-link :to="`/categorias/9`"> Entrevistas</router-link>
            </span>
        </div>
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
            return baseApiUrl + "/" + this.article.image.filename.split('.').join('-480w.')
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
        max-width: 350px;
    }

    .interview-card:hover {
        box-shadow: 0px 8px 20px rgba(0,0,0,0.4)
    }

    .interview-card .art-link {
        text-decoration: none;
    }

    .interview-card img {
        width: 100%;
    }

    .interview-card .info {
        padding: 5px 15px 15px;
    }

    .interview-card h4 {
        font-family: 'Philosopher';
        padding-top: 15px;
        margin: 0px;
        font-weight: 600;
        color: #4c4c4c;
        font-size: 1.4rem;
    }

    .interview-card .publish {
        font-size: 0.8rem;
        color: #777;
    }

    .interview-card .publish strong {
        text-transform: uppercase;
        font-size: 0.7rem;
    }

    .interview-card p {
        padding: 15px 0;
        font-size: 0.9rem;
        line-height: 170%;
        margin-bottom: 0px;
        color: #444;
    }

    .interview-card hr {
        height: 1px;
        margin: 5px 0;
    }

    .interview-category {
        font-size: 0.8rem;
        color: rgba(0,0,0,0.5);
    }

    .interview-category a {
        text-decoration: none;
        padding-left: 2px;
        color: rgba(0,0,0,0.6);
    }

    .interview-category:hover, .interview-category:hover a {
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
