<template>
	<div class="flex justify-center items-center flex-col mt-32 gap-2">
		<NuxtLink
			:to="path"
			class="font-geist title whitespace-pre-wrap bg-gradient-to-b bg-clip-text text-center text-8xl font-semibold text-transparent dark:from-white dark:to-slate-800/10">
			{{ title }}
		</NuxtLink>
	</div>
</template>

<script setup>
const props = defineProps({
	title: { type: String, required: true },
	path: { type: String, required: true },
});
</script>

<style scoped>
.title {
	animation: pull-up 0.5s ease forwards;
}
@keyframes pull-up {
	0% {
		opacity: 0;
		transform: translateY(20px);
	}
	100% {
		opacity: 1;
		transform: translateY(0);
	}
}
</style>
