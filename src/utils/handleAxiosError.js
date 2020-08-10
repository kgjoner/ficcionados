export default function handleAxiosError(err) {
	if (err.response) {
		const { status, data } = err.response
		return {
			name: 'RESPONSE',
			message: data,
			status,
		}
	} else if (err.request) {
		return {
			name: 'REQUEST',
			message: err.message,
		}
	} else {
		return {
			name: 'UNEXPECTED',
			message: err.message,
		}
	}
}
