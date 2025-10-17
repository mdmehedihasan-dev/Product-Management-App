"use client";

import { useState, useEffect } from "react";
import {
  useGetProductsQuery,
  useDeleteProductMutation,
  useGetCategoriesQuery,
} from "../store/api";
import ProductCard from "../components/ProductCard";
import Loader from "../components/Loader";
import ConfirmationModal from "../components/ConfirmationModal";
import { useRouter } from "next/navigation";

import { GrLinkNext } from "react-icons/gr";
import { GrLinkPrevious } from "react-icons/gr";

export default function ProductsPage() {
  const router = useRouter();
  const [offset, setOffset] = useState(0);
  const [limit] = useState(10);
  const [search, setSearch] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [deleteId, setDeleteId] = useState(null);

  // Fetch products with search and category filter
  const {
    data: products,
    isLoading,
    refetch,
  } = useGetProductsQuery({ offset, limit, search, categoryId });

  // Fetch categories for dropdown
  const { data: categories } = useGetCategoriesQuery({ offset: 0, limit: 100 });

  const [deleteProduct] = useDeleteProductMutation();

  // Refetch when search or category changes (with debounce)
  useEffect(() => {
    const timer = setTimeout(() => refetch(), 500);
    return () => clearTimeout(timer);
  }, [search, categoryId]);

  const handleDelete = async () => {
    if (!deleteId) return;
    await deleteProduct(deleteId);
    setDeleteId(null);
    refetch();
  };

  return (
    <div className="p-8">
      {/* Search & Category Filter */}
      <div className="flex justify-between mb-4 gap-4">
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="p-2 rounded bg-[#1A1F23] text-[#EFF1F3] w-64"
        />

        <select
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
          className="p-2 rounded bg-[#1A1F23] text-[#EFF1F3]"
        >
          <option value="">All Categories</option>
          {categories?.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>

      {/* Products List */}
      {isLoading ? (
        <Loader />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {products?.map((product) => (
            <div
              onClick={() => router.push(`/products/${product.slug}`)}
              key={product.id}
              className="shadow-2xl p-5"
            >
              <ProductCard product={product} />
              <div className="flex  gap-x-5 mt-2">

              </div>
            </div>
          ))}
        </div>
      )}

      {/* Pagination */}
      <div className="flex flex-col items-center gap-2 mt-6">
        <div className="flex gap-4">
          <button
            disabled={offset === 0}
            className="px-4 py-2 bg-[#0D1821] rounded disabled:opacity-50"
            onClick={() => setOffset(Math.max(0, offset - limit))}
          >
            <GrLinkPrevious />
          </button>

          {/* Page Numbers */}
          <div className="flex gap-2 mt-2">
            {Array.from(
              { length: Math.ceil((products?.total || 50) / limit) },
              (_, i) => (
                <button
                  key={i}
                  onClick={() => setOffset(i * limit)}
                  className={`px-3 py-1 rounded ${
                    offset / limit === i
                      ? "bg-[#AD8A64] text-white"
                      : "bg-[#1A1F23] text-[#EFF1F3]"
                  }`}
                >
                  {i + 1}
                </button>
              )
            )}
          </div>

          <button
            disabled={!products || products.length < limit}
            className="px-4 py-2 bg-[#0D1821] rounded disabled:opacity-50"
            onClick={() => setOffset(offset + limit)}
          >
            <GrLinkNext />
          </button>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {deleteId && (
        <ConfirmationModal
          title="Delete Product"
          message="Are you sure you want to delete this product?"
          onConfirm={handleDelete}
          onCancel={() => setDeleteId(null)}
        />
      )}
    </div>
  );
}
