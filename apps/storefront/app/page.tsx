import { getSdk } from "@/sdk/sdk";
import { SfButton } from "@storefront-ui/react";

const sdk = getSdk();

export default async function Page() {
  const {
    data: { products },
  } = await sdk.sapcc.getProducts({});

  return (
    <div>
      <div>
        <SfButton>Click me</SfButton>
      </div>
      Product List:
      <ul>
        {products?.map((product) => <li key={product.code}>{product.name}</li>)}
      </ul>
    </div>
  );
}
