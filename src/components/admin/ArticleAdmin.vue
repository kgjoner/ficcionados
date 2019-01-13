<template>
    <div class="article-admin">
        <b-form>
            <input id="article-id" type="hidden" v-model="article.id" />
            <b-row>
                <b-col md="7" sm="12">
                    <b-form-group label="Título:" label-for="article-name">
                        <b-form-input id="article-name" type="text" class="mb-3"
                            v-model="article.name" required
                            :readonly="mode === 'remove'"
                            placeholder="Informe o título do artigo" />
                    </b-form-group>
                </b-col>
                <b-col md="5" sm="12">
                    <b-form-group label="Autor:" label-for="article-author">
                        <b-form-select id="article-author" v-model="article.userId" class="mb-3"
                            :disabled="mode === 'remove'">
                            <option v-for="u in adminUsers" :value="u.id" :key="u.id">{{u.name}}</option>
                        </b-form-select>
                    </b-form-group>
                </b-col>
            </b-row>
            <b-row>
                <b-col md="7" sm="12">
                    <b-form-group label="Descrição:" label-for="article-description">
                        <b-form-input id="article-description" type="text" class="mb-3"
                            v-model="article.description" required
                            :readonly="mode === 'remove'"
                            placeholder="Informe a descrição do artigo" />
                    </b-form-group>
                </b-col>
                <b-col md="5" sm="12">
                    <b-form-group label="Categoria:" label-for="article-category">
                        <b-form-select id="article-category" v-model="article.categoryId" class="mb-3"
                            :disabled="mode === 'remove'">
                            <option v-for="c in categories" :value="c.id" :key="c.id">{{c.path}}</option>
                        </b-form-select>
                    </b-form-group>
                </b-col>
            </b-row>
            <b-row>
                <b-col md="5" sm="12">
                    <b-form-group label="Imagem:" label-for="article-imageUrl">
                        <b-form-input id="article-imageUrl" type="text" 
                            v-model="article.imageUrl" required
                            :readonly="mode === 'remove'"
                            placeholder="Informe a url da imagem" />
                        <div id='article-image-div'>
                            <img id='article-image' :src="article.imageUrl" alt="">   
                        </div>
                    </b-form-group>
                </b-col>
                <b-col md="2" sm="12">
                </b-col>
                <b-col md="5" sm="12">
                    <b-form-group label="Data de publicação:" label-for="article-publishing-date">
                        <b-form-input id="article-publishing-date" type="date" class="mb-3"
                            v-model="article.publishedAt"
                            :readonly="mode === 'remove' || mode === 'save'" />
                    </b-form-group>
                    <b-form-group label="Ordem:" label-for="article-order">
                        <b-form-input id="article-order" type="number" class="mb-3"
                            v-model="article.order"
                            :readonly="mode === 'remove'" />
                    </b-form-group>
                </b-col>
            </b-row>
            <b-row>
                <b-col v-show="mode !== 'remove'">
                    <input type="checkbox" v-model="htmlEditor">
                    <b-form-group label="Conteúdo:" label-for="article-content">
                        <VueEditor v-if="!htmlEditor" id="article-content" v-model="article.content" class="mb-4"></VueEditor>
                        <textarea v-else id="text" v-model="article.content"/>
                    </b-form-group>
                </b-col>
            </b-row>
            <b-row>
                <b-col>
                    <b-button variant="primary" v-if="mode === 'create'"
                        @click="save">Criar</b-button>
                    <b-button variant="primary" v-if="mode === 'save'"
                        @click="save">Atualizar</b-button>
                    <b-button variant="danger" v-if="mode === 'remove'"
                        @click="remove">Excluir</b-button>
                    <b-button class="ml-2" @click="reset">Cancelar</b-button>
                </b-col>
            </b-row>    
        </b-form>
        <hr>
        <b-pagination size="md" :total-rows="count" v-model="currentPage" :per-page="limit">
        </b-pagination>
        <b-table hover striped :items="articles" :fields="fields">
            <template slot="actions" slot-scope="data">
                <b-button variant="warning" @click="loadArticle(data.item, 'save')" class="mr-2">
                    <i class="fa fa-pencil"></i>
                </b-button>
                <b-button variant="danger" @click="loadArticle(data.item, 'remove')" class="mr-2">
                    <i class="fa fa-trash"></i>
                </b-button>
            </template>
        </b-table>
    </div>
