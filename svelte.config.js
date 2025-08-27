import { mdsvex } from 'mdsvex';
import adapter from '@sveltejs/adapter-node';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://svelte.dev/docs/kit/integrations
	// for more information about preprocessors
	preprocess: [vitePreprocess(), mdsvex({ extensions: ['.md'] })],
	kit: {
		adapter: adapter(),
		alias: {
			'$tina/*': './tina/__generated__/*',
			'$content/*': './src/content/*'
		}
	},
	extensions: ['.svelte', '.svx', '.md']
};

export default config;
