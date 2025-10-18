"use client";

import { useState } from "react";
import { useCreateProductMutation, useGetCategoriesQuery } from "../../store/api";
import { useRouter } from "next/navigation";

export default function CreateProduct() {
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    images: [],
    categoryId: "",
  });

  const { data: categories } = useGetCategoriesQuery();
  const [createProduct, { isLoading }] = useCreateProductMutation();
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleImagesChange = (e) => {
    // Convert comma-separated string into array
    setForm({ ...form, images: e.target.value.split(",") });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.price || !form.categoryId) {
      alert("Please fill required fields");
      return;
    }

    try {
      await createProduct({
        ...form,
        price: Number(form.price),
      }).unwrap();

      router.push("/products");
    } catch (err) {
      console.error(err);
      alert("Failed to create product.");
    }
  };

  return (
    <div className="p-8 flex justify-center">
      <form
        className="bg-[#0D1821] p-6 rounded-xl w-full max-w-md"
        onSubmit={handleSubmit}
      >
        <h1 className="text-2xl font-bold text-[#AD8A64] mb-4">Create Product</h1>

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
          disabled={isLoading}
          className="w-full bg-[#AD8A64] p-2 rounded text-white"
        >
          {isLoading ? "Creating..." : "Create"}
        </button>
      </form>
    </div>
  );
}
