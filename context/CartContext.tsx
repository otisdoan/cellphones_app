import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import { cartItemApi } from "../utils/api/cart_item.api";
import { productVariantApi } from "../utils/api/product_variant.api";
import { CartItemProps, CartItemWithVariant } from "../types/api";
import { useAuth } from "./AuthContext";

interface CartContextValue {
  cartItems: CartItemWithVariant[];
  totalCart: number;
  isLoading: boolean;
  addToCart: (
    product_id: number,
    variant_id: number,
    quantity?: number
  ) => Promise<boolean>;
  updateQuantity: (id: string, quantity: number) => Promise<void>;
  deleteItem: (id: string) => Promise<void>;
  fetchCart: () => Promise<void>;
  refreshCart: () => void;
  toggleItemCheck: (id: number) => void;
  toggleAllCheck: () => void;
  getCheckedItems: () => CartItemWithVariant[];
  getTotalPrice: () => number;
  getSavedAmount: () => number;
  clearCheckedItems: () => Promise<void>;
}

const CartContext = createContext<CartContextValue | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItemWithVariant[]>([]);
  const [totalCart, setTotalCart] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const { user, isAuthenticated } = useAuth();

  const fetchCart = useCallback(async () => {
    if (!user?.id) return;

    try {
      setIsLoading(true);
      console.log("🔄 Fetching cart for user:", user.id);
      const result = await cartItemApi.getById(user.id);

      console.log("📥 Raw cart data:", result.data);

      if (Array.isArray(result.data)) {
        console.log("📊 Cart items count from API:", result.data.length);

        // Get variant IDs from cart items (like web version)
        const ids: number[] = [];
        result.data.forEach((item: CartItemProps) => {
          ids.push(Number(item.variant_id));
        });

        console.log("🔍 Variant IDs to fetch:", ids);

        if (ids.length > 0) {
          // Fetch variant details by IDs
          console.log("🌐 Calling getVariantByIds with:", ids);
          const variantResult = await productVariantApi.getVariantByIds(ids);

          console.log("📦 Fetched variants response:", variantResult);

          if (Array.isArray(variantResult.data)) {
            console.log(
              "✅ Variants is array, length:",
              variantResult.data.length
            );

            // Map variants with checked: false (exactly like web version)
            const cartItemsWithVariant: CartItemWithVariant[] =
              variantResult.data.map(
                (item) => ({ ...item, checked: false }) as CartItemWithVariant
              );

            console.log(
              "📦 Final cart items count:",
              cartItemsWithVariant.length
            );

            setCartItems(cartItemsWithVariant);
            setTotalCart(cartItemsWithVariant.length);
          }
        } else {
          setCartItems([]);
          setTotalCart(0);
        }
      } else {
        setCartItems([]);
        setTotalCart(0);
      }
    } catch (error) {
      console.error("Error fetching cart:", error);
      setCartItems([]);
      setTotalCart(0);
    } finally {
      setIsLoading(false);
    }
  }, [user?.id]);

  // Fetch cart when user changes
  useEffect(() => {
    if (isAuthenticated && user?.id) {
      fetchCart();
    } else {
      setCartItems([]);
      setTotalCart(0);
    }
  }, [user?.id, isAuthenticated, fetchCart]);

  const addToCart = async (
    product_id: number,
    variant_id: number,
    quantity: number = 1
  ): Promise<boolean> => {
    if (!user?.id) {
      console.warn("User must be logged in to add to cart");
      return false;
    }

    try {
      console.log("Adding to cart:", {
        user_id: user.id,
        product_id,
        variant_id,
        quantity,
      });

      await cartItemApi.create({
        user_id: user.id,
        product_id,
        variant_id,
        quantity,
      });

      // Refetch cart to update UI
      await fetchCart();
      return true;
    } catch (error) {
      console.error("Error adding to cart:", error);
      if (error instanceof Error) {
        console.error("Error message:", error.message);
      }
      return false;
    }
  };

  const updateQuantity = async (id: string, quantity: number) => {
    try {
      await cartItemApi.update(id, { quantity });
      await fetchCart();
    } catch (error) {
      console.error("Error updating quantity:", error);
      throw error;
    }
  };

  const deleteItem = async (id: string) => {
    try {
      await cartItemApi.delete(id);
      await fetchCart();
    } catch (error) {
      console.error("Error deleting item:", error);
      throw error;
    }
  };

  const refreshCart = useCallback(() => {
    fetchCart();
  }, [fetchCart]);

  const toggleItemCheck = (id: number) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, checked: !item.checked } : item
      )
    );
  };

  const toggleAllCheck = () => {
    const allChecked = cartItems.every((item) => item.checked);
    setCartItems((prev) =>
      prev.map((item) => ({ ...item, checked: !allChecked }))
    );
  };

  const getCheckedItems = (): CartItemWithVariant[] => {
    return cartItems.filter((item) => item.checked);
  };

  const getTotalPrice = (): number => {
    return cartItems.reduce((total, item) => {
      if (item.checked) {
        const salePrice = Number(item.sale_price) || 0;
        const quantity = Number(item.quantity) || 0;
        return total + salePrice * quantity;
      }
      return total;
    }, 0);
  };

  const getSavedAmount = (): number => {
    return cartItems.reduce((total, item) => {
      if (item.checked) {
        const price = Number(item.price) || 0;
        const salePrice = Number(item.sale_price) || 0;
        const quantity = Number(item.quantity) || 0;
        const saved = (price - salePrice) * quantity;
        return total + (saved > 0 ? saved : 0);
      }
      return total;
    }, 0);
  };

  const clearCheckedItems = async (): Promise<void> => {
    try {
      const checkedItems = cartItems.filter((item) => item.checked);
      // Delete all checked items
      await Promise.all(
        checkedItems.map((item) => cartItemApi.delete(String(item.id)))
      );
      // Refresh cart after deletion
      await fetchCart();
    } catch (error) {
      console.error("Error clearing checked items:", error);
    }
  };

  const value: CartContextValue = {
    cartItems,
    totalCart,
    isLoading,
    addToCart,
    updateQuantity,
    deleteItem,
    fetchCart,
    refreshCart,
    toggleItemCheck,
    toggleAllCheck,
    getCheckedItems,
    getTotalPrice,
    getSavedAmount,
    clearCheckedItems,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within CartProvider");
  }
  return context;
}
