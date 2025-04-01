import React, { useState, useEffect } from "react";
import { ShoppingCart, Check, ChevronDown, MapPin, CreditCard } from "lucide-react";
import axios from "axios";
import { Input } from "../../../components/ui/input";
import { Label } from "../../../components/ui/label";
import  Button  from "../../../components/ui/button";
import { Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,} from "../../../components/ui/select"

const Cart = ({
  cart,
  setCart,
  setActiveTab,
  orderPlaced,
  setOrderPlaced,
}) => {
  const [shippingRates, setShippingRates] = useState([]);
  const [selectedShipping, setSelectedShipping] = useState(null);
  const [isLoadingRates, setIsLoadingRates] = useState(false);
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);
  const [orderInfo, setOrderInfo] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [selectedVariants, setSelectedVariants] = useState({});
  const [showAddressForm, setShowAddressForm] = useState(false);

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
    phone: ""
  });

  // Handle variant change
  const handleVariantChange = (itemIndex, productId, variantId, variantData) => {
    // Update the cart item with new variant info
    const updatedCart = [...cart];
    updatedCart[itemIndex] = {
      ...updatedCart[itemIndex],
      variant_id: variantId,
      price: variantData.price,
      size: variantData.size
    };
    setCart(updatedCart);
    
    // Store selected variant
    setSelectedVariants({
      ...selectedVariants,
      [productId]: variantId
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    // Combine both state updates into a single function call
    setAddressForm(prevForm => {
      // Only clear error message if needed and in the same update cycle
      if (errorMessage) {
        setErrorMessage("");
      }
      
      // Return the updated form state
      return {
        ...prevForm,
        [name]: value
      };
    });
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
      const items = cart.map(item => ({
        variant_id: item.variant_id,
        quantity: 1
      }));
      
      // Prepare recipient data
      const recipient = {
        name: addressForm.name,
        address1: addressForm.address1,
        address2: addressForm.address2,
        city: addressForm.city,
        state_code: addressForm.state_code,
        country_code: addressForm.country_code,
        zip: addressForm.zip
      };
      
      // Call your API to get shipping rates
      const response = await axios.post('http://localhost:3001/uploadImage/shipping/rates', {
        recipient,
        items
      });
      
      if (response.data.success) {
        setShippingRates(response.data.rates);
        if (response.data.rates.length > 0) {
          setSelectedShipping(response.data.rates[0].id);
        }
      } else {
        setErrorMessage("Failed to get shipping rates: " + response.data.error);
      }
    } catch (error) {
      setErrorMessage("Error fetching shipping rates: " + (error.response?.data?.error || error.message));
    } finally {
      setIsLoadingRates(false);
    }
  };
  
  // Validate address form
  const validateAddressForm = () => {
    const requiredFields = ['name', 'email', 'address1', 'city', 'state_code', 'zip', 'phone'];
    return requiredFields.every(field => addressForm[field]?.trim());
  };

  // Place order
  const placeOrder = async () => {
    if (!selectedShipping) {
      setErrorMessage("Please select a shipping method");
      return;
    }
    
    setIsPlacingOrder(true);
    setErrorMessage("");
    
    try {
      // Prepare items for order
      const items = cart.map(item => ({
        variant_id: parseInt(item.variant_id),
        quantity: 1,
        price: item.price.toString(),
        retail_price: item.price.toString(),
        name: item.name,
        files: [{
          type: "default",
          url: item.designUrl || "",
          visible: true
        }]
      }));
      
      // Prepare recipient data
      const recipient = {
        name: addressForm.name,
        email: addressForm.email,
        address1: addressForm.address1,
        address2: addressForm.address2 || "",
        city: addressForm.city,
        state_code: addressForm.state_code,
        country_code: addressForm.country_code,
        zip: addressForm.zip,
        phone: addressForm.phone
      };
      
      // Call your API to place order
      const response = await axios.post('/api/placeOrder', {
        recipient,
        items,
        shipping_option_id: selectedShipping
      });
      
      if (response.data.success) {
        setOrderInfo(response.data.order);
        setOrderPlaced(true);
      } else {
        setErrorMessage("Failed to place order: " + response.data.error);
      }
    } catch (error) {
      setErrorMessage("Error placing order: " + (error.response?.data?.error || error.message));
    } finally {
      setIsPlacingOrder(false);
    }
  };
  
  const subtotal = cart.reduce((total, item) => total + item.price, 0);
  const shippingCost = selectedShipping ? 
    shippingRates.find(rate => rate.id === selectedShipping)?.rate || 4.99 : 
    4.99;
  const total = subtotal + shippingCost;

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
            {orderInfo?.id || Math.floor(Math.random() * 1000000).toString().padStart(6, "0")}
          </span>
        </div>
        <div className="flex justify-between mb-2">
          <span className="text-gray-600 dark:text-gray-400">
            Status:
          </span>
          <span className="font-medium text-gray-800 dark:text-gray-200">
            {orderInfo?.status || "Processing"}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600 dark:text-gray-400">
            Estimated Delivery:
          </span>
          <span className="font-medium text-gray-800 dark:text-gray-200">
            {new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString()}
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

  const AddressForm = () => (
    <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
      <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-4 flex items-center">
        <MapPin size={18} className="mr-2" />
        Shipping Address
      </h3>
      
      <form onSubmit={(e) => e.preventDefault()} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="name">Full Name *</Label>
          <Input
            id="name"
            name="name"
            value={addressForm.name}
            onChange={handleInputChange}
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="email">Email *</Label>
          <Input
            id="email"
            name="email"
            type="email"
            value={addressForm.email}
            onChange={handleInputChange}
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="address1">Address Line 1 *</Label>
          <Input
            id="address1"
            name="address1"
            value={addressForm.address1}
            onChange={handleInputChange}
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="address2">Address Line 2</Label>
          <Input
            id="address2"
            name="address2"
            value={addressForm.address2}
            onChange={handleInputChange}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="city">City *</Label>
          <Input
            id="city"
            name="city"
            value={addressForm.city}
            onChange={handleInputChange}
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="state_code">State/Province *</Label>
          <Input
            id="state_code"
            name="state_code"
            value={addressForm.state_code}
            onChange={handleInputChange}
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="zip">ZIP/Postal Code *</Label>
          <Input
            id="zip"
            name="zip"
            value={addressForm.zip}
            onChange={handleInputChange}
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="phone">Phone Number *</Label>
          <Input
            id="phone"
            name="phone"
            type="tel"
            value={addressForm.phone}
            onChange={handleInputChange}
            required
          />
        </div>
        
        <div className="md:col-span-2 space-y-2">
          <Label htmlFor="country_code">Country</Label>
          <Select 
            name="country_code" 
            value={addressForm.country_code} 
            onValueChange={(value) => {
              setAddressForm({
                ...addressForm,
                country_code: value
              });
            }}
          >
            <SelectTrigger id="country_code">
              <SelectValue placeholder="Select Country" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="US">United States</SelectItem>
              <SelectItem value="CA">Canada</SelectItem>
              <SelectItem value="GB">United Kingdom</SelectItem>
              <SelectItem value="AU">Australia</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="md:col-span-2 mt-4 flex justify-end">
          <button
            onClick={fetchShippingRates}
            disabled={isLoadingRates}
            className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-lg transition-colors duration-200 flex items-center"
          >
            {isLoadingRates ? "Getting Rates..." : "Get Shipping Rates"}
          </button>
        </div>
      </form>
    </div>
  );
  

  const ShippingOptions = () => (
    <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
      <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-4">
        Shipping Options
      </h3>
      
      {isLoadingRates ? (
        <div className="text-center py-4">
          <p className="text-gray-600 dark:text-gray-400">Loading shipping options...</p>
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
                      {rate.description || "Standard shipping"}
                    </p>
                  </div>
                </div>
                <p className="font-medium text-gray-800 dark:text-gray-200">
                  ${rate.rate.toFixed(2)}
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-4">
          <p className="text-gray-600 dark:text-gray-400">
            {errorMessage || "No shipping options available. Please check your address."}
          </p>
        </div>
      )}
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
                className="py-4 flex flex-col md:flex-row md:items-center md:justify-between"
              >
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
                          handleVariantChange(index, item.product_id, variantId, variantData);
                        }}
                        className="block w-full pl-3 pr-10 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                      >
                        {Object.entries(item.pricing.variants).map(([variantId, variant]) => (
                          <option key={variantId} value={variantId}>
                            {variant.size} - ${variant.price.toFixed(2)}
                          </option>
                        ))}
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
                      onClick={() => setCart(cart.filter((_, i) => i !== index))}
                      className="text-red-500 hover:text-red-600 transition-colors duration-200"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-6 border-t border-gray-200 dark:border-gray-700 pt-4">
            <div className="flex justify-between mb-2">
              <span className="text-gray-600 dark:text-gray-400">Subtotal</span>
              <span className="font-medium text-gray-800 dark:text-gray-200">
                ${subtotal.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between mb-4">
              <span className="text-gray-600 dark:text-gray-400">
                Shipping
              </span>
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
                {isPlacingOrder ? "Processing..." : "Place Order"}
              </button>
            ) : null}
            
            {errorMessage && (
              <div className="mt-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-red-600 dark:text-red-400 text-sm">
                {errorMessage}
              </div>
            )}
          </div>
          
          {showAddressForm && <AddressForm />}
          {shippingRates.length > 0 && <ShippingOptions />}
        </div>
      )}
    </div>
  );

  return orderPlaced ? <OrderConfirmation /> : <CartContent />;
};

export default Cart;