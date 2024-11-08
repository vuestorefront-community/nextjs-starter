"use client";

import ProductDetails from "@/components/ProductDetails";
import ProductGallery from "@/components/ProductGallery";
import ProductSlider from "@/components/ProductSlider";

export default function Page() {
  return (
    <div className="flex flex-col gap-8 md:gap-12 lg:gap-16 max-w-screen-xl m-auto px-4 md:px-8 lg:px-12 xl:px-16 py-8 md:py-12 lg:py-16 xl:py-20">
      <section className="flex flex-col items-start gap-8 md:flex-row md:gap-4 xl:gap-6">
        <ProductGallery />
        <ProductDetails />
      </section>
      <ProductSlider />
    </div>
  );
}
