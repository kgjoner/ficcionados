<template>
	<div class="not-found">
		<PageTitle 
			main="Página não encontrada" 
			sub="Erro 404"
			center
		/>
		<div class="not-found__body">
			<div class="not-found__text">
				<p>A página que procura não existe ou nunca existiu.</p>
				<p>
					Você pode ir para a <a href="/">página inicial</a> ou usar a pesquisa
					abaixo:
				</p>
			</div>
			<SearchBox dark />
		</div>
	</div>
</template>

<script>
import PageTitle from '@/components/template/pageTitle'
import SearchBox from '@/components/utils/SearchBox'

export default {
	name: 'NotFound',
	components: { PageTitle, SearchBox },
	metaInfo: {
		title: '404',
	},
	methods: {
		redirectRules(to = this.$route) {
			if(to.path.includes('/entrevista-com-')) {
				const interviewee = to.path.match(/entrevista-com-(.+)$/)[1]
				this.$router.push({ path: `/artigo/${interviewee}` })
			} else if (!to.path.includes('artigo')) {
				this.$router.push({ path: `/artigo/${to.path}` })
			}
		}
	},
	watch: {
		$route(to) {
			this.redirectRules(to)
		},
	},
	created() {
		this.redirectRules()
	},
}
</script>

<style>
.not-found__body {
	margin: 80px auto 100px auto;
	max-width: 45rem;
	font-size: 1.15em;
	letter-spacing: 0.8px;
	line-height: 175%;
}

.not-found__text {
	margin-bottom: 40px;
}
</style>
