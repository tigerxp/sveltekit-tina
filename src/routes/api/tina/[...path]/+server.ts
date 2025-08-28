// import type { RequestHandler } from './$types';

import { TinaNodeBackend, LocalBackendAuthProvider, type NodeApiHandler } from '@tinacms/datalayer'
import { TinaAuthJSOptions, AuthJsBackendAuthProvider } from 'tinacms-authjs'

import databaseClient from '$tina/databaseClient'

// import { Readable } from 'stream';
// import { IncomingMessage, ServerResponse } from 'http';
// import { Socket } from 'net';

const isLocal = process.env.TINA_PUBLIC_IS_LOCAL === 'true'

const tinaHandler: NodeApiHandler = TinaNodeBackend({
    authProvider: isLocal
        ? LocalBackendAuthProvider()
        : AuthJsBackendAuthProvider({
            authOptions: TinaAuthJSOptions({
                databaseClient: databaseClient,
                secret: process.env.AUTH_SECRET || '',
            }),
        }),
    databaseClient,
})

// handler()

// export const POST: RequestHandler = async ({ request, params }) => {
//     console.log('Tina API call: ', request, params, tinaHandler);
//     const resp = new Response();

//     return resp;
// const m: IncomingMessage = new IncomingMessage();
// const r = handler(request, resp)
//   const body = await request.json();

//   // delegate to Tina database API
//   try {
//     const result = await db.apiRouter.handle({
//       body,
//       query: params.path ? params.path.split('/') : [],
//       method: 'POST',
//     });

//     return new Response(JSON.stringify(result), {
//       headers: { 'Content-Type': 'application/json' },
//       status: 200,
//     });
//   } catch (err: any) {
//     return new Response(
//       JSON.stringify({ error: err.message ?? 'Unknown error' }),
//       { status: 500 }
//     );
//   }
// };

// export const POST: RequestHandler = async ({ request }) => {
//   return new Promise(async (resolve) => {
//     // Create mock IncomingMessage
//     const req: IncomingMessage = new IncomingMessage(new Socket());

// //    const req = new Readable();
//     req.url = new URL(request.url).pathname;
//     req.method = request.method;
//     req.headers = Object.fromEntries(request.headers);

//     // If there is a body, push it into the stream
//     if (request.method !== 'GET' && request.method !== 'HEAD') {
//       const body = await request.arrayBuffer();
//       req.push(Buffer.from(body));
//     }
//     req.push(null); // end of stream

//     // Create mock ServerResponse
//     const res = new ServerResponse(req);

//     // Collect body chunks
//     const chunks: any[] = [];
//     res.write = ((write) => (chunk: any) => {
//       chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
//       return true;
//     })(res.write);

//     res.end = ((end) => (chunk?: any) => {
//       if (chunk) chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
//       end.call(res, chunk);
//       resolve(
//         new Response(Buffer.concat(chunks), {
//           status: res.statusCode,
//           headers: Object.fromEntries(
//             Object.entries(res.getHeaders()).map(([k, v]) => [k, String(v)])
//           ),
//         })
//       );
//     })(res.end);

//     // Call Tina’s Node handler
//     tinaHandler(req, res);
//   });
// };

export const POST = tinaHandler;
export const GET = tinaHandler;
