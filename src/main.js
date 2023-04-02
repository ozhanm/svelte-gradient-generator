import App from './App.svelte';

const app = new App({
    target: document.body,
    props: {
        color1: '#ecc609',
        color2: '#ff0095'
    }
});

export default app;