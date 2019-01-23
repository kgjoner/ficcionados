<template>
    <div class="related-articles">
        <h4>Artigos Relacionados</h4>
        <hr>
        <ul>
            <li v-for="article in articles" :key="article.id">
                <router-link :to="`/artigo/${article.slug}`">
                    <div class="proper-link">
                    <span>{{article.name}}</span>
                    </div>
                </router-link>
            </li>
        </ul>
    </div>
</template>

<script>

import { baseApiUrl } from '@/global'
import axios from 'axios'

export default {
    name: 'RelatedArticles',
    props: ['parentId', 'currentArticle'],
    data: function() {
        return {
            articles: [],
        }
    },
    methods: {
        getArticles() {
            const url = `${baseApiUrl}/categories/${this.parentId}/articles?page=${this.currentArticle}&order=random`
            axios(url).then(res => {
                this.articles = this.articles.concat(res.data)
            })
        }
    },
    mounted() {
        this.getArticles()
    }
}
</script>

<style>

    .related-articles {
        padding: 0 20px 50px 20px;
        margin-bottom: 0;
    }

    .related-articles > h4 {
        color: #4c4c4c;
        font-family: "Philosopher"
    }

    .related-articles > hr {
        margin-top: 8px;
    }

    .related-articles span:before {
        font-family: 'custicons';
        content: 'q';
        font-size: 0.8em;
        margin-right: 8px;
        color: #1d7fd8;
    }

    .related-articles a {
        text-decoration: none;
    }

    .related-articles ul {
        padding-left: 0;
        list-style-type: none;
    }

    .related-articles .proper-link {
        padding: 12px 0 12px 15px;
        margin: 5px 10px 5px 10px;
        color: #5c5c5c;
    }

    .related-articles .proper-link:hover {
        background-color: rgba(0,0,0,0.035);
        /* color: #1d7fd8; */
        border-radius: 4px;
    }

    .related-articles .proper-link span {
        margin-bottom: 5px;
        font-size: 1.3rem;
        border-bottom: solid 1px #1d7fd8aa;
    }

</style>
