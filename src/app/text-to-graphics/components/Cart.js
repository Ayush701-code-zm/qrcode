import React from "react";
import { ShoppingCart, Check } from "lucide-react";

const Cart = ({
  cart,
  setCart,
  setActiveTab,
  placeOrder,
  orderPlaced,
  setOrderPlaced,
}) => {
  const OrderConfirmation = () => (
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
            {Math.floor(Math.random() * 1000000)
              .toString()
              .padStart(6, "0")}
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

  const CartContent = () => (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
      <h2 className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-6">
        Shopping Cart
      </h2>

      {cart.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-64 text-center">
          <div className="bg-gray-100 dark:bg-gray-700 rounded-full p-4 mb-4">
            <ShoppingCart
              size={32}
              className="text-gray-400 dark:text-gray-500"
            />
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
      ) : (
        <div>
          <div className="divide-y divide-gray-200 dark:divide-gray-700">
            {cart.map((item, index) => (
              <div
                key={index}
                className="py-4 flex items-center justify-between"
              >
                <div className="flex items-center">
                  <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded overflow-hidden mr-4">
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
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Design: {item.designText.substring(0, 20)}
                      {item.designText.length > 20 ? "..." : ""}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {item.designUrl &&
                        `URL: ${item.designUrl.substring(0, 20)}...`}
                    </p>
                  </div>
                </div>
                <div className="flex items-center">
                  <span className="font-medium text-gray-800 dark:text-gray-200 mr-4">
                    ${item.price.toFixed(2)}
                  </span>
                  <button
                    onClick={() => setCart(cart.filter((_, i) => i !== index))}
                    className="text-red-500 hover:text-red-600 transition-colors duration-200"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 border-t border-gray-200 dark:border-gray-700 pt-4">
            <div className="flex justify-between mb-2">
              <span className="text-gray-600 dark:text-gray-400">Subtotal</span>
              <span className="font-medium text-gray-800 dark:text-gray-200">
                $
                {cart.reduce((total, item) => total + item.price, 0).toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between mb-4">
              <span className="text-gray-600 dark:text-gray-400">
                Estimated Shipping
              </span>
              <span className="font-medium text-gray-800 dark:text-gray-200">
                $4.99
              </span>
            </div>
            <div className="flex justify-between mb-6 pb-4 border-b border-gray-200 dark:border-gray-700">
              <span className="text-lg font-medium text-gray-800 dark:text-gray-200">
                Total
              </span>
              <span className="text-lg font-medium text-gray-800 dark:text-gray-200">
                $
                {(
                  cart.reduce((total, item) => total + item.price, 0) + 4.99
                ).toFixed(2)}
              </span>
            </div>
            <button
              onClick={placeOrder}
              className="w-full py-3 bg-green-500 hover:bg-green-600 text-white font-medium rounded-lg transition-colors duration-200"
            >
              Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );

  return orderPlaced ? <OrderConfirmation /> : <CartContent />;
};

export default Cart;
