'use client';

import Link from 'next/link';
import { Home, Search, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        {/* 404 Number */}
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-gray-200">404</h1>
          <div className="relative -mt-6">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">Page Not Found</h2>
            <p className="text-gray-600 mb-8">
              Oops! The page you're looking for doesn't exist. It might have been moved, deleted, or you entered the wrong URL.
            </p>
          </div>
        </div>

        {/* Search Suggestion */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="bg-blue-100 rounded-full p-3">
              <Search className="h-6 w-6 text-blue-600" />
            </div>
          </div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">What can you do?</h3>
          <ul className="text-left text-gray-600 space-y-2 mb-4">
            <li>• Check the URL for any typos</li>
            <li>• Go back to the previous page</li>
            <li>• Visit our homepage</li>
            <li>• Search for products</li>
          </ul>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <Link href="/" className="w-full">
            <Button className="w-full h-12" size="lg">
              <Home className="h-5 w-5 mr-2" />
              Go to Homepage
            </Button>
          </Link>
          
          <Link href="/products" className="w-full">
            <Button variant="outline" className="w-full h-12" size="lg">
              <Search className="h-5 w-5 mr-2" />
              Browse Products
            </Button>
          </Link>

          <Button 
            variant="ghost" 
            onClick={() => window.history.back()}
            className="w-full h-12"
            size="lg"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Go Back
          </Button>
        </div>

        {/* Help Text */}
        <p className="text-sm text-gray-500 mt-8">
          Still having trouble? <Link href="#" className="text-blue-600 hover:text-blue-700 underline">Contact our support team</Link>
        </p>
      </div>
    </div>
  );
}