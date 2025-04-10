// ShippingOptions.jsx
import React from "react";

const ShippingOptions = ({
  shippingRates,
  selectedShipping,
  setSelectedShipping,
  isLoadingRates,
  errorMessage,
}) => {
  return (
    <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
      <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-4">
        Shipping Options
      </h3>

      {isLoadingRates ? (
        <div className="text-center py-4">
          <p className="text-gray-600 dark:text-gray-400">
            Loading shipping options...
          </p>
        </div>
      ) : shippingRates.length > 0 ? (
        <div className="space-y-2">
          {shippingRates.map((rate) => (
            <div
              key={rate.id}
              className={`p-3 border rounded-lg cursor-pointer transition-colors duration-200 ${
                selectedShipping === rate.id
                  ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
                  : "border-gray-300 dark:border-gray-600"
              }`}
              onClick={() => setSelectedShipping(rate.id)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div
                    className={`w-4 h-4 rounded-full border mr-2 ${
                      selectedShipping === rate.id
                        ? "border-blue-500 bg-blue-500"
                        : "border-gray-400"
                    }`}
                  >
                    {selectedShipping === rate.id && (
                      <div className="w-2 h-2 rounded-full bg-white m-auto"></div>
                    )}
                  </div>
                  <div>
                    <p className="font-medium text-gray-800 dark:text-gray-200">
                      {rate.name}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Delivery: {rate.minDeliveryDate} - {rate.maxDeliveryDate}
                    </p>
                  </div>
                </div>
                <p className="font-medium text-gray-800 dark:text-gray-200">
                  ${parseFloat(rate.rate).toFixed(2)}
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-4">
          <p className="text-gray-600 dark:text-gray-400">
            {errorMessage ||
              "No shipping options available. Please check your address."}
          </p>
        </div>
      )}
    </div>
  );
};

export default ShippingOptions;