</template>

<script>

//acrescentar Data, Ordem, Destaque

import { VueEditor } from 'vue2-editor'
import { baseApiUrl, showError } from '@/global'
import axios from 'axios'

export default {
    name: 'ArticleAdmin',
    components: { VueEditor },
    data: function() {
        return {
            mode: 'create',
            articles: [],
            categories: [],
            adminUsers: [],
            article: {},
            currentPage: 1,
            count: 0,
            limit: 0,
            fields: [
                {key: 'id', label: 'Código', sortable: true},
                {key: 'name', label: 'Título', sortable: true},
                {key: 'author', label: 'Autor', sortable: true},
                {key: 'publishedAt', label: 'Data', sortable: true},
                {key: 'actions', label: 'Ações'}
            ],
            htmlEditor: false,
        }
    },
    methods: {
        loadArticles() {
            axios.get(`${baseApiUrl}/articles?page=${this.currentPage}&order=publishedAt`)
                .then(res => {
                    this.articles = res.data.data
                    this.articles.forEach(a => a.publishedAt = a.publishedAt.split('T')[0].split('-').reverse().join('/'))
                    this.count = res.data.count
                    this.limit = res.data.limit
                })
        },
        loadDb() {
            axios.get(`${baseApiUrl}/users`)
                .then(res => this.adminUsers = res.data.filter(u => u.admin))
            axios.get(`${baseApiUrl}/categories`)
                .then(res => this.categories = res.data)
        },
        loadArticle(article, mode) {
            this.mode = mode
            axios.get(`${baseApiUrl}/articles/${article.id}`)
                .then(res => {
                    let tabs = res.data.content.split('<div class="tab">')
                    if(tabs.length>1){
                        tabs = tabs.map(tab => {
                            if(!tab.match('tablinks')) return tab
                            return this.transpileContent(tab)
                        })
                        res.data.content = tabs.join('')
                    }
                    this.article = res.data
                    this.article.publishedAt = this.article.publishedAt.split('T')[0]
                })
        },
        transpileContent(content) {
            let toBeTranspiled = content.split('</div>')
            const result = toBeTranspiled.map(tab => {
                const title = tab.match(/(id=")(.+)(?=" class)/i)
                if(!title && tab.match('tablinks')) return `[[tabs]]</p>`
                if(!title) return '[[/tabs]]'+tab
                const open = tab.match('active') ? ' open' : ''
                const tabContent = tab.match(/(>)(((.?)+\r?\n?)+)(?=<)/)[2]
                return `[[tab title="${title[2]}"${open}]]${tabContent}[[/tab]]`
            })
            return result.join('')
        },
        reset() {
            this.mode = 'create'
            this.article = {}
            this.loadArticles()
        },
        save() {
            this.article.editedAt = new Date()
            if(!this.article.publishedAt) this.article.publishedAt = this.article.editedAt
            if(!this.article.order) this.article.order = 100
            const method = this.article.id ? 'put' : 'post'
            const id = this.article.id ? `/${this.article.id}` : ''
            axios[method](`${baseApiUrl}/articles${id}`, this.article)
                .then(() => {
                    this.$toasted.global.defaultSuccess()
                    this.reset()
                })
                .catch(showError)
        },
        remove() {
            const id = this.article.id
            axios.delete(`${baseApiUrl}/articles/${id}`)
                .then(() => {
                    this.$toasted.global.defaultSuccess()
                    this.reset()
                })
                .catch(showError)
        },
    },
    watch: {
        currentPage() {
            this.loadArticles()
        }
    },
    mounted() {
        this.loadArticles()
        this.loadDb()
    }
}
</script>

<style>

    #article-image-div {
        min-height: 100px;
        margin: 20px 0px;
        border-radius: 5px;
        border: solid 2px rgba(0, 0, 0, 0.15);
    }

    #article-image {
        width: 100%;
        border-radius: 5px;
    }

    .article-admin tbody [aria-colindex="4"], tbody [aria-colindex="3"] {
        font-size: 0.9em;
    }

    .article-admin tbody [aria-colindex="2"] {
        font-style: italic;
        letter-spacing: 0.4px;
        width: auto;
        flex-basis: 0;

    }

    /* tbody tr:hover {
        background-color: #1d7fd840 !important;
    } */

    textarea {
        min-height: 200px;
        width: 100%;
        white-space:pre-wrap;
    }

</style>
