export default defineNuxtConfig({
	devtools: { enabled: true },
	modules: ["@nuxtjs/tailwindcss", "@nuxtjs/algolia"],
	css: ["~/assets/css/app.css"],
	router: {
		options: {
			scrollBehaviorType: "smooth",
		},
	},
});
