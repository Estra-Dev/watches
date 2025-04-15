"use server";

import { connectDB } from "@/app/api/db/connectDB";
import cloudinary from "./cloudinary";
import Product from "@/app/api/models/product.model";
import { error } from "console";

export async function updateAction(formData: FormData, id: string) {
  try {
    const name = formData.get("name");
    const image = formData.get("image") as File;
    const link = formData.get("link");
    const description = formData.get("description");
    const price = formData.get("price");

    if (!name || !link || !description || !price) {
      console.log("All fields are required.");

      return {
        error: "All fields are required.",
      };
    }
    await connectDB();

    const product = await Product.findById(id);

    if (!product) {
      return {
        error: "Product not found",
      };
    }

    // to check if user changed the image, do
    if (image.size === 0) {
      // update without the image

      await Product.findByIdAndUpdate(id, {
        name,
        link,
        price,
        description,
      });

      return {
        success: "Product updated successfully",
      };
    } else {
      // delete the previous image first from cloudinary before adding the new image
      const parts = product.image.split("/");
      const fileName = parts[parts.length - 1];
      const imageId = fileName.split(".")[0];

      cloudinary.uploader
        .destroy(`watches/${imageId}`)
        .then((result) => console.log("Result", result));

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
      await Product.findByIdAndUpdate(id, {
        image: imageResponses.secure_url,
        name,
        price,
        link,
        description,
      });

      return {
        success: "Product added Successfully",
      };
    }
  } catch (error) {
    return {
      error: "Something went wrong",
    };
  }
}
