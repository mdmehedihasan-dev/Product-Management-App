"use client";

import { useGetProductQuery, useDeleteProductMutation } from "../../store/api";
import { useRouter, useParams } from "next/navigation";
import { useState } from "react";
import ConfirmationModal from "@/app/components/ConfirmationModal";
import Loader from "@/app/components/Loader";
import { MdAutoDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";

export default function ProductDetails() {
  const params = useParams();
  const slug = params.slug;

  const { data: product, isLoading } = useGetProductQuery(slug);
  const [deleteProduct] = useDeleteProductMutation();
  const router = useRouter();
  const [showDelete, setShowDelete] = useState(false);
    const [deleteId, setDeleteId] = useState(null);

  const handleDelete = async () => {
    if (!deleteId) return;
    try {
      await deleteProduct(deleteId).unwrap();
      setDeleteId(null);
      router.push("/products");
    } catch (err) {
      console.error("Delete failed:", err);
      alert("Failed to delete product!");
    }
  };


//   const handleDelete = async () => {
//   if (!product?.id) return alert("Product ID not found");
//   try {
//     await deleteProduct(product.id).unwrap();
//     setShowDelete(false);
//     alert("Product deleted (simulated)");
//     router.push("/products");
//   } catch (err) {
//     console.error("Delete failed:", err);
//     alert("Failed to delete product!");
//   }
// };


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
      <img
        src={product.images[0] || "https://via.placeholder.com/400"}
        alt={product.name}
        className="w-full h-96 object-cover rounded-xl mb-4"
      />
      <div className="flex justify-between">
        <div>
          <h1 className="text-3xl font-bold text-[#AD8A64]">{product.name}</h1>
          <p className="text-[#4E6E5D] mb-2">Price: ${product.price}</p>
          <p className="text-[#EFF1F3] mb-2">{product.description}</p>
          <p className="text-[#EFF1F3] mb-4">Category: {product.category.name}</p>
        </div>
        <div className="space-x-2">
          <button
            className="bg-[#4E6E5D] px-4 py-2 rounded text-white"
            onClick={() => router.push(`/products/edit/${slug}`)}
          >
            <FaEdit />
          </button>
          <button
            className="bg-[#A44A3F] px-4 py-2 rounded text-white"
            onClick={() => setShowDelete(true)}
          >
            <MdAutoDelete />
          </button>
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
