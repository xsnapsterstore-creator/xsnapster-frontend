import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import pincodeData from "./../components/Data/pincodes.json";
import EditIcon from "@mui/icons-material/Edit";
import { fetchUserAddress } from "@/components/API/api";

export default function AddressForm() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    house: "",
    street: "",
    landmark: "",
    pincode: "",
    city: "",
    state: "",
  });

  const [selectedId, setSelectedId] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [pincode, setPincode] = useState("");
  const [loading, setLoading] = useState(true);
  const [UserAddress, setUserAddress] = useState([]);
  const [invalidPincode, setInvalidPincode] = useState(false);

  // 📌 Form heading (Dynamic)
  const formHeading =
    UserAddress.length === 0 || selectedId === null
      ? "Add New Address"
      : "Edit Address";

  // 📌 Handle Input Changes
  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  // 📌 Handle Pincode Auto-Fill
  const handlePincodeChange = (e) => {
    const pin = e.target.value;
    setPincode(pin);
    setInvalidPincode(false);

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
          city: match.districtName,
          state: match.stateName,
        }));
      } else {
        setInvalidPincode(true);
        setCity("");
        setState("");
      }
    }
  };

  // 📌 Handle Edit Address
  const handleEdit = (address) => {
    setSelectedId(address.address_id);
    setShowForm(true);

    setForm({
      name: address.user_name,
      phone: address.user_contact,
      house: address.house_no,
      street: address.street,
      landmark: address.landmark,
      pincode: address.pincode,
      city: address.city,
      state: address.state,
    });

    setPincode(address.pincode);
    setCity(address.city);
    setState(address.state);
  };

  const handleSaveContinue = () => {
    const selectedAddress = UserAddress.find(
      (addr) => addr.address_id === selectedId
    );

    console.log("Existing Address API Just continue:", selectedAddress);
  };

  // 📌 On Submit
  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedId) {
      console.log("This is the PUT API call:", form);
    } else {
      console.log("This is POST API call:", form);
    }
  };

  useEffect(() => {
    async function user() {
      const token = localStorage.getItem("access_token");
      setUserAddress((await fetchUserAddress(token)) || []);
    }
    console.log("This is the current data:", UserAddress)
    setLoading(false)
    user();
  }, []);

  // 📌 Auto show form if no addresses exist
  useEffect(() => {
    if (UserAddress.length === 0) {
      setShowForm(true);
    }
  }, [UserAddress]);

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="min-h-screen pt-[115px] pb-10 px-4"
    >
      {/*   Existing Addresses Section */}
      {UserAddress.length > 0 && (
        <div className="max-w-2xl mx-auto mb-6">
          <h2 className="text-xl font-bold mb-3 text-gray-800">
            Your Addresses
          </h2>

          <div className="space-y-4">
            {UserAddress.map((address) => (
              <div
                key={address.address_id}
                onClick={() => {
                  setSelectedId(address.address_id);
                  setShowForm(false);
                }}
                className={`border bg-white rounded-xl p-4 flex justify-between items-start shadow-sm hover:shadow-md transition cursor-pointer
                  ${
                    selectedId === address.address_id
                      ? "border-black ring-1 ring-black"
                      : "border-gray-200"
                  }
                `}
              >
                <div>
                  <p className="font-semibold text-gray-900 mb-1">
                    {address.user_name}
                  </p>
                  <p className="font-semibold text-sm text-gray-900 mb-1">
                    {address.user_contact}
                  </p>

                  <p className="text-sm text-gray-600 leading-relaxed">
                    {address.house_no}, {address.street}, {address.landmark}
                    <br />
                    {address.city}, {address.state} ({address.pincode})
                    <br />
                    {address.country}
                  </p>
                </div>

                <div className="flex flex-col gap-2">
                  {/* Edit */}
                  <button
                    className="px-4 py-1 bg-blue-500 text-white rounded-lg text-sm font-medium hover:bg-blue-600"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleEdit(address);
                    }}
                  >
                    <EditIcon fontSize="small" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Save & Continue (Only when selected) */}
          {selectedId && !showForm && (
            <button
              onClick={handleSaveContinue}
              className="w-full mt-5 bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-900"
            >
              Save & Continue
            </button>
          )}
        </div>
      )}

      {/*  Address Form */}
      {showForm && (
        <div className="flex justify-center">
          <form
            onSubmit={handleSubmit}
            className="w-full max-w-lg bg-white p-6 sm:p-8 rounded-2xl shadow-xl space-y-5"
          >
            <h2 className="text-2xl font-bold text-gray-800 text-center">
              {formHeading}
            </h2>

            {/* Full Name */}
            <div>
              <label className="text-sm font-medium">Full Name</label>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                className="border border-gray-300 w-full p-2.5 rounded-lg text-sm outline-none focus:ring-2 focus:ring-black"
                required
              />
            </div>

            {/* Mobile + Pincode */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">Mobile Number</label>
                <input
                  type="tel"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  className="border border-gray-300 w-full p-2.5 rounded-lg text-sm outline-none focus:ring-2 focus:ring-black"
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
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">City</label>
                <input
                  name="city"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="border border-gray-300 w-full p-2.5 rounded-lg text-sm outline-none focus:ring-2 focus:ring-black"
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
                  required
                />
              </div>
            </div>

            {/* Address fields */}
            <div>
              <label className="text-sm font-medium">House / Flat</label>
              <input
                name="house"
                value={form.house}
                onChange={handleChange}
                className="border border-gray-300 w-full p-2.5 rounded-lg text-sm outline-none focus:ring-2 focus:ring-black"
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
                required
              />
            </div>

            <div>
              <label className="text-sm font-medium">Landmark</label>
              <input
                name="landmark"
                value={form.landmark}
                onChange={handleChange}
                className="border border-gray-300 w-full p-2.5 rounded-lg text-sm outline-none focus:ring-2 focus:ring-black"
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full bg-black text-white py-2.5 rounded-lg font-semibold hover:bg-gray-900 transition-all"
            >
              Save Address
            </button>
          </form>
        </div>
      )}

      {/* Add New Address Button */}
      {!showForm && (
        <div className="mt-5 max-w-lg mx-auto">
          <button
            onClick={() => {
              setForm({
                name: "",
                phone: "",
                house: "",
                street: "",
                landmark: "",
                pincode: "",
                city: "",
                state: "",
              });
              setCity("");
              setState("");
              setPincode("");
              setSelectedId(null);
              setShowForm(true);
            }}
            className="w-full bg-black text-white py-2.5 rounded-lg font-semibold hover:bg-gray-900 transition-all"
          >
            + Add New Address
          </button>
        </div>
      )}
    </motion.div>
  );
}
