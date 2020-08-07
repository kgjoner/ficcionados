<template>
	<aside class="menu" v-show="isMenuVisible">
		<SearchBox />
		<MenuTree
			v-if="treeData"
			:treeData="treeData"
			v-model="selectedCategoryId"
			@node:selected="toCategoryPage"
			@node:dblClick="toCategoryPage"
		/>
	</aside>
</template>

<static-query>
query {
  categories: allCategory {
    edges {
      node {
        id
        name
        parentId
        order
        children
      }
    }
  }
}
</static-query>

<script>
import { mapState } from 'vuex'
import MenuTree from '@/components/template/MenuTree'
import SearchBox from '@/components/utils/SearchBox'

export default {
	name: 'Menu',
	components: { MenuTree, SearchBox },
	data: function() {
		return {
			selectedCategoryId: null,
			allowRouting: true,
		}
	},
	computed: {
		...mapState(['isMenuVisible', 'articleCategory']),
		categories() {
			return this.$static.categories.edges.map(c => c.node)
		},
		treeData() {
			const findChildren = node => {
				let children = node.children.map(child => {
					return this.categories.find(c => c.id == child)
				})
				children = children
					.map(child => {
						if (child.children) {
							return findChildren(child)
						} else {
							return child
						}
					})
					.sort((a, b) => a.order - b.order)
				return {
					...node,
					children,
				}
			}

			let tree = this.categories.filter(c => !c.parentId)
			tree = tree.map(node => {
				return findChildren(node)
			})
			return tree.sort((a, b) => a.order - b.order)
		},
		categoryPathIdOrFalse() {
			if (!this.$route.path.includes('categorias')) return false
			return this.$route.path.match(/categorias\/(\d+)\/?/)[1]
		},
	},
	methods: {
		toCategoryPage(node) {
			if (!this.allowRouting || this.categoryPathIdOrFalse == node.id) return

			this.$router.push({ path: `/categorias/${node.id}` })
		},
		setSelectedCategoryId(newId) {
			this.allowRouting = false
			this.selectedCategoryId = newId
			setTimeout(() => (this.allowRouting = true), 0)
		},
	},
	watch: {
		articleCategory(newValue) {
			this.setSelectedCategoryId(newValue.id)
		},

		$route(to) {
			if (
				this.categoryPathIdOrFalse &&
				this.categoryPathIdOrFalse !== this.selectedCategoryId
			) {
				this.setSelectedCategoryId(this.categoryPathIdOrFalse)
			} else if (
				!to.path.match(/\/categorias\/\d+/) &&
				!to.path.includes('/artigo/') &&
				this.selectedCategoryId
			) {
				this.selectedCategoryId = null
			}
		},
	},
	mounted() {
		if (this.categoryPathIdOrFalse) {
			this.setSelectedCategoryId(this.categoryPathIdOrFalse)
		}
	},
}
</script>

<style>
.menu {
	grid-area: menu;
	position: relative;
	background: linear-gradient(to right, #232536, #414345);

	display: flex;
	flex-direction: column;
	flex-wrap: wrap;
	z-index: 5;
}
</style>
