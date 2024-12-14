<template>
	<div>
		<NotFound v-if="combinedData.length > 0 && totalFoundCount == 0 && searchQuery" />
		<CardSkeleton v-if="isLoading" />
		<template v-else v-for="(item, index) in data" :key="index">
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
const { data: contentData } = await useAsyncData("grade-5", () => queryContent("/grade-5").findOne()).finally(() => {
	setTimeout(() => {
		isLoading.value = false;
	}, 300);
});

const data = contentData.value.datas;

const searchQuery = inject("searchQuery"); // inject from lexicon.vue

const extractTitles = (section) => section.map((item) => item.title); //extract titles from raw data
const sideBar = ref({
	isBorder: true,
	data: [
		{
			titles: [...extractTitles(data)],
		},
	],
});

const totalFoundCount = useState("foundCount");
const combinedData = computed(() => {
	return data.flatMap((data) => data.data);
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
logoData.value = ref({ text: "G-5", url: "/grade-5" });

const Sidebar = useState("sidebar");
Sidebar.value = sideBar;

definePageMeta({
	layout: "lexicon",
});
useHead({
	title: "G-5 | Lexicons",
});
</script>
