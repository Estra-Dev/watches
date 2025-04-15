import Hero from "@/components/Hero";
import ProductList from "@/components/ProductList";
import Image from "next/image";

export default function Home() {
  return (
    <main className=" bg-[#f8f9fa]">
      <Hero />

      <h2 className=" font-semibold text-2xl md:text-4xl py-6 w-full text-center">
        All Products
      </h2>
      <ProductList />
    </main>
  );
}
