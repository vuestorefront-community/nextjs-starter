import { getSdk } from "@/sdk/sdk";
import Link from "next/link";

const sdk = getSdk();

export default async function Page() {
  const { products } = await sdk.unified.searchProducts({});

  return (
    <div className="mx-auto px-6 py-4">
      <h1>Product List:</h1>
      <ul>
        {products?.map((product) => (
          <li key={product.id} className="my-1">
            <Link
              href={`/product/${product.id}`}
              key={product.id}
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
