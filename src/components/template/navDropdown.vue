<template>
    <div class="navbar-dropdown">
        <button class="navbar-button" :class="{'navbar-button-selected': !hideDropdown}" 
            @click="toggleDropdown">
            <i class="fa fa-bars"></i>
        </button>
        <div v-show="!hideDropdown" class="navbar-dropdown-content">
            <Navbar></Navbar>
        </div>
    </div>
</template>

<script>

import Navbar from './navbar'

export default {
    name: 'NavDropdown',
    components: { Navbar },
    data: function() {
        return {
            hideDropdown: true,
        }
    },
    methods: {
        toggleDropdown() {
            this.hideDropdown = !this.hideDropdown
        }
    }
}
</script>

<style>

    .navbar-dropdown {
        position: relative;
        height: 100%;
        z-index: 98;
    }

    .navbar-dropdown .navbar-button {
        display: flex;
        align-items: center;
        justify-content: center;
        background: #4c4c4c;
        color: #fff;
        font-weight: 100;
        font-size: 1.2em;
        height: 40px;
        width: 40px;
        margin: 10px;
        border-radius: 4px;
        border: none;
        outline: none;
    }

    .navbar-dropdown:hover .navbar-button {
        background-color: rgba(0,0,0,0.2);
    }

    .navbar-dropdown .navbar-button-selected {
        background-color: #1d7fd8 !important;
    }

    .navbar-dropdown-content {
        position: absolute;
        right: 0px;
        background-color: #4c4c4c;
        width: 100vw;
        box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
        padding: 10px;
        padding-right: 40px;
        z-index: 1;

        display: flex;
        flex-direction: column;
        flex-wrap: wrap;
        align-items: flex-end;
    }

    .navbar-dropdown-content .navbar ul {
        flex-direction: column;
    }

    .navbar-dropdown-content .navbar li {
        height: 3em;
    }

    .navbar-dropdown-content .navbar a {
        display: block;
        max-width: 300px;
        padding: 5px 100px;
    }

    /* .navbar-dropdown:hover .navbar-dropdown-content {
        visibility: visible;
        opacity: 1;
    } */

</style>
