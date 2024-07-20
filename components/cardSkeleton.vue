<template>
	<div v-for="i in 3" v-if="status" class="card">
		<div class="skeleton h-9 mb-6" :style="{ width: randomWidth() }"></div>
		<div class="grid gap-2">
			<div class="skeleton h-5" :style="{ width: randomWidth(), animationDelay: '0.2s' }"></div>
			<div class="skeleton h-5" :style="{ width: randomWidth(), animationDelay: '0.3s' }"></div>
			<div class="skeleton h-5" :style="{ width: randomWidth(), animationDelay: '0.4s' }"></div>
			<div class="skeleton h-5" :style="{ width: randomWidth(), animationDelay: '0.5s' }"></div>
			<div class="skeleton h-5" :style="{ width: randomWidth(), animationDelay: '0.6s' }"></div>
			<div class="skeleton h-5" :style="{ width: randomWidth(), animationDelay: '0.7s' }"></div>
		</div>
		<div class="pageNumber skeleton w-20 h-5" style="animation-delay: 0.8s"></div>
	</div>
</template>

<script setup>
const props = defineProps({
	status: { type: Boolean },
});
const randomWidth = () => {
	return `${Math.floor(Math.random() * (100 - 20 + 1) + 20)}%`;
};
</script>
