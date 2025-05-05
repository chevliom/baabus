import TypographyPlugin from "@tailwindcss/typography";
import FormPlugin from "@tailwindcss/forms";
import ContainerQueriesPlugin from "@tailwindcss/container-queries";
import { type Config } from "tailwindcss";

const config: Config = {
	content: ["./src/**/*.{ts,tsx}"],
	theme: {
		extend: {
			colors: {
				"gray-50": "#f9f9f9",
				"gray-100": "#f1f1f1",
				"gray-300": "#cccccc",
				"gray-400": "#999999",
				"gray-700": "#4a4a4a",
				"gray-900": "#1a1a1a",
				"pink-primary": "#ea518f",
				"green-stock": "#61ab59",
				"error-red": "#e94b48",
				"stock-badge-bg": "#f7bfd5",
				"error-badge-bg": "#e94b4833",
			},
			borderRadius: {
				xl: "1rem",
				"2xl": "1.5rem",
				full: "9999px",
			},
			fontSize: {
				xs: "0.75rem",
				sm: "0.875rem",
				base: "1rem",
				lg: "1.125rem",
				xl: "1.25rem",
			},
		},
	},
	plugins: [TypographyPlugin, FormPlugin, ContainerQueriesPlugin],
};

export default config;
