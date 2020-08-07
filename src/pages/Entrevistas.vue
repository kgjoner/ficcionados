<template>
	<Loading />
</template>

<script>
import Loading from '@/components/utils/Loading'

export default {
	metaInfo() {
		return {
			title: `Redirecionando para /categorias/3`,
			meta: [{ 'http-equiv': 'refresh', content: `0; URL='/categorias/3'` }],
			link: () => [
				{
					rel: 'canonical',
					href: `https://www.ficcionados.com.br/categorias/3`,
					id: 'canonical',
				},
			],
		}
	},
}
</script>
