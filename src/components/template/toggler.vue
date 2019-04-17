<template>
    <div class="toggler" :class="{'toggle-on': isMenuVisible}"  ref="toggler" @click="toggleMenu">
        <button v-if="isMenuVisible || keepToggler" class="toggler-button">
            <i class="fa fa-sort-up" :class="{'toggle-on': isMenuVisible}"></i>
        </button>
    </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
    name: "Toggler",
    computed: {
        ...mapState(['isMenuVisible']),
        keepToggler() {
            return this.$route.fullPath == '/artigos' || this.$route.fullPath == `/entrevistas`
        }
	},
    methods: {
        toggleMenu() {
            this.$store.commit('toggleMenu')
        },
    },
}
</script>

<style>
.toggler {
    height: 50px;
    width: 10px;
    position: fixed;
    bottom: 50px;
    z-index: 4;
}

button.toggler-button {
    height: 50px;
    width: 20px;
    background-color: #1d7fd8;
    border: none;
    border-bottom-right-radius: 5px;
    border-top-right-radius: 5px;
    transition: 0.5s;

    position: relative;
    left: -9px;
    cursor: pointer;
    outline: none !important;
}

.toggler-button:hover {
    left: 0;
    outline: none;
}

.toggler:hover {
    width: 20px;
}

.toggler-button i {
    color: #fafafa;
    transform: rotate(90deg);
    transition: 0.5s;
    position: relative;
    left: 1px;
}

button.toggler-button.toggle-on {
    transition: 0;
    width: 10px;
    left: 230px;
}

.toggler-button i.toggle-on {
    transform: rotate(-90deg);
    left: 7px;
}
</style>
