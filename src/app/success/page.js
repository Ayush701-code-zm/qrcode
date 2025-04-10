// src/app/success.js
import React from "react";
import { Check, ArrowLeft, ShoppingBag } from "lucide-react";
import Link from "next/link";
import Button from "../../components/ui/button";

const PaymentSuccessPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-xl shadow-sm p-8 text-center">
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center text-green-500 dark:text-green-400">
            <Check size={36} strokeWidth={3} />
          </div>
        </div>

        <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-3">
          Payment Successful!
        </h1>

        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Thank you for your purchase. Your order has been received and is being
          processed.
        </p>

        <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-5 mb-6">
          <div className="flex justify-between mb-3">
            <span className="text-gray-600 dark:text-gray-400">
              Order Number:
            </span>
            <span className="font-medium text-gray-800 dark:text-gray-200">
              {Math.floor(Math.random() * 1000000)
                .toString()
                .padStart(6, "0")}
            </span>
          </div>

          <div className="flex justify-between mb-3">
            <span className="text-gray-600 dark:text-gray-400">Status:</span>
            <span className="font-medium text-green-500 dark:text-green-400">
              Confirmed
            </span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-600 dark:text-gray-400">
              Estimated Delivery:
            </span>
            <span className="font-medium text-gray-800 dark:text-gray-200">
              {new Date(
                Date.now() + 7 * 24 * 60 * 60 * 1000
              ).toLocaleDateString()}
            </span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <Link href="/" className="w-full">
            <Button className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-lg transition-colors duration-200 flex items-center justify-center">
              <ArrowLeft size={18} className="mr-2" />
              Return to Home
            </Button>
          </Link>

          <Link href="/orders" className="w-full">
            <Button className="w-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 font-medium rounded-lg transition-colors duration-200 flex items-center justify-center">
              <ShoppingBag size={18} className="mr-2" />
              View Orders
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccessPage;
