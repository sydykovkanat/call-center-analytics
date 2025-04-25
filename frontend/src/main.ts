import { definePreset } from '@primeuix/themes';
import Aura from '@primeuix/themes/aura';
import { createPinia } from 'pinia';
import PrimeVue from 'primevue/config';
import { createApp } from 'vue';

import '@/shared/styles/main.css';

import App from './App.vue';
import router from './router';

const CustomPreset = definePreset(Aura, {
	semantic: {
		primary: {
			50: '{pink.100}',
			100: '{pink.200}',
			200: '{pink.300}',
			300: '{pink.400}',
			400: '{pink.500}',
			500: '{pink.600}',
			600: '{pink.700}',
			700: '{pink.800}',
			800: '{pink.900}',
			900: '{pink.900}',
		},
	},
});

const app = createApp(App);
app.use(PrimeVue, {
	theme: {
		preset: CustomPreset,
		options: {
			darkModeSelector: '.dark-mode',
		},
	},
});
app.use(createPinia());
app.use(router);

app.mount('#app');
