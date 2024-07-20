<template>
	<div class="gradeCard">
		<div class="w-fit bg-gray-300 rounded p-3">
			<img :src="image" class="w-full" />
		</div>
		<h3 class="mt-2 text-gray-200 tracking-wide text-base font-semibold">{{ title }}</h3>
		<p class="text-sm text-gray-400">{{ description }}</p>
	</div>
</template>

<script setup>
const props = defineProps({
	image: { type: String, required: true },
	title: { type: String, required: true },
	description: { type: String, required: true },
});
</script>

<style>
/* .gradeCard {
	animation: fade-in linear forwards;
	animation-timeline: view();
	animation-range-start: cover;
	animation-range-end: 400px;
	opacity: 0;
	transform: translateY(120px);
	transition: 0.3s ease !important;
}

.gradeCard:hover {
	scale: 0.95;
}

@keyframes fade-in {
	to {
		opacity: 1;
		transform: translateY(0);
	}
} */
</style>
