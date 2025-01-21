/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/**/*.blade.php',
        './resources/**/*.js',
        './resources/**/*.vue',
    ],
    theme: {
        extend: {
            colors: {
                softBlack: '#000000DE',
                translucentBlack: '#00000099',
                mutedBlack: '#00000061',
                transparentBlack: '#0000001F',
                orangeBright: '#FF6D00',
                orangeLight: '#FF9A33',
                orangeSoft: '#FFB84D',
                orangeRed: '#FF4500',
                orangePale: '#FFD580',
                omegaOrange: {
                    50: "#FFF4E5",
                    75: "#FFECD9",
                    100: "#FFE4CC",
                    150: "#FFDABF",
                    200: "#FFD1AA",
                    250: "#FFC597",
                    300: "#FFB377",
                    350: "#FFA461",
                    400: "#FF9144",
                    450: "#FF8233",
                    500: "#FF6D00", // Color base
                    550: "#E96300",
                    600: "#E65F00",
                    650: "#D75700",
                    700: "#CC5300",
                    750: "#B84A00",
                    800: "#B24600",
                    850: "#993D00",
                    900: "#803400",
                  },
            },
            fontFamily: {
                'poppins-black': ['Poppins-Black', 'sans-serif'],
                'poppins-extrabold': ['Poppins-ExtraBold', 'sans-serif'],
                'poppins-italic': ['Poppins-Italic', 'sans-serif'],
                'poppins-mediumitalic': ['Poppins-MediumItalic', 'sans-serif'],
                'poppins-thin': ['Poppins-Thin', 'sans-serif'],
                'poppins-blackitalic': ['Poppins-BlackItalic', 'sans-serif'],
                'poppins-extrabolditalic': ['Poppins-ExtraBoldItalic', 'sans-serif'],
                'poppins-light': ['Poppins-Light', 'sans-serif'],
                'poppins-regular': ['Poppins-Regular', 'sans-serif'],
                'poppins-thinitalic': ['Poppins-ThinItalic', 'sans-serif'],
                'poppins-bold': ['Poppins-Bold', 'sans-serif'],
                'poppins-extralight': ['Poppins-ExtraLight', 'sans-serif'],
                'poppins-lightitalic': ['Poppins-LightItalic', 'sans-serif'],
                'poppins-semibold': ['Poppins-SemiBold', 'sans-serif'],
                'poppins-bolditalic': ['Poppins-BoldItalic', 'sans-serif'],
                'poppins-extralightitalic': ['Poppins-ExtraLightItalic', 'sans-serif'],
                'poppins-medium': ['Poppins-Medium', 'sans-serif'],
                'poppins-semibolditalic': ['Poppins-SemiBoldItalic', 'sans-serif'],
            },
            screens: {
                'ss': '350px',
                // => @media (min-width: 350px) { ... }

                'sm': '412px',
                // => @media (min-width: 412px) { ... }

                'md': '768px',
                // => @media (min-width: 768px) { ... }

                'lg': '1024px',
                // => @media (min-width: 1024px) { ... }

                'xl': '1440px',
                // => @media (min-width: 1440px) { ... }

                '2xl': '1920px',
                // => @media (min-width: 1920px) { ... }
            }
        },
    },
    plugins: [
        // require('@tailwindcss/forms')
    ],
}
