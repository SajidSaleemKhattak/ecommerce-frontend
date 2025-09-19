'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const banners = [
  {
    id: 1,
    title: 'iPhone 16 Pro Max',
    subtitle: 'From $ 50.769*',
    description: 'All-Day Superior Superpowered',
    description2: "History's Biggest Price Drop",
    buttonText: 'Shop Now',
    image: 'https://images.pexels.com/photos/788946/pexels-photo-788946.jpeg?auto=compress&cs=tinysrgb&w=800',
    bgColor: 'from-blue-900 to-purple-900'
  },
  {
    id: 2,
    title: 'SALE',
    subtitle: '50% OFF',
    description: 'Nike Running Shoes',
    description2: 'Limited Time Offer',
    buttonText: 'Shop Now',
    image: 'https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=800',
    bgColor: 'from-teal-400 to-cyan-500'
  },
  {
    id: 3,
    title: 'Smart Watch',
    subtitle: 'Starting at $299',
    description: 'Next Generation Wearable',
    description2: 'Track Your Fitness Goals',
    buttonText: 'Explore',
    image: 'https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg?auto=compress&cs=tinysrgb&w=800',
    bgColor: 'from-gray-800 to-gray-900'
  }
];

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % banners.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % banners.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + banners.length) % banners.length);
  };

  return (
    <section className="relative h-64 md:h-80 lg:h-96 overflow-hidden">
      {banners.map((banner, index) => (
        <div
          key={banner.id}
          className={`absolute inset-0 transition-transform duration-500 ease-in-out ${
            index === currentSlide ? 'translate-x-0' : 
            index < currentSlide ? '-translate-x-full' : 'translate-x-full'
          }`}
        >
          <div className={`h-full bg-gradient-to-r ${banner.bgColor} relative overflow-hidden`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
              <div className="grid md:grid-cols-2 gap-8 h-full items-center">
                {/* Content */}
                <div className="text-white space-y-4 z-10 relative">
                  <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold">
                    {banner.title}
                  </h2>
                  <p className="text-lg md:text-xl lg:text-2xl font-semibold">
                    {banner.subtitle}
                  </p>
                  <p className="text-sm md:text-base opacity-90">
                    {banner.description}
                  </p>
                  <p className="text-xs md:text-sm opacity-75">
                    {banner.description2}
                  </p>
                  <Button 
                    className="bg-white text-gray-800 hover:bg-gray-100 mt-4"
                    size="lg"
                  >
                    {banner.buttonText}
                  </Button>
                  <div className="text-xs opacity-75 mt-2">
                    *Disc. All Offers
                  </div>
                </div>

                {/* Image */}
                <div className="relative h-full flex items-center justify-center">
                  <div className="relative w-48 h-48 md:w-64 md:h-64 lg:w-80 lg:h-80">
                    <Image
                      src={banner.image}
                      alt={banner.title}
                      fill
                      className="object-contain"
                      priority={index === 0}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Buttons */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-2 rounded-full transition-colors"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-2 rounded-full transition-colors"
      >
        <ChevronRight className="h-5 w-5" />
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {banners.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-2 h-2 rounded-full transition-colors ${
              index === currentSlide ? 'bg-white' : 'bg-white/50'
            }`}
          />
        ))}
      </div>
    </section>
  );
}