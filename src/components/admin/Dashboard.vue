<template>
    <div class="dashboard">
        <PageTitle icon='fa fa-home' main='Dashboard' 
            sub='Base de Conhecimento' />
        <div class="stats">
            <Stat title='Categorias' :value="stat.categories"
                icon='fa fa-folder' color="#d54d50" />
            <Stat title='Artigos' :value="stat.articles"
                icon='fa fa-file' color="#3bc480" />
            <Stat title='Usuários' :value="stat.users"
                icon='fa fa-user' color="#3282cd" />
        </div>
    </div>
</template>

<script>

import PageTitle from '../template/pageTitle'
import Stat from './Stat'
import axios from "axios"
import {baseApiUrl} from "@/global"

export default {
    name: 'Dashboard',
    components: { PageTitle, Stat },
    head: {
        meta: [
            {name: "robots", content: "noindex"}
        ]
    },
    data: function() {
        return {
            stat: {}
        }
    },
    methods: {
        getStats(){
            axios.get(`${baseApiUrl}/stats`).then(res => this.stat = res.data)
        }
    },
    mounted() {
        this.getStats()
    }
}
</script>

<style>

    .stats {
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
        margin-top: 20px;
        padding: 20px;
        margin-bottom: 40vh;
    }

</style>
