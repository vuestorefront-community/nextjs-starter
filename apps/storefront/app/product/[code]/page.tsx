import ProductGallery from "../../../components/ProductGallery";
import ProductDetails from "../../../components/ProductDetails";
import ProductSlider from "../../../components/ProductSlider";
import { getSdk } from "../../../sdk/sdk.config";

export default async function Page({ params }: { params: { code: string } }) {
  const sdk = getSdk();

  const product = await sdk.sapcc.getProduct({
    id: params.code,
  });

  return (
    <div
      className="flex flex-col gap-8 md:gap-12 lg:gap-16 max-w-screen-xl m-auto px-4 md:px-8 lg:px-12 xl:px-16 py-8 md:py-12 lg:py-16 xl:py-20"
    >
      <section
        className="flex flex-col items-start gap-8 md:flex-row md:gap-4 xl:gap-6"
      >
        <ProductGallery images={product.images} />
        <ProductDetails product={product} />
      </section>
      <ProductSlider />
    </div>
  )
}
