<template>
    <div class="to-top" ref='toTopBtn'>
        <button v-if="!hideButton" class="to-top-btn" title="Para cima!" @click="goToTop">
            <i class="fa fa-arrow-up"></i>
        </button>
    </div>
</template>

<script>
export default {
    name: 'GoToTop',
    data: function() {
        return {
            hideButton: true,
        }
    },
    methods: {
        goToTop() {
            const cosParameter = window.scrollY/2
            let start = null
            const stepUp = (timestamp) => {
                if(!start) start = timestamp
                const progress = (timestamp-start)/1000
                const position = Math.floor(cosParameter*Math.cos(Math.PI*progress)+cosParameter)
                window.scrollTo(0, position)
                if (window.scrollY > 0) {
                    window.requestAnimationFrame(stepUp)
                }
            }
            window.requestAnimationFrame(stepUp)
        },
        checkHideButton() {
            this.hideButton = window.scrollY < 100
            const opacity = this.hideButton ? 0 : 1
            this.$refs.toTopBtn.style.opacity = opacity 
        }
    },
    created () {
        window.addEventListener('scroll', this.checkHideButton);
    },
    destroyed () {
        window.removeEventListener('scroll', this.checkHideButton);
    }
}
</script>

<style>

    .to-top {
        position: fixed;
        bottom: 70px;
        right: 25px;
        opacity: 0;
        transition: opacity 5s;
    }

    .to-top .to-top-btn {
        width: 40px;
        height: 40px;
        /* border-radius: 4px; */
        border: none;
        color: #fafafa;
        outline: 0;
        opacity: 0.2;
        background-color: #333;
        cursor: pointer;
    }

    .to-top .to-top-btn:hover {
        opacity: 0.5;
    }    

</style>
