import { getSdk } from "@/sdk/sdk";

const sdk = getSdk();

export default async function Page() {
  const {
    data: { products },
  } = await sdk.sapcc.getProducts({});

  return (
    <div>
      Product List:
      <ul>
        {products?.map((product) => <li key={product.code}>{product.name}</li>)}
      </ul>
    </div>
  );
}
