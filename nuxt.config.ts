export default defineNuxtConfig({
	devtools: { enabled: true },
	modules: ["@nuxtjs/tailwindcss", "@nuxt/content"],
	css: ["~/assets/css/app.css"],
	router: {
		options: {
			scrollBehaviorType: "smooth",
		},
	},
});
