<template>
    <div class="query-field">
        <input type="text" placeholder="Pesquisar..."
                v-model="term" @keyup.enter="toQueryPage">
        <button class="query-button" @click="toQueryPage">
            <i class="fa fa-search fa-lg"></i>
        </button>
    </div>
</template>

<script>
export default {
    name: 'queryField',
    data: function() {
        return {
            term: '',
        }
    },
    methods: {
        toQueryPage() {
            this.$router.push({ path: '/busca', query: { s: this.term } })
        }
    }
}
</script>

<style>

    .query-field {
        display: flex;
        justify-content: center;
        align-items: center;

        margin: 15px;
        margin-top: 20px;
        border-bottom: 1px solid #aaa;

    }

    .query-field .query-button {
        margin-left: 10px;
        padding: 5px 10px 10px 10px;
        background-color: transparent;
        color: #fafafa;
        border: none;
        cursor: pointer;
        outline: 0;
    }

    .query-field button:hover {
        background-color: #1d7ed8d3;
    }

    .query-field input {
        color: #ccc;
        font-size: 1.2rem;
        border: 0;
        outline: 0;
        width: 100%;
        margin-left: 10px;
        background: transparent;
    }

</style>
