<template>
    <div class="interview-card">
        <div v-if="false" class="admin-artconfig">
            <input type="number" v-model="newStandOut">
            <button @click="updateStandOutArticles">Trocar Artigo</button>
        </div>
        <router-link :to="{ name: 'articleById', params: {slug: article.slug} }" class="art-link">
            <div v-lazyload="'background'" class="art-image" :data-url="imgUrl">&nbsp;</div>
            <div class="info">
                <p>{{article.description}}</p>
                <hr>
                <div>
                    <h4>{{article.name}}</h4>
                    <span class="publish">em <strong>{{publishingDate}}</strong></span>
                    <button>Leia</button>
                </div> 
            </div>
        </router-link>
        
    </div>
</template>

<script>
import { mapState } from 'vuex'
import { baseApiUrl, baseImgUrl, showError, toStandardDate } from '@/global'
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
            return baseImgUrl + this.article.image.filename.split('.').join('-480w.')
        }
    },
    methods: {
        updateStandOutArticles() {
            const paramsStandOut = {
                key: 'interviews',
                index: this.standOutIndex,
                article: this.newStandOut
            }
            axios.put(`${baseApiUrl}/standoutarticles`, paramsStandOut)
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
        margin: 10px 10px 40px;
        background-color: #fafafa;
        border-top-right-radius: 4px;
        border-bottom-right-radius: 4px;
        max-width: 800px;
        border: solid 1px #ccc;
        z-index: 2;
    }

    .interview-card:hover {
        border-color: #4c4c4c;
    }

    .interview-card a {
        display: flex;
    }

    .interview-card .art-link {
        text-decoration: none;
    }

    .interview-card .art-image {
        position: relative;
        flex-grow: 2;
        min-width: 180px;
        height: 250px;
        background-position: 0% 20%;
        background-repeat: no-repeat;
        background-size: cover;
    }

    .interview-card .info {
        padding: 5px 15px 5px;
        display: flex;
        flex-direction: column;
        position: relative;
    }

    .interview-card h4 {
        font-family: 'Philosopher';
        padding-top: 5px;
        margin: 0px;
        font-weight: 600;
        color: #777;
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
        padding: 15px 0 8px;
        font-size: 1.1rem;
        font-style: italic;
        line-height: 170%;
        margin-bottom: 10px;
        color: #444;
    }

    .interview-card .info button {
        width: 100px;
        border: solid 1px #bbb;
        border-radius: 4px;
        text-transform: uppercase;
        font-size: 0.9rem;
        background-color: #fafafa;
        padding: 5px;
        color: #4c4c4c;
        position: absolute;
        right: 15px;
        bottom: 20px;
        cursor: pointer;
    }

    .interview-card:hover .info button {
        background-color: #4c4c4c;
        border-color: #4c4c4c;
        color: #fafafa;
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
        display: inline-block;
    }

    .interview-category:hover, .interview-category:hover a {
        color: #1d7fd8;
    }

    .admin-artconfig {
        position: absolute;
        bottom: 10px;
        right: 10px;

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

    @media(max-width: 768px) {
        .interview-card a {
            display: flex;
            flex-direction: column;
            max-width: 380px;
        }

        .interview-card .info {
            padding-bottom: 50px;
        }
    }


</style>
