import { StaticImageData } from 'next/image';

// Cart Item Type
export interface CartItem {
    id: string;
    image: StaticImageData;
    imageAlt: string;
    title: string;
    titleHref: string;
    description: string;
    price: number;
    quantity: number;
}

// Order Summary Type
export interface OrderSummary {
    subtotal: number;
    discount: number;
    discountPercentage: number;
    shipping: number;
    tax: number;
    taxPercentage: number;
    total: number;
}

// Order Details Type
export interface OrderDetails {
    orderId: string;
    orderDate: string;
    paymentMethod: string;
    deliveryAddress: string;
    total: number;
}

