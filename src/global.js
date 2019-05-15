
import Vue from 'vue'

export const userKey = '__knowledge_user'
//export const baseApiUrl = window.location.href.includes('http://localhost:8080/')? 'http://localhost:3000' : 'https://ficcionados-backend.herokuapp.com'  
export const baseApiUrl = 'https://ficcionados-backend.herokuapp.com'  
//export const baseImgUrl = window.location.href.includes('http://localhost:8080/')? 'http://localhost:3000/' : 'https://res.cloudinary.com/hedf1kadi/image/upload/v1547811859/'
export const baseImgUrl = 'https://res.cloudinary.com/hedf1kadi/image/upload/v1547811859/'

export function showError(e) {
    if(e && e.response && e.response.data) {
        Vue.toasted.global.defaultError({ msg: e.response.data })
    } else if (typeof e == 'string') {
        Vue.toasted.global.defaultError({ msg: e })
    } else {
        Vue.toasted.global.defaultError()
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