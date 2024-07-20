<template>
	<div>
		<NotFound v-if="combinedData.length > 0 && totalFoundCount == 0 && searchQuery" />
		<CardSkeleton :status="!data" />

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
				:searchQuery="searchQuery" />
		</template>
	</div>
</template>

<script setup>
import { ref, inject } from "vue";

const searchQuery = inject("searchQuery");

const { data } = await useFetch("/api/grade-10");
const extractTitles = (section) => section.datas.map((item) => item.title);
const titlesArray = ref({
	firstSectionTitle: data.value.firstSection.title,
	secondSectionTitle: data.value.secondSection.title,
	sections: [...extractTitles(data.value.firstSection), ...extractTitles(data.value.secondSection)],
});

const totalFoundCount = ref(0);
const combinedData = computed(() => {
	return data.value.firstSection.datas
		.flatMap((data) => data.data)
		.concat(data.value.secondSection.datas.flatMap((data) => data.data));
});

watch(searchQuery, () => {
	totalFoundCount.value = combinedData.value.filter((item) =>
		item.toLowerCase().includes(searchQuery.value.toLowerCase())
	).length;
	useState("foundCount", () => totalFoundCount);
});
useState("foundCount", () => totalFoundCount);

useState("sidebar", () => titlesArray);
definePageMeta({
	layout: "lexicon",
});
useHead({
	title: "G-10 | Lexicons",
	link: [
		{
			rel: "icon",
			href: "https://www.youtube.com/s/desktop/92fdfad2/img/favicon_32x32.png",
		},
	],
});
</script>
