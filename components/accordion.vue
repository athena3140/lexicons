<!-- <template>
	<div>
		<template v-for="(data, index) in data" :key="index">
			<div class="border-b border-gray-600">
				<button @click="toggleAccordion(index)" class="w-full flex justify-between items-center py-5 text-white">
					<span>{{ data.q }}</span>

					<span class="text-white">
						<svg
							v-if="current == index && isActive"
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
				<div :id="index" class="max-h-0 overflow-hidden transition-all duration-300 ease-in-out">
					<div class="pb-5 text-sm text-white">
						{{ data.a }}
					</div>
				</div>
			</div>
		</template>
	</div>
</template>

<script setup>
import { ref } from "vue";
const data = [
	{
		q: "Why you build this?",
		a: "To cheat on test for fedral students.",
	},
	{
		q: "Is there any Faq?",
		a: "Well, Here it is.",
	},
	{
		q: "Any api endpoint for your data?",
		a: "Yes!",
	},
	{
		q: "Any Pdf support just like in Grade-10?",
		a: "Still thinking about it.",
	},
];

const current = ref();
const isActive = ref(false);

function toggleAccordion(index) {
	current.value = index;
	const content = document.getElementById(`${index}`);

	if (content.style.maxHeight && content.style.maxHeight !== "0px") {
		content.style.maxHeight = "0";
		isActive.value = false;
	} else {
		content.style.maxHeight = content.scrollHeight + "px";
		isActive.value = true;
	}
}
</script> -->

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
					<div class="pb-5 text-sm text-white">
						{{ item.a }}
					</div>
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
		a: "Yep, this is it. Simple and straight to the point.",
	},
	{
		q: "Does this app have API endpoints?",
		a: "Sure does! Check them out in the 'Developers' section.",
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
		a: "Easy! Just hit the 'Report' button up top and let me know what's up.",
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
