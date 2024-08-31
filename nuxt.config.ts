export default defineNuxtConfig({
	app: {
		head: {
			link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
			meta: [
				{
					hid: "description",
					name: "description",
					content: "Conquer your Myanmar exams with Lexicon! Our comprehensive collection of vocabulary lists (Grades 5-12) makes memorization easy. Effortlessly learn definitions and ace your tests!",
				},
				{ hid: "og:title", property: "og:title", content: "Myanmar lexicons for (Grade 5-12)" },
				{
					hid: "og:description",
					property: "og:description",
					content: "Conquer your Myanmar exams with Lexicon! Our comprehensive collection of vocabulary lists (Grades 5-12) makes memorization easy. Effortlessly learn definitions and ace your tests!",
				},
				{ hid: "og:image", property: "og:image", content: "https://lexicons.vercel.app/ogimage.png" },
				{ hid: "og:url", property: "og:url", content: "https://lexicons.vercel.app/" },
				{ hid: "og:type", property: "og:type", content: "website" },
			],
		},
	},
	experimental: {
		renderJsonPayloads: false,
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
