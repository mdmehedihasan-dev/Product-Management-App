"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Loader from "../../../components/Loader";
import {
  useUpdateProductMutation,
  useGetProductQuery,
  useGetCategoriesQuery,
} from "@/app/store/api";

export default function EditProductPage() {
  const router = useRouter();
  const { slug } = useParams();

  // Fetch product and categories
  const { data: product, isLoading: productLoading } = useGetProductQuery(slug);
  const { data: categories, isLoading: categoriesLoading } =
    useGetCategoriesQuery();

  const [updateProduct, { isLoading: updating }] = useUpdateProductMutation();

  //============================= Form state=========================
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    categoryId: "",
    images: [],
  });

  //============================ Populate form when product loads==================
  useEffect(() => {
    if (product) {
      setForm({
        name: product.name,
        description: product.description,
        price: product.price,
        categoryId: product.category?.id || "",
        images: product.images || [],
      });
    }
  }, [product]);

  //========================== Handle input changes======================
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleImagesChange = (e) => {
    setForm({ ...form, images: e.target.value.split(",") });
  };

  // =============== Handle submit=====================
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.price || !form.categoryId) {
      alert("Please fill required fields");
      return;
    }

    try {
      await updateProduct({
        id: product.id,
        body: { ...form, price: Number(form.price) },
      }).unwrap();
      router.push("/products");
    } catch (err) {
      console.error(err);
      alert("Failed to update product.");
    }
  };

  if (productLoading || categoriesLoading) return <Loader />;

  return (
    <div className="p-8 flex justify-center">
      <form
        className="bg-[#0D1821] p-6 rounded-xl w-full max-w-md "
        onSubmit={handleSubmit}
      >
        <h1 className="text-2xl font-bold text-[#AD8A64] mb-4">Edit Product</h1>

        <input
          type="text"
          placeholder="Name"
          name="name"
          value={form.name}
          onChange={handleChange}
          className="w-full p-2 mb-3 rounded bg-[#1A1F23] text-[#EFF1F3]"
          required
        />

        <input
          type="text"
          placeholder="Description"
          name="description"
          value={form.description}
          onChange={handleChange}
          className="w-full p-2 mb-3 rounded bg-[#1A1F23] text-[#EFF1F3]"
        />

        <input
          type="number"
          placeholder="Price"
          name="price"
          value={form.price}
          onChange={handleChange}
          className="w-full p-2 mb-3 rounded bg-[#1A1F23] text-[#EFF1F3]"
          required
        />

        <input
          type="text"
          placeholder="Image URLs (comma separated)"
          value={form.images.join(",")}
          onChange={handleImagesChange}
          className="w-full p-2 mb-3 rounded bg-[#1A1F23] text-[#EFF1F3]"
        />

        <select
          value={form.categoryId}
          name="categoryId"
          onChange={handleChange}
          className="w-full p-2 mb-3 rounded bg-[#1A1F23] text-[#EFF1F3]"
          required
        >
          <option value="">Select Category</option>
          {categories?.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>

        <button
          type="submit"
          disabled={updating}
          className="w-full bg-[#AD8A64] p-2 rounded text-white"
        >
          {updating ? "Updating..." : "Update"}
        </button>
      </form>
    </div>
  );
}
