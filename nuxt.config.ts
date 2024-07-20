export default defineNuxtConfig({
	devtools: { enabled: true },
	modules: ["@nuxtjs/tailwindcss"],
	css: ["~/assets/css/app.css"],
	router: {
		options: {
			scrollBehaviorType: "smooth",
		},
	},
});
