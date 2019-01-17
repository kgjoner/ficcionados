<template>
    <div class="image-admin">
        <b-form>
            <input id="image-id" type="hidden" v-model="image.$loki" />
            <b-row>
                <b-col md="6" sm="12">
                    <b-form-group label="Nome:" label-for="image-name">
                        <b-form-input id="image-name" type="text" 
                            v-model="image.title" required
                            :readonly="mode === 'remove'"
                            placeholder="Informe o Nome da Imagem" />
                    </b-form-group>
                    <b-form-group label="Alt:" label-for="image-alt">
                        <b-form-input id="image-alt" type="text" 
                            v-model="image.alt" required
                            :readonly="mode === 'remove'"
                            placeholder="Informe o atributo Alt da Imagem" />
                    </b-form-group>
                    <b-form-group v-if="mode === 'create'" label="Arquivo:" label-for="image-file">
                        <b-form-file id="image-file" ref="file" @change="handleFileUpload($event)"
                            v-model="image.file" required
                            :readonly="mode === 'remove' || mode == 'update'"
                            placeholder="Selecione o arquivo" />
                    </b-form-group>
                    <b-form-group v-else label="Url:" label-for="image-url">
                        <b-input-group :prepend="`${baseApiUrl}/`">
                        <b-form-input id="image-url" type="text"
                            v-model="image.filename" readonly />
                        </b-input-group>
                    </b-form-group>
                </b-col>
            </b-row>
            <b-row>
                <b-col class="submit">
                    <b-button variant="primary" v-if="mode === 'create'"
                        @click="create">Criar</b-button>
                    <b-button variant="primary" v-if="mode === 'update'"
                        @click="update">Atualizar</b-button>
                    <b-button variant="danger" v-if="mode === 'remove'"
                        @click="remove">Excluir</b-button>
                    <b-button class="ml-2" @click="reset">Cancelar</b-button>
                    <img v-if="loading" src="@/assets/loading2.gif" alt="">
                </b-col>
            </b-row>    
        </b-form>
        <hr>
        <div class="stored-imgs">
            <div class="stored-img" v-for="storedImg in images" :key="storedImg.$loki">
                <img :src="`${baseApiUrl}/${storedImg.filename}`" alt="">
                <span>{{storedImg.filename}}</span>
                <div class="mt-3">
                    <b-button variant="warning" @click="loadImg(storedImg, 'update')" class="mr-1 ml-1 mb-5">
                        <i class="fa fa-pencil"></i>
                    </b-button>
                    <b-button variant="danger" @click="loadImg(storedImg, 'remove')" class="mr-1 ml-1 mb-5">
                        <i class="fa fa-trash"></i>
                    </b-button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

import { baseApiUrl, showError } from '@/global'
import axios from 'axios'

export default {
    name: "ImageAdmin",
    data: function() {
        return {
            mode: "create",
            image: {},
            images: [],
            baseApiUrl,
            file: '',
            loading: false,
        }
    },
    methods: {
        loadImages() {
            axios.get(`${baseApiUrl}/images`)
                .then(res => this.images = res.data)
        },
        loadImg(storedImg, mode) {
            this.mode = mode
            axios.get(`${baseApiUrl}/images/${storedImg.$loki}`)
                .then(res => this.image = res.data)
        },
        reset() {
            this.mode = "create"
            this.image = {}
            this.images = []

            this.loadImages()
        },
        create() {
            this.loading = true
            var formData = new FormData()
            formData.append('title', this.image.title)
            formData.append('alt', this.image.alt)
            formData.append("image", this.file)

            axios.post(`${baseApiUrl}/images`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
                .then(() => {
                    this.$toasted.global.defaultSuccess()
                    location.reload()
                })
                .catch(showError)
                .finally(() => this.loading = false)
        },
        update() {
            this.loading = true
            axios.put(`${baseApiUrl}/images/${this.image.$loki}`, this.image)
                .then(() => {
                    this.$toasted.global.defaultSuccess()
                    location.reload()
                })
                .catch(showError)
                .finally(() => this.loading = false)
        },
        remove() {
            this.loading = true
            axios.delete(`${baseApiUrl}/images/${this.image.$loki}`)
                .then(() => {
                    this.$toasted.global.defaultSuccess()
                    location.reload()
                })
                .catch(showError)
                .finally(() => this.loading = false)
        },
        handleFileUpload(event) {
            this.file = event.target.files[0];
        }
    },
    mounted() {
        this.loadImages()
    }
}
</script>

<style>

.stored-imgs {
    display: flex;
    flex-direction: row;
    align-items: baseline;
    justify-content: left;
    flex-wrap: wrap;
}

.stored-img img {
    max-width: 20vw;
    margin: 10px;
    flex-grow: 1;
}

.stored-img {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-items: center;
}

.image-admin .submit {
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

@media (max-width: 768px) {
    .stored-img img {
        max-width: 35vw;
    }
}

@media (max-width: 576px) {
    .stored-img img {
        max-width: 50vw;
    }
}

</style>
