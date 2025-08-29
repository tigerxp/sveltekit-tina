import { createDatabase, createLocalDatabase } from '@tinacms/datalayer';

// Change this to your chosen git provider
import { GitHubProvider } from 'tinacms-gitprovider-github/dist';

// Change this to your chosen database adapter
import { Redis } from '@upstash/redis';
import pkg from 'upstash-redis-level';
const { RedisLevel } = pkg;

const isLocal = process.env.TINA_PUBLIC_IS_LOCAL === 'true';
const branch = process.env.GITHUB_BRANCH || process.env.VERCEL_GIT_COMMIT_REF || 'main';

if (!branch) {
	throw new Error(
		'No branch found. Make sure that you have set the GITHUB_BRANCH or process.env.VERCEL_GIT_COMMIT_REF environment variable.'
	);
}

export default isLocal
	? // If we are running locally, use a local database that stores data in memory and writes to the locac filesystem on save
		createLocalDatabase()
	: // If we are not running locally, use a database that stores data in redis and Saves data to github
		createDatabase({
			// May very depending on your git provider
			gitProvider: new GitHubProvider({
				repo: process.env.GITHUB_REPO || 'owner/repo',
				owner: process.env.GITHUB_OWNER || 'owner',
				token: process.env.GITHUB_PERSONAL_ACCESS_TOKEN || 'example_token',
				branch
			}),
			// May very depending on your database adapter
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			databaseAdapter: new RedisLevel<string, Record<string, any>>({
				redis: new Redis({
					url: (process.env.REDIS_API_URL as string) || 'http://localhost:8079',
					token: (process.env.SRH_TOKEN as string) || 'example_token'
				}),
				debug: process.env.DEBUG === 'true' || false,
				namespace: branch
			})
		});
