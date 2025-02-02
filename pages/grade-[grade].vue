<template>
	<div :class="{ 'mt-20 pb-5': isLoading }">
		<NotFound v-if="combinedData.length > 0 && totalFoundCount == 0 && searchQuery" />
		<titleSkeleton v-if="isLoading && isGradeHighSchool" />
		<CardSkeleton v-if="isLoading" />

		<template v-else>
			<exportFlashCard :grade="grade" />
			<downloadPdfCard :grade="grade" v-if="!searchQuery" />

			<template v-if="isGradeHighSchool">
				<template v-for="(section, sectionIndex) in Object.values(data)" :key="sectionIndex">
					<cardTitle :title="section.title" v-if="!searchQuery" :class="{ 'mt-20': sectionIndex > 0 }" />
					<template v-for="(item, index) in section.datas" :key="index">
						<Card
							:section="sectionIndex + 1"
							:index="index"
							:data="item.data"
							:title="item.title"
							:pageNumber="item.pageNumber"
							:searchQuery="searchQuery" />
					</template>
				</template>
			</template>

			<template v-else v-for="(item, index) in data" :key="index">
				<Card
					:index="index"
					:data="item.data"
					:title="item.title"
					:pageNumber="item.pageNumber"
					:searchQuery="searchQuery" />
			</template>

			<div
				v-if="!isLoading"
				class="contact flex flex-col items-center justify-center relative font-body mt-24 mb-16 text-white">
				<div>If you spot any data errors,</div>
				<div>kindly <NuxtLink class="relative" to="/report">report to me!</NuxtLink></div>
			</div>
		</template>
	</div>
</template>

<script setup>
import { ref, inject } from "vue";
const route = useRoute();
const grade = route.params.grade;
let isGradeHighSchool = grade >= 10;
let isNUGCourse = false;
if (grade == "12-nug") {
	isGradeHighSchool = true;
	isNUGCourse = true;
}

const isLoading = ref(true); // set isLoading
const { data: contentData } = await useAsyncData(`grade-${grade}`, () => queryContent(`/grade-${grade}`).findOne()).finally(
	() => {
		setTimeout(() => {
			isLoading.value = false;
		}, 300);
	}
);

if (contentData.value == null) {
	throw createError({
		statusCode: 404,
		statusMessage: "Not Found",
	});
}

const data = contentData.value.datas; // make data

const searchQuery = inject("searchQuery"); // inject from lexicon.vue

const extractTitles = (section) => (section.datas || section).map((item) => item.title);
const sideBar = ref({});
if (isGradeHighSchool) {
	sideBar.value.data = Object.keys(data).map((key, index) => {
		const section = data[key];
		return {
			sectionTitle: section.title,
			titles: [...extractTitles(section)],
			sectionNumber: index + 1,
		};
	});
} else {
	sideBar.value = {
		isBorder: grade == 5 ? true : false,
		data: [
			{
				titles: [...extractTitles(data)],
			},
		],
	};
}

const totalFoundCount = useState("foundCount");
const combinedData = computed(() => {
	let tempData = {};
	if (isGradeHighSchool) {
		tempData = Object.keys(data)
			.filter((key) => data[key].datas)
			.flatMap((key) => data[key].datas.flatMap((item) => item.data));
	} else {
		tempData = data.flatMap((data) => data.data);
	}

	return tempData;
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
logoData.value = ref({ text: `G-${isNUGCourse ? "12 NUG" : grade}`, url: `/grade-${grade}` });

const Sidebar = useState("sidebar");
Sidebar.value = sideBar;

const isModalActive = ref(false);
const updateIsActive = (value) => {
	isModalActive.value = value;
	document.body.style.overflow = isModalActive.value ? "hidden" : "auto";
};
const currentModalData = ref({});
const openModal = (mode) => {
	isModalActive.value = true;
	document.body.style.overflow = isModalActive.value ? "hidden" : "auto";

	if (mode == "knowt") {
		currentModalData.value = {
			title: "Knowt",
			steps: [
				"Click the button below to copy the data.",
				"Open knowt.com in your browser.",
				"Click the “+” icon and select “Import Manually.”",
				"Paste the copied data, and import.",
				"Add a title and description, then Create.",
			],
		};
	}

	if (mode == "quizlet") {
		currentModalData.value = {
			title: "Quizlet",
			steps: [
				"Click the button below to copy the data.",
				"Open quizlet.com in your browser.",
				"Click the “+” icon and select “Flashcard Set.”",
				"Click “Import” paste the copied data, and confirm.",
				"Add a title and description, then Create.",
			],
		};
	}
};

definePageMeta({
	layout: "lexicon",
});
useHead({
	title: `G-${isNUGCourse ? "12 NUG" : grade} | Lexicons`,
});
</script>

<style>
.exportCard {
	button {
		@apply rounded-md focus:outline-none text-sm font-medium h-10 px-4 py-2 bg-gray-800 hover:bg-gray-700 hover:border-gray-600 transition border-gray-700 border text-white;
	}
}

.contact a:after {
	content: "";
	width: 100%;
	height: 50%;
	position: absolute;
	bottom: -45%;
	right: 0;
	z-index: 1;
	background-repeat: no-repeat;
	background-image: url("../assets/images/underline.svg");
}

.contact {
	animation: move linear forwards;
	animation-timeline: view();
	animation-range: -100px 30px;
	transform: translateY(1rem) scale(0.9);
	opacity: 0;
}

@keyframes move {
	100% {
		transform: translateY(0) scale(1);
		opacity: 1;
	}
}
</style>
