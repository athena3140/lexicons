<template>
	<div>
		<NotFound v-if="combinedData.length > 0 && totalFoundCount == 0 && searchQuery" />
		<CardSkeleton v-if="isLoading" />
		<template v-else v-for="(item, index) in data.datas" :key="index">
			<Card
				:index="index"
				:data="item.data"
				:title="item.title"
				:pageNumber="item.pageNumber"
				:searchQuery="searchQuery" />
		</template>
	</div>
</template>

<script setup>
import { ref, inject } from "vue";

const isLoading = ref(true);
const { data } = await useAsyncData("grade-5", () => queryContent("/grade-5").findOne()).finally(() => {
	setTimeout(() => {
		isLoading.value = false;
	}, 300);
});
const searchQuery = inject("searchQuery"); // inject from lexicon.vue

const extractTitles = (section) => section.map((item) => item.title); //extract titles from raw data
const sideBar = ref({
	isBorder: true,
	titles: [...extractTitles(data.value.datas)],
});

const totalFoundCount = useState("foundCount");
const combinedData = computed(() => {
	return data.value.datas.flatMap((data) => data.data);
});

watch(searchQuery, () => {
	totalFoundCount.value = combinedData.value.filter((item) =>
		item.toLowerCase().includes(searchQuery.value.toLowerCase())
	).length;
});

const logoData = useState("logoData");
logoData.value = ref({ text: "G-5", url: "/grade-5" });

useState("sidebar", () => sideBar);

definePageMeta({
	layout: "lexicon",
});
useHead({
	title: "G-5 | Lexicons",
});
</script>
