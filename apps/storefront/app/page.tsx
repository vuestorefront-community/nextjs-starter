import Link from "next/link";
import { getSdk } from "../sdk/sdk.config"

export default async function Page() {
  const sdk = getSdk()

  const { products } = await sdk.sapcc.searchProduct({});

  return (
    <div className="flex flex-col gap-3">
      {products?.map((product) => (
        <Link href={`/product/${product.code}`} key={product.code} className="text-blue-500 underline">
          - {product.name}
        </Link>
      ))}
    </div>
  )
}
