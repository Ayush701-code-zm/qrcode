// Main Cart.jsx file
import React, { useState, useEffect, useRef } from "react";
import {
  ShoppingCart,
  Check,
  ChevronDown,
  MapPin,
  CreditCard,
  Tag,
} from "lucide-react";
import axios from "axios";
import { Input } from "../../../components/ui/input";
import { Label } from "../../../components/ui/label";
import Button from "../../../components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select";

// Importing sub-components
import CartItem from "./CartItem";
import AddressForm from "./AddressForm";
import ShippingOptions from "./ShippingOptions";
import OrderConfirmation from "./OrderConfirmation";
import EmptyCart from "./EmptyCart";

const Cart = ({ cart, setCart, setActiveTab, orderPlaced, setOrderPlaced }) => {
  const [shippingRates, setShippingRates] = useState([]);
  const [selectedShipping, setSelectedShipping] = useState(null);
  const [isLoadingRates, setIsLoadingRates] = useState(false);
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);
  const [orderInfo, setOrderInfo] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [selectedVariants, setSelectedVariants] = useState({});
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [lastFocusedInput, setLastFocusedInput] = useState(null);
  const inputRefs = useRef({});

  // Coupon state
  const [couponCode, setCouponCode] = useState("");
  const [couponInfo, setCouponInfo] = useState(null);
  const [isValidatingCoupon, setIsValidatingCoupon] = useState(false);
  const [couponError, setCouponError] = useState("");

  // Address form state
  const [addressForm, setAddressForm] = useState({
    name: "",
    email: "",
    address1: "",
    address2: "",
    city: "",
    state_code: "",
    country_code: "US",
    zip: "",
    phone: "",
  });

  // Handle variant change
  const handleVariantChange = (
    itemIndex,
    productId,
    variantId,
    variantData
  ) => {
    // Update the cart item with new variant info
    const updatedCart = [...cart];
    updatedCart[itemIndex] = {
      ...updatedCart[itemIndex],
      variant_id: variantId,
      price: variantData.price,
      size: variantData.size,
    };
    setCart(updatedCart);

    // Store selected variant
    setSelectedVariants({
      ...selectedVariants,
      [productId]: variantId,
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAddressForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Effect to restore focus after re-render
  useEffect(() => {
    if (lastFocusedInput && inputRefs.current[lastFocusedInput]) {
      // Use setTimeout to ensure the focus happens after the re-render
      setTimeout(() => {
        const input = inputRefs.current[lastFocusedInput];
        if (input) {
          input.focus();

          // If it's a text input, place cursor at the end
          if (
            input.type !== "select-one" &&
            typeof input.setSelectionRange === "function"
          ) {
            const length = input.value.length;
            input.setSelectionRange(length, length);
          }
        }
      }, 0);
    }
  }, [addressForm, lastFocusedInput]);

  // Set up ref for input elements
  const setInputRef = (name, element) => {
    inputRefs.current[name] = element;
  };

  // Validate coupon code
  const validateCoupon = async () => {
    if (!couponCode.trim()) {
      setCouponError("Please enter a coupon code");
      return;
    }

    setIsValidatingCoupon(true);
    setCouponError("");

    try {
      // Calculate the current cart total
      const cartTotal = subtotal;

      // Get product IDs from cart items
      const productIds = cart.map((item) => item.product_id || "");

      const response = await axios.post(
        `http://localhost:4000/api/validate-coupon/${couponCode}`,
        {
          cartTotal: cartTotal,
          productIds: productIds,
        }
      );

      if (response.data.valid) {
        // Extract discount info from the response structure
        const couponData = response.data.coupon;

        setCouponInfo({
          code: couponData.code,
          type: couponData.type, // "percentage"
          value: couponData.value, // 10
          maxDiscount: couponData.maxDiscount, // 10
          valid: true,
        });
        setCouponError("");
      } else {
        setCouponInfo(null);
        setCouponError(response.data.message || "Invalid coupon code");
      }
    } catch (error) {
      setCouponInfo(null);
      setCouponError(
        error.response?.data?.message || "Error validating coupon"
      );
    } finally {
      setIsValidatingCoupon(false);
    }
  };

  // Remove applied coupon
  const removeCoupon = () => {
    setCouponCode("");
    setCouponInfo(null);
    setCouponError("");
  };

  // Fetch shipping rates
  const fetchShippingRates = async () => {
    if (!validateAddressForm()) {
      setErrorMessage("Please fill out all required address fields");
      return;
    }

    setIsLoadingRates(true);
    setErrorMessage("");

    try {
      // Prepare items for shipping rate request
      const items = cart.map((item) => ({
        variant_id: item.variant_id,
        quantity: 1,
      }));

      // Prepare recipient data
      const recipient = {
        name: addressForm.name,
        address1: addressForm.address1,
        address2: addressForm.address2,
        city: addressForm.city,
        state_code: addressForm.state_code,
        country_code: addressForm.country_code,
        zip: addressForm.zip,
      };

      // Call your API to get shipping rates
      const response = await axios.post(
        "https://art-of-qr-backend.vercel.app/uploadImage/shipping/rates",
        {
          recipient,
          items,
        }
      );

      if (response.data.success) {
        setShippingRates(response.data.rates);
        if (response.data.rates.length > 0) {
          setSelectedShipping(response.data.rates[0].id);
        }
      } else {
        setErrorMessage("Failed to get shipping rates: " + response.data.error);
      }
    } catch (error) {
      setErrorMessage(
        "Error fetching shipping rates: " +
          (error.response?.data?.error || error.message)
      );
    } finally {
      setIsLoadingRates(false);
    }
  };

  // Validate address form
  const validateAddressForm = () => {
    const requiredFields = [
      "name",
      "email",
      "address1",
      "city",
      "state_code",
      "zip",
      "phone",
    ];
    return requiredFields.every((field) => addressForm[field]?.trim());
  };

  // Place order with Stripe checkout
  const placeOrder = async () => {
    if (!selectedShipping) {
      setErrorMessage("Please select a shipping method");
      return;
    }

    setIsPlacingOrder(true);
    setErrorMessage("");

    try {
      // Prepare items for Stripe checkout
      const lineItems = cart.map((item) => ({
        variant_id: parseInt(item.variant_id),
        quantity: 1,
        price: item.price,
        name: item.name,
        image: item.image,
        designUrl: item.designUrl || "",
        designText: item.designText || "",
        size: item.size || "",
      }));

      // Prepare customer data
      const customer = {
        name: addressForm.name,
        email: addressForm.email,
        address: {
          line1: addressForm.address1,
          line2: addressForm.address2 || "",
          city: addressForm.city,
          state: addressForm.state_code,
          country: addressForm.country_code,
          postal_code: addressForm.zip,
        },
        phone: addressForm.phone,
      };

      // Get shipping rate details
      const selectedRate = shippingRates.find(
        (rate) => rate.id === selectedShipping
      );

      // Call Stripe checkout endpoint
      const response = await axios.post(
        "https://art-of-qr-backend.vercel.app/stripe/create-checkout-session",
        {
          customer,
          items: lineItems,
          shipping: {
            id: selectedShipping,
            name: selectedRate?.name || "Standard Shipping",
            rate: selectedRate?.rate || shippingCost,
          },
          coupon: couponInfo, // Pass coupon info to the server
        }
      );

      if (response.data.url) {
        // Redirect to Stripe Checkout
        window.location.href = response.data.url;
      } else {
        setErrorMessage("Failed to create checkout session");
      }
    } catch (error) {
      setErrorMessage(
        "Error creating checkout session: " +
          (error.response?.data?.error || error.message)
      );
    } finally {
      setIsPlacingOrder(false);
    }
  };

  const subtotal = cart.reduce((total, item) => total + item.price, 0);
  const shippingCost = selectedShipping
    ? parseFloat(
        shippingRates.find((rate) => rate.id === selectedShipping)?.rate
      ) || 4.99
    : 4.99;

  // Calculate discount amount with max discount consideration
  const discount = couponInfo
    ? couponInfo.type === "percentage"
      ? Math.min(
          (subtotal * (couponInfo.value || 0)) / 100,
          couponInfo.maxDiscount || Infinity
        ) // Apply percentage with maximum cap
      : Math.min(couponInfo.value || 0, subtotal) // Fixed amount discount, capped at subtotal
    : 0;

  const discountedSubtotal = subtotal - discount;
  const total = discountedSubtotal + shippingCost;

  // Render coupon form
  const renderCouponForm = () => {
    return (
      <div className="mt-6 mb-6 border-t border-gray-200 dark:border-gray-700 pt-4">
        <h3 className="text-md font-medium text-gray-800 dark:text-gray-200 mb-3">
          Apply Coupon
        </h3>

        {couponInfo ? (
          <div className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg mb-4">
            <div className="flex items-center">
              <Tag size={18} className="text-green-500 mr-2" />
              <div>
                <p className="font-medium text-green-600 dark:text-green-400">
                  {couponInfo.code}
                </p>
                <p className="text-sm text-green-600 dark:text-green-400">
                  {couponInfo.type === "percentage"
                    ? `${couponInfo.value || 0}% off`
                    : `$${(couponInfo.value || 0).toFixed(2)} off`}
                </p>
              </div>
            </div>
            <button
              onClick={removeCoupon}
              className="text-sm text-red-500 hover:text-red-600"
            >
              Remove
            </button>
          </div>
        ) : (
          <div className="flex items-center space-x-2">
            <div className="flex-1">
              <Input
                type="text"
                placeholder="Enter coupon code"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
                className="w-full"
              />
            </div>

            <button
              onClick={validateCoupon}
              disabled={isValidatingCoupon || !couponCode.trim()}
              className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-lg transition-colors duration-200 flex items-center"
            >
              {isValidatingCoupon ? "Validating..." : "Apply"}
            </button>
          </div>
        )}

        {couponError && (
          <div className="mt-2 text-sm text-red-600 dark:text-red-400">
            {couponError}
          </div>
        )}
      </div>
    );
  };

  // Cart content rendering
  const renderCartContent = () => {
    if (cart.length === 0) {
      return <EmptyCart setActiveTab={setActiveTab} />;
    }

    return (
      <div>
        <div className="divide-y divide-gray-200 dark:divide-gray-700">
          {cart.map((item, index) => (
            <CartItem
              key={index}
              item={item}
              index={index}
              selectedVariants={selectedVariants}
              handleVariantChange={handleVariantChange}
              removeItem={() => setCart(cart.filter((_, i) => i !== index))}
            />
          ))}
        </div>

        {renderCouponForm()}

        <div className="mt-6 border-t border-gray-200 dark:border-gray-700 pt-4">
          <div className="flex justify-between mb-2">
            <span className="text-gray-600 dark:text-gray-400">Subtotal</span>
            <span className="font-medium text-gray-800 dark:text-gray-200">
              ${subtotal.toFixed(2)}
            </span>
          </div>

          {discount > 0 && (
            <div className="flex justify-between mb-2 text-green-600 dark:text-green-400">
              <span>Discount</span>
              <span>-${discount.toFixed(2)}</span>
            </div>
          )}

          <div className="flex justify-between mb-4">
            <span className="text-gray-600 dark:text-gray-400">Shipping</span>
            <span className="font-medium text-gray-800 dark:text-gray-200">
              ${shippingCost.toFixed(2)}
            </span>
          </div>
          <div className="flex justify-between mb-6 pb-4 border-b border-gray-200 dark:border-gray-700">
            <span className="text-lg font-medium text-gray-800 dark:text-gray-200">
              Total
            </span>
            <span className="text-lg font-medium text-gray-800 dark:text-gray-200">
              ${total.toFixed(2)}
            </span>
          </div>

          {!showAddressForm ? (
            <button
              onClick={() => setShowAddressForm(true)}
              className="w-full py-3 bg-orange-500 hover:bg-orange-600 text-white font-medium rounded-lg transition-colors duration-200"
            >
              Proceed to Checkout
            </button>
          ) : shippingRates.length > 0 ? (
            <button
              onClick={placeOrder}
              disabled={isPlacingOrder}
              className="w-full py-3 bg-green-500 hover:bg-green-600 text-white font-medium rounded-lg transition-colors duration-200 flex items-center justify-center"
            >
              <CreditCard size={18} className="mr-2" />
              {isPlacingOrder ? "Processing..." : "Proceed to Payment"}
            </button>
          ) : null}

          {errorMessage && (
            <div className="mt-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-red-600 dark:text-red-400 text-sm">
              {errorMessage}
            </div>
          )}
        </div>

        {showAddressForm && (
          <AddressForm
            addressForm={addressForm}
            handleInputChange={handleInputChange}
            setLastFocusedInput={setLastFocusedInput}
            setInputRef={setInputRef}
            fetchShippingRates={fetchShippingRates}
            isLoadingRates={isLoadingRates}
          />
        )}

        {shippingRates.length > 0 && (
          <ShippingOptions
            shippingRates={shippingRates}
            selectedShipping={selectedShipping}
            setSelectedShipping={setSelectedShipping}
            isLoadingRates={isLoadingRates}
            errorMessage={errorMessage}
          />
        )}
      </div>
    );
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
      <h2 className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-6">
        Shopping Cart
      </h2>

      {orderPlaced ? (
        <OrderConfirmation
          orderInfo={orderInfo}
          setActiveTab={setActiveTab}
          setCart={setCart}
          setOrderPlaced={setOrderPlaced}
        />
      ) : (
        renderCartContent()
      )}
    </div>
  );
};

export default Cart;
