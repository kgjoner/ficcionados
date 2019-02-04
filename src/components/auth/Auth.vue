<template>
    <div class="auth-content">
        <div class="auth-modal">
            <img src="@/assets/logomarca-black.png" width="80" alt="Logo">
            <hr>
            <div class="auth-title">{{ showSignup? 'Cadastro' : 'Login' }}</div>

            <input v-if="showSignup" type="text" v-model="user.name" placeholder="Nome">
            <input type="text" v-model="user.email" placeholder="E-mail" @keyup.enter="signin">
            <input type="password" name="password" v-model="user.password" placeholder="Senha" @keyup.enter="signin">
            <input v-if="showSignup" type="password" v-model="user.confirmPassword" placeholder="Confirme a Senha">
        
            <button v-if="showSignup" @click="signup">Registrar</button>
            <button v-else @click="signin">Entrar</button>

            <a href="/">Voltar para o site.</a>
            <a v-if="showSignup" href @click.prevent="showSignup = !showSignup">
                <span v-if="showSignup">Já tem cadastro? Acesse o Login!</span>
                <span v-else>Não tem cadastro? Registre-se aqui!</span>
            </a>
        </div>
    </div>
</template>

<script>

import { mapState } from 'vuex'
import { baseApiUrl, showError, userKey} from '@/global'
import axios from 'axios'

export default {
    name: 'Auth',
    data: function() {
        return {
            showSignup: false,
            user: {}
        }
    },
    computed: mapState(['expiredSession']),
    methods: {
        signin() {
            axios.post(`${baseApiUrl}/signin`, this.user)
                .then(res => {
                    this.$store.commit('setUser', res.data)
                    localStorage.setItem(userKey, JSON.stringify(res.data))
                    this.$router.push({ path: '/admin/board' })
                })
                .catch(showError)
        },
        signup() {
            axios.post(`${baseApiUrl}/signup`, this.user)
                .then(() => {
                    this.$toasted.global.defaultSuccess()
                    this.user = {}
                    this.showSignup = false
                })
                .catch(showError)
        }
    },
}
</script>

<style>

    .auth-content {
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .auth-content img {
        opacity: 0.7;
    }

    .auth-modal {
        background-color: #fff;
        width: 350px;
        padding: 35px;
        box-shadow: 0 1px 5px rgb(0, 0, 0, 0.15);

        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .auth-title {
        font-size: 1.2rem;
        font-weight: 300;
        margin-top: 10px;
        margin-bottom: 15px;
    }

    .auth-modal input {
        border: solid 1px #BBB;
        width: 100%;
        margin-bottom: 15px;
        padding: 3px 8px;
    }

    .auth-modal button {
        align-self: flex-end;
        background-color: #2460ae;
        border-radius: 8px;
        outline: none;
        color: #fff;
        padding: 5px 15px;
    }

    .auth-modal a {
        margin-top: 35px;
    }

    .auth-modal hr {
        border: 0px;
        width: 100%;
        height: 1px;
        background: linear-gradient(to right, rgba(120,120,120,0), 
            rgba(120,120,120,0.75), rgba(120,120,120,0));
    }

</style>
