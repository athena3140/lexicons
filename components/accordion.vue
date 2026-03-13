<template>
	<div>
		<template v-for="(item, index) in data" :key="index">
			<div class="border-b border-gray-600">
				<button @click="toggleAccordion(index)" class="w-full flex justify-between items-center py-5 text-white">
					<span>{{ item.q }}</span>

					<span class="text-white">
						<svg
							v-if="current === index"
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 16 16"
							fill="currentColor"
							class="w-4 h-4">
							<path d="M3.75 7.25a.75.75 0 0 0 0 1.5h8.5a.75.75 0 0 0 0-1.5h-8.5Z" />
						</svg>
						<svg
							v-else
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 16 16"
							fill="currentColor"
							class="w-4 h-4">
							<path
								d="M8.75 3.75a.75.75 0 0 0-1.5 0v3.5h-3.5a.75.75 0 0 0 0 1.5h3.5v3.5a.75.75 0 0 0 1.5 0v-3.5h3.5a.75.75 0 0 0 0-1.5h-3.5v-3.5Z" />
						</svg>
					</span>
				</button>
				<div
					ref="contentRefs"
					class="overflow-hidden transition-all duration-300 ease-in-out"
					:style="{ maxHeight: current === index ? contentHeights[index] + 'px' : '0px' }">
					<div class="pb-5 text-sm text-white" v-html="item.a"></div>
				</div>
			</div>
		</template>
	</div>
</template>

<script setup>
import { ref, onMounted, nextTick } from "vue";

const data = [
	{
		q: "Why’d you build this web app?",
		a: "To make it easier to cheat and breeze through online classes. You’re welcome.",
	},
	{
		q: "Is there a Q&A section?",
		a: "Yep, this is it.",
	},
	{
		q: "Does this app have API endpoints?",
		a: "Sure does! Check them out in the <code class='bg-gray-800 px-1'>Developers</code> section.",
	},
	{
		q: "Will there be PDF support, like for Grade 10?",
		a: "Maybe! Still figuring that out, so stay tuned.",
	},
	{
		q: "How often do you update the app?",
		a: "Whenever I feel like it. But I try to keep things running smoothly.",
	},
	{
		q: "How do I report a bug or issue?",
		a: "Easy! Just hit the <code class='bg-gray-800 px-1'>Report</code> button up top and let me know what's up.",
	},
	{
		q: "How accurate is the data provided?",
		a: "I do my best to keep things legit, but if you spot something off, holler at me!",
	},
];

const current = ref(null);
const contentHeights = ref([]);
const contentRefs = ref([]);

onMounted(async () => {
	await nextTick();
	contentRefs.value.forEach((content, index) => {
		contentHeights.value[index] = content.scrollHeight;
	});
});

function toggleAccordion(index) {
	current.value = current.value === index ? null : index;
}
</script>
1
