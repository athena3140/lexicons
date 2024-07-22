export default defineNuxtConfig({
	app: {
		head: {
			link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
		},
	},
	devtools: { enabled: true },
	modules: ["@nuxtjs/tailwindcss", "@nuxt/content"],
	css: ["~/assets/css/app.css"],
	router: {
		options: {
			scrollBehaviorType: "smooth",
		},
	},
});
