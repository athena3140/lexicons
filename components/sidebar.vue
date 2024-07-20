<template>
	<aside
		:style="{ height: sidebarHeight + 'px' }"
		:class="{
			'translate-x-0': isOpen,
			'min-h-svh ': !loaded,
		}"
		class="px-3 pb-4 overflow-y-auto fixed md:translate-x-0 -translate-x-full left-0 z-40 transition duration-300 bg-[#121C24]">
		<div class="pt-10">
			<div v-for="i in 2" v-if="!loaded" class="mb-10 flex items-end flex-col">
				<div class="skeleton w-full h-9 mb-5"></div>
				<div class="skeleton w-[90%] h-7 mb-3" v-for="i in 10"></div>
			</div>
			<p class="sideTitle" v-if="loaded && sidebar.firstSectionTitle">{{ sidebar.firstSectionTitle }}</p>
			<ol class="font-medium list-decimal list-outside">
				<NuxtLink
					:to="`#1-${index + 1}`"
					v-for="(section, index) in sidebar && sidebar.sections.slice(0, 10)"
					:key="index">
					<li class="sideItem">
						<span>{{ section }}</span>
					</li>
				</NuxtLink>
			</ol>
			<p class="sideTitle mt-10" v-if="loaded && sidebar.secondSectionTitle">
				{{ sidebar.secondSectionTitle }}
			</p>
			<ol class="font-medium list-decimal list-outside">
				<NuxtLink
					:to="`#2-${index + 1}`"
					v-for="(section, index) in sidebar && sidebar.sections.slice(10, 20)"
					:key="index">
					<li class="sideItem">
						<span>{{ section }}</span>
					</li>
				</NuxtLink>
			</ol>
		</div>
	</aside>
</template>

<script setup>
import { onMounted, ref } from "vue";

const props = defineProps({
	isOpen: { type: Boolean, required: true },
});

const sidebar = useState("sidebar");
const sidebarHeight = ref(0);
const navHeight = ref(0);
const loaded = ref(false);

const changeSidebarHeight = () => {
	navHeight.value = document.querySelector("nav").offsetHeight;
	sidebarHeight.value = window.innerHeight - navHeight.value;
};

onMounted(() => {
	sidebar ? (loaded.value = true) : false;
	changeSidebarHeight();
	window.addEventListener("resize", changeSidebarHeight);
});
</script>

<style scoped>
li::marker {
	color: rgb(107 114 128);
	font-size: 12px;
}
</style>
