export default function register() {
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('/publicpath/service-worker.js').then((registration) => {
                // eslint-disable-next-line no-console
                console.log('SW registered: ', registration);
            }).catch((registrationError) => {
                // eslint-disable-next-line no-console
                console.log('SW registration failed: ', registrationError);
            });
        });
    }
}
