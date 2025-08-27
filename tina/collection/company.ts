import type { Collection } from "tinacms";

const Company: Collection = {
    label: "Companies",
    name: "company",
    path: "content/company",
    format: "yaml",
    fields: [
        {
            type: "string",
            label: "Name",
            name: "name",
            isTitle: true,
            required: true,
        },
        {
            type: "string",
            label: "Web-site",
            name: "site",
            required: true,
        },
    ],
};

export default Company;
