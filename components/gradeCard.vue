<template>
	<div v-if="status" class="gradeCard">
		<span class="icon"> {{ icon }} </span>
		<h4>{{ title }}</h4>
		<p>{{ chapterRange }}</p>
		<div class="shine"></div>
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
	<div v-else class="gradeCard border-red-400 border">
		<span class="icon"> {{ icon }} </span>
		<h4>Comming Soon</h4>
		<p>More Grade will be available soon</p>
		<div class="shine"></div>
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
</template>

<script setup>
const props = defineProps({
	status: { type: Boolean, required: true },
	title: { type: String },
	icon: { type: Number },
	chapterRange: { type: String },
});
</script>

<style>
:root {
	--background-color: #121c24;
	--text-color: #a1a1aa;
	--card-background-color: #121c24;
	--card-border-color: #5e6c7b;
	--card-label-color: #ffffff;
	--card-icon-color: #d4d4d8;
	--card-icon-background-color: rgba(255, 255, 255, 0.08);
	--card-icon-border-color: rgba(255, 255, 255, 0.12);
	--card-shine-opacity: 0.1;
	--card-shine-gradient: conic-gradient(
		from 205deg at 50% 50%,
		#00ffff 0deg,
		#00343a 25deg,
		#00ffff 295deg,
		rgba(16, 185, 129, 0) 360deg
	);
	--card-line-color: #2a2b2c;
	--card-tile-color: rgba(16, 185, 129, 0.05);
	--card-hover-border-color: rgba(255, 255, 255, 0);
	--card-hover-icon-color: #34d399;
	--card-hover-icon-background-color: rgba(52, 211, 153, 0.1);
	--card-hover-icon-border-color: rgba(52, 211, 153, 0.2);
	--blur-opacity: 0.01;
}

.gradeCard {
	background-color: var(--background-color);
	width: 100%;
	border-radius: 15px;
	border: 2px solid var(--card-border-color);
	cursor: pointer;
	position: relative;
	@apply p-5 pb-7;
}
.gradeCard::before {
	content: "";
	position: absolute;
	inset: 0;
	border-radius: 15px;
	background-color: var(--card-background-color);
}
.gradeCard .icon {
	z-index: 2;
	position: relative;
	width: 30px;
	height: 30px;
	display: flex;
	justify-content: center;
	align-items: center;
	padding: 8px;
	transition: color 0.25s;
	@apply font-number;
}
.gradeCard .icon::after {
	content: "";
	position: absolute;
	z-index: -1;
	width: 100%;
	height: 100%;
	border-radius: 50%;
	background-color: var(--card-icon-background-color);
	border: 1px solid var(--card-icon-border-color);
	-webkit-backdrop-filter: blur(2px);
	backdrop-filter: blur(2px);
	transition: background-color 0.25s, border-color 0.25s;
}

