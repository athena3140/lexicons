<template>
	<div class="lg:pt-24 md:pt-24 sm:pt-20 pt-16" :class="{ 'lg:mb-24 md:mb-24 mb-20': grade > 9 || grade == '12-nug' }">
		<div class="gradeCard active cursor-auto">
			<div class="relative z-[2] text-white bg-transparent">
				<div class="card__title !cursor-auto">G-{{ grade }} lexicon in pdf format</div>
				<div class="text-gray-400 text-xs lg:text-sm">Download lexicon for Grade-5 in a convenient PDF file.</div>
				<button
					type="button"
					@click="downloadPDF"
					:disabled="isDownloading"
					class="py-2 px-4 mt-10 gap-2 text-sm font-medium focus:outline-none rounded-lg border disabled:border-[#34d39911] disabled:hover:border-[#34d39911] disabled:hover:bg-[#34d39903] disabled:bg-[#34d39903] disabled:hover:text-gray-500 disabled:text-gray-500 text-gray-200 border-[#34d39932] bg-[#34d39920] hover:text-white hover:bg-[#34d39910] transition">
					Download PDF
				</button>
			</div>

			<div class="shine !rounded"></div>
			<div class="background">
				<div class="tiles">
					<template v-for="i in 10">
						<div :class="`tile tile-${i}`"></div>
					</template>
				</div>

				<div class="line line-1"></div>
				<div class="line line-2"></div>
				<div class="line line-3"></div>
			</div>
		</div>
	</div>
</template>

<script setup>
const props = defineProps({
	grade: { type: String, required: true },
});

const isDownloading = ref(false);

const downloadPDF = () => {
	isDownloading.value = true;
	const url = `/downloads/grade-${props.grade}.pdf`;
	const anchor = document.createElement("a");
	anchor.href = url;
	anchor.setAttribute("download", `G${props.grade}-lexicon.pdf`);
	document.body.appendChild(anchor);
	anchor.click();
	document.body.removeChild(anchor);
	isDownloading.value = false;
};
</script>

<style scoped>
.gradeCard {
	@apply rounded border-gray-600 mx-auto w-full;
	border-width: 1px;
}
@media (min-width: 640px) {
	.gradeCard {
		width: 90%;
	}
}
@media (min-width: 1024px) {
	.gradeCard {
		width: 75%;
	}
}
</style>
