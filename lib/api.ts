import { Product, ProductsResponse } from '@/types';

const BASE_URL = 'https://dummyjson.com';

export async function fetchProducts({
  limit = 30,
  skip = 0,
  category,
  search,
}: {
  limit?: number;
  skip?: number;
  category?: string;
  search?: string;
} = {}): Promise<ProductsResponse> {
  let url = `${BASE_URL}/products`;
  
  if (search) {
    url += `/search?q=${encodeURIComponent(search)}`;
  } else if (category && category !== 'all') {
    url += `/category/${encodeURIComponent(category)}`;
  }
  
  const params = new URLSearchParams();
  params.append('limit', limit.toString());
  params.append('skip', skip.toString());
  
  const separator = url.includes('?') ? '&' : '?';
  const finalUrl = `${url}${separator}${params.toString()}`;
  
  const response = await fetch(finalUrl);
  if (!response.ok) {
    throw new Error('Failed to fetch products');
  }
  
  return response.json();
}

export async function fetchProduct(id: string): Promise<Product> {
  const response = await fetch(`${BASE_URL}/products/${id}`);
  if (!response.ok) {
    throw new Error('Failed to fetch product');
  }
  return response.json();
}

export async function fetchCategories(): Promise<string[]> {
  const response = await fetch(`${BASE_URL}/products/categories`);
  if (!response.ok) {
    throw new Error('Failed to fetch categories');
  }
  return response.json();
}

export async function fetchRelatedProducts(category: string, excludeId: number): Promise<Product[]> {
  const response = await fetch(`${BASE_URL}/products/category/${category}?limit=4`);
  if (!response.ok) {
    throw new Error('Failed to fetch related products');
  }
  const data: ProductsResponse = await response.json();
  return data.products.filter(product => product.id !== excludeId);
}