<template>
    <div class="user-admin">
        <b-form>
            <input id="user-id" type="hidden" v-model="user.id" />
            <b-row>
                <b-col md="6" sm="12">
                    <b-form-group label="Nome:" label-for="user-name">
                        <b-form-input id="user-name" type="text" 
                            v-model="user.name" required
                            :readonly="mode === 'remove'"
                            placeholder="Informe o Nome do usuário" />
                    </b-form-group>
                    <b-form-group label="Email:" label-for="user-email">
                        <b-form-input id="user-email" type="text" 
                            v-model="user.email" required
                            :readonly="mode === 'remove'"
                            placeholder="Informe o E-mail do usuário" />
                    </b-form-group>
                </b-col>
            </b-row>
            <b-row>
                <b-col md="6" sm="12">
                    <b-form-checkbox id="user-admin" v-model="user.admin" class="mt-3 mb-3"
                        :readonly="mode === 'remove'">
                        Administrador?
                    </b-form-checkbox>
                </b-col>
                <b-col md="6" sm="12">
                    Links externos (opcionais):
                </b-col>
            </b-row>
            <b-row v-show="mode !== 'remove'">
                <b-col md="6" sm="12">
                    <b-form-group label="Senha:" label-for="user-password">
                        <b-form-input id="user-password" type="password" 
                            v-model="user.password" required 
                            placeholder="Informe a Senha do usuário" />
                    </b-form-group>
                    <b-form-group label="Confirmação de Senha:" label-for="user-confirm-password">
                        <b-form-input id="user-confirm-password" type="password" 
                            v-model="user.confirmPassword" required 
                            placeholder="Confirme a Senha do usuário" />
                    </b-form-group>
                </b-col>
                <b-col>
                    <b-form-group label="Website:" label-for="user-website">
                        <b-form-input id="user-website" type="text" 
                            v-model="user.website" />
                    </b-form-group>
                    <b-form-group label="Facebook:" label-for="user-facebook">
                        <b-form-input id="user-facebook" type="text" 
                            v-model="user.facebook" />
                    </b-form-group>
                </b-col>
            </b-row>
            <b-row>
                <b-col md="6" sm="12">
                    <b-form-group label="Bio:" label-for="user-bio">
                        <b-form-textarea id="user-bio" style="white-space: pre-wrap;"
                            v-model="user.bio" 
                            placeholder="  Breve biografia do usuário" />
                    </b-form-group>
                </b-col>
                <b-col md="6" sm="12">
                    <b-form-group label="Twitter:" label-for="user-twitter">
                        <b-form-input id="user-twitter" type="text" 
                            v-model="user.twitter"/>
                    </b-form-group>
                    <b-form-group label="Instagram:" label-for="user-instagram">
                        <b-form-input id="user-instagram" type="text" 
                            v-model="user.instagram" />
                    </b-form-group>
                    <b-form-group label="Wattpad:" label-for="user-wattpad">
                        <b-form-input id="user-wattpad" type="text" 
                            v-model="user.wattpad" />
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
        <b-table hover striped :items="users" :fields="fields">
            <template slot="actions" slot-scope="data">
                <b-button variant="warning" @click="loadUser(data.item)" class="mr-2">
                    <i class="fa fa-pencil"></i>
                </b-button>
                <b-button variant="danger" @click="loadUser(data.item, 'remove')" class="mr-2">
                    <i class="fa fa-trash"></i>
                </b-button>
            </template>
        </b-table>
    </div>
</template>

<script>

import axios from 'axios'
import { baseApiUrl, showError } from '@/global'

export default {
    name:'UserAdmin',
    data: function() {
        return {
            mode: 'create',
            user: {},
            users: [],
            fields: [
                {key: 'id', label: 'Código', sortable: true},
                {key: 'name', label: 'Nome', sortable: true},
                {key: 'email', label: 'Email', sortable: true},
                {key: 'admin', label: 'Administrador', sortable: true,
                    formatter: value => value ? 'Sim' : 'Não'},
                {key: 'actions', label: 'Ações'}
            ]
        }
    },
    methods: {
        loadUsers() {
            const url = `${baseApiUrl}/users`
            axios.get(url).then(res => {
                this.users = res.data
            })
        },
        reset() {
            this.mode = 'create'
            this.user = {}
            this.loadUsers()
        },
        save() {
            const method = this.user.id ? 'put' : 'post'
            const id = this.user.id ? `/${this.user.id}` : ''
            axios[method](`${baseApiUrl}/users${id}`, this.user)
                .then(() => {
                    this.$toasted.global.defaultSuccess()
                    this.reset()
                })
                .catch(e => showError(e))
        },
        remove() {
            const id = this.user.id
            axios.delete(`${baseApiUrl}/users/${id}`)
                .then(() => {
                    this.$toasted.global.defaultSuccess()
                    this.reset()
                })
                .catch(showError)
        },
        loadUser(user, mode = 'save'){
            this.mode = mode
            const url = `${baseApiUrl}/users/${user.id}`
            axios.get(url).then(res => {
                this.user = res.data
            })
        }
    },
    mounted(){
        this.loadUsers()
    }
}
</script>

<style>

    #user-bio {
        min-height: 210px;
    }

</style>
