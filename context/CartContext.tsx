import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import { cartItemApi } from "../utils/api/cart_item.api";
import { productVariantApi } from "../utils/api/product_variant.api";
import {
  CartItemProps,
  ProductVatiantProp,
  CartItemWithVariant,
} from "../types/api";
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
  updateQuantity: (cart_item_id: string, quantity: number) => Promise<void>;
  deleteItem: (cart_item_id: string) => Promise<void>;
  fetchCart: () => Promise<void>;
  refreshCart: () => void;
  toggleItemCheck: (variant_id: number) => void;
  toggleAllCheck: () => void;
  getCheckedItems: () => CartItemWithVariant[];
  getTotalPrice: () => number;
  getSavedAmount: () => number;
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
      const result = await cartItemApi.getById(user.id);

      if (Array.isArray(result.data)) {
        // Extract variant IDs from cart items and create map for quantities
        const cartItemsMap = new Map<
          number,
          { quantity: number; id: string }
        >();
        result.data.forEach((item: CartItemProps) => {
          cartItemsMap.set(item.variant_id, {
            quantity: item.quantity,
            id: item.id,
          });
        });

        const variantIds = Array.from(cartItemsMap.keys());
        console.log("Cart variant IDs:", variantIds);

        if (variantIds.length > 0) {
          // Fetch variant details by IDs
          const variantResult =
            await productVariantApi.getVariantByIds(variantIds);

          console.log("Fetched variants:", variantResult.data);

          if (Array.isArray(variantResult.data)) {
            // Map variants to CartItemWithVariant with cart-specific fields
            const cartItemsWithVariant: CartItemWithVariant[] =
              variantResult.data
                .map((variant) => {
                  const cartInfo = cartItemsMap.get(variant.id);

                  // Skip if cart info not found
                  if (!cartInfo) {
                    console.warn(
                      `Cart info not found for variant ${variant.id}`
                    );
                    return null;
                  }

                  return {
                    ...variant,
                    checked: false, // Default unchecked
                    quantity: cartInfo.quantity,
                    cart_item_id: cartInfo.id,
                  };
                })
                .filter((item): item is CartItemWithVariant => item !== null);

            setCartItems(cartItemsWithVariant);
            setTotalCart(cartItemsWithVariant.length);
          }
        } else {
          setCartItems([]);
          setTotalCart(0);
        }
      }
    } catch (error) {
      console.error("Error fetching cart:", error);
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

  const toggleItemCheck = (variant_id: number) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === variant_id ? { ...item, checked: !item.checked } : item
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
        return total + Number(item.sale_price) * item.quantity;
      }
      return total;
    }, 0);
  };

  const getSavedAmount = (): number => {
    return cartItems.reduce((total, item) => {
      if (item.checked) {
        const saved =
          (Number(item.price) - Number(item.sale_price)) * item.quantity;
        return total + saved;
      }
      return total;
    }, 0);
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
