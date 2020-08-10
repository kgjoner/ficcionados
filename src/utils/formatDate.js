export default function formatDate(dateData) {
	const monthNames = [
		'Janeiro',
		'Fevereiro',
		'Março',
		'Abril',
		'Maio',
		'Junho',
		'Julho',
		'Agosto',
		'Setembro',
		'Outubro',
		'Novembro',
		'Dezembro',
	]

	let fullDate = dateData
		.split('T')[0]
		.split('-')
		.reverse()
	fullDate[1] = monthNames[Number(fullDate[1]) - 1]
	return fullDate.join(' de ')
}
