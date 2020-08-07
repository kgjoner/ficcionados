<template>
	<Loading />
</template>

<page-query>
query Redirect ($id: ID!) {
   article (id: $id) {
    slug
  }
}
</page-query>

<script>
import Loading from '@/components/utils/Loading'

export default {
	metaInfo() {
		return {
			title: `Redirecionando para /artigo/${this.$page.article.slug}`,
			meta: [
				{
					'http-equiv': 'refresh',
					content: `0; URL='/artigo/${this.$page.article.slug}'`,
				},
			],
			link: () => [
				{
					rel: 'canonical',
					href: `https://www.ficcionados.com.br/artigo/${
						this.$page.article.slug
					}`,
					id: 'canonical',
				},
			],
		}
	},
}
</script>
