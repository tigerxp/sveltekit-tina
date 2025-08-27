import type { Collection } from "tinacms";

const Global: Collection = {
  label: "Global",
  name: "global",
  path: "content/global",
  format: "yaml",
  ui: {
    global: true,
  },
  fields: [
    {
      type: "object",
      label: "Header",
      name: "header",
      fields: [
        {
          type: "object",
          label: "Main Menu",
          name: "nav",
          list: true,
          ui: {
            itemProps: (item) => {
              return { label: item?.label };
            }
          },
          fields: [
            {
              type: "string",
              label: "Link",
              name: "href",
            },
            {
              type: "string",
              label: "Label",
              name: "label",
            },
          ],
        },
      ],
    },
    {
      type: "object",
      label: "Footer",
      name: "footer",
      fields: [
        {
          type: "object",
          label: "Social Links",
          name: "social",
          list: true,
          fields: [
            {
              type: "string",
              label: "Url",
              name: "url",
            },
          ],
        },
      ],
    },
  ],
};

export default Global;
