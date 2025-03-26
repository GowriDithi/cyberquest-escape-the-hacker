
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				},
                // Game theme colors
                'cyber-dark': '#0f172a',
                'cyber-blue': '#60a5fa',
                'cyber-light': '#f8fafc',
                'cyber-accent': '#3b82f6',
                'cyber-danger': '#ef4444',
                'cyber-success': '#10b981',
                'cyber-warning': '#f59e0b',
                'cyber-terminal': '#020617',
                'cyber-grid': 'rgba(14, 165, 233, 0.05)',
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: { height: '0' },
					to: { height: 'var(--radix-accordion-content-height)' }
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: '0' }
				},
                'fade-in': {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' }
                },
                'fade-out': {
                    '0%': { opacity: '1' },
                    '100%': { opacity: '0' }
                },
                'pulse-glow': {
                    '0%, 100%': { 
                        boxShadow: '0 0 10px rgba(96, 165, 250, 0.5), 0 0 20px rgba(96, 165, 250, 0.3)' 
                    },
                    '50%': { 
                        boxShadow: '0 0 15px rgba(96, 165, 250, 0.8), 0 0 30px rgba(96, 165, 250, 0.5)' 
                    }
                },
                'cursor-blink': {
                    '0%, 100%': { opacity: '1' },
                    '50%': { opacity: '0' }
                },
                'float': {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-10px)' }
                },
                'text-flicker': {
                    '0%, 100%': { opacity: '1' },
                    '5%, 10%': { opacity: '0.8' },
                    '15%': { opacity: '0.4' },
                    '20%': { opacity: '0.9' },
                    '25%': { opacity: '0.7' }
                },
                'scale-in': {
                    '0%': { transform: 'scale(0.95)', opacity: '0' },
                    '100%': { transform: 'scale(1)', opacity: '1' }
                },
                'slide-up': {
                    '0%': { transform: 'translateY(20px)', opacity: '0' },
                    '100%': { transform: 'translateY(0)', opacity: '1' }
                }
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
                'fade-in': 'fade-in 0.5s ease-in-out forwards',
                'fade-out': 'fade-out 0.5s ease-in-out forwards',
                'pulse-glow': 'pulse-glow 2s infinite ease-in-out',
                'cursor-blink': 'cursor-blink 1s infinite',
                'float': 'float 6s infinite ease-in-out',
                'text-flicker': 'text-flicker 2s linear',
                'scale-in': 'scale-in 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards',
                'slide-up': 'slide-up 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards'
			},
            backgroundImage: {
                'cyber-grid': 'linear-gradient(to right, var(--cyber-grid) 1px, transparent 1px), linear-gradient(to bottom, var(--cyber-grid) 1px, transparent 1px)',
                'cyber-glow': 'radial-gradient(circle at center, rgba(59, 130, 246, 0.2) 0%, transparent 70%)',
                'cyber-gradient': 'linear-gradient(to right, #0f172a, #1e293b)'
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
                mono: ['JetBrains Mono', 'monospace'],
                display: ['SF Pro Display', 'Inter', 'sans-serif']
            },
            boxShadow: {
                'cyber-glow': '0 0 15px rgba(96, 165, 250, 0.5)',
                'cyber-card': '0 4px 20px rgba(0, 0, 0, 0.1)'
            }
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
