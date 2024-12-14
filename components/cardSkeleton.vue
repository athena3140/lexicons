<template>
	<div v-for="(width, index) in widths" :key="index" class="card mt-16">
		<div class="skeleton h-9 mb-6" :style="{ width: width }"></div>
		<div class="grid gap-2">
			<div
				v-for="(w, i) in skeletonWidths"
				:key="i"
				class="skeleton h-5"
				:style="{ width: w, animationDelay: `${0.2 + i * 0.1}s` }"></div>
		</div>
		<div class="pageNumber skeleton w-20 h-5" style="animation-delay: 0.8s"></div>
	</div>
</template>

<script setup>
import { ref, onMounted } from "vue";

const props = defineProps({
	status: { type: Boolean },
});

const widths = ref([]);
const skeletonWidths = ref([]);

const generateRandomWidths = (count) => {
	return Array.from({ length: count }, () => `${Math.floor(Math.random() * (100 - 20 + 1) + 20)}%`);
};

onMounted(() => {
	widths.value = generateRandomWidths(3);
	skeletonWidths.value = generateRandomWidths(6);
});
</script>
