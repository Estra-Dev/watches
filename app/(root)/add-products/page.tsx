import AddForm from "@/components/AddForm";

const AddProductPage = () => {
  return (
    <main className=" px-4 md:px-12 bg-[#f8f9fa] min-h-screen">
      <h2 className=" font-semibold text-center text-xl pt-8 w-full md:text-2xl max-w-xl mx-auto">
        Add a new Product
      </h2>

      {/* Add product component */}
      <AddForm />
    </main>
  );
};

export default AddProductPage;
