// tailwind.config.ts
import type { Config } from "tailwindcss";
import TypographyPlugin from "@tailwindcss/typography";
import FormPlugin from "@tailwindcss/forms";
import ContainerQueriesPlugin from "@tailwindcss/container-queries";

const config: Config = {
	content: [
		"./src/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./pages/**/*.{ts,tsx}",
	],
	theme: {
		extend: {
			colors: {
				"primaryp-000": "var(--primaryp-000)",
				"primaryp-100": "var(--primaryp-100)",
				"primaryp-200": "var(--primaryp-200)",
				"primaryp-300": "var(--primaryp-300)",
				"primaryp-400": "var(--primaryp-400)",
				"primaryp-500": "var(--primaryp-500)",
				"primaryp-800": "var(--primaryp-800)",
				"primaryp-900": "var(--primaryp-900)",
				"secondarys-500": "var(--secondarys-500)",
				border: "hsl(var(--border))",
				input: "hsl(var(--input))",
				ring: "hsl(var(--ring))",
				background: "hsl(var(--background))",
				foreground: "hsl(var(--foreground))",
				primary: {
					DEFAULT: "hsl(var(--primary))",
					foreground: "hsl(var(--primary-foreground))",
				},
				secondary: {
					DEFAULT: "hsl(var(--secondary))",
					foreground: "hsl(var(--secondary-foreground))",
				},
				destructive: {
					DEFAULT: "hsl(var(--destructive))",
					foreground: "hsl(var(--destructive-foreground))",
				},
				muted: {
					DEFAULT: "hsl(var(--muted))",
					foreground: "hsl(var(--muted-foreground))",
				},
				accent: {
					DEFAULT: "hsl(var(--accent))",
					foreground: "hsl(var(--accent-foreground))",
				},
				popover: {
					DEFAULT: "hsl(var(--popover))",
					foreground: "hsl(var(--popover-foreground))",
				},
				card: {
					DEFAULT: "hsl(var(--card))",
					foreground: "hsl(var(--card-foreground))",
				},
			},
			boxShadow: {
				"card-drop-2": "var(--card-drop-2)",
			},
			borderRadius: {
				lg: "var(--radius)",
				md: "calc(var(--radius) - 2px)",
				sm: "calc(var(--radius) - 4px)",
			},
			fontFamily: {
				sans: [
					"ui-sans-serif",
					"system-ui",
					"sans-serif",
					'"Apple Color Emoji"',
					'"Segoe UI Emoji"',
					'"Segoe UI Symbol"',
					'"Noto Color Emoji"',
				],
				baloo: ['"Baloo 2"', "cursive"],
				fredoka: ['"Fredoka"', "sans-serif"],
			},
			keyframes: {
				"accordion-down": {
					from: { height: "0" },
					to: { height: "var(--radix-accordion-content-height)" },
				},
				"accordion-up": {
					from: { height: "var(--radix-accordion-content-height)" },
					to: { height: "0" },
				},
				scroll: {
					"0%": { transform: "translateX(0%)" },
					"100%": { transform: "translateX(-50%)" },
				},
			},
			animation: {
				"accordion-down": "accordion-down 0.2s ease-out",
				"accordion-up": "accordion-up 0.2s ease-out",
				scroll: "scroll 30s linear infinite",
			},
		},
		container: {
			center: true,
			padding: "2rem",
			screens: { "2xl": "1400px" },
		},
	},
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
	darkMode: ["class"],
};

export default config;
