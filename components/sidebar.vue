<template>
	<aside
		:style="{ height: sidebarHeight + 'px' }"
		:class="{
			'translate-x-0': isOpen,
			'min-h-svh ': !loaded,
			bordered: loaded && sidebar.isBorder,
		}"
		class="px-3 pb-4 overflow-y-auto sidebar fixed md:translate-x-0 -translate-x-full left-0 z-30 transition duration-300 bg-[#121c24d5] backdrop-blur-lg">
		<div class="pt-10">
			<!-- Skeleton -->
			<div v-for="i in 2" v-if="!loaded" class="mb-10 flex items-end flex-col">
				<div class="skeleton w-full h-9 mb-5"></div>
				<div class="skeleton w-[90%] h-7 mb-3" v-for="i in 10"></div>
			</div>

			<template v-if="loaded">
				<div v-for="data in sidebar.data" class="mb-10">
					<p class="sideTitle" v-if="data.sectionTitle">{{ data.sectionTitle }}</p>

					<div class="sideItem" v-for="(titles, index) in data.titles" :key="index">
						<a @click.prevent="goToSection" :href="getToHerf(data, index)">
							<div class="number">{{ convertDigits(index + 1) }}။</div>
							{{ titles }}
						</a>
					</div>
				</div>
			</template>
		</div>
	</aside>
</template>

<script setup>
import { onMounted, ref } from "vue";

const props = defineProps({
	isOpen: { type: Boolean, required: true },
});

const emit = defineEmits(["update:isOpen"]);

const sidebar = useState("sidebar");
const sidebarHeight = ref(0);
const navHeight = ref(0);
const loaded = ref(false);

const getToHerf = (data, index) => {
	index = index + 1;
	const isSectionTitle = "sectionNumber" in data;
	const href = isSectionTitle ? `#${data.sectionNumber}-${index}` : `#${index}`;
	return href;
};

const changeSidebarHeight = () => {
	navHeight.value = document.querySelector("nav").offsetHeight;
	sidebarHeight.value = window.innerHeight - navHeight.value;
};

const goToSection = (event) => {
	if (props.isOpen) emit("update:isOpen", false);

	setTimeout(() => {
		const href = event.target.getAttribute("href");
		document.getElementById(href.slice(1)).scrollIntoView({
			behavior: "smooth",
		});
		window.history.pushState(null, "", href);
	}, 10);
};

const convertDigits = (num) => num.toString().replace(/[0-9]/g, (d) => "၀၁၂၃၄၅၆၇၈၉"[d]);

onMounted(() => {
	sidebar.value ? (loaded.value = true) : false;
	changeSidebarHeight();
	window.addEventListener("resize", changeSidebarHeight);
});
</script>

<style scoped>
.bordered {
	@apply border-0 md:border-r-2 border-gray-500;
}

@keyframes animate-in-and-out {
	entry 0% {
		opacity: 0;
		transform: translateY(100%);
	}
	entry 100% {
		opacity: 1;
		transform: translateY(0);
	}

	exit 0% {
		opacity: 1;
		transform: translateY(0);
	}
	exit 100% {
		opacity: 0;
		transform: translateY(-100%);
	}
}

.sideItem {
	animation: linear animate-in-and-out;
	animation-timeline: view();
}
</style>
