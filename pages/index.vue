<template>
	<Nextlayout>
		<div class="md:w-full lg:w-9/12 mx-auto">
			<div class="hero font-body w-full mt-10 relative px-5 lg:py-32 md:py-32 sm:py-32 py-20 rounded-xl">
				<div class="text-balance flex flex-col justify-center md:gap-20 gap-10 h-full w-full">
					<div>
						<h1
							class="lg:text-4xl md:text-3xl sm:text-3xl max-[640px]:text-2xl max-[481px]:text-base max-[481px]:text-wrap font-header text-white text-center">
							Learn Myanmar Lexicons for Grades 5-12
						</h1>
						<p
							class="md:text-base md:mt-3 sm:text-base text-xs mt-1 max-[640px]:text-base max-[481px]:text-xs text-gray-100 text-center">
							Comprehensive lexicon resources for all grades.
						</p>
					</div>
					<div class="mx-auto relative w-fit">
						<input
							type="text"
							class="sm:px-4 sm:py-2 px-3 py-2 sm:text-base text-sm bg-white md:w-80 sm:w-72 rounded focus:border-none focus:outline-none placeholder:text-gray-400"
							placeholder="Search for a word" />
						<button
							class="bg-primary-700 font-sm font-thin sm:text-base text-xs tracking-wide text-white sm:px-2 sm:py-1 py-1 px-2 sm:rounded-md rounded-[4px] absolute top-1/2 right-1 -translate-y-1/2">
							Search
						</button>
					</div>
				</div>
				<div class="scroll right-1/2 translate-x-1/2 absolute -bottom-16">
					<div></div>
					<div></div>
				</div>
			</div>
			<div class="grades w-full text-gray-300 mt-20">
				<h2 class="font-header text-xl mb-3">Grades</h2>
				<div class="grid md:grid-cols-4 sm:grid-cols-3 grid-cols-2 md:gap-x-10 gap-x-5 gap-y-10">
					<template v-for="(card, i) in cards" :key="i">
						<NuxtLink :to="card.url">
							<GradeCard
								:status="card.status"
								:title="card.title"
								:icon="card.icon"
								:chapterRange="card.chapterRange" />
						</NuxtLink>
					</template>
				</div>
			</div>
		</div>
	</Nextlayout>
</template>

<script setup>
import { ref } from "vue";

const cards = ref([
	{
		icon: 5,
		title: "Grade - 5",
		url: "/grade-5",
		chapterRange: "Total 6 Chapters",
		status: true,
	},
	{
		icon: 6,
		title: "Grade - 6",
		url: "/grade-6",
		chapterRange: "Total 18 Chapters",
		status: true,
	},
	{
		icon: 7,
		title: "Grade - 7",
		url: "/grade-7",
		chapterRange: "Total 18 Chapters",
		status: true,
	},
	{
		icon: 8,
		title: "Grade - 8",
		url: "/grade-8",
		chapterRange: "Total 18 Chapters",
		status: true,
	},
	{ status: false },
	{
		icon: 10,
		title: "Grade - 10",
		url: "/grade-10",
		chapterRange: "စကားပြေရွေးချယ်ချက် နှင့် ကဗျာရွေးချယ်ချက်",
		status: true,
	},
	{ status: false },
	{ status: false },
]);
</script>

<style>
.hero {
	background: linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(/assets/images/hero.png);
	background-size: cover;
	background-repeat: no-repeat;
}

.scroll div {
	width: 2em;
	height: 2em;
	background-color: transparent;
	transform: rotate(45deg);
	border-width: 0 0.25em 0.25em 0;
	border-style: solid;
	border-color: #fff;
	scale: 0.5;
}

.scroll div:first-child {
	animation: scrolldown 1.2s ease-in-out infinite 0.15s;
}

.scroll div:last-child {
	translate: 0 -20px;
	animation: scrolldown 1.2s ease-in-out infinite;
}

@keyframes scrolldown {
	0% {
		transform: translateY(20%) rotate(45deg);
		opacity: 0.7;
	}
	50% {
		transform: translateY(0%) rotate(45deg);
		opacity: 0.2;
	}
	100% {
		transform: translateY(20%) rotate(45deg);
		opacity: 0.7;
	}
}
</style>
