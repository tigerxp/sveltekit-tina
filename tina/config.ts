import { defineConfig } from "tinacms";
import Post from "./collection/post";
import Global from "./collection/global";
import Company from "./collection/company";
// import { AuthJsBackendAuthProvider } from 'tinacms-authjs'

// Your hosting provider likely exposes this as an environment variable
const branch =
  process.env.GITHUB_BRANCH ||
  process.env.VERCEL_GIT_COMMIT_REF ||
  process.env.HEAD ||
  "main";

export default defineConfig({
  branch,

  // Get this from tina.io
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID,
  // Get this from tina.io
  token: process.env.TINA_TOKEN,
  // contentApiUrlOverride: process.env.TINA_API_URL || 'http://localhost:5173/api/tina/gql',
  // authProvider: AuthJsBackendAuthProvider,

  build: {
    outputFolder: "admin",
    publicFolder: "static",
  },
  media: {
    tina: {
      mediaRoot: "",
      publicFolder: "static",
    },
  },
  // See docs on content modeling for more info on how to setup new content models: https://tina.io/docs/schema/
  schema: {
    collections: [
      Global,
      Post,
      Company
    ],
  },
});
