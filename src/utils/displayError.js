import Vue from 'vue'

export default function displayError(e) {
  if(e && e.response && e.response.data) {
      Vue.toasted.error(e.response.data, { icon: 'times' })
  } else if (typeof e == 'string') {
      Vue.toasted.error(e, { icon: 'times' })
  } else {
      Vue.toasted.error('Ops... Erro inesperado.', { icon: 'times' })
  }
}