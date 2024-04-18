import { nextui } from '@nextui-org/react';

/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}', './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            colors: {
                def: '#a38d6d',
                gray: '#7f7f7f',
            }
        },
    },
    darkMode: 'class',
    plugins: [
        nextui({
            themes: {
                light: {
                    layout: {}, // light theme layout tokens
                    colors: {}, // light theme colors
                },
                dark: {
                    layout: {}, // dark theme layout tokens
                    colors: {}, // dark theme colors
                },
            },
        }),
    ],
};
