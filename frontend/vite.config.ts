import { PrimeVueResolver } from '@primevue/auto-import-resolver';
import tailwindcss from '@tailwindcss/vite';
import vue from '@vitejs/plugin-vue';
import { fileURLToPath, URL } from 'node:url';
import Components from 'unplugin-vue-components/vite';
import { defineConfig } from 'vite';
import vueDevTools from 'vite-plugin-vue-devtools';

export default defineConfig({
	plugins: [
		vue(),
		vueDevTools(),
		Components({
			resolvers: [PrimeVueResolver()],
		}),
		tailwindcss(),
	],
	resolve: {
		alias: {
			'@': fileURLToPath(new URL('./src', import.meta.url)),
		},
	},
	server: {
		host: '0.0.0.0',
		port: 3000,
		allowedHosts: ['kanat.fun', 'localhost', '0.0.0.0'],
		cors: {
			origin: ['http://localhost:3000', 'https://tasker.shoro.kg'],
		},
	},
	preview: {
		host: '0.0.0.0',
		port: 3000,
		allowedHosts: ['kanat.fun', 'localhost', '0.0.0.0'],
		cors: {
			origin: ['http://localhost:3000', 'https://tasker.shoro.kg'],
		},
	},
});
