<template>
    <div class="article-card">
        <router-link :to="{ name: 'articleById', params: {slug: article.slug} }">
            <div v-if="didGetImg || haveAlreadyGottenImg" class="article-img">
                <img v-lazyload :data-url="imgUrl" src="@/assets/loading2.gif" :alt="article.image.alt" :title="article.image.title">
                <!-- <img v-else src="../../assets/article.png" alt=""> -->
            </div>
            <div v-else class="article-img"></div>
            <div class="article-prev">
                <h4><strong>{{article.name}}</strong></h4>
                <p>{{article.description}}</p>
                <span class="author">por <strong>{{article.author}} </strong>
                    em <strong>{{publishingDate}}</strong></span>
                <button>Leia</button>
            </div>
        </router-link>
    </div>
</template>

<script>

import { toStandardDate, baseImgUrl } from '@/global'

export default {
    name: 'ArticleCard',
    props: ['article', 'didGetImg'],
    data: function () {
        return {
            haveAlreadyGottenImg: false
        }
    },
    computed: {
        publishingDate() {
            return toStandardDate(this.article.publishedAt)
        },
        imgUrl() {
            return `${baseImgUrl}/${this.article.image.filename.split('.').join('-240w.')}`
        }
    },
    watch: {
        didGetImg() {
            if(this.didGetImg) {
                this.haveAlreadyGottenImg = true
            }
        }
    }
}

</script>

<style>

    .article-card {
        padding: 0 20px 20px 20px;
        margin-bottom: 20px;
        background-color: #fff;
        border-radius: 8px;
        border: solid 1px rgba(0,0,0,0.2);
        box-shadow: 0px 1px 5px rgba(0,0,0,0.15);
    }

    .article-card:hover {
        border-color: #1d7fd8;
    }

    .article-card a {
        display: flex;
        align-items: flex-start;
        justify-content: center;
        flex-wrap: wrap;
        text-decoration: none;
        color: #000;
    }

    .article-img {
        height: 150px;
        min-width: 220px;
        padding-right: 20px;
        margin-top: 20px;
        align-self: center;
    }

    .article-img img {
        height: 100%;
        border-radius: 5px;
    }

    .article-prev {
        flex: 1;
        min-width: 240px;
        padding-left: 20px;
        margin-top: 20px;
        border-left: solid 1px rgba(0,0,0,0.2);

        display: flex;
        flex-direction: column;
        align-self: stretch;
        justify-content: flex-end;
        position: relative;
    }

    .article-prev p {
        flex: 5;
        color: #555;
    }

    .article-prev h4 strong {
        font-family: 'PT Serif';
        color: #444;
        font-weight: 500;
        font-size: 1.1em;
    }

    .article-prev .author {
        font-size: 0.8rem;
        margin-top: 10px;
    }

    .article-prev .author strong {
        text-transform: uppercase;
        padding: 0px 5px;
    }

    .article-prev button {
        width: 100px;
        border: solid 1px #bbb;
        border-radius: 4px;
        text-transform: uppercase;
        font-size: 0.9rem;
        background-color: #fff;
        padding: 5px;
        color: #4c4c4c;
        position: absolute;
        right: 15px;
        /* bottom: 10px; */
        cursor: pointer;
    }

    .article-card:hover button {
        background-color: #1d7fd8;
        border-color: #1d7fd8;
        color: #fafafa;
    }

    

</style>
