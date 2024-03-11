"use client"
import { SfBadge, SfButton, SfIconShoppingCart } from "@storefront-ui/react";
import Link from "next/link";
import useCart from "../hooks/useCart";

export default function NavBar() {
  const { cart } = useCart();

  return (
    <div className="flex items-center justify-between px-8 py-3 bg-primary-700">
      <nav className="flex gap-4 items-center">
        <Link href="/" className="text-white">Home</Link>
        <Link href="/cart" className="text-white">Cart</Link>
      </nav>

      <SfButton className="relative" square variant="tertiary">
        <SfIconShoppingCart className="text-white" />
        <SfBadge content={cart.totalItems} />
      </SfButton>
    </div>
  )
}