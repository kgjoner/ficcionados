import Vue from 'vue'

export default function displayError(err) {
	if (err && err.message) {
		Vue.toasted.error(err.message, { icon: 'times' })
	} else if (typeof e == 'string') {
		Vue.toasted.error(err, { icon: 'times' })
	} else {
		Vue.toasted.error('Ops... Erro inesperado.', { icon: 'times' })
	}
}
