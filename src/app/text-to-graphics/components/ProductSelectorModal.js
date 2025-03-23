import React from "react";
import { Check } from "lucide-react";

const ProductSelectorModal = ({
  isOpen,
  onClose,
  productOptions,
  selectedProducts,
  toggleProductSelection,
  addSelectedToCart,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg max-w-2xl w-full max-h-[80vh] overflow-auto">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
          <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200">
            Select Products for Your Design
          </h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            &times;
          </button>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {productOptions.map((product) => (
              <div
                key={product.id}
                onClick={() => toggleProductSelection(product.id)}
                className={`border rounded-lg p-3 cursor-pointer transition-all duration-200 ${
                  selectedProducts.includes(product.id)
                    ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
                    : "border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600"
                }`}
              >
                <div className="relative w-full aspect-square bg-gray-100 dark:bg-gray-700 rounded-md mb-2 overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                  {selectedProducts.includes(product.id) && (
                    <div className="absolute top-2 right-2 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                      <Check size={14} className="text-white" />
                    </div>
                  )}
                </div>
                <div className="flex items-center justify-between">
                  <div className="text-sm font-medium text-gray-800 dark:text-gray-200">
                    {product.name}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    ${product.price.toFixed(2)}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-6">
            <button
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
            >
              Cancel
            </button>
            <button
              onClick={addSelectedToCart}
              disabled={selectedProducts.length === 0}
              className={`px-4 py-2 ${
                selectedProducts.length > 0
                  ? "bg-blue-500 hover:bg-blue-600"
                  : "bg-gray-300 dark:bg-gray-700 cursor-not-allowed"
              } text-white rounded-lg transition-colors duration-200`}
            >
              Add to Cart ({selectedProducts.length})
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductSelectorModal;
