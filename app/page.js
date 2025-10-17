"use client";

import { useState } from "react";
import { useGetProductsQuery } from "./store/api";
import ProductCard from "./components/ProductCard";
import Loader from "./components/Loader";
import ProductsPage from "./products/page";

export default function HomePage() {
  const [offset, setOffset] = useState(0);
  const [limit] = useState(10);
  const [search, setSearch] = useState("");
  const { data: products, isLoading, refetch } = useGetProductsQuery({ offset, limit, search });

  return (
    <div>
     <ProductsPage/>
    </div>
  );
}
