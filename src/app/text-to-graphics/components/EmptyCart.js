// EmptyCart.jsx
import React from "react";
import { ShoppingCart } from "lucide-react";

const EmptyCart = ({ setActiveTab }) => {
  return (
    <div className="flex flex-col items-center justify-center h-64 text-center">
      <div className="bg-gray-100 dark:bg-gray-700 rounded-full p-4 mb-4">
        <ShoppingCart size={32} className="text-gray-400 dark:text-gray-500" />
      </div>
      <h3 className="text-gray-600 dark:text-gray-400 font-medium mb-2">
        Your Cart is Empty
      </h3>
      <p className="text-gray-500 dark:text-gray-500 max-w-md">
        Add products with your designs to start your order
      </p>
      <button
        onClick={() => setActiveTab("editor")}
        className="mt-4 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-lg transition-colors duration-200"
      >
        Back to Designer
      </button>
    </div>
  );
};

export default EmptyCart;
