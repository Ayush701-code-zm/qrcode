// CartItem.jsx
import React from "react";
import { ChevronDown } from "lucide-react";

const CartItem = ({
  item,
  index,
  selectedVariants,
  handleVariantChange,
  removeItem,
}) => {
  return (
    <div className="py-4 flex flex-col md:flex-row md:items-center md:justify-between">
      <div className="flex items-center mb-3 md:mb-0">
        <div className="w-20 h-20 bg-gray-100 dark:bg-gray-700 rounded overflow-hidden mr-4">
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-full object-cover"
          />
        </div>
        <div>
          <h3 className="font-medium text-gray-800 dark:text-gray-200">
            {item.name}
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            {item.size && `Size: ${item.size}`}
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Design: {item.designText?.substring(0, 20)}
            {item.designText?.length > 20 ? "..." : ""}
          </p>
        </div>
      </div>

      <div className="flex flex-col md:flex-row md:items-center">
        {/* Variant selection */}
        {item.pricing && item.pricing.variants && (
          <div className="relative mb-3 md:mb-0 md:mr-6 w-full md:w-40">
            <select
              value={selectedVariants[item.product_id] || item.variant_id || ""}
              onChange={(e) => {
                const variantId = e.target.value;
                const variantData = item.pricing.variants[variantId];
                handleVariantChange(
                  index,
                  item.product_id,
                  variantId,
                  variantData
                );
              }}
              className="block w-full pl-3 pr-10 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            >
              {Object.entries(item.pricing.variants).map(
                ([variantId, variant]) => (
                  <option key={variantId} value={variantId}>
                    {variant.size} - ${variant.price.toFixed(2)}
                  </option>
                )
              )}
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none text-gray-500 dark:text-gray-400">
              <ChevronDown size={16} />
            </div>
          </div>
        )}

        <div className="flex items-center justify-between md:justify-end w-full">
          <span className="font-medium text-gray-800 dark:text-gray-200 mr-4">
            ${item.price.toFixed(2)}
          </span>
          <button
            onClick={removeItem}
            className="text-red-500 hover:text-red-600 transition-colors duration-200"
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
