<template>
    <div class="article-admin">
        <b-form>
            <input id="article-id" type="hidden" v-model="article.id" />
            <b-row>
                <b-col md="6" sm="12">
                    <b-form-group label="Título:" label-for="article-name">
                        <b-form-input id="article-name" type="text" class="mb-3"
                            v-model="article.name" required
                            :readonly="mode === 'remove'"
                            placeholder="Informe o título do artigo" />
                    </b-form-group>
                    <b-form-group label="Slug:" label-for="article-slug">
                        <b-form-input id="article-slug" type="text" class="mb-3"
                            v-model="article.slug" required :formatter="formatSlug"
                            :readonly="mode === 'remove'" lazy-formatter
                            placeholder="Informe o slug do artigo" />
                    </b-form-group>
                    <a class="preview" v-show="article.id" :href="`/admin/previa?id=${article.id}`" target="_blank">Prévia</a>
                    <b-form-group label="Autor:" label-for="article-author" :class="{'mt-5': !article.id, 'mt-4': article.id}">
                        <b-form-select id="article-author" v-model="article.userId" class="mb-3"
                            :disabled="mode === 'remove'">
                            <option v-for="u in adminUsers" :value="u.id" :key="u.id">{{u.name}}</option>
                        </b-form-select>
                    </b-form-group>
                    <b-form-group label="Categoria:" label-for="article-category">
                        <b-form-select id="article-category" v-model="article.categoryId" class="mb-3"
                            :disabled="mode === 'remove'">
                            <option v-for="c in categories" :value="c.id" :key="c.id">{{c.path}}</option>
                        </b-form-select>
                    </b-form-group>
                    <b-form-group label="Descrição:" label-for="article-description">
                        <b-form-textarea id="article-description"
                            v-model="article.description" required
                            :readonly="mode === 'remove'"
                            placeholder="Informe a descrição do artigo" />
                        <p class="mb-3 text-right">{{article.description? article.description.length : '0'}}/120</p>
                    </b-form-group>
                </b-col>
                <b-col md='1' sm='12'></b-col>
                <b-col md="5" sm="12">
                     <b-form-group label="Data de publicação:" label-for="article-publishing-date">
                        <b-form-input id="article-publishing-date" type="date" class="mb-3"
                            v-model="article.publishedAt"
                            :readonly="mode === 'remove'" />
                    </b-form-group>
                    <b-form-group label="Ordem:" label-for="article-order">
                        <b-input-group :prepend="`${categoryOrder}`">
                        <b-form-input id="article-order" type="number" class="mb-5"
                            v-model="article.order" placeholder="Informe a ordem didática"
                            :readonly="mode === 'remove'" />
                         </b-input-group>
                    </b-form-group>
                    <b-form-group label="Imagem:" label-for="article-imageId">
                        <model-select id="article-imageId" :options="imgSelectOptions" v-model="article.imageId"
                            class="mb-3" :disabled="mode === 'remove'" required placeholder="Selecione uma Imagem"/>
                        <div id='article-image-div'>
                            <img id='article-image' :src="imgUrl" alt="">   
                        </div>
                    </b-form-group>
                </b-col>
            </b-row>
            <b-row>
                <b-col v-show="mode !== 'remove'">
                    <b-form-group label="Conteúdo:" label-for="article-content">
                        <VueEditor id="article-content" v-model="article.content" class="mb-4"
                            ref='editor'></VueEditor>
                    </b-form-group>
                </b-col>
            </b-row>
            <b-row>
                <b-col class="submit">
                    <b-button variant="primary" v-if="mode === 'create'"
                        @click="save">Criar</b-button>
                    <b-button variant="primary" v-if="mode === 'save'"
                        @click="save">Atualizar</b-button>
                    <b-button variant="danger" v-if="mode === 'remove'"
                        @click="remove">Excluir</b-button>
                    <b-button class="ml-2" @click="reset">Cancelar</b-button>
                    <img v-if="loading" src="@/assets/loading2.gif" alt="">
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

