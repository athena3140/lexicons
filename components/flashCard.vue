<template>
	<modal :isActive="isModalActive" :grade="grade" :data="currentModalData" @update:isActive="updateIsActive($event)" />
	<div class="card w-full exportCard p-5">
		<div class="card__title tracking-tight text-xl font-medium !mb-2 !cursor-default">Learn with Flash Cards</div>
		<p class="text-sm text-gray-400">Export data to flashcard websites!</p>

		<div class="mt-8 grid grid-cols-2 gap-2">
			<button @click="openModal('quizlet')">Export for Quizlet</button>
			<button @click="openModal('knowt')">Export for Knowt</button>
		</div>
	</div>
</template>

<script setup></script>

<style scoped>
.exportCard {
	button {
		@apply rounded-md focus:outline-none text-xs font-medium px-2 py-2 bg-gray-800 hover:bg-gray-700 hover:border-gray-600 transition border-gray-700 border text-white;
	}
}
</style>
