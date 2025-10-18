"use client";

import { useGetProductQuery, useDeleteProductMutation } from "../../store/api";
import { useRouter, useParams } from "next/navigation";
import { useState } from "react";
import ConfirmationModal from "@/app/components/ConfirmationModal";
import Loader from "@/app/components/Loader";


export default function ProductDetails() {
  const params = useParams();
  const slug = params.slug;

  const { data: product, isLoading } = useGetProductQuery(slug);
  const [deleteProduct] = useDeleteProductMutation();
  const router = useRouter();
  const [showDelete, setShowDelete] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const handleDelete = async () => {
    if (!product?.id) return alert("Product ID not found");
    try {
      await deleteProduct(product.id).unwrap();
      setShowDelete(false);
      alert("Product deleted (simulated)");
      router.push("/products");
    } catch (err) {
      console.error("Delete failed:", err);
      alert("Failed to delete product!");
    }
  };

  if (isLoading) return <Loader />;

  if (!product) {
    return (
      <div className="p-8 text-white">
        <h1 className="text-2xl font-bold">Product Not Found</h1>
        <button
          onClick={() => router.push("/products")}
          className="mt-4 bg-[#4E6E5D] px-4 py-2 rounded text-white"
        >
          Go Back Home
        </button>
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="block md:flex gap-x-10 justify-between">
        <div className="w-1/2">
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-auto md:h-[500px] object-cover rounded-xl mb-4"
          />
        </div>
        <div className="flex flex-col justify-between w-1/2">
          <div className="flex flex-col gap-y-5">
            <h3 className="text-3xl font-bold ">
              Name : <span className="text-[#AD8A64]">{product.name}</span>{" "}
            </h3>
            <p className="mb-2">
              Price: <span className="text-[#A44A3F]"> ${product.price} </span>{" "}
            </p>
            <p className="text-[#EFF1F3] mb-2">
              Description :{" "}
              <span className="text-[#4E6E5D] ">{product.description}</span>
            </p>
            <p className="text-[#EFF1F3] mb-4">
              Category: {product.category.name}
            </p>
          </div>
          <div className="flex gap-x-5">
            <button
              className="bg-[#4E6E5D] px-4 py-2 rounded text-white"
              onClick={() => router.push(`/products/edit/${slug}`)}
            >
              <p>Edit</p>
            </button>
            <button
              className="bg-[#A44A3F] flex items-center gap-x-2 px-4 py-2 rounded text-white"
              onClick={() => setShowDelete(true)}
            >
             <p>Delete</p> 
            </button>
          </div>
        </div>
      </div>

      {showDelete && (
        <ConfirmationModal
          title="Delete Product"
          message={`Are you sure you want to delete "${product.name}"?`}
          onConfirm={handleDelete}
          onCancel={() => setShowDelete(false)}
        />
      )}
    </div>
  );
}
