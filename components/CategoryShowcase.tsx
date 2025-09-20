'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { fetchCategories } from '@/lib/api';

const categoryImages = {
  'electronics': 'https://images.pexels.com/photos/356056/pexels-photo-356056.jpeg?auto=compress&cs=tinysrgb&w=300',
  'beauty': 'https://images.pexels.com/photos/2533266/pexels-photo-2533266.jpeg?auto=compress&cs=tinysrgb&w=300',
  'home-decoration': 'https://images.pexels.com/photos/1090638/pexels-photo-1090638.jpeg?auto=compress&cs=tinysrgb&w=300',
  'fragrances': 'https://images.pexels.com/photos/965989/pexels-photo-965989.jpeg?auto=compress&cs=tinysrgb&w=300',
  'groceries': 'https://images.pexels.com/photos/264636/pexels-photo-264636.jpeg?auto=compress&cs=tinysrgb&w=300',
  'furniture': 'https://images.pexels.com/photos/586763/pexels-photo-586763.jpeg?auto=compress&cs=tinysrgb&w=300',
  'tops': 'https://images.pexels.com/photos/994517/pexels-photo-994517.jpeg?auto=compress&cs=tinysrgb&w=300',
  'womens-dresses': 'https://images.pexels.com/photos/985635/pexels-photo-985635.jpeg?auto=compress&cs=tinysrgb&w=300',
  'womens-shoes': 'https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=300',
  'mens-shirts': 'https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg?auto=compress&cs=tinysrgb&w=300',
  'mens-shoes': 'https://images.pexels.com/photos/298863/pexels-photo-298863.jpeg?auto=compress&cs=tinysrgb&w=300',
  'mens-watches': 'https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg?auto=compress&cs=tinysrgb&w=300',
  'womens-watches': 'https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg?auto=compress&cs=tinysrgb&w=300',
  'womens-bags': 'https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg?auto=compress&cs=tinysrgb&w=300',
  'womens-jewellery': 'https://images.pexels.com/photos/1191531/pexels-photo-1191531.jpeg?auto=compress&cs=tinysrgb&w=300',
  'sunglasses': 'https://images.pexels.com/photos/701877/pexels-photo-701877.jpeg?auto=compress&cs=tinysrgb&w=300',
  'automotive': 'https://images.pexels.com/photos/210019/pexels-photo-210019.jpeg?auto=compress&cs=tinysrgb&w=300',
  'motorcycle': 'https://images.pexels.com/photos/104842/bmw-vehicle-ride-bike-104842.jpeg?auto=compress&cs=tinysrgb&w=300',
  'lighting': 'https://images.pexels.com/photos/1090638/pexels-photo-1090638.jpeg?auto=compress&cs=tinysrgb&w=300',
  'skin-care': 'https://images.pexels.com/photos/3685530/pexels-photo-3685530.jpeg?auto=compress&cs=tinysrgb&w=300',
};

const categoryDisplayNames = {
  'electronics': 'Electronics',
  'beauty': 'Fashion',
  'home-decoration': 'Luxury',
  'fragrances': 'Home Decor',
  'groceries': 'Health & Beauty',
  'furniture': 'Groceries',
  'tops': 'Sneakers',
  'womens-dresses': "Women's",
  'womens-shoes': 'Shoes',
  'mens-shirts': "Men's",
  'mens-shoes': 'Footwear',
  'mens-watches': 'Watches',
  'womens-watches': 'Accessories',
  'womens-bags': 'Bags',
  'womens-jewellery': 'Jewelry',
  'sunglasses': 'Sunglasses',
  'automotive': 'Automotive',
  'motorcycle': 'Motorcycle',
  'lighting': 'Lighting',
  'skin-care': 'Skincare',
};

