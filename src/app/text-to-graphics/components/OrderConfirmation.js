// OrderConfirmation.jsx
import React from "react";
import { Check } from "lucide-react";

const OrderConfirmation = ({
  orderInfo,
  setActiveTab,
  setCart,
  setOrderPlaced,
}) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 text-center">
      <div className="flex justify-center mb-6">
        <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center text-green-500 dark:text-green-400">
          <Check size={32} />
        </div>
      </div>
      <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-2">
        Order Placed Successfully!
      </h2>
      <p className="text-gray-600 dark:text-gray-400 mb-6">
        Thank you for your purchase. Your order has been received and is being
        processed.
      </p>
      <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 mb-6 max-w-md mx-auto">
        <div className="flex justify-between mb-2">
          <span className="text-gray-600 dark:text-gray-400">
            Order Number:
          </span>
          <span className="font-medium text-gray-800 dark:text-gray-200">
            {orderInfo?.id ||
              Math.floor(Math.random() * 1000000)
                .toString()
                .padStart(6, "0")}
          </span>
        </div>
        <div className="flex justify-between mb-2">
          <span className="text-gray-600 dark:text-gray-400">Status:</span>
          <span className="font-medium text-gray-800 dark:text-gray-200">
            {orderInfo?.status || "Processing"}
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
      <button
        onClick={() => {
          setActiveTab("editor");
          setCart([]);
          setOrderPlaced(false);
        }}
        className="px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-lg transition-colors duration-200"
      >
        Create New Design
      </button>
    </div>
  );
};

export default OrderConfirmation;
