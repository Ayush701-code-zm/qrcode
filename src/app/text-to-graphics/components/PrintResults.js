import React from "react";
import { Printer } from "lucide-react";
import Loading from "../../../components/commons/loading";

const PrintResults = ({
  loader,
  loderMsg,
  mockupUrl,
  errorMsg,
  addToCart,
  setActiveTab,
  productOptions,
}) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
      <h2 className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-6">
        Print Results
      </h2>

      {loader ? (
        <div className="flex flex-col items-center justify-center h-64">
          <p className="text-blue-600 dark:text-blue-400 mb-4">{loderMsg}</p>
          <Loading />
        </div>
      ) : mockupUrl?.length ? (
        <div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockupUrl?.map((url, i) => {
              return url.mockupUrl ? (
                <div key={i} className="overflow-hidden rounded-lg shadow-md">
                  <img
                    className="w-full h-auto object-cover"
                    src={url.mockupUrl}
                    alt="Generated Product Mockup"
                  />
                  <div className="p-4 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
                    <button
                      onClick={() => {
                        addToCart((i % productOptions.length) + 1);
                        setActiveTab("cart");
                      }}
                      className="w-full py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-md font-medium transition-colors duration-200"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              ) : (
                <div
                  key={i}
                  className="flex items-center justify-center h-40 bg-red-50 dark:bg-red-900 rounded-lg"
                >
                  <span className="text-red-600 dark:text-red-300">
                    Unable to load image
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      ) : errorMsg ? (
        <div className="flex items-center justify-center h-40 bg-red-50 dark:bg-red-900 rounded-lg">
          <span className="text-red-600 dark:text-red-300">{errorMsg}</span>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center h-64 text-center">
          <div className="bg-gray-100 dark:bg-gray-700 rounded-full p-4 mb-4">
            <Printer size={32} className="text-gray-400 dark:text-gray-500" />
          </div>
          <h3 className="text-gray-600 dark:text-gray-400 font-medium mb-2">
            No Print Results Yet
          </h3>
          <p className="text-gray-500 dark:text-gray-500 max-w-md">
            Create a design in the editor tab and click "Print" to generate
            product mockups
          </p>
          <button
            onClick={() => setActiveTab("editor")}
            className="mt-4 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-lg transition-colors duration-200"
          >
            Go to Editor
          </button>
        </div>
      )}
    </div>
  );
};

export default PrintResults;
