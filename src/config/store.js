import axios from 'axios'

export default {
	state: {
		isMenuVisible: false,
		articleCategory: {},
		user: null,
	},
	mutations: {
		toggleMenu(state, isVisible) {
			if (isVisible === undefined) {
				state.isMenuVisible = !state.isMenuVisible
			} else {
				state.isMenuVisible = isVisible
			}
		},
		setArticleCategory(state, category) {
			state.articleCategory = { ...category }
		},
		setUser(state, user) {
			state.user = user
			if (user) {
				axios.defaults.headers.common['Authorization'] = `bearer ${user.token}`
			} else {
				delete axios.defaults.headers.common['Authorization']
			}
		},
	},
}
