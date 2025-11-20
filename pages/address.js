import { useState } from "react";
import { motion } from "framer-motion";
import pincodeData from "./../components/Data/pincodes.json";

export default function AddressForm() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    house: "",
    street: "",
    landmark: "",
  });
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [pincode, setPincode] = useState("");
  const [invalidPincode, setInvalidPincode] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Address Submitted:", form);
  };

  const handlePincodeChange = (e) => {
    const pin = e.target.value;
    setPincode(pin);
    setInvalidPincode(false);

    // Update pincode instantly inside form too
    setForm((prev) => ({ ...prev, pincode: pin }));

    if (pin.length === 6) {
      const match = pincodeData.pincodes.find(
        (item) => item.pincode.toString() === pin
      );

      if (match) {
        setCity(match.districtName);
        setState(match.stateName);

        setForm((prev) => ({
          ...prev,
          pincode: pin,
          city: match.districtName,
          state: match.stateName,
        }));
        setInvalidPincode(false);
      } else {
        setInvalidPincode(true);
        setCity("");
        setState("");
        setForm((prev) => ({
          ...prev,
          city: "",
          state: "",
        }));
      }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="text-center mb-10 px-3"
    >
      <div className="pt-[95px]">
        <div className="min-h-screen flex justify-center items-center p-4">
          <form
            onSubmit={handleSubmit}
            className="w-full max-w-lg bg-white p-6 sm:p-8 rounded-2xl shadow-xl space-y-5"
          >
            <h2 className="text-2xl font-bold text-gray-800 text-center">
              Delivery Address
            </h2>

            {/* Full Name */}
            <div>
              <label className="text-sm font-medium">Full Name</label>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                className="border border-gray-300 w-full p-2.5 rounded-lg text-sm outline-none focus:ring-2 focus:ring-black"
                placeholder="John Doe"
                required
              />
            </div>

            {/* Mobile + Pincode */}
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">Mobile Number</label>
                <input
                  type="tel"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  className="border border-gray-300 w-full p-2.5 rounded-lg text-sm outline-none focus:ring-2 focus:ring-black"
                  placeholder="9876543210"
                  required
                />
              </div>

              <div>
                <label className="text-sm font-medium">Pincode</label>
                {invalidPincode && (
                  <p className="text-red-500 text-xs m-1">Invalid Pincode</p>
                )}
                <input
                  name="pincode"
                  value={pincode}
                  onChange={handlePincodeChange}
                  className="border border-gray-300 w-full p-2.5 rounded-lg text-sm outline-none focus:ring-2 focus:ring-black"
                  placeholder="110001"
                  required
                />
              </div>
            </div>

            {/* City / State */}
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">City</label>
                <input
                  name="city"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="border border-gray-300 w-full p-2.5 rounded-lg text-sm outline-none focus:ring-2 focus:ring-black"
                  placeholder="City"
                  required
                />
              </div>

              <div>
                <label className="text-sm font-medium">State</label>
                <input
                  name="state"
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  className="border border-gray-300 w-full p-2.5 rounded-lg text-sm outline-none focus:ring-2 focus:ring-black"
                  placeholder="State"
                  required
                />
              </div>
            </div>

            {/* Address fields */}
            <div>
              <label className="text-sm font-medium">
                House / Flat / Building
              </label>
              <input
                name="house"
                value={form.house}
                onChange={handleChange}
                className="border border-gray-300 w-full p-2.5 rounded-lg text-sm outline-none focus:ring-2 focus:ring-black"
                placeholder="Flat No, Building Name"
                required
              />
            </div>

            <div>
              <label className="text-sm font-medium">Street / Area</label>
              <input
                name="street"
                value={form.street}
                onChange={handleChange}
                className="border border-gray-300 w-full p-2.5 rounded-lg text-sm outline-none focus:ring-2 focus:ring-black"
                placeholder="Street / Area"
                required
              />
            </div>

            <div>
              <label className="text-sm font-medium">Landmark (Optional)</label>
              <input
                name="landmark"
                value={form.landmark}
                onChange={handleChange}
                className="border border-gray-300 w-full p-2.5 rounded-lg text-sm outline-none focus:ring-2 focus:ring-black"
                placeholder="Near XYZ Mall"
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full bg-black text-white py-2.5 rounded-lg font-semibold hover:bg-gray-900 transition-all"
            >
              Save Address & Continue
            </button>
          </form>
        </div>
      </div>
    </motion.div>
  );
}
