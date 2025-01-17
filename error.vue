<template>
	<div>
		<div class="w-full h-lvh grid place-items-center text-base text-gray-300">
			{{ error?.statusCode }} | {{ error?.statusCode == 404 ? "Not Found" : error?.statusMessage }}
		</div>
	</div>
</template>

<script setup lang="ts">
import type { NuxtError } from "#app";

const props = defineProps({
	error: Object as () => NuxtError,
});
</script>
