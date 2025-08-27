import { client } from '$tina/client';

export async function load() {
    const res = await client.queries.companyConnection();
    const companies = res?.data?.companyConnection?.edges?.map((company) => {
        return { name: company?.node?.name, url: company?.node?.site };
    });

    return {
        companies
    };
}
