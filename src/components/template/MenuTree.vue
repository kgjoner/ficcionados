<template>
	<div class="menu-tree" ref="root">
		<ul class="menu-tree__nodes"></ul>
	</div>
</template>

<script>
export default {
	name: 'MenuTree',
	props: ['treeData', 'value'],
	data: function() {
		return {
			selectedNode: null,
			dblClick: false,
		}
	},
	methods: {
		buildTree(nodes, parentEl, level = 0) {
			nodes.forEach((node) => {
				const nodeEl = document.createElement('li')
				nodeEl.classList.add('menu-tree__node')
				nodeEl.id = node.id
				nodeEl.setAttribute('tabIndex', '0')
				if (level === 0) {
					nodeEl.addEventListener('click', this.handleClick)
					nodeEl.addEventListener('keypress', this.handleEnter)
					nodeEl.addEventListener('dblclick', this.handleDblClick)
				}
				parentEl.appendChild(nodeEl)

				this.createNodeContent(node, nodeEl, level)

				if (node.children && node.children.length) {
					const childrenEl = document.createElement('ul')
					childrenEl.classList.add('menu-tree__nodes')
					nodeEl.appendChild(childrenEl)

					this.buildTree(node.children, childrenEl, level + 1)
				}
			})
		},

		createNodeContent(node, nodeEl, level) {
			const contentEl = document.createElement('div')
			contentEl.classList.add('menu-tree__content')
			contentEl.style.paddingLeft = `${level * 24}px`
			nodeEl.appendChild(contentEl)

			const arrowEl = document.createElement('i')
			arrowEl.classList.add('menu-tree__arrow', 'fa', 'fa-angle-right')
			if (node.children && node.children.length) {
				arrowEl.addEventListener('click', (e) =>
					this.toggleNode(e.target.parentNode.parentNode)
				)
			} else {
				arrowEl.style.visibility = 'hidden'
			}
			contentEl.appendChild(arrowEl)

			const anchorEl = document.createElement('a')
			anchorEl.classList.add('menu-tree__anchor')
			anchorEl.innerText = node.name
			contentEl.appendChild(anchorEl)
		},

		handleEnter(e) {
			if(e.key === 'Enter') this.handleClick(e)
		},

		handleClick(e) {
			if (Array.from(e.target.classList).includes('menu-tree__arrow')) return

			const node = this.getParentNode(e.target)
			if (this.selectedNode !== node) {
				this.$emit('input', node.id)
			} else if (this.selectedNode === node) {
				setTimeout(() => {
					if (this.dblClick) return
					this.toggleNode(node)
				}, 50)
			}
		},

		handleDblClick(e) {
			if (Array.from(e.target.classList).includes('menu-tree__arrow')) return

			this.dblClick = true
			const node = this.getParentNode(e.target)
			this.$emit('node:dblClick', node)
			setTimeout(() => {
				this.dblClick = false
			}, 100)
		},

		selectNode(node) {
			this.selectedNode = node
			node.classList.add('menu-tree__node--selected')
			this.$emit('node:selected', node)
			this.expandNode(node, { allBranch: true })
		},

		expandNode(node, { allBranch } = {}) {
			node.classList.add('menu-tree__node--expanded')

			if (allBranch) {
				const parentNode = node.parentNode?.parentNode
				if (parentNode && parentNode !== this.$refs.tree) {
					this.expandNode(parentNode, { allBranch: true })
				}
			}
		},

		toggleNode(node) {
			if (Array.from(node.classList).includes('menu-tree__node--expanded')) {
				node.classList.remove('menu-tree__node--expanded')
			} else {
				node.classList.add('menu-tree__node--expanded')
			}
		},

		getParentNode(el) {
			if (Array.from(el.classList).includes('menu-tree__node')) {
				return el
			} else {
				return this.getParentNode(el.parentNode)
			}
		},
	},

	watch: {
		value(nodeId) {
			this.selectedNode?.classList.remove('menu-tree__node--selected')
			if (nodeId) {
				const node = document.getElementById(nodeId)
				this.selectNode(node)
			} else {
				this.selectedNode = null
			}
		},
	},

	mounted() {
		this.buildTree(this.treeData, this.$refs.root.firstElementChild)
	},
}
</script>

<style>
.menu-tree {
	padding: 0 3px;
}

.menu-tree__nodes {
	padding-left: 0;
}

.menu-tree__node {
	overflow: hidden;
}

body:not(.tab-user) .menu-tree__node:focus {
	outline: none;
}

.menu-tree__node > .menu-tree__nodes {
	display: none;
	position: relative;
}

.menu-tree__node--expanded > .menu-tree__nodes {
	display: block;
	animation: appear 0.4s;
}

@keyframes appear {
	0% {
		left: -50px;
		opacity: 0;
	}
	100% {
		left: 0;
		opacity: 1;
	}
}

/* Content
============= */

.menu-tree__content {
	padding: 7px 0;
	text-transform: capitalize;
	display: flex;
	align-items: center;
	cursor: pointer;
}

.menu-tree__content:hover,
.menu-tree__node--selected > .menu-tree__content {
	background-color: #1d7ed8c9;
}

.menu-tree__arrow {
	color: rgb(141, 141, 141);
	font-size: 1.4rem;
	padding: 0 10px;
	margin-right: 10px;
	transition: 0.4s;
}

.menu-tree__node--expanded > div > .menu-tree__arrow {
	transform: rotate(90deg);
}

a.menu-tree__anchor,
a.menu-tree__anchor:hover {
	user-select: none;
	color: #fff;
	text-decoration: none;
}
</style>
