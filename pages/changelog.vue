<template>
	<main class="min-h-screen relative">
		<Heading :path="'/changelog'" :title="'Changelog'" />
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
