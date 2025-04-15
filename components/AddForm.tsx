"use client";

import { addAction } from "@/utils/addAction";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { ChangeEvent, useState } from "react";
import toast from "react-hot-toast";

const AddForm = () => {
  const router = useRouter();
  const [imageUrl, setImageUrl] = useState("");
  async function clientAddAction(formData: FormData) {
    const { error, success } = await addAction(formData);

    if (error) {
      // toast notification
      toast.error(error);
    }

    if (success) {
      toast.success(success);

      router.push("/");
      setImageUrl("");
    }
  }

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      const fileSize = file.size;

      if (Math.round(fileSize / 1024) > 1024) {
        toast.error("Image greeater than 1MB is not allowed");
      } else {
        setImageUrl(URL.createObjectURL(file));
      }
    }
  };

  return (
    <form
      action={clientAddAction}
      className=" w-full max-w-xl mx-auto flex flex-col justify-center items-center space-y-4 mt3 md:mt-5"
    >
      {imageUrl && (
        <Image
          src={imageUrl}
          alt={imageUrl}
          width={500}
          height={500}
          className=" max-w-full max-h-72 object-cover object-center rounded-lg"
        />
      )}
      <div className=" flex flex-col w-full">
        <label htmlFor="product image">Product Image:</label>
        <input
          type="file"
          accept="image/*"
          name="image"
          onChange={handleImageChange}
          className=" w-full px-2 py-1.5 md:py-2 rounded-md text-gray-800/70 bg-white border-[1px] border-gray-500/20"
        />
      </div>
      <div className=" flex flex-col w-full">
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          name="name"
          placeholder="Enter Product name..."
          className=" w-full px-2 py-1.5 md:py-2 rounded-md text-gray-800/70 bg-white border-[1px] border-gray-500/20"
        />
      </div>
      <div className=" flex flex-col w-full">
        <label htmlFor="price">Price:</label>
        <input
          type="number"
          name="price"
          placeholder="Enter Product price..."
          className=" w-full px-2 py-1.5 md:py-2 rounded-md text-gray-800/70 bg-white border-[1px] border-gray-500/20"
        />
      </div>
      <div className=" flex flex-col w-full">
        <label htmlFor="link">Seller Link:</label>
        <input
          type="text"
          name="link"
          placeholder="Link to where buyers can find you..."
          className=" w-full px-2 py-1.5 md:py-2 rounded-md text-gray-800/70 bg-white border-[1px] border-gray-500/20"
        />
      </div>
      <div className=" flex flex-col w-full">
        <label htmlFor="description">Description:</label>
        <textarea
          rows={4}
          name="description"
          placeholder="Describe this product..."
          className=" w-full px-2 py-1.5 md:py-2 rounded-md text-gray-800/70 bg-white border-[1px] border-gray-500/20"
        ></textarea>
      </div>
      <button
        type="submit"
        className=" w-full bg-gray-900 text-white px-3 py-2 rounded-md mt-4 cursor-pointer"
      >
        Add Product
      </button>
    </form>
  );
};

export default AddForm;
