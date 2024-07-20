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
			},
			colors: {
				primary: "#1D4ED8",
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
	plugins: [],
};
