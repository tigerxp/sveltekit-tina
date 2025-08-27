import type { Collection } from "tinacms";

const Post: Collection = {
    name: "post",
    label: "Posts",
    path: "src/content/posts",
    format: "md",
    fields: [
        {
            type: "string",
            name: "title",
            label: "Title",
            isTitle: true,
            required: true,
        },
        {
            type: "rich-text",
            name: "body",
            label: "Body",
            isBody: true,
        },
    ],
};


export default Post;
