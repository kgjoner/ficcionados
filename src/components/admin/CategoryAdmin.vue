<template>
    <div class="category-admin">
        <b-form>
            <input id="category-id" type="hidden" v-model="category.id" />
            <b-col md="6" sm="12">
                <b-form-group label="Nome:" label-for="category-name">
                    <b-form-input id="category-name" type="text" 
                        v-model="category.name" required
                        :readonly="mode === 'remove'"
                        placeholder="Informe o Nome do categoria" />
                </b-form-group>
            </b-col>
            <b-col md="6" sm="12">
                <b-form-group label="Categoria Mãe:" label-for="category-parentId">
                    <b-form-select id="category-parentId" v-model="category.parentId" class="mb-3"
                        :disabled="mode === 'remove'">
                        <option :value="null"></option>
                        <option v-for="c in categories" :value="c.id" :key="c.id">{{c.path}}</option>
                    </b-form-select>
                </b-form-group>
            </b-col>
            <b-col>
                <b-button variant="primary" v-if="mode === 'create'"
                    @click="save">Criar</b-button>
                <b-button variant="primary" v-if="mode === 'save'"
                    @click="save">Atualizar</b-button>
                <b-button variant="danger" v-if="mode === 'remove'"
                    @click="remove">Excluir</b-button>
                <b-button class="ml-2" @click="reset">Cancelar</b-button>
            </b-col>    
        </b-form>
        <hr>
        <b-table hover striped :items="categories" :fields="fields">
            <template slot="actions" slot-scope="data">
                <b-button variant="warning" @click="loadCategory(data.item, 'save')" class="mr-2">
                    <i class="fa fa-pencil"></i>
                </b-button>
                <b-button variant="danger" @click="loadCategory(data.item, 'remove')" class="mr-2">
                    <i class="fa fa-trash"></i>
                </b-button>
            </template>
        </b-table>
    </div>
</template>

<script>

import { baseApiUrl, showError } from '@/global'
import axios from 'axios'

export default {
    name:'CategoryAdmin',
    data: function() {
        return {
            mode: 'create',
            categories: [],
            category: {},
            fields: [
                {key: 'id', label: 'Código', sortable: true},
                {key: 'name', label: 'Nome', sortable: true},
                {key: 'path', label: 'Caminho', sortable: true},
                {key: 'actions', label: 'Ações'}
            ],
        }
    },
    methods: {
        loadCategories() {
            axios.get(`${baseApiUrl}/categories`)
                .then(res => this.categories = res.data)
        },
        loadCategory(category, mode) {
            this.mode = mode
            this.category = {
                id: category.id,
                name: category.name,
                parentId: category.parentId
            }
        },
        reset() {
            this.mode = 'create'
            this.category = {}
            this.loadCategories()
        },
        save() {
            const method = this.category.id ? 'put' : 'post'
            const id = this.category.id ? `/${this.category.id}` : ''
            axios[method](`${baseApiUrl}/categories${id}`, this.category)
                .then(() => {
                    this.$toasted.global.defaultSuccess()
                    this.reset()
                })
                .catch(showError)
        },
        remove() {
            const id = this.category.id
            axios.delete(`${baseApiUrl}/categories/${id}`)
                .then(() => {
                    this.$toasted.global.defaultSuccess()
                    this.reset()
                })
                .catch(showError)
        }
    },
    mounted() {
        this.loadCategories()
    }
}
</script>

<style>

</style>
