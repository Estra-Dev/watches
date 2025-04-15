"use server";

import { connectDB } from "@/app/api/db/connectDB";
import { error } from "console";
import cloudinary from "./cloudinary";
import Product from "@/app/api/models/product.model";

export async function addAction(formData: FormData) {
  try {
    const name = formData.get("name");
    const image = formData.get("image") as File;
    const link = formData.get("link");
    const description = formData.get("description");
    const price = formData.get("price");

    if (!name || !image || !link || !description || !price) {
      console.log("All fields are required.");

      return {
        error: "All fields are required.",
      };
    }
    await connectDB();

    // image processes
    const arrayBuffer = await image.arrayBuffer();
    const buffer = new Uint8Array(arrayBuffer);
    const imageResponses: any = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          {
            resource_type: "auto",
            folder: "watches",
          },
          async (error, result) => {
            if (error) {
              return reject(error.message);
            }
            return resolve(result);
          }
        )
        .end(buffer);
    });

    console.log("Image Response: ", imageResponses);

    // Store in DB
    await Product.create({
      image: imageResponses.secure_url,
      name,
      price,
      link,
      description,
    });

    return {
      success: "Product added Successfully",
    };
  } catch (error) {
    return {
      error: "Something went wrong",
    };
  }
}
