<template>
	<div class="gradeCard">
		<span class="icon"> {{ icon }} </span>
		<h4>{{ title }}</h4>
		<p>{{ chapterRange }}</p>
		<div class="shine"></div>
		<div class="background">
			<div class="tiles">
				<template v-for="i in 10">
					<div :class="`tile tile-${i}`"></div>
				</template>
			</div>

			<div class="line line-1"></div>
			<div class="line line-2"></div>
			<div class="line line-3"></div>
		</div>
	</div>
</template>

<script setup lang="ts">
const props = defineProps({
	title: { type: String },
	icon: { type: [String, Number] },
	chapterRange: { type: String },
});
</script>
