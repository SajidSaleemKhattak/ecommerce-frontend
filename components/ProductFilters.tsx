'use client';

import { useState, useEffect } from 'react';
import { Filter, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { fetchCategories } from '@/lib/api';
import { FilterState } from '@/types';

interface ProductFiltersProps {
  filters: FilterState;
  onFiltersChange: (filters: FilterState) => void;
  isOpen: boolean;
  onToggle: () => void;
}

export default function ProductFilters({ filters, onFiltersChange, isOpen, onToggle }: ProductFiltersProps) {
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadCategories() {
      try {
        const data = await fetchCategories();
        setCategories(['all', ...data]);
      } catch (error) {
        console.error('Failed to fetch categories:', error);
      } finally {
        setLoading(false);
      }
    }
    loadCategories();
  }, []);

  const handlePriceChange = (values: number[]) => {
    onFiltersChange({
      ...filters,
      minPrice: values[0],
      maxPrice: values[1],
    });
  };

  const handleCategoryChange = (category: string) => {
    onFiltersChange({
      ...filters,
      category,
    });
  };

  const handleRatingChange = (rating: string) => {
    onFiltersChange({
      ...filters,
      rating: parseInt(rating),
    });
  };

  const handleSortChange = (sort: string) => {
    const [sortBy, sortOrder] = sort.split('-') as [string, 'asc' | 'desc'];
    onFiltersChange({
      ...filters,
      sortBy: sortBy as 'price' | 'title' | 'rating',
      sortOrder,
    });
  };

  const resetFilters = () => {
    onFiltersChange({
      category: 'all',
      minPrice: 0,
      maxPrice: 2000,
      rating: 0,
      search: '',
      sortBy: 'title',
      sortOrder: 'asc',
    });
  };

  const formatCategoryName = (category: string) => {
    if (category === 'all') return 'All Categories';
    if (typeof category !== 'string') return 'Category';
    return category
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  return (
    <>
      {/* Mobile Filter Button */}
      <Button
        onClick={onToggle}
        className="lg:hidden mb-4"
        variant="outline"
      >
        <Filter className="h-4 w-4 mr-2" />
        Filters
      </Button>

      {/* Mobile Overlay */}
      {isOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-black bg-opacity-50" onClick={onToggle} />
      )}

      {/* Filter Panel */}
      <div className={`
        lg:relative lg:translate-x-0 lg:block
        fixed top-0 left-0 z-50 h-full w-80 bg-white shadow-xl
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        {/* Mobile Header */}
        <div className="lg:hidden flex items-center justify-between p-4 border-b">
          <h3 className="text-lg font-semibold">Filters</h3>
          <Button onClick={onToggle} variant="ghost" size="sm">
            <X className="h-5 w-5" />
          </Button>
        </div>

        <div className="p-4 space-y-6 h-full overflow-y-auto">
          {/* Sort */}
          <div>
            <Label className="text-sm font-medium mb-3 block">Sort By</Label>
            <Select 
              value={`${filters.sortBy}-${filters.sortOrder}`} 
              onValueChange={handleSortChange}
            >
              <SelectTrigger>
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="title-asc">Name A-Z</SelectItem>
                <SelectItem value="title-desc">Name Z-A</SelectItem>
                <SelectItem value="price-asc">Price: Low to High</SelectItem>
                <SelectItem value="price-desc">Price: High to Low</SelectItem>
                <SelectItem value="rating-desc">Rating: High to Low</SelectItem>
                <SelectItem value="rating-asc">Rating: Low to High</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Categories */}
          <div>
            <Label className="text-sm font-medium mb-3 block">Categories</Label>
            {loading ? (
              <div className="space-y-2">
                {Array.from({ length: 5 }).map((_, i) => (
                  <div key={i} className="bg-gray-200 h-8 rounded animate-pulse" />
                ))}
              </div>
            ) : (
              <div className="space-y-2 max-h-48 overflow-y-auto">
                {categories.map((category) => (
                  <div key={category} className="flex items-center space-x-2">
                    <Checkbox
                      id={category}
                      checked={filters.category === category}
                      onCheckedChange={() => handleCategoryChange(category)}
                    />
                    <Label
                      htmlFor={category}
                      className="text-sm font-normal cursor-pointer flex-1"
                    >
                      {formatCategoryName(category)}
                    </Label>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Price Range */}
          <div>
            <Label className="text-sm font-medium mb-3 block">
              Price Range: ${filters.minPrice} - ${filters.maxPrice}
            </Label>
            <Slider
              value={[filters.minPrice, filters.maxPrice]}
              onValueChange={handlePriceChange}
              max={2000}
              min={0}
              step={10}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>$0</span>
              <span>$2000</span>
            </div>
          </div>

          {/* Rating */}
          <div>
            <Label className="text-sm font-medium mb-3 block">Minimum Rating</Label>
            <div className="space-y-2">
              {[4, 3, 2, 1, 0].map((rating) => (
                <div key={rating} className="flex items-center space-x-2">
                  <Checkbox
                    id={`rating-${rating}`}
                    checked={filters.rating === rating}
                    onCheckedChange={() => handleRatingChange(rating.toString())}
                  />
                  <Label
                    htmlFor={`rating-${rating}`}
                    className="text-sm font-normal cursor-pointer flex items-center"
                  >
                    {rating === 0 ? 'All Ratings' : (
                      <>
                        {Array.from({ length: rating }).map((_, i) => (
                          <span key={i} className="text-yellow-400">★</span>
                        ))}
                        {Array.from({ length: 5 - rating }).map((_, i) => (
                          <span key={i} className="text-gray-300">★</span>
                        ))}
                        <span className="ml-1">& up</span>
                      </>
                    )}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          {/* Reset Filters */}
          <Button onClick={resetFilters} variant="outline" className="w-full">
            Reset All Filters
          </Button>
        </div>
      </div>
    </>
  );
}