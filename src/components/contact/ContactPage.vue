<template>
    <div class="contact-page">
        <PageTitle icon="fa fa-folder-o"
            main="Envie sua Mensagem!" sub="Tem algo a dizer?" />
        <b-form class="contact-form">
            <b-col md="6" sm="12">
                <b-form-group label="Nome:" label-for="contact-name">
                    <b-form-input id="contact-name" type="text" 
                        v-model="contact.name" required/>
                </b-form-group>
                <b-form-group label="E-mail:" label-for="contact-email">
                    <b-form-input id="contact-email" type="text" 
                        v-model="contact.from" required/>
                </b-form-group>
                <b-form-group label="Assunto:" label-for="contact-subject">
                    <b-form-input id="contact-subject" type="text" 
                        v-model="contact.subject" required
                        placeholder="" />
                </b-form-group>
            </b-col>
            <b-col md="10" sm="12">
                <b-form-group label="Mensagem:" label-for="contact-content">
                    <b-form-textarea id="contact-content" v-model="contact.content"/>
                </b-form-group>
            </b-col>
            <b-col class="send">
                <b-button variant="primary" @click="send">Enviar</b-button>
                <img v-if="sending" src="@/assets/loading2.gif" alt="">
            </b-col>    
        </b-form>
    </div>
</template>

<script>

import PageTitle from '../template/pageTitle'
import Loading from '@/components/template/Loading'
import { baseApiUrl, showError } from '@/global'
import axios from 'axios'

export default {
    name: 'ContactPage',
    components: { PageTitle, Loading },
    data: function() {
        return {
            contact: {},
            sending: false,
        }
    },
    methods: {
        send() {
            this.sending = true
            axios.post(`${baseApiUrl}/mailer`, this.contact)
                .then(() => {
                    this.$toasted.global.defaultSuccess()
                    this.reset()
                })
                .catch(showError)
                .finally(() => this.sending = false)
        },
        reset() {
            this.contact = {}
        }
    }
}
</script>

<style>

    .contact-page .page-title div {
        margin-left: auto;
        margin-right: auto;
        width: 45rem;
        padding-left: 20px;
    }

    .contact-page .page-title div hr {
        display:none;
    }

    .contact-form {
        padding: 20px;
        margin: 20px auto;
        background-color: #fff;
        border: 1px solid rgba(0, 0, 0, 0.125);
        border-radius: 0.25rem;

        max-width: 45rem;
    }

    .contact-form .send {
        display: flex;
        align-items: flex-start;
        max-height: 80px;
    }

    .send img {
        height: 80px;
        position: relative;
        top: -20px;
        
    }

</style>
