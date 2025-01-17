<template>
	<transition>
		<div
			v-if="isActive"
			class="fixed left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] z-50 grid md:w-full w-[98%] max-w-lg gap-4 p-6 duration-200 rounded-lg bg-[#121c24] border border-[#22323e] text-white">
			<div class="flex flex-col space-y-1.5 text-left">
				<h2 class="tracking-tight text-xl font-medium">Export for {{ data.title }}</h2>
				<p class="text-sm text-gray-400">Follow these steps to export your flash cards</p>
			</div>
			<div class="mt-4 space-y-4">
				<ol class="space-y-4 list-inside list-decimal bg-[#292e42] p-4 rounded-md text-sm text-gray-300">
					<li v-for="(step, index) in data.steps" :key="index">{{ step }}</li>
				</ol>
				<div class="flex justify-between items-center">
					<div class="flex items-center text-sm text-gray-400">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="20"
							height="20"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="2"
							stroke-linecap="round"
							stroke-linejoin="round">
							<circle cx="12" cy="12" r="10"></circle>
							<line x1="12" x2="12" y1="8" y2="12"></line>
							<line x1="12" x2="12.01" y1="16" y2="16"></line>
						</svg>
						<span class="ms-2">Copy the data to import</span>
					</div>
					<button
						@click="copyToClipboard(grade)"
						class="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-normal transition-colors focus-visible:outline-none border hover:text-accent-foreground h-9 rounded-md px-3 bg-[#292e42] text-white hover:bg-[#343a56] border-[#343a56]">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="20"
							height="20"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="2"
							stroke-linecap="round"
							stroke-linejoin="round">
							<rect width="14" height="14" x="8" y="8" rx="2" ry="2"></rect>
							<path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"></path>
						</svg>
						Copy
					</button>
				</div>
			</div>
			<button
				type="button"
				@click="updateIsActive(false)"
				class="absolute right-4 top-4 rounded-sm opacity-70 transition-opacity hover:opacity-100">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="24"
					height="24"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round">
					<path d="M18 6 6 18"></path>
					<path d="m6 6 12 12"></path>
				</svg>
			</button>
		</div>
	</transition>
	<Toaster
		position="top-center"
		:toastOptions="{
			style: { background: '#374151', color: 'white', border: 'none' },
			class: 'my-toast',
			descriptionClass: 'my-toast-description',
		}" />
	<div :class="isActive ? 'active' : ''" class="backdrop" @click="updateIsActive(false)"></div>
</template>

<script setup>
const { $toast } = useNuxtApp();

const props = defineProps({
	data: { type: Object },
	grade: { type: String },
	isActive: { type: Boolean },
});

const emit = defineEmits(["update:isActive"]);

const updateIsActive = (value) => {
	emit("update:isActive", value);
};

document.addEventListener("keydown", (event) => {
	if (event.key === "Escape") {
		emit("update:isActive", false);
	}
});

const copyToClipboard = async (grade) => {
	const { data: contentData } = await useAsyncData(`grade-${grade}`, () => queryContent(`/grade-${grade}`).findOne());
	let data = "";
	if (grade < 10) {
		data = contentData.value.datas
			.flatMap((data) => data.data)
			.map((item) => item.replace(" = ", "\t"))
			.join("\n");
	} else {
		data = contentData.value.datas;
		data = Object.keys(data)
			.filter((key) => data[key].datas)
			.flatMap((key) => data[key].datas.flatMap((item) => item.data))
			.map((item) => item.replace(" = ", "\t"))
			.join("\n");
	}

	navigator.clipboard.writeText(data).then(() => {
		$toast.success("Copied to clipboard");
	});
};
</script>

<style scoped>
.backdrop {
	height: 0;
	opacity: 0;
	transition: opacity 0.5s ease, height 0s ease 0.5s;
	@apply fixed inset-0 z-30 bg-[#0a1116d8] backdrop-blur-sm;

	&.active {
		opacity: 1;
		height: 100dvh;
		transition: opacity 0.5s ease, height 0s ease;
	}
}

.v-enter-active,
.v-leave-active {
	transition: all 0.5s ease;
	transform: translate(-50%, -50%);
}

.v-enter-from,
.v-leave-to {
	transform: translate(-50%, -47%);
	opacity: 0;
}

.v-leave-to {
	transform: translate(-50%, -53%);
}

li::marker {
	color: rgb(107 114 128);
}
</style>
