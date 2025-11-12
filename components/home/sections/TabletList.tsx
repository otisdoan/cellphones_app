import React from "react";
import type { ProductProps } from "@/types/api";
import { productApi } from "@/utils/api/product.api";
import ProductNoSlice from "@/components/products/ProductNoSlice";

// Category ID cho Máy tính bảng trong database
const TABLET_CATEGORY_ID = 10;

export default function TabletList() {
  const [dataProducts, setDataProducts] = React.useState<ProductProps[]>([]);
  const brand: { name: string }[] = [
    { name: "Apple" },
    { name: "Samsung" },
    { name: "Xiaomi" },
    { name: "OPPO" },
  ];

  const fetchProducts = async () => {
    try {
      const result = await productApi.getByCategory(TABLET_CATEGORY_ID);
      if (Array.isArray(result.data)) setDataProducts(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <ProductNoSlice title="MÁY TÍNH BẢNG" list={dataProducts} brand={brand} />
  );
}
