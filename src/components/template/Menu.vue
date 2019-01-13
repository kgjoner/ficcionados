<template>
    <aside class="menu" v-show="isMenuVisible">
        <QueryField />
        <Tree :data="treeData" :options="treeOptions"
            :filter="treeFilter" v-model="selected" ref="tree" />
    </aside>
</template>

<script>

import { mapState } from 'vuex'
import Tree from 'liquor-tree'
import QueryField from './queryField'
import { baseApiUrl } from '@/global'
import axios from 'axios'

export default {
    name: 'Menu',
    components: { Tree, QueryField },
    computed: mapState(['isMenuVisible', 'articleCategory']),
    data: function() {
        return {
            treeFilter: '',
            treeData: this.getTreeData(),
            treeOptions: {
                propertyNames: { 'text': 'name' },
                filter: { emptyText: 'Categoria não encontrada' }
            },
            selected: null,
            selectAdjust: false,
        }
    },
    methods: {
        getTreeData() {
            const url = `${baseApiUrl}/categories/tree`
            return axios.get(url).then(res => res.data)
        },
        onNodeSelect(node) {
            if (!this.selectAdjust) {
                node.expand()
                this.$router.push({
                    name: 'articlesByCategory',
                    params: { id: node.id }
                })
            }

            if(this.$mq == 'xs' || this.$mq == 'sm') {
                this.$store.commit('toggleMenu', false)
            }
        },
        onDblClick(node) {
            node.unselect()
            node.select()
        }
    },
    watch: {
        articleCategory() {
            this.selected = this.$refs.tree.find(this.articleCategory.name)
            this.selectAdjust = true
            this.selected.select()
            this.selectAdjust = false
            this.selected[0].parent.expand()
        },

        $route(to) {
            if(!to.path.match(/\/categories\/\d+\/articles/) 
                && !to.path.includes("/articles/") && this.selected) {
                this.selected.unselect()
            }
        }
    },
    mounted(){
        this.$refs.tree.$on('node:selected', this.onNodeSelect)
        this.$refs.tree.$on('node:dblclick', this.onDblClick)
    }

}
</script>

<style>
    .menu {
        grid-area: menu;
        background: linear-gradient(to right, #232536,#414345);

        display: flex;
        flex-direction: column;
        flex-wrap: wrap;
    }

    .menu a,
    .menu a:hover {
        color: #fff;
        text-decoration: none;
    }

    .menu .tree-node.selected > .tree-content,
    .menu .tree-node .tree-content:hover  {
        background-color: #1d7ed8c9;
    }

    .tree-arrow.has-child {
        filter: brightness(2);
    }

    .menu .menu-filter {
        display: flex;
        justify-content: center;
        align-items: center;

        margin: 20px;
        padding-bottom: 8px;
        border-bottom: 1px solid #aaa;

    }

    .menu .menu-filter i {
        color: #aaa;
        margin-right: 10px;
    }

    .menu input {
        color: #ccc;
        font-size: 1.2rem;
        border: 0;
        outline: 0;
        width: 100%;
        background: transparent;
    }

    .tree-filter-empty {
        color: #CCC;
        margin-left: 20px;
        font-size: 1.2rem;
    }


</style>
