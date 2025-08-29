import { client } from '$tina/client';

export async function load() {
	const globals = await client.queries.global({ relativePath: 'index.yaml' });

	return {
		nav: globals.data?.global?.header?.nav || []
	};
}
