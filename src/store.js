export default {
	state: {
		isMenuVisible: false,
		articleCategory: {}, //só id serve?
	},
	mutations: {
		setMenuVisibility(state, isVisible) {
			state.isMenuVisible = isVisible
		},
		setArticleCategory(state, category) {
			state.articleCategory = { ...category }
		},
	},
	actions: {
		toggleMenu({ commit, state }) {
			commit('setMenuVisibility', !state.isMenuVisible)
		},
		showMenu({ commit }) {
			commit('setMenuVisibility', true)
		},
		hideMenu({ commit }) {
			commit('setMenuVisibility', false)
		},
		updateSelectedCategory({ commit }, category) {
			commit('setArticleCategory', category)
		},
	}
}
