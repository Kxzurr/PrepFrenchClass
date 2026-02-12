import plugin from 'tailwindcss/plugin';

const cardsStyle = plugin(
    function ({ addComponents }) {
        // Add the drawer components to the Tailwind CSS configuration
        addComponents({
            '.card': {
                // Styles for the main card component
                '@apply rounded-lg border border-gray-200 dark:border-dark-800 mb-5 shadow-lg shadow-zinc-200/50 bg-white dark:bg-dark-900 dark:shadow-dark-900 dark:text-dark-100': {},

                '.card-title': {
                    '@apply text-card-title': {},
                },
                
                '&.hovered' : {
                    '@apply transition-all duration-200 ease-linear hover:-translate-y-1': {},
                }
            },

            '.card-body': {
                // Styles for the card body
                '@apply p-5': {},
            },

            '.card-header': {
                // Styles for the card header
                '@apply p-5 border-none border-gray-200 dark:border-dark-800 pb-0 rounded-t-md': {},
            },

            '.card-footer': {
                // Styles for the card footer
                '@apply p-5 border-t border-gray-200 rounded-b-md dark:border-dark-800': {},
            }
        });
    },
)

export default cardsStyle;