<template>
	<div class="content">
		<router-view></router-view>
		<Toggler />
	</div>
</template>

<script>
import Toggler from '@/components/template/toggler'

export default {
	name: 'Content',
	components: { Toggler },
}
</script>

<style>
.content {
	grid-area: content;
	background-color: #efefef;
}
</style>
