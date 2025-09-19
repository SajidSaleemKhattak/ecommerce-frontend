import HeroSection from '@/components/HeroSection';
import CategoryShowcase from '@/components/CategoryShowcase';
import FeaturedProducts from '@/components/FeaturedProducts';

export default function Home() {
  return (
    <div>
      <HeroSection />
      <CategoryShowcase />
      <FeaturedProducts />
    </div>
  );
}