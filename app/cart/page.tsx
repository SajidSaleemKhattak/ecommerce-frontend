'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Minus, Plus, Trash2, ShoppingBag } from 'lucide-react';
import { useCart } from '@/hooks/useCart';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

export default function CartPage() {
  const { items, updateQuantity, removeItem, clearCart, getTotalItems, getTotalPrice } = useCart();
  const [isClearing, setIsClearing] = useState(false);

  const totalItems = getTotalItems();
  const totalPrice = getTotalPrice();

  const handleQuantityChange = (id: number, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeItem(id);
    } else {
      updateQuantity(id, newQuantity);
    }
  };

  const handleClearCart = async () => {
    setIsClearing(true);
    await new Promise(resolve => setTimeout(resolve, 500)); // Small delay for UX
    clearCart();
    setIsClearing(false);
  };

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Mobile Header */}
        <div className="md:hidden flex items-center justify-between mb-6">
          <Link href="/products" className="flex items-center text-gray-600 hover:text-blue-600">
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back
          </Link>
          <h1 className="text-xl font-bold text-gray-800">My Cart</h1>
          <div></div>
        </div>

        {/* Desktop Header */}
        <div className="hidden md:block mb-8">
          <div className="flex items-center space-x-2 text-sm text-gray-600 mb-4">
            <Link href="/products" className="flex items-center hover:text-blue-600">
              <ArrowLeft className="h-4 w-4 mr-1" />
              Continue Shopping
            </Link>
          </div>
          <h1 className="text-3xl font-bold text-gray-800">Shopping Cart</h1>
        </div>

        {/* Empty Cart */}
        <div className="text-center py-16">
          <div className="mx-auto w-32 h-32 bg-gray-100 rounded-full flex items-center justify-center mb-6">
            <ShoppingBag className="h-16 w-16 text-gray-400" />
          </div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Your cart is empty</h2>
          <p className="text-gray-600 mb-8">Looks like you haven't added anything to your cart yet.</p>
          <Link href="/products">
            <Button size="lg">
              Start Shopping
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Mobile Header */}
      <div className="md:hidden flex items-center justify-between mb-6">
        <Link href="/products" className="flex items-center text-gray-600 hover:text-blue-600">
          <ArrowLeft className="h-5 w-5 mr-2" />
          Back
        </Link>
        <h1 className="text-xl font-bold text-gray-800">My Cart</h1>
        <div></div>
      </div>

      {/* Desktop Header */}
      <div className="hidden md:block mb-8">
        <div className="flex items-center space-x-2 text-sm text-gray-600 mb-4">
          <Link href="/products" className="flex items-center hover:text-blue-600">
            <ArrowLeft className="h-4 w-4 mr-1" />
            Continue Shopping
          </Link>
        </div>
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-800">Shopping Cart ({totalItems} items)</h1>
          <Button 
            onClick={handleClearCart}
            disabled={isClearing}
            variant="outline" 
            size="sm"
            className="text-red-600 hover:text-red-700 hover:border-red-300"
          >
            {isClearing ? 'Clearing...' : 'Clear All'}
          </Button>
        </div>
      </div>

      <div className="lg:grid lg:grid-cols-3 lg:gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2">
          <div className="bg-white border rounded-lg">
            {/* Mobile Select All */}
            <div className="md:hidden p-4 border-b flex items-center justify-between">
              <span className="text-sm text-gray-600">Select All</span>
              <span className="text-sm font-medium">{totalItems} items</span>
            </div>

            <div className="divide-y">
              {items.map((item) => (
                <div key={item.id} className="p-4 md:p-6">
                  <div className="flex items-start space-x-4">
                    {/* Checkbox - Mobile */}
                    <div className="md:hidden flex items-center mt-2">
                      <input
                        type="checkbox"
                        defaultChecked
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                    </div>

                    {/* Product Image */}
                    <div className="flex-shrink-0">
                      <div className="w-20 h-20 md:w-24 md:h-24 bg-gray-100 rounded-lg overflow-hidden">
                        <Image
                          src={item.thumbnail}
                          alt={item.title}
                          width={96}
                          height={96}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>

                    {/* Product Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h3 className="font-medium text-gray-800 mb-1 line-clamp-2">
                            {item.title}
                          </h3>
                          <p className="text-sm text-gray-500 mb-2">
                            ${item.price.toFixed(2)} each
                          </p>
                        </div>
                        
                        {/* Remove Button - Desktop */}
                        <Button
                          onClick={() => removeItem(item.id)}
                          variant="ghost"
                          size="sm"
                          className="text-red-600 hover:text-red-700 hover:bg-red-50"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>

                      {/* Quantity Controls & Price */}
                      <div className="flex items-center justify-between mt-3">
                        <div className="flex items-center border border-gray-300 rounded-lg">
                          <Button
                            onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                            variant="ghost"
                            size="sm"
                            disabled={item.quantity <= 1}
                            className="h-8 w-8 p-0"
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="w-12 text-center text-sm font-medium">
                            {item.quantity}
                          </span>
                          <Button
                            onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                            variant="ghost"
                            size="sm"
                            disabled={item.quantity >= item.stock}
                            className="h-8 w-8 p-0"
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>
                        
                        <div className="text-right">
                          <p className="font-semibold text-gray-800">
                            ${(item.price * item.quantity).toFixed(2)}
                          </p>
                          <p className="text-xs text-gray-500">
                            {item.stock} in stock
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1 mt-8 lg:mt-0">
          <div className="bg-white border rounded-lg p-6 sticky top-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Order Summary</h2>
            
            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Subtotal ({totalItems} items)</span>
                <span className="font-medium">${totalPrice.toFixed(2)}</span>
              </div>
              
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Shipping</span>
                <span className="font-medium text-green-600">Free</span>
              </div>
              
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Tax</span>
                <span className="font-medium">${(totalPrice * 0.1).toFixed(2)}</span>
              </div>
              
              <Separator />
              
              <div className="flex justify-between">
                <span className="font-semibold text-gray-800">Total</span>
                <span className="font-bold text-xl text-gray-800">
                  ${(totalPrice * 1.1).toFixed(2)}
                </span>
              </div>
            </div>

            <Link href="/checkout" className="w-full">
              <Button className="w-full h-12 text-lg" size="lg">
                Checkout
              </Button>
            </Link>

            <p className="text-xs text-gray-500 text-center mt-3">
              Taxes and shipping calculated at checkout
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}