<template>
	<main class="min-h-screen relative">
		<div class="flex justify-center items-center flex-col mt-32 gap-2">
			<NuxtLink
				to="/changelog"
				class="bg-gradient-to-r from-[#f492f0] to-primary-600 overflow-visible leading-[3] pb-4 bg-clip-text text-transparent lg:text-6xl md:text-5xl text-4xl font-changelog font-semibold cursor-pointer transition-all">
				Changelogs
			</NuxtLink>
		</div>
		<section class="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 overflow-hidden mt-20">
			<ChangelogPost v-for="post in data" :content="post" />
		</section>
	</main>
</template>

<script setup>
definePageMeta({
	layout: "empty",
});
const { data } = await useAsyncData("feed", () => queryContent("/changelog").find());
</script>
