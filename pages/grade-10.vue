<template>
	<div class="mt-20 pb-5">
		<NotFound v-if="combinedData.length > 0 && totalFoundCount == 0 && searchQuery" />
		<titleSkeleton v-if="isLoading" />
		<CardSkeleton v-if="isLoading" />
		<div v-else>
			<cardTitle :title="data.firstSection.title" v-if="!searchQuery" />
			<template v-for="(item, index) in data.firstSection.datas" :key="index">
				<Card
					:section="1"
					:index="index"
					:data="item.data"
					:title="item.title"
					:pageNumber="item.pageNumber"
					:searchQuery="searchQuery" />
			</template>

			<cardTitle :title="data.secondSection.title" class="mt-20" v-if="!searchQuery" />
			<template v-for="(item, index) in data.secondSection.datas" :key="index">
				<Card
					:section="2"
					:index="index"
					:data="item.data"
					:title="item.title"
					:pageNumber="item.pageNumber"
					:searchQuery="searchQuery"
					@hook:mounted="checkIfLoopFinished(index)" />
			</template>
		</div>
	</div>
</template>

<script setup>
import { ref, inject } from "vue";

const isLoading = ref(true);
const { data } = await useAsyncData("grade-10", () => queryContent("/grade-10").findOne()).finally(() => {
	setTimeout(() => {
		isLoading.value = false;
	}, 300);
});

const searchQuery = inject("searchQuery"); // injected from lexicon.vue

const extractTitles = (section) => section.datas.map((item) => item.title); //extract titles from raw data
const sidebar = ref({
	firstSectionTitle: data.value.firstSection.title,
	secondSectionTitle: data.value.secondSection.title,
	titles: [...extractTitles(data.value.firstSection), ...extractTitles(data.value.secondSection)],
	sectionNumber: {
		firstSection: 1,
		secondSection: 2,
	},
});

const totalFoundCount = useState("foundCount");
const combinedData = computed(() => {
	return data.value.firstSection.datas
		.flatMap((data) => data.data)
		.concat(data.value.secondSection.datas.flatMap((data) => data.data));
});

watch(searchQuery, () => {
	totalFoundCount.value = combinedData.value.filter((item) =>
		item.toLowerCase().includes(searchQuery.value.toLowerCase())
	).length;
});

const logoData = useState("logoData");
logoData.value = ref({ text: "G-10", url: "/grade-10" });

useState("sidebar", () => sidebar);
definePageMeta({
	layout: "lexicon",
});
useHead({
	title: "G-10 | Lexicons",
});
</script>
