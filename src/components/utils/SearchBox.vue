<template>
	<form role="search"
		class="search-box"
		:class="{'search-box--dark': dark}">
		<input
			class="search-box__field"
			type="search"
			placeholder="Pesquisar..."
			v-model="term"
			@keyup.enter="toQueryPage"
		/>
		<button class="search-box__btn" @click.prevent="toQueryPage">
			<i class="fa fa-search fa-lg"></i>
		</button>
	</form>
</template>

<script>
export default {
	name: 'SearchBox',
	props: {
		dark: Boolean
	},
	data: function() {
		return {
			term: '',
		}
	},
	methods: {
		toQueryPage() {
			this.$router.push({ path: `/busca?s=${this.term}&page=1` })
		},
	},
}
</script>

<style>
.search-box {
	display: flex;
	justify-content: center;
	align-items: center;

	margin: 15px;
	margin-top: 20px;
	border-bottom: 1px solid #aaa;
	width: calc(100% - 30px);
	max-width: 20rem;
}

.search-box__field {
	color: #ccc;
	font-size: 1.2rem;
	border: 0;
	outline: 0;
	width: 100%;
	margin-left: 10px;
	background: transparent;
}

.search-box--dark .search-box__field {
	color: #4c4c4c;
}

.search-box__btn {
	margin-left: 10px;
	padding: 5px 10px 10px 10px;
	background-color: transparent;
	color: #fafafa;
	border: none;
	cursor: pointer;
	outline: 0;
}

.search-box__btn:hover {
	background-color: #1d7ed8d3;
}

.search-box--dark .search-box__btn {
	color: #4c4c4cd3;
	border-radius: 4px;
}

.search-box--dark .search-box__btn:hover {
	color: #fafafa;
}
</style>
