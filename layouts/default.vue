<template>
	<div class="2xl:w-[1536px] mx-auto">
		<header
			class="lg:px-20 md:px-5 sm:px-5 sticky top-0 z-50 px-5 md:py-4 py-3 border-b border-gray-700 text-white bg-[#121c24]">
			<nav class="flex justify-between items-center relative">
				<div class="md:w-48 sm:w-36 w-32">
					<NuxtLink to="/">
						<img :src="logoUrl" />
					</NuxtLink>
				</div>
				<ul class="hidden gap-4 md:flex">
					<li><NuxtLink to="/">Home</NuxtLink></li>
					<li><NuxtLink to="/changelog">Changelog</NuxtLink></li>
					<li><NuxtLink to="/">Products</NuxtLink></li>
				</ul>
				<div
					:class="isOpen ? 'active' : null"
					class="sm:w-[70%] w-full font-body menu absolute top-full left-1/2 z-10 md:hidden">
					<ul
						class="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg md:flex-row md:space-x-8 md:mt-0 md:border-0 dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
						<li>
							<NuxtLink to="/">Home</NuxtLink>
						</li>
						<li>
							<NuxtLink to="/changelog">Changelog</NuxtLink>
						</li>
						<li><NuxtLink to="/">Products</NuxtLink></li>
					</ul>
				</div>
				<hamburger @click="toggle" :isOpen="isOpen" class="md:hidden cursor-pointer" />
			</nav>
		</header>
		<main
			@click="isOpen ? (isOpen = false) : null"
			class="p-4 transition-all duration-300"
			:class="{ 'blur-[4px] select-none overflow-hidden h-svh': isOpen }">
			<slot />
		</main>
	</div>
</template>

<script setup>
import { ref } from "vue";

const isOpen = ref(false);
const toggle = () => (isOpen.value = !isOpen.value);
const logoUrl = ref("");

onMounted(() => {
	logoUrl.value = `${window.location.origin}/api/logo`;
});
</script>

<style>
.font-logo svg {
	transition: all 0s;
	transform: rotate(0deg);
}

.font-logo:hover svg {
	transition: all 0.3s ease-in-out;
	transform: rotate(180deg);
}

.menu {
	opacity: 0;
	pointer-events: none;
	transform: translateY(40px) scale(0.9) translateX(-50%);
	transition: 0.3s all;
}

.menu.active {
	transform: translateY(20px) scale(1) translateX(-50%);
	opacity: 1;
	pointer-events: all;
}

.menu ul li a {
	@apply block py-2 px-3 text-white rounded  md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0   hover:bg-gray-700 hover:text-white;
}

.menu ul li a.router-link-active {
	@apply hover:bg-blue-700 text-white bg-blue-700;
}
</style>
