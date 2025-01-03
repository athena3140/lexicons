<template>
	<div>
		<Heading :path="'/report'" :title="'Report'" class="!mt-20" />

		<form
			ref="form"
			@submit="handleSubmit"
			class="max-w-3xl mx-auto sm:mt-10 !mt-10 lg:p-10 rounded text-white flex flex-col gap-5">
			<div class="flex justify-between items-center sm:flex-row sm:gap-10 flex-col gap-5">
				<div class="w-full">
					<label for="name"> Your Name </label>
					<input
						type="name"
						id="name"
						v-model="name"
						:disabled="isSubmitting"
						placeholder="e.g. Jane Doe"
						required />
				</div>
				<div class="w-full">
					<label for="email"> Your email </label>
					<input
						type="email"
						id="email"
						v-model="email"
						:disabled="isSubmitting"
						placeholder="e.g. name@example.com"
						required />
				</div>
			</div>
			<div class="flex justify-between items-center sm:flex-row sm:gap-10 flex-col gap-5">
				<div class="w-full">
					<label for="grade"> Select grade </label>
					<select id="grade" v-model="grade" :disabled="isSubmitting" required>
						<option disabled value="" selected>Select the grade where the issue occurred</option>
						<option v-for="i in 8" :value="i + 4" :disabled="![5, 6, 7, 8, 9, 10, 11].includes(i + 4)">
							Grade {{ i + 4 }}
						</option>
					</select>
				</div>
				<div class="w-full">
					<label for="section" class="no-required"> Select Section </label>
					<select id="section" v-model="section" :disabled="isSubmitting">
						<option disabled selected value="">Select the section (if applicable)</option>
						<option disabled v-if="grade == 0">Select Grade First</option>
						<option v-for="(title, index) in sections" :value="title" v-else>{{ title }}</option>
					</select>
				</div>
			</div>
			<div>
				<label for="message"> Description of the Issue </label>
				<textarea
					required
					v-model="message"
					:disabled="isSubmitting"
					id="message"
					rows="4"
					placeholder="Provide details about the issue you encountered"></textarea>
			</div>
			<div class="flex flex-col gap-3">
				<small class="before:content-['*'] before:text-red-400"> Required fields</small>
				<Toaster
					position="top-center"
					:toastOptions="{
						style: { background: '#374151', color: 'white', border: 'none' },
						class: 'my-toast',
						descriptionClass: 'my-toast-description',
					}" />
				<button
					type="submit"
					:disabled="isSubmitting"
					@click.prevent="handleSubmit"
					class="px-3 py-2 text-sm disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:bg-gray-700 text-gray-200 !w-fit bg-gray-700 hover:bg-gray-800 font-medium rounded text-center">
					Submit
				</button>
			</div>
		</form>
	</div>
</template>

<script setup>
import { ref, defineExpose } from "vue";
const { $toast } = useNuxtApp();

const form = ref(null);
defineExpose({ form });

const grade = ref("");
const sections = ref([]);
const name = ref("");
const email = ref("");
const section = ref("");
const message = ref("");
const isSubmitting = ref(false);

const handleSubmit = async (e) => {
	e.preventDefault();
	changeSubmitStatus(true);

	const submissionPromise = new Promise(async (resolve, reject) => {
		changeSubmitStatus(true);

		try {
			if (!form.value.checkValidity()) {
				form.value.reportValidity();
				changeSubmitStatus(false);
				reject(new Error("Form validation failed"));
				return;
			}

			const result = await $fetch("https://formsubmit.co/ajax/134e4ab60ba2ed7bd5e8298e0d4a7e25", {
				method: "POST",
				body: {
					name: name.value,
					email: email.value,
					grade: grade.value,
					section: section.value,
					message: message.value,
					_template: "table",
					_captcha: "false",
				},
			});

			resolve(result);
		} catch (error) {
			reject(error);
		} finally {
			changeSubmitStatus(false);
			grade.value = "";
			sections.value = [];
			name.value = "";
			email.value = "";
			section.value = "";
			message.value = "";
		}
	});

	$toast.promise(submissionPromise, {
		loading: "Submitting your report...",
		success: () => `Report submitted successfully!}`,
		error: (error) => `Failed to submit report: ${error.message || "Unknown error"}`,
	});
};

const changeSubmitStatus = (value) => {
	isSubmitting.value = value;
};

watch(grade, (newGrade) => {
	newGrade ? fetchAndProcessData(newGrade) : "";
});

const fetchAndProcessData = async (grade) => {
	const { data: newData } = await useAsyncData(`grade-${grade}`, () => queryContent(`/grade-${grade}`).findOne());

	if (grade == 10) {
		sections.value = [
			...extractTitles(newData.value.datas.firstSection),
			...extractTitles(newData.value.datas.secondSection),
		];
		return;
	}

	if (grade == 11) {
		sections.value = [
			...extractTitles(newData.value.datas.firstSection),
			...extractTitles(newData.value.datas.secondSection),
			...extractTitles(newData.value.datas.thirdSection),
		];
		return;
	}

	sections.value = [...extractTitles(newData.value)];
};

const extractTitles = (section) => section.datas.map((item) => item.title);
</script>

<style scoped>
label {
	@apply block mb-2 text-sm font-normal text-white required;
}

select {
	@apply disabled:cursor-not-allowed disabled:opacity-60  border text-sm rounded-lg outline-none block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white;
}

input {
	@apply disabled:cursor-not-allowed disabled:opacity-60 shadow-sm border outline-none text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white;
}

textarea {
	@apply disabled:cursor-not-allowed disabled:opacity-60 block p-2.5 w-full text-sm rounded-lg border bg-gray-700 border-gray-600 placeholder-gray-400 text-white outline-none;
}

.required {
	@apply after:text-red-400 after:content-['*'];
}

.no-required {
	@apply after:text-transparent after:content-[''];
}
</style>
