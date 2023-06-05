module.exports = {
    content: [
        "./resources/**/*.blade.php",
        "./resources/**/*.js",
        "./resources/**/*.jsx",
        "./node_modules/react-tailwindcss-datepicker/dist/index.esm.js",
    ],
    theme: {

        extend: {
            transformOrigin: {
                0: "0%",
            },
            zIndex: {
                "-1": "-1",
            },
        },
    },
    variants: {
        extend: {
            borderColor: ["responsive", "hover", "focus", "focus-within"],
        },
    },
    plugins: [],
};
