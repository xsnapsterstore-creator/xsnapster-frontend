import React from "react";
import { useState, useEffect } from "react";
import Image from "next/image";
import pincodeData from "./../../components/Data/pincodes.json";
import { fetchUserProfile, logOutUserProfile } from "../API/api";
import { useRouter } from "next/router";

const User = () => {
  const router = useRouter();
  const [openOrder, setOpenOrder] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [invalidPincode, setInvalidPincode] = useState(false);
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [pincode, setPincode] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userData, SetUserData] = useState({});
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

  useEffect(() => {
    const storedEmail = window.localStorage.getItem("userEmail");
    if (storedEmail) setUserEmail(storedEmail);
  }, []);

  const [formData, setFormData] = useState({
    name: "",
    address_line: "",
    city: "",
    state: "",
    zip_code: "",
    address_type: "",
    phone_number: "",
    user_id: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name.startsWith("address.")) {
      const key = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        address: { ...prev.address, [key]: value },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const toggleEdit = () => setIsEditing(!isEditing);

  const toggleOrder = (id) => {
    setOpenOrder(openOrder === id ? null : id);
  };

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

  async function handleSubmit(e) {
    e.preventDefault();
    console.log("Submitted Data:", form);
  }

  async function logOut() {
    const res = await logOutUserProfile(); // this is already JSON

    if (res?.status === "success" || res?.ok) {
      alert("Log Out Successfully");
      localStorage.removeItem("access_token");
      localStorage.removeItem("token_type");
      localStorage.removeItem("userEmail");
      localStorage.removeItem("userID");
    } else {
      alert("Something Went Wrong");
    }
  }

  useEffect(() => {
    async function fetchUserDetails() {
      const token = localStorage.getItem("access_token");
      if (!token) {
        router.push("/login");
        return;
      }
      const res = await fetchUserProfile();
      const add = res.default_address.address_line;
      const parts = add.split(",");
      setFormData({
        name: res.default_address.name,
        address_line: res.default_address.address_line,
        house: parts[0],
        street: parts[2],
        landmark: parts[1],
        city: res.default_address.city,
        state: res.default_address.state,
        zip_code: res.default_address.zip_code,
        address_type: res.default_address.address_line,
        phone_number: res.default_address.phone_number,
        user_id: res.default_address.user_id,
      });

      SetUserData(res);
    }
    fetchUserDetails();
  }, []);

  if (!userData.default_address) {
    return (
      <div className="pt-[115px] min-h-screen bg-gray-50 py-10 px-5">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-xl font-semibold text-gray-900 text-center">
            Add Profile Information
          </h2>
          <p className="text-gray-500 text-center text-sm mb-4">{userEmail}</p>
          <form
            onSubmit={handleSubmit}
            className="w-full max-w-lg bg-white mx-auto p-6 sm:p-8 rounded-2xl shadow-xl space-y-5"
          >
            {/* Full Name */}
            <div>
              <label className="text-sm font-medium">Full Name</label>
              <input
                name="name"
                value={form.name}
                onChange={(e) =>
                  setForm((prev) => ({
                    ...prev,
                    name: e.target.value,
                  }))
                }
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
                  onChange={(e) =>
                    setForm((prev) => ({
                      ...prev,
                      phone: e.target.value,
                    }))
                  }
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
                onChange={(e) =>
                  setForm((prev) => ({
                    ...prev,
                    house: e.target.value,
                  }))
                }
                className="border border-gray-300 w-full p-2.5 rounded-lg text-sm outline-none focus:ring-2 focus:ring-black"
                required
              />
            </div>

            <div>
              <label className="text-sm font-medium">Street / Area</label>
              <input
                name="street"
                value={form.street}
                onChange={(e) =>
                  setForm((prev) => ({
                    ...prev,
                    street: e.target.value,
                  }))
                }
                className="border border-gray-300 w-full p-2.5 rounded-lg text-sm outline-none focus:ring-2 focus:ring-black"
                required
              />
            </div>

            <div>
              <label className="text-sm font-medium">Landmark</label>
              <input
                name="landmark"
                value={form.landmark}
                onChange={(e) =>
                  setForm((prev) => ({
                    ...prev,
                    landmark: e.target.value,
                  }))
                }
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
      </div>
    );
  } else {
    return (
      <div className="pt-[115px] min-h-screen bg-gray-50 py-10 px-5">
        <div className="max-w-5xl mx-auto">
          {/* Profile Card */}
          <div className="bg-white rounded-2xl shadow-xl p-8 flex flex-col md:flex-row items-center md:items-start gap-5">
            {/* Avatar */}
            <div className="w-28 h-28 rounded-full bg-black text-white flex items-center justify-center text-4xl font-bold shadow-md">
              {userData.default_address.name.charAt(0)}
            </div>

            {/* User Info */}
            <div className="flex-1 w-full">
              <h2 className="text-xl font-semibold text-gray-900 text-center md:text-left">
                Profile Information
              </h2>
              <p className="mt-1 text-center md:text-left text-gray-500 text-sm">
                Manage your account details
              </p>

              {/* Info List */}
              <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
                  <p className="text-gray-500 text-xs">Full Name</p>
                  <p className="font-semibold text-gray-900">
                    {userData.default_address.name}
                  </p>
                </div>

                <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
                  <p className="text-gray-500 text-xs">Email Address</p>
                  <p className="font-semibold text-gray-900 break-all">
                    {userData.email}
                  </p>
                </div>

                <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
                  <p className="text-gray-500 text-xs">Phone Number</p>
                  <p className="font-semibold text-gray-900">
                    {userData.default_address.phone_number}
                  </p>
                </div>

                <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
                  <p className="text-gray-500 text-xs">Address</p>
                  <span className="font-semibold text-gray-900">
                    {userData.default_address.address_line},{" "}
                    {userData.default_address.city},{" "}
                    {userData.default_address.state},{" "}
                    {userData.default_address.country} (
                    {userData.default_address.zip_code})
                  </span>
                </div>

                {/* Edit Button */}
                <div className="mt-6 flex justify-center items-center gap-5">
                  <button
                    onClick={toggleEdit}
                    className="w-full py-3 cursor-pointer bg-black text-white rounded-xl font-medium text-sm active:scale-95 transition"
                  >
                    {isEditing ? "Close Editor" : "Edit Profile"}
                  </button>
                  <button
                    onClick={logOut}
                    className="w-full py-3 cursor-pointer bg-black text-white rounded-xl font-medium text-sm active:scale-95 transition"
                  >
                    Log Out
                  </button>
                </div>

                {/* Expandable Edit Form */}
                <div
                  className={`transition-all duration-300 overflow-hidden ${
                    isEditing ? "max-h-[1200px] mt-6" : "max-h-0"
                  }`}
                >
                  <form className="bg-gray-50 p-5 rounded-xl border border-gray-200 space-y-3">
                    {/* Name */}
                    <div>
                      <label className="text-xs text-gray-500">Full Name</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full mt-1 p-3 rounded-lg border bg-white text-sm"
                      />
                    </div>

                    {/* Phone */}
                    <div>
                      <label className="text-xs text-gray-500">
                        Phone Number
                      </label>
                      <input
                        type="text"
                        name="contact"
                        value={formData.phone_number}
                        onChange={handleChange}
                        className="w-full mt-1 p-3 rounded-lg border bg-white text-sm"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-xs text-gray-500">Pincode</label>
                        <input
                          type="text"
                          name="address.pincode"
                          value={formData.zip_code}
                          onChange={handleChange}
                          className="w-full mt-1 p-3 rounded-lg border bg-white text-sm"
                        />
                      </div>
                      <div>
                        <label className="text-xs text-gray-500">City</label>
                        <input
                          type="text"
                          name="address.city"
                          value={formData.city}
                          onChange={handleChange}
                          className="w-full mt-1 p-3 rounded-lg border bg-white text-sm"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-xs text-gray-500">State</label>
                        <input
                          type="text"
                          name="address.state"
                          value={formData.state}
                          onChange={handleChange}
                          className="w-full mt-1 p-3 rounded-lg border bg-white text-sm"
                        />
                      </div>
                      <div>
                        <label className="text-xs text-gray-500">
                          House No.
                        </label>
                        <input
                          type="text"
                          name="address.house_no"
                          value={formData.house}
                          onChange={handleChange}
                          className="w-full mt-1 p-3 rounded-lg border bg-white text-sm"
                        />
                      </div>
                    </div>

                    {/* Address Fields */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs text-gray-500">Street</label>
                        <input
                          type="text"
                          name="address.street"
                          value={formData.street}
                          onChange={handleChange}
                          className="w-full mt-1 p-3 rounded-lg border bg-white text-sm"
                        />
                      </div>

                      <div>
                        <label className="text-xs text-gray-500">
                          Landmark
                        </label>
                        <input
                          type="text"
                          name="address.landmark"
                          value={formData.landmark}
                          onChange={handleChange}
                          className="w-full mt-1 p-3 rounded-lg border bg-white text-sm"
                        />
                      </div>
                    </div>

                    {/* Save Button */}
                    <button
                      type="submit"
                      className="w-full py-3 cursor-pointer bg-blue-600 text-white rounded-xl font-medium text-sm active:scale-95 transition"
                    >
                      Save Changes
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>

          {/* Orders Section */}
          <div className="mt-12">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Order History
            </h2>

            {userData.orders.length === 0 ? (
              // EMPTY UI
              <div className="bg-white rounded-2xl shadow-md p-8 flex flex-col items-center text-center border border-gray-200">
                <div className="w-24 h-24 bg-gray-100 flex items-center justify-center rounded-full">
                  <Image
                    src="/logo.svg"
                    alt="Empty"
                    width={100}
                    height={100}
                    className="w-14 h-14 opacity-70"
                  />
                </div>

                <h3 className="text-lg font-semibold text-gray-800 mt-4">
                  No Orders Found
                </h3>

                <p className="text-gray-500 text-sm mt-2">
                  You haven’t placed any orders yet. Start shopping and explore
                  our collections!
                </p>

                <button
                  onClick={() => router.push("/")}
                  className="mt-5 px-6 py-3 cursor-pointer bg-black text-white rounded-xl text-sm font-medium active:scale-95 transition"
                >
                  Browse Products
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {userData.orders.map((order) => {
                  const isOpen = openOrder === order.order_id;

                  return (
                    <div
                      key={order.order_id}
                      className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm"
                    >
                      {/* Order Header */}
                      <div className="flex justify-between items-center">
                        <p className="text-sm text-gray-500">Order ID</p>

                        {/* Status Badge */}
                        <span
                          className={`px-3 py-1 text-xs rounded-full font-medium ${
                            order.order_status === "Delivered"
                              ? "bg-green-100 text-green-700"
                              : order.order_status === "Shipped"
                              ? "bg-blue-100 text-blue-700"
                              : "bg-yellow-100 text-yellow-700"
                          }`}
                        >
                          {order.order_status}
                        </span>
                      </div>

                      <p className="font-semibold text-gray-900 mt-1">
                        {order.order_id}
                      </p>

                      {/* Order Details */}
                      <div className="mt-3 space-y-1 text-sm">
                        <p className="text-gray-600">
                          <span className="font-medium text-gray-800">
                            Date:
                          </span>{" "}
                          {order.order_date}
                        </p>
                        <p className="text-gray-600">
                          <span className="font-medium text-gray-800">
                            Items:
                          </span>{" "}
                          {order.ordered_product.length}
                        </p>
                      </div>

                      {/* Amount + CTA */}
                      <div className="mt-4 flex justify-between items-center">
                        <p className="font-semibold text-gray-900 text-lg">
                          ₹{order.order_amount}
                        </p>

                        <button
                          onClick={() => toggleOrder(order.order_id)}
                          className="text-blue-600 cursor-pointer text-sm font-medium hover:underline"
                        >
                          {isOpen ? "Hide Details" : "View Details"}
                        </button>
                      </div>

                      {/* Expandable Section */}
                      <div
                        className={`transition-all duration-300 overflow-hidden ${
                          isOpen ? "max-h-[500px] mt-4" : "max-h-0"
                        }`}
                      >
                        {/* Product List */}
                        <div className="bg-gray-50 p-4 rounded-xl space-y-4">
                          {order.ordered_product.map((product) => (
                            <div
                              key={product.product_id}
                              className="flex items-center gap-4 border-b pb-3 last:border-none"
                            >
                              <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center">
                                <Image
                                  src="/logo.svg"
                                  alt="Product"
                                  width={50}
                                  height={50}
                                  className="w-full h-full object-cover rounded-lg"
                                />
                              </div>

                              <div className="flex-1">
                                <p className="font-semibold text-gray-800 text-sm">
                                  {product.title}
                                </p>
                                <p className="text-gray-600 text-xs mt-1">
                                  Price: ₹{product.price}
                                </p>
                              </div>
                            </div>
                          ))}

                          <div className="pt-2">
                            <p className="text-gray-700 font-semibold text-right">
                              Total Amount: ₹{order.order_amount}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
};

export default User;
