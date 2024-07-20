<template>
	<div class="2xl:w-[1536px] mx-auto">
		<header
			class="lg:px-20 md:px-5 sm:px-5 sticky top-0 z-50 px-5 md:py-4 py-3 border-b border-gray-700 text-white bg-[#121c24]">
			<nav class="flex justify-between items-center relative">
				<logo :logo-link="'/'" class="md:w-48 sm:w-36 w-32" />
				<ul class="hidden gap-4 md:flex">
					<li><NuxtLink to="/">Home</NuxtLink></li>
					<li><NuxtLink to="/">About</NuxtLink></li>
					<li><NuxtLink to="/">Products</NuxtLink></li>
				</ul>
				<div :class="isOpen ? 'active' : null" class="w-full font-body menu absolute top-full left-0 z-10 md:hidden">
					<ul
						class="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
						<li>
							<a
								href="#"
								class="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white md:dark:text-blue-500"
								aria-current="page"
								>Home</a
							>
						</li>
						<li>
							<a
								href="#"
								class="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
								>About</a
							>
						</li>
						<li>
							<a
								href="#"
								class="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
								>Services</a
							>
						</li>
						<li>
							<a
								href="#"
								class="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
								>Pricing</a
							>
						</li>
						<li>
							<a
								href="#"
								class="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
								>Contact</a
							>
						</li>
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
	transform: translateY(40px) scale(0.9);
	transition: 0.3s all;
}

.menu.active {
	transform: translateY(20px) scale(1);
	opacity: 1;
	pointer-events: all;
}
</style>
