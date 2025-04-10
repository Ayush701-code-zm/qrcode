// AddressForm.jsx
import React from "react";
import { MapPin } from "lucide-react";
import { Input } from "../../../components/ui/input";
import { Label } from "../../../components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select";

const AddressForm = ({
  addressForm,
  handleInputChange,
  setLastFocusedInput,
  setInputRef,
  fetchShippingRates,
  isLoadingRates,
}) => {
  return (
    <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
      <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-4 flex items-center">
        <MapPin size={18} className="mr-2" />
        Shipping Address
      </h3>

      <form
        onSubmit={(e) => e.preventDefault()}
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        <div className="space-y-2">
          <Label htmlFor="name">Full Name *</Label>
          <Input
            id="name"
            name="name"
            value={addressForm.name}
            onChange={handleInputChange}
            onFocus={() => setLastFocusedInput("name")}
            ref={(el) => setInputRef("name", el)}
            autoComplete="off"
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
            onFocus={() => setLastFocusedInput("email")}
            ref={(el) => setInputRef("email", el)}
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
            onFocus={() => setLastFocusedInput("address1")}
            ref={(el) => setInputRef("address1", el)}
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
            onFocus={() => setLastFocusedInput("address2")}
            ref={(el) => setInputRef("address2", el)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="city">City *</Label>
          <Input
            id="city"
            name="city"
            value={addressForm.city}
            onChange={handleInputChange}
            onFocus={() => setLastFocusedInput("city")}
            ref={(el) => setInputRef("city", el)}
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
            onFocus={() => setLastFocusedInput("state_code")}
            ref={(el) => setInputRef("state_code", el)}
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
            onFocus={() => setLastFocusedInput("zip")}
            ref={(el) => setInputRef("zip", el)}
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
            onFocus={() => setLastFocusedInput("phone")}
            ref={(el) => setInputRef("phone", el)}
            required
          />
        </div>

        <div className="md:col-span-2 space-y-2">
          <Label htmlFor="country_code">Country</Label>
          <Select
            name="country_code"
            value={addressForm.country_code}
            onValueChange={(value) => {
              handleInputChange({
                target: { name: "country_code", value },
              });
              setLastFocusedInput("country_code");
            }}
            onFocus={() => setLastFocusedInput("country_code")}
          >
            <SelectTrigger
              id="country_code"
              ref={(el) => setInputRef("country_code", el)}
            >
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
};

export default AddressForm;