export default function CategoryShowcase() {
  const [categories, setCategories] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadCategories() {
      try {
        const data = await fetchCategories();
        // Ensure we're working with string array only
        const stringCategories = data.filter(item => typeof item === 'string');
        setCategories(stringCategories.slice(0, 8)); // Show first 8 categories
      } catch (error) {
        console.error('Failed to fetch categories:', error);
      } finally {
        setLoading(false);
      }
    }
    loadCategories();
  }, []);

  const itemsToShow = {
    mobile: 2,
    tablet: 4,
    desktop: 6
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % Math.ceil(categories.length / itemsToShow.mobile));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + Math.ceil(categories.length / itemsToShow.mobile)) % Math.ceil(categories.length / itemsToShow.mobile));
  };

  if (loading) {
    return (
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-gray-800">Explore Popular Categories</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className="animate-pulse">
                <div className="bg-gray-200 rounded-full w-20 h-20 md:w-24 md:h-24 mx-auto mb-3"></div>
                <div className="bg-gray-200 h-4 rounded w-16 mx-auto"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-gray-800">Explore Popular Categories</h2>
          <Link href="/products" className="text-blue-600 hover:text-blue-800 font-medium">
            View All →
          </Link>
        </div>

        <div className="relative">
          {/* Desktop Grid */}
          <div className="hidden lg:grid grid-cols-6 gap-8">
            {categories.map((category) => (
              <Link
                key={category}
                href={`/products?category=${category}`}
                className="group flex flex-col items-center text-center hover:scale-105 transition-transform"
              >
                <div className="w-24 h-24 rounded-full bg-white shadow-lg mb-3 overflow-hidden group-hover:shadow-xl transition-shadow">
                  <Image
                    src={categoryImages[category as keyof typeof categoryImages] || categoryImages.electronics}
                    alt={categoryDisplayNames[category as keyof typeof categoryDisplayNames] || category}
                    width={96}
                    height={96}
                    className="w-full h-full object-cover"
                  />
                </div>
                <span className="text-sm font-medium text-gray-700 group-hover:text-blue-600">
                  {categoryDisplayNames[category as keyof typeof categoryDisplayNames] || category}
                </span>
              </Link>
            ))}
          </div>

          {/* Tablet Grid */}
          <div className="hidden md:grid lg:hidden grid-cols-4 gap-6">
            {categories.slice(0, 8).map((category) => (
              <Link
                key={category}
                href={`/products?category=${category}`}
                className="group flex flex-col items-center text-center hover:scale-105 transition-transform"
              >
                <div className="w-20 h-20 rounded-full bg-white shadow-lg mb-3 overflow-hidden group-hover:shadow-xl transition-shadow">
                  <Image
                    src={categoryImages[category as keyof typeof categoryImages] || categoryImages.electronics}
                    alt={categoryDisplayNames[category as keyof typeof categoryDisplayNames] || category}
                    width={80}
                    height={80}
                    className="w-full h-full object-cover"
                  />
                </div>
                <span className="text-sm font-medium text-gray-700 group-hover:text-blue-600">
                  {categoryDisplayNames[category as keyof typeof categoryDisplayNames] || category}
                </span>
              </Link>
            ))}
          </div>

          {/* Mobile Carousel */}
          <div className="md:hidden">
            <div className="flex space-x-4 overflow-x-auto scrollbar-hide pb-4">
              {categories.map((category) => (
                <Link
                  key={category}
                  href={`/products?category=${category}`}
                  className="group flex flex-col items-center text-center flex-shrink-0"
                >
                  <div className="w-16 h-16 rounded-full bg-white shadow-lg mb-2 overflow-hidden group-hover:shadow-xl transition-shadow">
                    <Image
                      src={categoryImages[category as keyof typeof categoryImages] || categoryImages.electronics}
                      alt={categoryDisplayNames[category as keyof typeof categoryDisplayNames] || category}
                      width={64}
                      height={64}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <span className="text-xs font-medium text-gray-700 group-hover:text-blue-600 w-16 truncate">
                    {categoryDisplayNames[category as keyof typeof categoryDisplayNames] || category}
                  </span>
                </Link>
              ))}
            </div>
          </div>

          {/* Navigation buttons for tablet/desktop */}
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 bg-white shadow-lg p-2 rounded-full hover:shadow-xl transition-shadow hidden md:block lg:hidden"
          >
            <ChevronLeft className="h-5 w-5 text-gray-600" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 bg-white shadow-lg p-2 rounded-full hover:shadow-xl transition-shadow hidden md:block lg:hidden"
          >
            <ChevronRight className="h-5 w-5 text-gray-600" />
          </button>
        </div>
      </div>
    </section>
  );
}