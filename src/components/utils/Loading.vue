<template>
	<div class="loading">
		<i class="loading__icon fa fa-spinner"
			:class="{ 'loading__icon--large': large }"></i>
	</div>
</template>

<script>
export default {
	name: 'Loading',
	props: {
		large: Boolean
	}
}
</script>

<style>
.loading {
	grid-area: content;
	display: flex;
	justify-content: center;
	align-items: center;
}

.loading__icon {
	animation: spin 1s linear infinite;
	font-size: 1.5rem;
}

.loading__icon--large {
	font-size: 4rem;
}

@keyframes spin {
	0%{ transform: rotate(0deg) }
	100%{ transform: rotate(360deg) }
}
</style>
