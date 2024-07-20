<template>
	<nav
		id="nav"
		class="sticky top-0 z-20 flex justify-between items-center lg:px-5 md:px-5 sm:px-5 px-3 md:py-4 py-3 border-b text-white border-gray-700 bg-[#121C24]">
		<logo :logo-link="'/grade-10'" :grade="'G-10'" class="md:w-40 sm:w-36 w-32" />
		<div class="flex items-center justify-end gap-2">
			<div
				class="rounded relative flex items-center sm:px-2 sm:py-2 px-2 py-1 md:w-72 sm:w-full w-[70%] bg-[#ffffff] text-gray-600">
				<label for="search">
					<svg
						width="16"
						height="16"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round">
						<circle cx="11" cy="11" r="8"></circle>
						<path d="m21 21-4.3-4.3"></path>
					</svg>
				</label>
				<input
					autocomplete="off"
					v-model="searchQuery"
					id="search"
					type="search"
					placeholder="Search"
					class="border-0 outline-0 bg-transparent sm:ps-2 ps-1 w-full placeholder:text-gray-500 placeholder:ps-[1px]" />
				<div class="foundCount" :class="{ active: searchQuery != '' }" hydrate="false">
					Found : <span class="text-[#00ffff]">{{ foundCount }}</span>
				</div>
			</div>
			<hamburger @click="toggle" :isOpen="isOpen" class="md:hidden cursor-pointer" />
		</div>
	</nav>

	<main class="flex justify-end">
		<Sidebar :isOpen="isOpen" class="lg:w-[23%] md:w-[30%] sm:w-[50%] w-full" />
		<div
			:style="{
				height: getHeight,
			}"
			@click="isOpen ? (isOpen = false) : null"
			class="transition-all duration-300 content md:p-5 px-2 py-5 lg:w-[77%] md:w-[70%] w-full mt-20"
			:class="{ 'sm:blur-[3px] select-none overflow-hidden h-svh': isOpen }">
			<slot />
			<div
				class="contact flex flex-col items-center justify-center relative font-body mt-24 mb-16 text-white"
				v-show="foundCount == 0">
				<div>If you spot any data errors,</div>
				<div>kindly <a class="relative" href="mailto:athena3140@gmail.com">contact me!</a></div>
			</div>
		</div>
	</main>
</template>

<script setup>
import { ref, onMounted, computed, provide } from "vue";
import { useRoute, useRouter } from "vue-router";
const route = useRoute();
const searchQuery = ref(route.query.s || "");
const router = useRouter();
watch(searchQuery, (newValue) => {
	router.replace({ query: { s: newValue } });
});
provide("searchQuery", searchQuery);

const isOpen = ref(false);
const mainPadding = ref(0);
const height = ref(0);
const foundCount = useState("foundCount");

const toggle = () => (isOpen.value = !isOpen.value);
const resize = () => {
	mainPadding.value = document.querySelector("aside").offsetWidth;
	height.value = window.innerHeight - document.querySelector("nav").offsetHeight;
	window.innerWidth > 768 ? (isOpen.value = false) : null;
	document.documentElement.style.setProperty("--scroll-padding", `${document.getElementById("nav").offsetHeight + 15}px`);
};
const getHeight = computed(() => {
	return isOpen.value ? `${height.value}px` : null;
});

onMounted(() => {
	resize();
	window.addEventListener("resize", resize);
});
</script>

<style scoped>
input[type="search"]::-webkit-search-cancel-button {
	-webkit-appearance: none;
	height: 24px;
	width: 24px;
	margin-left: 0.4em;
	background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23777'><path d='M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z'/></svg>");
	cursor: pointer;
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
	animation-range-start: cover;
	animation-range-end: 125px;
	transform: translateY(1rem) scale(0.5);
	opacity: 0;
}

main {
	scroll-padding: 100px;
}

@keyframes move {
	100% {
		transform: translateY(0) scale(1);
		opacity: 1;
	}
}
</style>
