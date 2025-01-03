<template>
	<div class="lg:pt-24 md:pt-24 sm:pt-20 pt-16" :id="getId(section, index)" v-show="shown">
		<div class="card">
			<NuxtLink :to="getHash(section, index)" class="card__title">
				{{ title }}
				<span>#</span>
			</NuxtLink>
			<table class="border-separate border-spacing-y-2 w-full">
				<tbody>
					<tr
						v-for="(item, index) in data"
						:key="index"
						:class="[{ 'search-active': showItem(item) && searchQuery != '' }]"
						v-show="showItem(item)">
						<td>{{ convertDigits(index + 1) }}။</td>
						<td v-html="item.split('=')[0].trim()"></td>
						<td>=</td>
						<td v-html="item.replace(/^[^=]+=/, '').trim()"></td>
					</tr>
				</tbody>
			</table>
			<small class="pageNumber">စာမျက်နှာ&#40;{{ pageNumber }}&#41;</small>
		</div>
	</div>
</template>

<script setup>
import { ref } from "vue";
const props = defineProps({
	index: { type: Number, required: true },
	data: { type: Array, required: true },
	title: { type: String, required: true },
	pageNumber: { type: String, required: true },
	searchQuery: { type: String, required: true },
	section: { type: [String, Number], default: "", required: false },
});

const shown = ref(false);
const emit = defineEmits(["update:found-count"]);

const showItem = (item) => {
	const show = props.searchQuery ? item.toLowerCase().includes(props.searchQuery.toLowerCase()) : true;
	if (show) {
		shown.value = true;
	} else {
		shown.value = props.data.some((item) => item.toLowerCase().includes(props.searchQuery.toLowerCase()));
	}
	return show;
};

const getId = (section, index) => `${section ? `${section}-${index + 1}` : `${index + 1}`}`;
const getHash = (section, index) => `#${section ? `${section}-${index + 1}` : `${index + 1}`}`;
const convertDigits = (num) => num.toString().replace(/[0-9]/g, (d) => "၀၁၂၃၄၅၆၇၈၉"[d]);
</script>

<style scoped>
table tr {
	@apply align-top;

	td:first-child {
		color: rgb(107 114 128);
		font-size: 14px;
		padding-top: 3px;
		padding-right: 0.75rem;
		text-align: right;
		user-select: none;
	}

	td:nth-child(3) {
		@apply px-3;
	}

	td:nth-child(4) {
		@apply tracking-wider;
	}
}

@media (min-width: 768px) {
	tr td:nth-child(1),
	tr td:nth-child(2),
	tr td:nth-child(3) {
		width: 1%;
		white-space: nowrap;
	}
}
</style>
