import { getSdk } from "../sdk/sdk.config"

const sdk = getSdk();

export default async function Page() {
  const { products } = await sdk.sapcc.searchProduct({});

  console.log(products?.map((product) => product.name));

  return <div>Page</div>
}
