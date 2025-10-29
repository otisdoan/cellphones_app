// Base response interfaces
export interface BaseResponse<T> {
  status: "success" | "error";
  message: string;
  data: T[] | T;
}

export interface LoginResponse<T> {
  status: string;
  message: string;
  data: T;
}

// Form types
export interface LoginFormType {
  phone: string;
  password_login: string;
}

export interface RegisterFormType {
  full_name: string;
  date_of_birth: string;
  phone: string;
  email: string;
  password_hash: string;
  confirm_password: string;
}

// User types
export interface UserProps {
  id: number;
  email: string;
  password_hash: string;
  phone: string;
  full_name: string;
  date_of_birth: string;
  gender: string | null;
  avatar_url: string | null;
  status: "active" | "inactive";
  role: string;
  email_verified: boolean;
  phone_verified: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface UserResponse<T> extends BaseResponse<T> {}

// Product types
export interface ProductProps {
  id: number;
  name: string;
  slug: string;
  sku: string;
  category_id: string;
  brand_id: string;
  short_description: string;
  full_description: string;
  price: string;
  sale_price: string;
  cost_price: string;
  weight: string;
  dimensions: string;
  warranty_period: number;
  is_featured: boolean;
  status: "active" | "inactive";
  rating_average: string;
  rating_count: number;
  meta_title: string;
  meta_description: string;
  group_name: string;
  createdAt: string;
  updatedAt: string;
  category_name: string;
  brand_name: string;
  product_image: string[] | null | undefined;
}

export interface ProductSelect {
  value: number;
  label: string;
}

export interface ProductResponse<T> extends BaseResponse<T> {}

// Category types
export interface CategoryProps {
  id: number;
  name: string;
  slug: string;
  description: string;
  parent_id: number | null;
  level: number;
  sort_order: number;
  is_active: boolean;
  meta_title: string;
  meta_description: string;
  createdAt: string;
  updatedAt: string;
}

export interface CategoryTree {
  id: number;
  name: string;
  children?: CategoryTree[];
}

export interface CategoryMobile {
  id: number;
  name: string;
  slug: string;
  description: string;
  parent_id: number | null;
  level: number;
  sort_order: number;
  is_active: boolean;
  meta_title: string;
  meta_description: string;
  createdAt: string;
  updatedAt: string;
}

export interface CategoryTabletMobile {
  id: number;
  name: string;
  slug: string;
  description: string;
  parent_id: number | null;
  level: number;
  sort_order: number;
  is_active: boolean;
  meta_title: string;
  meta_description: string;
  createdAt: string;
  updatedAt: string;
}

export interface CategoryResponse<T> extends BaseResponse<T> {}

// Brand types
export interface BrandProps {
  id: number;
  name: string;
  slug: string;
  description: string;
  logo_url: string;
  website_url: string;
  is_active: boolean;
  sort_order: number;
  meta_title: string;
  meta_description: string;
  createdAt: string;
  updatedAt: string;
}

export interface BrandSelect {
  value: number;
  label: string;
}

export interface BrandResponse<T> extends BaseResponse<T> {}

// Cart Item types
export interface CartItemProps {
  id: string;
  user_id: number;
  product_id: number;
  variant_id: number;
  quantity: number;
  price: string;
  createdAt: string;
  updatedAt: string;
}

export interface CartItemResponse<T> extends BaseResponse<T> {}

// Product Variant types
export interface ProductVatiantProp {
  id: number;
  product_id: number;
  variant_name: string;
  sku: string;
  price: string;
  sale_price: string;
  cost_price: string;
  stock_quantity: number;
  weight: string;
  dimensions: string;
  color: string;
  capacity: string;
  image_url: string;
  is_active: boolean;
  createdAt: string;
  updatedAt: string;
}

// Cart Item with Variant (extended with cart-specific fields)
export interface CartItemWithVariant extends ProductVatiantProp {
  checked: boolean;
  quantity: number;
  cart_item_id: string; // ID của cart item trong database
}

export interface ProductVariantCapacity {
  capacity: string;
  count: number;
}

export interface ProductVariantResponse<T> extends BaseResponse<T> {}

// Product Attribute types
export interface ProductAttributeProps {
  id: number;
  product_id: number;
  attribute_name: string;
  attribute_value: string;
  sort_order: number;
  createdAt: string;
  updatedAt: string;
}

export interface ProductAttributeResponse<T> extends BaseResponse<T> {}

// Product Image types
export interface ProductImagesProp {
  id: number;
  product_id: number;
  image_url: string;
  alt_text: string;
  sort_order: number;
  is_primary: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ProductImageResponse<T> extends BaseResponse<T> {}

// Order types
export interface OrderProps {
  id: string;
  user_id: number;
  order_number: string;
  status: string;
  total_amount: string;
  shipping_address: string;
  billing_address: string;
  payment_method: string;
  payment_status: string;
  shipping_method: string;
  shipping_cost: string;
  notes: string;
  createdAt: string;
  updatedAt: string;
}

export interface OrderResponse<T> extends BaseResponse<T> {}

// Order Item types
export interface OrderItemProps {
  id: string;
  order_id: string;
  product_id: number;
  variant_id: number;
  quantity: number;
  price: string;
  total_price: string;
  createdAt: string;
  updatedAt: string;
}

export interface OrderItemResponse<T> extends BaseResponse<T> {}

// Menu Smartphone types
export interface MenuSmartphoneType {
  id: number;
  name: string;
  slug: string;
  description: string;
  parent_id: number | null;
  level: number;
  sort_order: number;
  is_active: boolean;
  meta_title: string;
  meta_description: string;
  createdAt: string;
  updatedAt: string;
}

export interface MenuSmartphoneResponse<T> extends BaseResponse<T> {}

// Register Response
export interface RegisterResponse {
  status: string;
  message: string;
  data: {
    user: UserProps;
    access_token: string;
  };
}
