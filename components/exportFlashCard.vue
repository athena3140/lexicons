<template>
	<div>
		<modal :isActive="isModalActive" :grade="grade" :data="currentModalData" @update:isActive="updateIsActive($event)" />
		<div class="export" ref="popupRef">
			<button @click="togglePopup()">
				<svg class="scroll-indicator" xmlns="http://www.w3.org/2000/svg">
					<circle class="track" r="45%" cx="50%" cy="50%" />
					<circle :stroke-dashoffset="dashoffset" class="progress" r="45%" cx="50%" cy="50%" />
				</svg>
				<svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 24 24">
					<path
						fill="#fff"
						d="M19 17.7v1.8q0 .2.15.35t.35.15t.35-.15t.15-.35v-3q0-.2-.15-.35T19.5 16h-3q-.2 0-.35.15t-.15.35t.15.35t.35.15h1.8l-2.45 2.45q-.15.15-.15.35t.15.35t.35.15t.35-.15zM18 23q-2.075 0-3.537-1.463T13 18t1.463-3.537T18 13t3.538 1.463T23 18t-1.463 3.538T18 23M8 9h8q.425 0 .713-.288T17 8t-.288-.712T16 7H8q-.425 0-.712.288T7 8t.288.713T8 9M5 21q-.825 0-1.412-.587T3 19V5q0-.825.588-1.412T5 3h14q.825 0 1.413.588T21 5v5.45q0 .45-.375.7t-.8.1q-.425-.125-.888-.188T18 11q-.275 0-.513.013t-.487.062q-.225-.05-.5-.062T16 11H8q-.425 0-.712.288T7 12t.288.713T8 13h5.125q-.45.425-.812.925T11.675 15H8q-.425 0-.712.288T7 16t.288.713T8 17h3.075q-.05.25-.062.488T11 18q0 .5.05.95t.175.875t-.125.8t-.675.375z" />
				</svg>
			</button>
			<div class="popOver" :class="{ active: isPopupOpen }">
				<button @click="toggleModal('quizlet')">Export for Quizlet</button>
				<div class="line"></div>
				<button @click="toggleModal('knowt')">Export for Knowt</button>
			</div>
		</div>
	</div>
</template>

<script setup>
import { ref, onMounted, useTemplateRef, onUnmounted } from "vue";

const props = defineProps({
	grade: { type: String },
});

const dashoffset = ref(142);
const popupRef = useTemplateRef("popupRef");

onMounted(() => {
	window.addEventListener("scroll", updateDashoffset);
	document.addEventListener("click", handleOutsideClick);
});

onUnmounted(() => {
	window.removeEventListener("scroll", updateDashoffset);
	document.removeEventListener("click", handleOutsideClick);
});

const updateDashoffset = () => {
	const { clientHeight, scrollHeight, scrollTop } = document.documentElement;
	dashoffset.value = 142 - 142 * (scrollTop / (scrollHeight - clientHeight));
};

const isPopupOpen = ref(false);
const togglePopup = () => (isPopupOpen.value = !isPopupOpen.value);

const isModalActive = ref(false);
const updateIsActive = (value) => {
	isModalActive.value = value;
	document.body.style.overflow = isModalActive.value ? "hidden" : "auto";
};
const currentModalData = ref({});
const toggleModal = (mode) => {
	isPopupOpen.value = false;
	isModalActive.value = !isModalActive.value;
	document.body.style.overflow = isModalActive.value ? "hidden" : "auto";

	if (mode == "knowt") {
		currentModalData.value = {
			title: "Knowt",
			steps: [
				"Click the button below to copy the data.",
				"Open knowt.com in your browser.",
				"Click the “+” icon and select “Import Manually.”",
				"Paste the copied data, and import.",
				"Add a title and description, then Create.",
			],
		};
	}

	if (mode == "quizlet") {
		currentModalData.value = {
			title: "Quizlet",
			steps: [
				"Click the button below to copy the data.",
				"Open quizlet.com in your browser.",
				"Click the “+” icon and select “Flashcard Set.”",
				"Click “Import” paste the copied data, and confirm.",
				"Add a title and description, then Create.",
			],
		};
	}
};

const handleOutsideClick = (event) => {
	const popupElement = popupRef.value;
	if (!popupElement) return;

	if (!popupElement.contains(event.target)) {
		isPopupOpen.value = false;
	}
};
</script>

<style scoped>
.popOver {
	@apply absolute border border-gray-700 text-white transition-all top-[-6.5rem] -right-1 opacity-0 pointer-events-none bg-gray-800 px-1 py-1 rounded w-44 flex flex-col gap-1;

	&.active {
		@apply opacity-100 pointer-events-auto -top-28 right-0;
	}

	.line {
		@apply w-full h-[1px] bg-gray-600;
	}

	button {
		@apply rounded-md focus:outline-none text-sm font-medium h-10 px-2 py-1 hover:bg-gray-700 transition border-gray-800 border text-white;
	}
}

.export {
	position: fixed;
	transition: 0.3s all;
	z-index: 20;
	bottom: 1rem;
	right: 1rem;
	opacity: 1;
	pointer-events: all;
	display: flex;
	justify-content: center;
	align-items: center;

	button:not(.popOver button) {
		width: 50px;
		height: 50px;
		border-radius: 50%;
		cursor: pointer;
		display: flex;
		justify-content: center;
		align-items: center;
		backdrop-filter: blur(5px);
	}
}

.export .scroll-indicator {
	position: absolute;
	width: 100%;
	height: 100%;
	transform: translate(-50%, -50%);
	top: 50%;
	left: 50%;
}

.export .scroll-indicator .track {
	stroke: #4b5563;
	fill: transparent;
	stroke-width: 2;
}

.export .scroll-indicator .progress {
	stroke: #00ffff;
	fill: none;
	stroke-width: 2;
	stroke-dasharray: 142;
	transform-origin: center;
	transform: rotate(-90deg);
}
.export .arrow {
	position: relative;
	z-index: 2;
}
</style>
