import Link from "next/link";
import { getSdk } from "../sdk/sdk.config"

export default async function Page() {
  const sdk = getSdk()

  const { products } = await sdk.unified.searchProducts({})

  return (
    <div className="flex flex-col gap-3">
      {products?.map((product) => (
        <Link href={`/product/${product.id}`} key={product.id} className="text-blue-500 underline">
          - {product.name}
        </Link>
      ))}
    </div>
  )
}
