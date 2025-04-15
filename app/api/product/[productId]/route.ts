import cloudinary from "@/utils/cloudinary";
import { connectDB } from "../../db/connectDB";
import Product from "../../models/product.model";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ productId: string }> }
) {
  await connectDB();

  const productId = (await params).productId;

  try {
    const product = await Product.findById(productId);

    if (!product) {
      return Response.json({ message: "Product not found" }, { status: 400 });
    }
    return Response.json({ product }, { status: 200 });
  } catch (error: any) {
    return Response.json({ message: error.message }, { status: 400 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ productId: string }> }
) {
  await connectDB();

  const productId = (await params).productId;

  try {
    const product = await Product.findById(productId);

    if (!product) {
      return Response.json({ message: "Product not found" }, { status: 400 });
    }

    // if product is found first delete the image from cloundinary

    const parts = product.image.split("/");
    const fileName = parts[parts.length - 1];
    const imageId = fileName.split(".")[0];

    cloudinary.uploader.destroy(`watches/${imageId}`).then((result) => {
      console.log("Result: ", result);
    });

    // delete from the database
    await Product.findByIdAndDelete(productId);

    return Response.json(
      { message: "Product deleted Successfully" },
      { status: 200 }
    );
  } catch (error: any) {
    return Response.json({ message: error.message }, { status: 400 });
  }
}
