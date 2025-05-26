// tailwind config 
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
			// Colores de Javarrakis/Dune
            'spice': {
                100: '#FFE2C0',
                200: '#FFD5A4',
                300: '#FFC587',
                400: '#FFB46A',
                500: '#FFA04D',  
                600: '#FF8930',
                700: '#E67014',
                800: '#CD5500',
                900: '#B44700',
            },
            'sand': {
                100: '#FFF9E6',
                200: '#FFF3CC',
                300: '#FFEDB3',
                400: '#FFE699',
                500: '#FFDF80',  
                600: '#FFD966',
                700: '#E6C34D',
                800: '#CCAC33',
                900: '#B3951A',
            },
            'dusk': {
                100: '#D6C4E0',
                200: '#BD9FCF',
                300: '#A47ABF',
                400: '#8B55AE',
                500: '#73309E',  // Morado atardecer
                600: '#5A0B8D',
                700: '#41007D',
                800: '#28006C',
                900: '#0F005C',
            }
        },

        fontFamily: {
            vcr: ['VCR', 'monospace'],
            upheaval: ['Upheaval', 'sans-serif'],
        },

        borderRadius: {
            pixel: '2px',
        },

        borderWidth: {
        pixel: '2px',
        },
        
        boxShadow: {
            pixel: '0 0 0 2px rgba(0, 0, 0, 0.25)',
        },
    },
    plugins: [],
    }
}