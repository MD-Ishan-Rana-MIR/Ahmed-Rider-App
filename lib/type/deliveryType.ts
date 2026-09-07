// export interface MerchantProfile {
//   id: number;
//   business_name: string;
//   address: string;
//   city: string;
//   profile_image_url: string | null;
//   cover_image_url: string | null;
// }

// export interface Order {
//   id: number;
//   user_id: number;
//   merchant_profile_id: number;
//   total_amount: string;
//   delivery_fee: string;
//   status: string;
//   delivery_address: string;
//   payment_method: string;
//   customer_phone_number: string;
//   rider_id: number;
//   created_at: string;
//   merchant_profile: MerchantProfile;
// }

// export interface DeliveriesResponse {
//   status: string;
//   message: string;
//   data: {
//     orders: {
//       current_page: number;
//       data: Order[];
//       last_page: number;
//       per_page: number;
//       total: number;
//     };
//   };
// }


export interface Order {
  id: number;
  status: string;
  delivery_fee: number;
  total_amount: number;
  payment_method: string;
  total_items: number;
  pickup: Pickup;
  dropoff: Dropoff;
  items: OrderItem[];
  created_at: string;
}

export interface Pickup {
  business_name: string;
  address: string;
  city: string;
  phone_number: string;
  latitude: number | null;
  longitude: number | null;
}

export interface Dropoff {
  customer_name: string;
  title: string;
  address_text: string;
  phone_number: string;
  latitude: number;
  longitude: number;
}

export interface OrderItem {
  id: number;
  product_id: number;
  name: string;
  quantity: number;
  unit_price: number;
  total_price: number;
  variant: string | null;
  image: string | null;
  currency : string
}

export interface DeliveriApiResponse {

  id: number;
  status: string;
  delivery_fee: number;
  total_amount: number;
  payment_method: string;
  total_items: number;
  pickup: Pickup;
  dropoff: Dropoff;
  items: OrderItem[];
  created_at: string;
  currency : string;
  distance_km:string;
  order_number : string

}