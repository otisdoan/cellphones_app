import React from "react";
import ProductHome from "@/components/products/ProductHome";
import type { ProductProps } from "@/types/api";
import { productApi } from "@/utils/api/product.api";
import { sliceArray } from "@/utils/sliceArray";

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
      const result = await productApi.getAll();
      setLoading(false);
      if (Array.isArray(result.data))
        setDataProducts(sliceArray(result.data, 10));
    } catch (e) {
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
