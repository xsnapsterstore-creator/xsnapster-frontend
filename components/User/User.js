import React from "react";
import { useState, useEffect } from "react";
import Image from "next/image";
import pincodeData from "./../../components/Data/pincodes.json";
import {
  addUserAddress,
  fetchUserOrder,
  fetchUserProfile,
  logOutUserProfile,
  updateUserAddress,
} from "../API/api";
import { useRouter } from "next/router";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@mui/material";
import Order from "../Order/order";

const User = () => {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [invalidPincode, setInvalidPincode] = useState(false);
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [pincode, setPincode] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userData, SetUserData] = useState({});
  const [loading, setLoading] = useState(false);
  const [orders, setOrders] = useState([]);
  const [showOrders, setShowOrders] = useState(false);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    house: "",
    street: "",
    landmark: "",
    pincode: "",
    city: "",
    state: "",
    is_default: true,
    address_type: "",
  });

  useEffect(() => {
    const storedEmail = window.localStorage.getItem("userEmail");
    if (storedEmail) setUserEmail(storedEmail);
  }, []);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    house: "",
    street: "",
    landmark: "",
    pincode: "",
    city: "",
    state: "",
    is_default: true,
    address_type: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value, is_default: true }));
  };

  const toggleEdit = () => setIsEditing(!isEditing);

  // 📌 Handle Pincode Auto-Fill
  const handlePincodeChange = (e) => {
    const pin = e.target.value;
    setPincode(pin);
    setInvalidPincode(false);

    setForm((prev) => ({ ...prev, pincode: pin }));
    setFormData((prev) => ({ ...prev, pincode: pin }));

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
        setFormData((prev) => ({
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
    setLoading(true);
    e.preventDefault();
    const res = await addUserAddress(form, form.is_default);
    if (res && res.ok) {
      const newAddress = await res.json();
      router.reload();
    } else {
      alert("Failed to add address");
    }
    setLoading(false);
  }

  async function handleEditDetails(e) {
    setLoading(true);
    e.preventDefault();
    const data = {
      form: formData,
      data: {
        id: userData.default_address.id,
      },
    };
    // console.log("This is the Old User update his details:", data);
    const res = await updateUserAddress(data);
    if (res.ok) {
      router.reload();
    } else {
      alert("Address Updation Failed");
    }
    setLoading(false);
  }

  const logOut = () => {
    // clear tokens + redirect
    if (typeof window !== "undefined") {
      Promise.resolve().then(() => {
        localStorage.removeItem("access_token");
        localStorage.removeItem("token_type");
        localStorage.removeItem("userID");
        localStorage.removeItem("userEmail");
        localStorage.removeItem("address_id");
        localStorage.removeItem("cart");
      });
      // if refresh token is HTTP-only cookie, call backend logout endpoint optionally
    }
    window.location.href = "/";
  };

  const { data, isLoading, isError } = useQuery({
    queryKey: ["user-profile"],
    queryFn: async () => {
      const token = localStorage.getItem("access_token");

      if (!token) {
        router.push("/login");
        return null;
      }

      const res = await fetchUserProfile();

      if (!res) {
        router.push("/login");
        return null;
      }

      return res;
    },
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
  });

  async function GetOrders() {
    setShowOrders((prev) => !prev);
    const res = await fetchUserOrder();
    const data = await res.json();
    setOrders(data);
  }

  useEffect(() => {
    if (!data) return;

    if (data.default_address) {
      const add = data.default_address.address_line;
      const parts = add.split(",");

      setFormData({
        name: data.default_address.name,
        address_line: data.default_address.address_line,
        house: parts[0] || "",
        landmark: parts[1] || "",
        street: parts[2] || "",
        city: data.default_address.city,
        state: data.default_address.state,
        pincode: data.default_address.zip_code,
        address_type: data.default_address.address_type,
        phone: data.default_address.phone_number,
        user_id: data.default_address.user_id,
      });

      SetUserData(data);
    }
  }, [data]);

  if (isLoading) {
    return (
      <div className="pt-[115px] min-h-screen bg-gray-50 py-10 px-5">
        <div className="max-w-3xl mx-auto">
          <div className="animate-pulse space-y-4">
            <div className="h-6 bg-gray-200 rounded w-1/3" />
            <div className="h-48 bg-white rounded-xl shadow p-6" />
            <div className="h-6 bg-gray-200 rounded w-1/4" />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="h-20 bg-gray-100 rounded" />
              <div className="h-20 bg-gray-100 rounded" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="pt-[115px] min-h-screen bg-gray-50 py-10 px-5">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-xl font-semibold">Could not load profile</h2>
          <p className="text-gray-500 mt-2">
            Something went wrong while fetching your profile. Try again later.
          </p>
          <button
            onClick={() => queryClient.invalidateQueries(["user-profile"])}
            className="mt-4 px-4 py-2 bg-black text-white rounded"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (!userData.default_address) {
    return (
      <div className="pt-[135px] min-h-screen bg-gray-50 py-10 px-5">
        {loading ? (
          <div>
            <svg
              aria-hidden="true"
              className="w-5 h-5 animate-spin text-white"
              viewBox="0 0 100 101"
              fill="none"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 
              50 100.591C22.3858 100.591 0 78.2051 
              0 50.5908C0 22.9766 22.3858 0.59082 
              50 0.59082C77.6142 0.59082 100 22.9766 
              100 50.5908ZM9.08144 50.5908C9.08144 74.0622 
              26.5286 91.5093 50 91.5093C73.4714 91.5093 
              90.9186 74.0622 90.9186 50.5908C90.9186 
              27.1195 73.4714 9.67236 50 9.67236C26.5286 
              9.67236 9.08144 27.1195 9.08144 50.5908Z"
                fill="#ffffff33"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 
              97.8624 35.9116 97.0079 33.5539C95.2932 
              28.8227 92.871 24.3692 89.8167 20.348C85.8452 
              15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 
              4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 
              0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 
              1.69328 37.813 4.19778 38.4501 6.62326C39.0873 
              9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 
              9.50999 51.7191 9.52689 55.5402 10.1577C60.8642 
              11.0248 65.9928 12.9971 70.6331 15.936C75.2735 
              18.8749 79.3347 22.725 82.5849 27.2726C84.9175 
              30.4217 86.7997 33.9366 88.1811 37.6822C89.083 
              40.0309 91.5421 41.9145 93.9676 40.0409Z"
                fill="white"
              />
            </svg>
            Saving...
          </div>
        ) : (
          <div className="max-w-3xl mx-auto">
            <h2 className="text-xl font-semibold text-gray-900 text-center">
              Add Profile Information
            </h2>
            <p className="text-gray-500 text-center text-sm mb-4">
              {userEmail}
            </p>
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
                <label className="text-xs text-gray-500">Address Type</label>
                <input
                  type="text"
                  name="address_type"
                  value={form.address_type}
                  onChange={(e) =>
                    setForm((prev) => ({
                      ...prev,
                      address_type: e.target.value,
                    }))
                  }
                  className="w-full mt-1 p-3 rounded-lg border bg-white text-sm"
                />
              </div>

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
        )}
      </div>
    );
  } else {
    return (
      <div className="pt-[130px] min-h-screen bg-gray-50 py-10 px-5">
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
                {loading ? (
                  <div>
                    <svg
                      aria-hidden="true"
                      className="w-5 h-5 animate-spin text-white"
                      viewBox="0 0 100 101"
                      fill="none"
                    >
                      <path
                        d="M100 50.5908C100 78.2051 77.6142 100.591 
              50 100.591C22.3858 100.591 0 78.2051 
              0 50.5908C0 22.9766 22.3858 0.59082 
              50 0.59082C77.6142 0.59082 100 22.9766 
              100 50.5908ZM9.08144 50.5908C9.08144 74.0622 
              26.5286 91.5093 50 91.5093C73.4714 91.5093 
              90.9186 74.0622 90.9186 50.5908C90.9186 
              27.1195 73.4714 9.67236 50 9.67236C26.5286 
              9.67236 9.08144 27.1195 9.08144 50.5908Z"
                        fill="#ffffff33"
                      />
                      <path
                        d="M93.9676 39.0409C96.393 38.4038 
              97.8624 35.9116 97.0079 33.5539C95.2932 
              28.8227 92.871 24.3692 89.8167 20.348C85.8452 
              15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 
              4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 
              0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 
              1.69328 37.813 4.19778 38.4501 6.62326C39.0873 
              9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 
              9.50999 51.7191 9.52689 55.5402 10.1577C60.8642 
              11.0248 65.9928 12.9971 70.6331 15.936C75.2735 
              18.8749 79.3347 22.725 82.5849 27.2726C84.9175 
              30.4217 86.7997 33.9366 88.1811 37.6822C89.083 
              40.0309 91.5421 41.9145 93.9676 40.0409Z"
                        fill="white"
                      />
                    </svg>
                    Saving...
                  </div>
                ) : (
                  <div
                    className={`transition-all duration-300 overflow-hidden ${
                      isEditing ? "max-h-[1200px] mt-6" : "max-h-0"
                    }`}
                  >
                    <form
                      onSubmit={handleEditDetails}
                      className="bg-gray-50 p-5 rounded-xl border border-gray-200 space-y-3"
                    >
                      {/* Name */}
                      <div>
                        <label className="text-xs text-gray-500">
                          Full Name
                        </label>
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
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          className="w-full mt-1 p-3 rounded-lg border bg-white text-sm"
                        />
                      </div>

                      {/* Pincode + City */}
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="text-xs text-gray-500">
                            Pincode
                          </label>
                          <input
                            type="text"
                            name="pincode"
                            value={formData.pincode}
                            onChange={handlePincodeChange}
                            className="w-full mt-1 p-3 rounded-lg border bg-white text-sm"
                          />
                        </div>
                        <div>
                          <label className="text-xs text-gray-500">City</label>
                          <input
                            type="text"
                            name="city"
                            value={formData.city}
                            onChange={handleChange}
                            className="w-full mt-1 p-3 rounded-lg border bg-white text-sm"
                          />
                        </div>
                      </div>

                      {/* State + House */}
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="text-xs text-gray-500">State</label>
                          <input
                            type="text"
                            name="state"
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
                            name="house"
                            value={formData.house}
                            onChange={handleChange}
                            className="w-full mt-1 p-3 rounded-lg border bg-white text-sm"
                          />
                        </div>
                      </div>

                      {/* Address Type */}
                      <div>
                        <label className="text-xs text-gray-500">
                          Address Type
                        </label>
                        <input
                          type="text"
                          name="address_type"
                          value={formData.address_type}
                          onChange={handleChange}
                          className="w-full mt-1 p-3 rounded-lg border bg-white text-sm"
                        />
                      </div>

                      {/* Street + landmark */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="text-xs text-gray-500">
                            Street
                          </label>
                          <input
                            type="text"
                            name="street"
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
                            name="landmark"
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
                )}
              </div>
            </div>
          </div>

          {/* Order Button */}
          <div className="mt-10 flex flex-col justify-center">
            <Button
              variant="contained"
              onClick={GetOrders}
              className="bg-gray-500 p-3 rounded-2xl cursor-pointer"
            >
              {showOrders ? "Hide Orders" : "See Your Orders"}
            </Button>

            {showOrders && <div className="mt-4"><Order order={orders} /></div>}
          </div>
        </div>
      </div>
    );
  }
};

export default User;
