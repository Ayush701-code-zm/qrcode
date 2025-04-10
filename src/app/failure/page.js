// src/app/failure.js
import React from "react";
import { AlertTriangle, ArrowLeft, CreditCard } from "lucide-react";
import Link from "next/link";
import Button from "../../components/ui/button";

const PaymentFailurePage = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-xl shadow-sm p-8 text-center">
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center text-red-500 dark:text-red-400">
            <AlertTriangle size={36} strokeWidth={2} />
          </div>
        </div>

        <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-3">
          Payment Failed
        </h1>

        <p className="text-gray-600 dark:text-gray-400 mb-6">
          We were unable to process your payment. Your order has not been
          placed.
        </p>

        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 mb-6 text-left">
          <p className="text-red-700 dark:text-red-400 text-sm">
            <strong>Possible reasons:</strong>
          </p>
          <ul className="list-disc pl-5 mt-2 text-red-600 dark:text-red-400 text-sm">
            <li>Insufficient funds in your account</li>
            <li>Incorrect card details entered</li>
            <li>Your card issuer declined the transaction</li>
            <li>Network or connection issues</li>
          </ul>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <Link href="/cart" className="w-full">
            <Button className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-lg transition-colors duration-200 flex items-center justify-center">
              <ArrowLeft size={18} className="mr-2" />
              Return to Cart
            </Button>
          </Link>

          <Link href="/checkout" className="w-full">
            <Button className="w-full bg-green-500 hover:bg-green-600 text-white font-medium rounded-lg transition-colors duration-200 flex items-center justify-center">
              <CreditCard size={18} className="mr-2" />
              Try Again
            </Button>
          </Link>
        </div>

        <p className="mt-6 text-sm text-gray-500 dark:text-gray-500">
          If you continue to experience issues, please contact our support team.
        </p>
      </div>
    </div>
  );
};

export default PaymentFailurePage;
