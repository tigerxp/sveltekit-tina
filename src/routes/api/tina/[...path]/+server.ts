import type { RequestHandler } from '@sveltejs/kit';
import { TinaNodeBackend, LocalBackendAuthProvider, type NodeApiHandler } from '@tinacms/datalayer';
import { TinaAuthJSOptions, AuthJsBackendAuthProvider } from 'tinacms-authjs/dist';
import databaseClient from '$tina/databaseClient';

import { Readable } from 'stream';
import { IncomingMessage, ServerResponse } from 'http';

const isLocal = process.env.TINA_PUBLIC_IS_LOCAL === 'true';

const proxyHandler: RequestHandler = async ({ request, url }) => {
	// TODO: remove this
	if (request.method !== 'POST' || request.url !== 'http://localhost:5173/api/tina/gql') {
		console.log('custom proxyHandler request:', request)
	}
	try {
		const incomingMessage = await createIncomingMessage(request, url);
		const [serverResponse, responsePromise] = createServerResponse();

		await tinaHandler(incomingMessage, serverResponse);

		const response = await responsePromise;

		return response;
	} catch (e) {
		console.error('TinaCMS handler error:', e);

		return new Response(JSON.stringify({ error: e instanceof Error ? e.message : 'Unknown error' }), {
			status: 500,
			headers: {
				'Content-Type': 'application/json'
			}
		});
	}
};


const tinaHandler: NodeApiHandler = TinaNodeBackend({
	authProvider: isLocal
		? LocalBackendAuthProvider()
		: AuthJsBackendAuthProvider({
			authOptions: TinaAuthJSOptions({
				databaseClient: databaseClient,
				secret: process.env.AUTH_SECRET || ''
			})
		}),
	databaseClient
});

async function createIncomingMessage(request: Request, url: URL): Promise<IncomingMessage> {
	const readable = new Readable({
		read() { }
	});

	const incomingMessage = readable as IncomingMessage;

	incomingMessage.method = request.method;
	incomingMessage.url = url.pathname + url.search;
	incomingMessage.headers = Object.fromEntries(request.headers.entries());

	const body = await request.json();
	readable.push(JSON.stringify(body));
	readable.push(null);
	incomingMessage.body = body;

	return incomingMessage;
}

function createServerResponse(): [ServerResponse, Promise<Response>] {
	let statusCode = 200;
	let headers: Record<string, string> = {};
	let body = '';

	const serverResponse = {
		statusCode,
		setHeader(name: string, value: string | string[]) {
			headers[name] = Array.isArray(value) ? value.join(', ') : value;
		},
		getHeader(name: string) {
			return headers[name];
		},
		removeHeader(name: string) {
			delete headers[name];
		},
		write(chunk: unknown) {
			if (chunk) {
				body += chunk.toString();
			}
		},
		end(chunk?: unknown) {
			if (chunk) {
				body += chunk.toString();
			}
		},
		writeHead(code: number, responseHeaders?: Record<string, string>) {
			statusCode = code;
			if (responseHeaders) {
				headers = { ...headers, ...responseHeaders };
			}
		}
	} as ServerResponse;

	const responsePromise = new Promise<Response>((resolve) => {
		const originalEnd = serverResponse.end.bind(serverResponse);
		serverResponse.end = () => {
			originalEnd();

			const response = new Response(body || null, {
				status: statusCode,
				headers
			});

			resolve(response);
		};
	});

	return [serverResponse, responsePromise];
}

export const GET = proxyHandler;
export const POST = proxyHandler;
