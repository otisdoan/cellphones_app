import React from "react";
import ProductHome from "@/components/products/ProductHome";
import type { ProductProps } from "@/types/api";
import { productApi } from "@/utils/api/product.api";
import { sliceArray } from "@/utils/sliceArray";

// Category ID cho Điện thoại trong database
const SMARTPHONE_CATEGORY_ID = 9;

export default function SmartphoneList() {
  const [dataProducts, setDataProducts] = React.useState<ProductProps[][]>([]);
  const [loading, setLoading] = React.useState<boolean>(true);
  const brand: { name: string }[] = [
    { name: "Apple" },
    { name: "Samsung" },
    { name: "Xiaomi" },
    { name: "OPPO" },
    { name: "NOKIA" },
    { name: "VIVO" },
    { name: "realme" },
    { name: "TECHO" },
  ];

  const fetchProducts = async () => {
    try {
      const result = await productApi.getByCategory(SMARTPHONE_CATEGORY_ID);
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
      title="ĐIỆN THOẠI NỔI BẬT NHẤT"
      list={dataProducts}
      brand={brand}
      loading={loading}
    />
  );
}
