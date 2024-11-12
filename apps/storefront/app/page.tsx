import { getSdk } from "@/sdk/sdk";
import Link from "next/link";

const sdk = getSdk();

export default async function Page() {
  const {
    data: { products },
  } = await sdk.sapcc.getProducts({});

  return (
    <div className="mx-auto px-6 py-4">
      <h1>Product List:</h1>
      <ul>
        {products?.map((product) => (
          <li key={product.code} className="my-1">
            <Link
              href={`/product/${product.code}`}
              key={product.code}
              className="text-blue-500 underline"
            >
              {product.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
