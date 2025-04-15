import Image from "next/image";
import Link from "next/link";

const Hero = () => {
  return (
    <div className=" min-h-[70vh] md:min-h-[60vh] lg:min-h-[90vh] flex flex-col md:flex-row justify-center items-center bg-white px-4 md:px-12 text-black">
      <div className=" max-w-2xl">
        <h1 className=" text-5xl pt-6 md:pt-0 md:text-7xl leading-tight font-semibold">
          Timeless Elegance on your Wrist
        </h1>
        <p className=" text-gray-700 mt-4">
          Discover our curated collection of Premium watches, Crafted for those
          who appreciate sophistication and precision.
        </p>
        <Link href={"#products"}>
          <button className=" bg-gray-950 text-sm cursor-pointer mt-8 text-white px-3 py-2 rounded-md">
            Shop the Collection
          </button>
        </Link>
      </div>
      <div className="">
        <Image src={"/hero.img.png"} alt="img" width={500} height={500} />
      </div>
    </div>
  );
};

export default Hero;
