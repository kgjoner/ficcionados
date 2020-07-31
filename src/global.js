
import Vue from 'vue'

export const userKey = '__ficcionados_user'
export const baseApiUrl = 'http://localhost:3000'
// export const baseApiUrl = 'https://ficcionados-backend.herokuapp.com'  
//export const baseImgUrl = window.location.href.includes('http://localhost:8080/')? 'http://localhost:3000/' : 'https://res.cloudinary.com/hedf1kadi/image/upload/v1547811859/'
export const baseImgUrl = 'https://res.cloudinary.com/hedf1kadi/image/upload/v1547811859/'

export function showError(e) {
    if(e && e.response && e.response.data) {
        Vue.toasted.error(e.response.data, { icon: 'times' })
    } else if (typeof e == 'string') {
        Vue.toasted.error(e, { icon: 'times' })
    } else {
        Vue.toasted.error('Ops... Erro inesperado.', { icon: 'times' })
    }
}

export function toStandardDate(dateData) {
    const monthNames = [
        'Janeiro', 'Fevereiro', 'Março',
        'Abril', 'Maio', 'Junho',
        'Julho', 'Agosto', 'Setembro',
        'Outubro', 'Novembro', 'Dezembro'
    ]

    let fullDate = dateData.split('T')[0].split('-').reverse()
    fullDate[1] = monthNames[Number(fullDate[1])-1]
    return fullDate.join(' de ')
}


export default {baseApiUrl, showError, userKey}