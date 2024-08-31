<template>
	<div>
		<div v-if="!loaded" class="skeleton lg:h-11 md:h-10 sm:h-9 h-9 w-30"></div>
		<div v-else>
			<NuxtLink :to="logoData.url">
				<img :src="logoUrl" />
			</NuxtLink>
		</div>
	</div>
</template>

<script setup>
import { onMounted, ref } from "vue";

const logoData = useState("logoData");
const loaded = ref(false);
const logoUrl = ref("");

onMounted(() => {
	logoData ? (loaded.value = true) : null;
	const prefix = window.location.origin;
	logoUrl.value = logoData.value.text ? `${prefix}/api/logo/${logoData.value.text}` : `${prefix}/api/logo`;
});
</script>
