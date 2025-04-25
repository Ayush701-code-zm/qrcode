"use client";

import React, { useEffect, useState } from "react";
import { Check, ArrowLeft, ShoppingBag, Package, Calendar } from "lucide-react";
import Link from "next/link";

const PaymentSuccessPage = () => {
  const [mounted, setMounted] = useState(false);
  const [orderNumber] = useState(
    Math.floor(Math.random() * 1000000).toString().padStart(6, "0")
  );
  const [estimatedDelivery] = useState(
    new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString()
  );

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 dark:from-gray-900 dark:to-gray-800 flex flex-col items-center justify-center p-4">
      <div 
        className={`w-full max-w-md bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 text-center transform transition-all duration-500 ${
          mounted ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
        }`}
      >
        <div className="flex justify-center mb-8">
          <div className={`w-24 h-24 bg-gradient-to-br from-green-400 to-emerald-500 dark:from-green-500 dark:to-emerald-600 rounded-full flex items-center justify-center text-white shadow-md transform transition-all duration-700 ${
            mounted ? "scale-100" : "scale-0"
          }`}>
            <Check size={40} strokeWidth={2.5} />
          </div>
        </div>
        
        <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-3">
          Payment Successful!
        </h1>
        
        <p className="text-gray-600 dark:text-gray-300 mb-8 text-lg">
          Thank you for your purchase. Your order has been received and is now being processed.
        </p>
        
        <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-6 mb-8 shadow-inner">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center text-gray-600 dark:text-gray-400">
                <Package size={18} className="mr-2" />
                <span>Order Number:</span>
              </div>
              <span className="font-semibold text-gray-800 dark:text-gray-200">
                #{orderNumber}
              </span>
            </div>
            
            <div className="flex justify-between items-center">
              <div className="flex items-center text-gray-600 dark:text-gray-400">
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                  <span>Status:</span>
                </div>
              </div>
              <span className="font-semibold text-green-500 dark:text-green-400">
                Confirmed
              </span>
            </div>
            
            <div className="flex justify-between items-center">
              <div className="flex items-center text-gray-600 dark:text-gray-400">
                <Calendar size={18} className="mr-2" />
                <span>Estimated Delivery:</span>
              </div>
              <span className="font-semibold text-gray-800 dark:text-gray-200">
                {estimatedDelivery}
              </span>
            </div>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4">
          <Link href="/" className="w-full">
            <button className="w-full py-3 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-medium rounded-lg transition-all duration-200 flex items-center justify-center shadow-md hover:shadow-lg">
              <ArrowLeft size={18} className="mr-2" />
              Return to Home
            </button>
          </Link>
          
          <Link href="/orders" className="w-full">
            <button className="w-full py-3 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 font-medium rounded-lg transition-all duration-200 flex items-center justify-center shadow-sm hover:shadow">
              <ShoppingBag size={18} className="mr-2" />
              View Orders
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccessPage;