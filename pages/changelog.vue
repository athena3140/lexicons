<template>
	<main class="min-h-screen relative">
		<div class="flex justify-center items-center flex-col mt-32 gap-2">
			<NuxtLink
				to="/changelog"
				class="font-geist title whitespace-pre-wrap bg-gradient-to-b bg-clip-text text-center text-8xl font-semibold text-transparent dark:from-white dark:to-slate-800/10">
				Changelogs
			</NuxtLink>
		</div>
		<section class="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 pb-10 overflow-hidden mt-40">
			<ChangelogPost
				v-for="(post, index) in data"
				:key="index"
				:content="post"
				:class="{ lastContent: index == data.length - 1 }" />
		</section>
	</main>
</template>

<script setup>
definePageMeta({
	layout: "empty",
});
const { data } = await useAsyncData("feed", () => queryContent("/changelog").find());
</script>

<style scoped>
.title {
	animation: pull-up 0.5s ease forwards;
}
@keyframes pull-up {
	0% {
		opacity: 0;
		transform: translateY(20px);
	}
	100% {
		opacity: 1;
		transform: translateY(0);
	}
}
</style>
