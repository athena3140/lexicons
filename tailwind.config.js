export default {
	content: [],
	theme: {
		extend: {
			fontFamily: {
				logo: ["Encode Sans Expanded", "sans-serif"],
				header: ["Lexend", "sans-serif"],
				body: ["Ubuntu", "sans-serif"],
				sagar: ["MyanmarSagar", "sans-serif"],
				walone: ["Walone", "sans-serif"],
				poppins: ["Poppins ", "sans-serif"],
			},
			colors: {
				primary: {
					50: "#edfffe",
					100: "#c0feff",
					200: "#81fbff",
					300: "#3af8ff",
					400: "#00ffff",
					500: "#00e1e2",
					600: "#00b2b7",
					700: "#008c91",
					800: "#006c72",
					900: "#04585d",
					950: "#00343a",
				},
			},
			animation: { float: "float 3.5s ease-in-out infinite .5s" },
			keyframes: {
				float: {
					"0%": { transform: "translate(0,  0px) " },
					"50% ": { transform: "translate(0, 10px) " },
					"100%": { transform: " translate(0, -0px)" },
				},
			},
		},
	},
	plugins: [require("@tailwindcss/typography")],
};
