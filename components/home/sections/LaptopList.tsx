import React from "react";
import ProductHome from "@/components/products/ProductHome";
import { productApi } from "@/utils/api/product.api";
import type { ProductProps } from "@/types/api";
import { sliceArray } from "@/utils/sliceArray";

// Category ID cho Laptop trong database
const LAPTOP_CATEGORY_ID = 9;

export default function LaptopList() {
  const [dataProducts, setDataProducts] = React.useState<ProductProps[][]>([]);
  const [loading, setLoading] = React.useState<boolean>(true);
  const brand: { name: string }[] = [
    { name: "Apple" },
    { name: "Samsung" },
    { name: "Xiaomi" },
    { name: "OPPO" },
  ];

  const fetchProducts = async () => {
    try {
      const result = await productApi.getByCategory(LAPTOP_CATEGORY_ID);
      setLoading(false);
      if (Array.isArray(result.data))
        setDataProducts(sliceArray(result.data, 2));
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  React.useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <ProductHome
      title="LAPTOP"
      list={dataProducts}
      brand={brand}
      loading={loading}
    />
  );
}
