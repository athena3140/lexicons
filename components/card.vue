<template>
	<div class="lg:pt-24 md:pt-24 sm:pt-20 pt-16" :id="`${section ? `${section}-` : ``}${index + 1}`" v-show="shown">
		<div class="card">
			<NuxtLink :to="`#${section ? `${section}-` : ``}${index + 1}`" class="card__title">
				{{ title }}
				<span>#</span>
			</NuxtLink>
			<table class="border-separate border-spacing-y-2 w-full">
				<tbody>
					<tr
						class="align-top"
						v-for="(item, index) in data"
						:key="index"
						:class="[{ 'search-active': showItem(item) && searchQuery != '' }]"
						v-show="showItem(item)">
						<td class="number">{{ index + 1 }}.</td>
						<td>
							{{ item.split("=")[0].trim() }}
						</td>
						<td class="px-3">=</td>
						<td class="tracking-wider" v-html="item.replace(/^[^=]+=/, '').trim()"></td>
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
</script>

<style scoped>
li::marker,
.number {
	color: rgb(107 114 128);
	font-size: 14px;
	user-select: none;
}

.number {
	padding-right: 2px;
}

li {
	margin-bottom: 10px;
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
