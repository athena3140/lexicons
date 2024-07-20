<template>
	<div :class="{ active: isOpen }" class="wrapper p-1 rounded">
		<input id="hamburger" :checked="isOpen" class="hidden" type="checkbox" />
		<label for="hamburger" @click.stop>
			<div class="hamburger">
				<div class="hamburger_part" style="top: calc(50% - 7px)"></div>
				<div class="hamburger_part" style="top: 50%"></div>
				<div class="hamburger_part" style="top: calc(50% + 7px)"></div>
			</div>
		</label>
	</div>
</template>

<script setup>
const props = defineProps({
	isOpen: { type: Boolean, required: true },
});
</script>

<style>
.wrapper {
	box-shadow: #9ca3af3f 0 0 0 0;
	transition: 0.08s all;
}

.wrapper.active {
	box-shadow: #9ca3af3f 0 0 0 3px;
}

.hamburger {
	transition: all 0.25s;
	position: relative;
	width: 25px;
	height: 25px;
	cursor: pointer;
	&_part {
		width: 20px;
		height: 2.5px;
		position: absolute;
		transform: translateY(-50%);
		background: #9ca3af;
		right: 0;
		margin: auto;
		left: 0;
		border-radius: 1px;
		transition: all 0.25s cubic-bezier(0.5, 0.1, 0.3, 1.7);
	}
}

input#hamburger:checked + label .hamburger {
	transform: rotate(180deg);
}

input#hamburger:checked + label .hamburger .hamburger_part:nth-of-type(1) {
	transform: rotate(45deg);
	width: 25px !important;
	top: calc(50% - (2px)) !important;
}

input#hamburger:checked + label .hamburger .hamburger_part:nth-of-type(2) {
	left: 13px !important;
	opacity: 0;
}

input#hamburger:checked + label .hamburger .hamburger_part:nth-of-type(3) {
	transform: rotate(-45deg);
	width: 25px !important;
	top: calc(50% - (2px)) !important;
}
</style>
