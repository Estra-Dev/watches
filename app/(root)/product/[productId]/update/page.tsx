"use client";

import UpdateForm from "@/components/UpdateForm";
import { useParams } from "next/navigation";

const UpdateProductPage = () => {
  const { productId }: { productId: string } = useParams();

  return (
    <main className=" px-4 md:px-12 bg-[#f8f9fa] min-h-screen">
      <h2 className=" font-semibold text-center text-xl pt-8 w-full md:text-2xl max-w-xl mx-auto">
        Update Product
      </h2>

      {/* Update product component */}
      <UpdateForm productId={productId} />
    </main>
  );
};

export default UpdateProductPage;
