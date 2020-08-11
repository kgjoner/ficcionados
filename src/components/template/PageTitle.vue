<template>
	<div class="page-title"
		:class="{'page-title--center': center}">
		<div class="page-title__container">
			<p>{{ sub }}</p>
			<h1>{{ main }}</h1>
			<hr class="page-title__underscore"/>
		</div>
	</div>
</template>

<script>
export default {
	name: 'PageTitle',
	props:{
		main: String, 
		sub: String, 
		center: Boolean
	},
}
</script>

<style>
.page-title {
	position: relative;
	padding-top: 20px;
	color: #fafafa;
	height: 12rem;

	background-color: rgb(0, 0, 0, 0.2);

	display: flex;
	justify-content: flex-start;
	align-items: center;
}

.page-title::before {
	content: '';
	position: absolute;
	height: 100%;
	width: 100%;
	bottom: 0;
	top: 0;

	display: block;
	background-image: linear-gradient(
			to right,
			rgba(0, 0, 0, 0.2),
			rgba(0, 0, 0, 0.2)
		),
		url('../../assets/img/blankcover.jpg');
	background-size: cover !important;
	background-position: bottom center;

	filter: opacity(0.9);
}

.page-title__container {
	padding-left: 50px;
	padding-right: 20px;
	max-width: 45rem;
	z-index: 1;
}

.page-title--center .page-title__container {
	margin-left: auto;
	margin-right: auto;
	width: 45rem;
	padding-left: 20px;
}

.page-title__container h1 {
	font-family: 'Kaushan Script', 'PT Serif';
	font-size: 3rem;
	line-height: 120%;
	margin-bottom: 0;
}

.page-title__container p {
	text-transform: uppercase;
	margin-bottom: 5px;
	font-size: 0.9rem;
}

.page-title__underscore {
	margin-top: 0;
	height: 1px;
	background: linear-gradient(
		to right,
		rgba(250, 250, 250, 0.4),
		rgba(250, 250, 250, 0.8),
		rgba(250, 250, 250, 0.8),
		rgba(250, 250, 250, 0.8),
		rgba(250, 250, 250, 0.4)
	);
}

.page-title--center .page-title__underscore {
	display: none;
}

@media (max-width: 450px) {
	.page-title__container {
		padding-left: 20px;
	}

	.page-title__container h1 {
		font-size: 2.7rem;
	}
}
</style>
