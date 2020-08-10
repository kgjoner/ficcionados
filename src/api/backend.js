/* NOTE

As a JAMstack website, the majority of backend communication is done
during the build process, and you can check it on the following
file in the root folder:

	gridsome.server.js

Nonetheless, there are two situation that require feeding
the components with an unpredictable dynamic content:

1. Searching for articles accordingly to a keyword input by the user.
2. Drawing random articles from a given branch category.

*/

import axios from 'axios'
import handleAxiosError from '@/utils/handleAxiosError'

export const api = axios.create({
	baseURL:
		process.env.NODE_ENV === 'development'
			? 'http://localhost:3000'
			: 'https://ficcionados-backend.herokuapp.com',
})
console.log(process.env.NODE_ENV)


export const searchForArticles = ({ term, page }) => {
	return new Promise((resolve, reject) => {
		api
			.get('/search', {
				params: { s: term, page },
			})
			.then(async resp => {
				let articles = resp.data.articles
				if(!articles.length) {
					resolve('none')
					return
				}

				const imageIds = articles.map(a => a.imageId)
				const imageData = await getImages(imageIds)
				
				articles = articles.map((a, i) => ({
					...a,
					author: { name: a.author },
					image: imageData[i],
				}))
				resolve({
					articles,
					pageInfo: resp.data.pageInfo,
				})
			})
			.catch(err => reject(handleAxiosError(err)))
	})
}


export const getImages = ids => {
	return new Promise((resolve, reject) => {
		api
			.get('/cardImages', { params: { ids: ids.join(',') } })
			.then(resp => {
				resp.data.sort((a, b) => {
					return ids.indexOf(a._id) - ids.indexOf(b._id)
				})
				resolve(resp.data)
			})
			.catch(err => reject(handleAxiosError(err)))
	})
}


export const getRelatedArticles = (categoryId, articleId) => {
	return new Promise((resolve, reject) => {
		api
			.get(`/categories/${categoryId}/articles`, {
				params: { page: articleId, order: 'random' },
			})
			.then(resp => resolve(resp.data))
			.catch(err => reject(handleAxiosError(err)))
	})
}