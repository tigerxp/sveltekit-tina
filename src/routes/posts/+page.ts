import { client } from '$tina/client';

export async function load() {
	const res = await client.queries.postConnection();
	const posts = res?.data?.postConnection?.edges?.map((post) => {
		return { slug: post?.node?._sys.filename, title: post?.node?.title };
	});

	return {
		posts
	};
}
