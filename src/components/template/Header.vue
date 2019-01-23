<template>
    <header class="header">
        <a class="toggle" @click="toggleMenu" v-if="!hideToggle">
            <img src="@/assets/logomarca.svg" class="brand" :class="icon">
        </a>
        <router-link to="/" class="toggle toggle-off" v-else>
            <img  src="@/assets/logomarca.svg" class="brand" :class="icon">
        </router-link>
        <h1 class="title">
            <router-link to="/">
                <img src="@/assets/logotipo.svg" class="logotype">
            </router-link>
        </h1>
        <Navbar v-if="!hideNavbar"></Navbar>
        <NavDropdown v-else></NavDropdown>
        <User-dropdown v-if="!hideUserDropdown" />
    </header>
</template>

<script>

import UserDropdown from "./userDropdown"
import Navbar from "./navbar"
import NavDropdown from "./navDropdown"

export default {
    name: 'Header',
    components: { UserDropdown, Navbar, NavDropdown },
    props: {
        hideToggle: Boolean,
        hideUserDropdown: Boolean,
    },
    data: function() {
        return {
            hideNavbar: false,
        }
    },
    computed: {
        icon() {
            return this.$store.state.isMenuVisible ? "brand-menu" : ""
        }
    },
    watch: {
        $mq() {
            if(this.$mq != 'xs' && this.$mq != 'sm') {
                this.hideNavbar = false
            } else {
                this.hideNavbar = true
            }
        }
    },
    methods: {
        toggleMenu() {
            this.$store.commit('toggleMenu')
        }
    },
    mounted() {
        if(this.$mq == 'xs' || this.$mq == 'sm') {
            this.hideNavbar = true
        }
    }
}
</script>

<style>
    .header {
        grid-area: header;
        background-color: #4d4d4d;

        display: flex;
        align-items: center;
    }

    .header .title {
        flex-grow: 1;
        /* text-align: center; */
    }

    header.header > a.toggle {
        width: 60px;
        min-width: 60px;
        height: 100%;
        color: #fff;
        text-decoration: none;
        justify-self: flex-start;
        cursor: pointer;

        display: flex;
        justify-content: center;
        align-items: center;
    }

    header.header > a.toggle:hover {
        color: #fff;
        background-color: rgba(0,0,0,0.2);
    }

    header.header > a.toggle-off:hover {
        background-color: transparent;
    }

    .brand {
        height: 100%;
        width: 100%;
        padding: 10px;
    }

    .brand-menu {
        background-color: rgba(0,0,0,0.4);
    }

    .logotype {
        height: 50px;
        padding-top: 5px;
        margin-left: 5px;
    }

    @media (max-width: 916px) {
        .logotype {
            height: 40px;
            margin-left: 0; 
        }
    }

</style>
