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
					:searchQuery="searchQuery" />
			</template>

			<cardTitle :title="data.thirdSection.title" class="mt-20" v-if="!searchQuery" />
			<template v-for="(item, index) in data.thirdSection.datas" :key="index">
				<Card
					:section="3"
					:index="index"
					:data="item.data"
					:title="item.title"
					:pageNumber="item.pageNumber"
					:searchQuery="searchQuery" />
			</template>
		</div>
	</div>
</template>

<script setup>
import { ref, inject } from "vue";

const isLoading = ref(true);
const { data: contentData } = await useAsyncData("grade-12", () => queryContent("/grade-12").findOne()).finally(() => {
	setTimeout(() => {
		isLoading.value = false;
	}, 300);
});

const data = contentData.value.datas;

const searchQuery = inject("searchQuery"); // injected from lexicon.vue

const extractTitles = (section) => section.datas.map((item) => item.title); //extract titles from raw data
const sideBar = ref({
	data: [
		{
			sectionTitle: data.firstSection.title,
			titles: [...extractTitles(data.firstSection)],
			sectionNumber: 1,
		},
		{
			sectionTitle: data.secondSection.title,
			titles: [...extractTitles(data.secondSection)],
			sectionNumber: 2,
		},
		{
			sectionTitle: data.thirdSection.title,
			titles: [...extractTitles(data.thirdSection)],
			sectionNumber: 3,
		},
	],
});

const totalFoundCount = useState("foundCount");
const combinedData = computed(() => {
	return data.firstSection.datas
		.flatMap((data) => data.data)
		.concat(data.secondSection.datas.flatMap((data) => data.data))
		.concat(data.thirdSection.datas.flatMap((data) => data.data));
});

onMounted(() => {
	if (searchQuery.value) updateFoundCount();
});

watch(searchQuery, () => {
	updateFoundCount();
});

const updateFoundCount = () => {
	totalFoundCount.value = combinedData.value.filter((item) =>
		item.toLowerCase().includes(searchQuery.value.toLowerCase())
	).length;
};

const logoData = useState("logoData");
logoData.value = ref({ text: "G-12", url: "/grade-12" });

const Sidebar = useState("sidebar");
Sidebar.value = sideBar;

definePageMeta({
	layout: "lexicon",
});
useHead({
	title: "G-12 | Lexicons",
});
</script>
