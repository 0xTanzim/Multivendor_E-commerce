export const API_ENDPOINTS = {
  categories: '/categories',
  coupons: '/coupons',
  banners: '/banners',
  farmers: '/farmers',
  products: '/products',
  orders: '/orders',
  users: '/users',
  staffs: '/staffs',
  trainings: '/trainings',
  markets: '/markets',
  customers: '/customers',
} as const;

export const ROUTE_ENDPOINTS = {
  home: '/',
  categories: '/categories',
  coupons: '/coupons',
  banners: '/banners',
  farmers: '/farmers',
  products: '/products',
  orders: '/orders',
  users: '/users',
  staffs: '/staffs',
  trainings: '/trainings',
  markets: '/markets',
  customers: '/customers',
} as const;

export type EndpointKey = keyof typeof API_ENDPOINTS;
