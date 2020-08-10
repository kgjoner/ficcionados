import axios from 'axios'
import handleAxiosError from '@/utils/handleAxiosError'

export const submitFormToNetlify = form => {
	const axiosConfig = {
		header: { 'Content-Type': 'application/x-www-form-urlencoded' },
	}
	return new Promise((resolve, reject) => {
		axios
			.post(
				'/',
				encode({
					'form-name': 'Contact',
					...form,
				}),
				axiosConfig
			)
			.then(resp => resolve(resp))
			.catch(err => reject(handleAxiosError(err)))
	})

	function encode(data) {
		return Object.keys(data)
			.map(key => `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`)
			.join('&')
	}
}
