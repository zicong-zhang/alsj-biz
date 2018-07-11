<template>
	<div>
		<Title :title="title" :show-back="showBack" />
		<Carousel />

		<div class="nearStore">
			<h2>附近的店</h2>
			
		</div>
	</div>
</template>


<script>
import Title from '~components/title/title';
import Carousel from '~components/Carousel/Carousel';

export default {
	name: 'home',
	components: {
		Title,
		Carousel
	},
	data() {
		return {
			title: '阿拉私家',
			showBack: false
		}
	},
	created() {
		
	},
	mounted() {
		
	}
}
</script>
