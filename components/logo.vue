<template>
	<NuxtLink :to="logoLink">
		<img :src="url" />
	</NuxtLink>
</template>

<script setup>
const props = defineProps({
	grade: { type: String, default: null },
	logoLink: { type: String, default: "/" },
});

const url = props.grade ? `/api/logo/${props.grade}` : "/api/logo";
</script>