.gradeCard h4 {
	z-index: 2;
	position: relative;
	margin: 12px 0 4px 0;
	font-family: inherit;
	font-weight: 600;
	font-size: 14px;
	line-height: 2;
	color: var(--card-label-color);
}
.gradeCard p {
	z-index: 2;
	position: relative;
	margin: 0;
	font-size: 14px;
	line-height: 1.7;
	color: var(--text-color);
}
.gradeCard .shine {
	border-radius: inherit;
	position: absolute;
	inset: 0;
	z-index: 1;
	overflow: hidden;
	opacity: 0;
	transition: opacity 0.5s;
	border-radius: 15px;
}
.gradeCard .shine:before {
	content: "";
	width: 150%;
	padding-bottom: 150%;
	border-radius: 50%;
	position: absolute;
	left: 50%;
	bottom: 55%;
	filter: blur(35px);
	opacity: var(--card-shine-opacity);
	transform: translateX(-50%);
	background-image: var(--card-shine-gradient);
}
.gradeCard .background {
	border-radius: inherit;
	position: absolute;
	inset: 0;
	overflow: hidden;
	-webkit-mask-image: radial-gradient(circle at 60% 5%, black 0%, black 15%, transparent 60%);
	mask-image: radial-gradient(circle at 60% 5%, black 0%, black 15%, transparent 60%);
}
.gradeCard .background .tiles {
	opacity: 0;
	transition: opacity 0.25s;
}
.gradeCard .background .tiles .tile {
	position: absolute;
	background-color: var(--card-tile-color);
	-webkit-animation-duration: 8s;
	animation-duration: 8s;
	-webkit-animation-iteration-count: infinite;
	animation-iteration-count: infinite;
	opacity: 0;
}
.gradeCard .background .tiles .tile.tile-4,
.gradeCard .background .tiles .tile.tile-6,
.gradeCard .background .tiles .tile.tile-10 {
	-webkit-animation-delay: -2s;
	animation-delay: -2s;
}
.gradeCard .background .tiles .tile.tile-3,
.gradeCard .background .tiles .tile.tile-5,
.gradeCard .background .tiles .tile.tile-8 {
	-webkit-animation-delay: -4s;
	animation-delay: -4s;
}
.gradeCard .background .tiles .tile.tile-2,
.gradeCard .background .tiles .tile.tile-9 {
	-webkit-animation-delay: -6s;
	animation-delay: -6s;
}
.gradeCard .background .tiles .tile.tile-1 {
	top: 0;
	left: 0;
	height: 10%;
	width: 22.5%;
}
.gradeCard .background .tiles .tile.tile-2 {
	top: 0;
	left: 22.5%;
	height: 10%;
	width: 27.5%;
}
.gradeCard .background .tiles .tile.tile-3 {
	top: 0;
	left: 50%;
	height: 10%;
	width: 27.5%;
}
.gradeCard .background .tiles .tile.tile-4 {
	top: 0;
	left: 77.5%;
	height: 10%;
	width: 22.5%;
}
.gradeCard .background .tiles .tile.tile-5 {
	top: 10%;
	left: 0;
	height: 22.5%;
	width: 22.5%;
}
.gradeCard .background .tiles .tile.tile-6 {
	top: 10%;
	left: 22.5%;
	height: 22.5%;
	width: 27.5%;
}
.gradeCard .background .tiles .tile.tile-7 {
	top: 10%;
	left: 50%;
	height: 22.5%;
	width: 27.5%;
}
.gradeCard .background .tiles .tile.tile-8 {
	top: 10%;
	left: 77.5%;
	height: 22.5%;
	width: 22.5%;
}
.gradeCard .background .tiles .tile.tile-9 {
	top: 32.5%;
	left: 50%;
	height: 22.5%;
	width: 27.5%;
}
.gradeCard .background .tiles .tile.tile-10 {
	top: 32.5%;
	left: 77.5%;
	height: 22.5%;
	width: 22.5%;
}
@-webkit-keyframes tile {
	0%,
	12.5%,
	100% {
		opacity: 1;
	}
	25%,
	82.5% {
		opacity: 0;
	}
}
@keyframes tile {
	0%,
	12.5%,
	100% {
		opacity: 1;
	}
	25%,
	82.5% {
		opacity: 0;
	}
}
.gradeCard .background .line {
	position: absolute;
	inset: 0;
	opacity: 0;
	transition: opacity 0.35s;
}
.gradeCard .background .line:before,
.gradeCard .background .line:after {
	content: "";
	position: absolute;
	background-color: var(--card-line-color);
	transition: transform 0.35s;
}
.gradeCard .background .line:before {
	left: 0;
	right: 0;
	height: 1px;
	transform-origin: 0 50%;
	transform: scaleX(0);
}
.gradeCard .background .line:after {
	top: 0;
	bottom: 0;
	width: 1px;
	transform-origin: 50% 0;
	transform: scaleY(0);
}
.gradeCard .background .line.line-1:before {
	top: 10%;
}
.gradeCard .background .line.line-1:after {
	left: 22.5%;
}
.gradeCard .background .line.line-1:before,
.gradeCard .background .line.line-1:after {
	transition-delay: 0.3s;
}
.gradeCard .background .line.line-2:before {
	top: 32.5%;
}
.gradeCard .background .line.line-2:after {
	left: 50%;
}
.gradeCard .background .line.line-2:before,
.gradeCard .background .line.line-2:after {
	transition-delay: 0.15s;
}
.gradeCard .background .line.line-3:before {
	top: 55%;
}
.gradeCard .background .line.line-3:after {
	right: 22.5%;
}

.gradeCard:hover .icon::after {
	background-color: var(--card-hover-icon-background-color);
	border-color: var(--card-hover-icon-border-color);
}
.gradeCard:hover .icon {
	color: var(--card-hover-icon-color);
}
.gradeCard:hover .shine {
	opacity: 1;
	transition-duration: 0.5s;
	transition-delay: 0s;
}
.gradeCard:hover .background .tiles {
	opacity: 1;
	transition-delay: 0.25s;
}
.gradeCard:hover .background .tiles .tile {
	-webkit-animation-name: tile;
	animation-name: tile;
}
.gradeCard:hover .background .line {
	opacity: 1;
	transition-duration: 0.15s;
}
.gradeCard:hover .background .line:before {
	transform: scaleX(1);
}
.gradeCard:hover .background .line:after {
	transform: scaleY(1);
}
.gradeCard:hover .background .line.line-1:before,
.gradeCard:hover .background .line.line-1:after {
	transition-delay: 0s;
}
.gradeCard:hover .background .line.line-2:before,
.gradeCard:hover .background .line.line-2:after {
	transition-delay: 0.15s;
}
.gradeCard:hover .background .line.line-3:before,
.gradeCard:hover .background .line.line-3:after {
	transition-delay: 0.3s;
}
</style>
