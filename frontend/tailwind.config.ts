import type { Config } from 'tailwindcss'

const config = {
    darkMode: 'class',
    content: [
        './pages/**/*.{ts,tsx}',
        './components/**/*.{ts,tsx}',
        './app/**/*.{ts,tsx}',
        './src/**/*.{ts,tsx}',
    ],
    prefix: '',
    theme: {
        container: {
            center: true,
            padding: '2rem',
            screens: {
                '2xl': '1400px',
            },
        },
        extend: {
            fontFamily: {
                rubik: ['Rubik', 'sans-serif'],
            },
            colors: {
                beige: '#EEDFC9',
                border: '#ea9406',
                input: 'hsl(var(--input))',
                ring: 'hsl(var(--ring))',
                primaryMarron: '#6D6A61',
                primaryBlue: '#3363FF',
                blue200: '#BFD5FF',
                blue300: '#99B9FF',
                blue400: '#7090FF',
                blue500: '#4F69FF',
                blue600: '#2F3DFC',
                primaryRed: '#E24F5C',
                red200: '#FECDD2',
                red300: '#FDA4AD',
                red400: '#FB7182',
                red500: '#F43F5B',
                red600: '#E3264C',
                bgNav: '#001333',
                bgFooter: '#001333',
                background: '#FFFFF4',
                foreground: '#EEDFC9',
                backgroundCard: '#EEDFC9',
                primary: {
                    DEFAULT: 'hsl(var(--primary))',
                    foreground: 'hsl(var(--primary-foreground))',
                },
                secondary: {
                    DEFAULT: 'hsl(var(--secondary))',
                    foreground: 'hsl(var(--secondary-foreground))',
                },
                destructive: {
                    DEFAULT: '#E11414',
                    foreground: 'hsl(var(--destructive-foreground))',
                },
                muted: {
                    DEFAULT: 'hsl(var(--muted))',
                    foreground: 'hsl(var(--muted-foreground))',
                },
                accent: {
                    DEFAULT: 'hsl(var(--accent))',
                    foreground: 'hsl(var(--accent-foreground))',
                },
                popover: {
                    DEFAULT: 'hsl(var(--popover))',
                    foreground: 'hsl(var(--popover-foreground))',
                },
                card: {
                    DEFAULT: 'hsl(var(--card))',
                    foreground: 'hsl(var(--card-foreground))',
                },
            },
            borderRadius: {
                lg: 'var(--radius)',
                md: 'calc(var(--radius) - 2px)',
                sm: 'calc(var(--radius) - 4px)',
            },
            width: {
                '128': '32rem',
            },
            height: {
                '120': '30rem',
                '130': '40rem',
                '135': '45rem',
            },
            minHeight: {
                // tailwind s'arrête à 96 qui équivaut à 24rem
                '120': '30rem',
                '130': '40rem',
                '135': '45rem',
                '140': '50rem',
                '150': '60rem',
                '160': '70rem',
                '165': '75rem',
                '170': '80rem',
                '175': '85rem',
                '180': '90rem',
            },
            maxHeight: {
                '140': '50rem',
            },
            keyframes: {
                'accordion-down': {
                    from: { height: '0' },
                    to: { height: 'var(--radix-accordion-content-height)' },
                },
                'accordion-up': {
                    from: { height: 'var(--radix-accordion-content-height)' },
                    to: { height: '0' },
                },
            },
            animation: {
                'accordion-down': 'accordion-down 0.2s ease-out',
                'accordion-up': 'accordion-up 0.2s ease-out',
            },
        },
    },
    plugins: [require('tailwindcss-animate')],
}

export default config