import { VueEditor } from 'vue2-editor'
import { ModelSelect } from 'vue-search-select'
import { baseApiUrl, baseImgUrl, showError } from '@/global'
import axios from 'axios'

export default {
    name: 'ArticleAdmin',
    components: { VueEditor, ModelSelect },
    data: function() {
        return {
            mode: 'create',
            articles: [],
            categories: [],
            adminUsers: [],
            images: [],
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
            loading: false,
        }
    },
    computed: {
        imgSelectOptions() {
            return this.images.map(img => {
                return { value: img._id, text: img.filename }
            })
        },
        imgUrl() {
            const choosenImg = this.images.filter(img => img._id === this.article.imageId)[0]
            if(!choosenImg) return ''
            return (baseImgUrl + choosenImg.filename)
        },
        categoryOrder() {
            const category = this.categories.filter(c => c.id == this.article.categoryId)[0]
            return category? category.order : '-'
        }
    },
    methods: {
        loadArticles() {
            axios.get(`${baseApiUrl}/articles?page=${this.currentPage}&order=publishedAt&scheduled=1`)
                .then(res => {
                    this.articles = res.data.data
                    const now = new Date()
                    this.articles.forEach(a => {
                        const publishingDate = new Date(a.publishedAt)
                        if (publishingDate.getTime() > now.getTime()) a.publishedAt = '& [Agendado]-' + a.publishedAt
                        a.publishedAt = a.publishedAt.split('T')[0].split('-').reverse().join('/').split('/&')
                    })
                    this.count = res.data.count
                    this.limit = res.data.limit
                })
        },
        loadDb() {
            axios.get(`${baseApiUrl}/users`)
                .then(res => this.adminUsers = res.data.filter(u => u.admin))
            axios.get(`${baseApiUrl}/categories`)
                .then(res => this.categories = res.data)
            axios.get(`${baseApiUrl}/images`)
                .then(res => this.images = res.data)
        },
        loadArticle(article, mode) {
            this.mode = mode
            axios.get(`${baseApiUrl}/articles/${article.id}`)
                .then(res => {
                    res.data.content = this.transpileContent(res.data.content)
                    res.data.order = res.data.order.toString().split('').slice(3).join('')
                    this.article = res.data
                    this.article.publishedAt = this.article.publishedAt.split('T')[0]
                    scroll(0,260)
                })
        },
        transpileContent(content) {
            function revertTabs (content) {
                let toBeTranspiled = content.split('</div>')
                const result = toBeTranspiled.map(tab => {
                    const title = tab.match(/(id="\d-)(.+)(?=" class)/i) || tab.match(/(id=")(.+)(?=" class)/i)
                    if(!title && tab.match('tablinks')) return `[[tabs]]`
                    if(!title) return '[[/tabs]]' + tab
                    const open = tab.match('active') ? ' open' : ''
                    const tabContent = tab.match(/(p>)(((.?)+\r?\n?)+)(?=<)/)[2]
                    return `[[tab title="${title[2]}"${open}]]${tabContent}[[/tab]]`
                })
                return result.join('')
            }

            function revertAccordion (content) {
                const toBeTranspiled = content.split('</div></div>')[0]
                const rest = content.split('</div></div>')[1]

                const title = toBeTranspiled.split(/<\/button>(\s+)<div class="accordion-panel">/)[0]
                const panel = toBeTranspiled.split(/<\/button>(\s+)<div class="accordion-panel">/)[2]

                const result = `[[accordion title="${title}"]]${panel}[[/accordion]]`
                return result + rest
            }

            function revertImg (content) {
                try {
                    const url = content.match(/(src="https:\/\/)(((?!").)+)(\/)(((?!").)+)(")/i)[5]
                    const align = content.match(/(img-align-)(((?!\s).)+)(")/i)[2]
                    const size = content.match(/(max-width:)(((?!\s).)+)(;")/i)[2]
                    
                    const result = `[[img src="${url}" align="${align}" size="${size}"/]]`
                    const rest = content.split(/class="img-align-(((?!>).)+)(>)/)[4]
                    return result + rest
                } catch(e) {
                    return "<img" + content
                }
            }

            function pipeTabs (content) {
                let tabs = content.split('<div class="tab">')
                if(tabs.length>1){
                    tabs = tabs.map(tab => {
                        if(!tab.match('tablinks')) return tab
                        return revertTabs(tab)
                    })
                    content = tabs.join('')
                }
                return content
            }

            function pipeAccordion (content) {
                let accordions = content.split(/<div><button class="accordion((?!>).)+>/i)
                if(accordions.length>1){
                    accordions = accordions.map(accordion => {
                        if(!accordion.match('accordion-panel')) return accordion
                        return revertAccordion(accordion)
                    })
                    content = accordions.join('')
                }
                return content
            }

            function pipeImgs (content) {
                let imgs = content.split('<img')
                if(imgs.length>1){
                    imgs = imgs.map(img => {
                        if(!img.match('src')) return img
                        return revertImg(img)
                    })
                    content = imgs.join('')
                }
                return content
            }

            content = pipeTabs(pipeAccordion(pipeImgs(content)))
            content = content.split("\"[[accordion").join("[[accordion")
            content = content.split("/tabs]]</p><p><br>").join("/tabs]]")

            return content
        },
        reset() {
            this.mode = 'create'
            this.article = {}
            this.loading = false
            this.loadArticles()
            scroll(0,260)
        },
        save() {
            this.loading = true
            this.article.order = Number(this.categoryOrder.toString()+this.article.order.toString())
            this.article.editedAt = new Date()
            if(!this.article.publishedAt) this.article.publishedAt = this.article.editedAt
            if(!this.article.order) this.article.order = 100
            const method = this.article.id ? 'put' : 'post'
            const id = this.article.id ? `/${this.article.id}` : ''
            axios[method](`${baseApiUrl}/articles${id}`, this.article)
                .then(() => {
                    this.$toasted.global.defaultSuccess()
                    location.reload()
                })
                .catch(showError)
                .finally(() => this.loading = false)
        },
        remove() {
            this.loading = true
            const id = this.article.id
            axios.delete(`${baseApiUrl}/articles/${id}`)
                .then(() => {
                    this.$toasted.global.defaultSuccess()
                    location.reload()
                })
                .catch(showError)
                .finally(() => this.loading = false)
        },
        formatSlug(value) {
            return value.toLowerCase()
                .normalize('NFD').replace(/[\u0300-\u036f]/g, "")
                .split(/[^\w]+|_/).join('-')
                
        },
        // focusEditor() {
        //     console.log(this.$refs.editor)
        //     this.$refs.editor.quill.setSelection(0,1);
        // }
    },
    watch: {
        currentPage() {
            this.loadArticles()
        },
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
        width: 80%;
        margin: 20px 0px;
        border-radius: 5px;
        border: solid 2px rgba(0, 0, 0, 0.05);
        background-color: #fafafa;
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

    #article-description {
        min-height: 70px;
    }

    #article-description + p {
        font-size: 0.9em;
        font-style: italic;
        margin-top: 3px;
        margin-right: 10px;   
    }

    .article-admin .submit {
        display: flex;
        align-items: flex-start;
        max-height: 80px;
    }

    .submit img {
        height: 80px;
        position: relative;
        top: -20px;   
    }

    .submit button {
        margin-bottom: 42px;
    }

    .input-group-prepend {
        height: 100%;
    }

    .article-admin .preview {
        padding: 5px 10px;
        background-color: #1d7fd8;
        color: #fff;
        text-decoration: none;
        border-radius: 4px;
        margin-bottom: 20px;
    }

    .article-admin .preview:hover {
        background-color: #2a8ce7;
    }

    .ql-toolbar.ql-snow {
        position: sticky;
        top: 0;
        background-color: rgba(255,255,255,1);
        z-index: 2;
    }

</style>
