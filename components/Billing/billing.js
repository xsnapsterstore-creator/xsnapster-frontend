import React from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import Link from "next/link";
import { useState, useEffect } from "react";
import Select from "react-select";
import { useSelector, useDispatch } from "react-redux";
import {
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
} from "../store/cartSlice";

const BillingTemplate = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.items);

  const [paymentOpt, setPaymentOpt] = useState("upi");
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showBilling, setShowBilling] = useState(false);
  const paymentOptions = [
    { value: "", label: "Select a payment method", isDisabled: true },
    { value: "cod", label: "💵 Cash on Delivery" },
    { value: "upi", label: "🟢 UPI (GPay / PhonePe / Paytm)" },
    { value: "debit", label: "💳 Debit Card" },
    { value: "credit", label: "💳 Credit Card" },
  ];

  const customStyles = {
    control: (base, state) => ({
      ...base,
      borderRadius: "12px",
      padding: "4px",
      borderColor: state.isFocused ? "#6366F1" : "#D1D5DB",
      boxShadow: state.isFocused ? "0 0 0 2px rgba(99,102,241,0.4)" : "none",
      "&:hover": {
        borderColor: "#6366F1",
      },
    }),
    option: (base, state) => ({
      ...base,
      padding: "12px",
      fontSize: "14px",
      backgroundColor: state.isSelected
        ? "#6366F1"
        : state.isFocused
        ? "#EEF2FF"
        : "white",
      color: state.isSelected ? "white" : "#111827",
      cursor: "pointer",
    }),
    menu: (base) => ({
      ...base,
      borderRadius: "12px",
      overflow: "hidden",
      boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
    }),
  };

  // Load cart items from localStorage
  useEffect(() => {
    if (typeof window === "undefined") return;
    setLoading(true);
    const cartData = localStorage.getItem("cart");

    if (!cartData || cartData === "[]") {
      setItems([]);
      setShowBilling(false);
      setLoading(false);
      return;
    }

    try {
      setItems(cart);
      setShowBilling(true);
    } catch (error) {
      console.error("Cart JSON parsing error:", error);
      setItems([]);
      setShowBilling(false);
    }

    setLoading(false);
  }, [cart]);

  async function ProceedPayment() {
    console.log("The payment option is:", paymentOpt);
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* ---------------- LEFT SECTION ---------------- */}
        <div className="lg:col-span-2 flex flex-col gap-5">
          {/* Page Title */}
          <div className="px-1">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
              Total Billing
            </h1>
            <p className="text-gray-500 text-sm mt-1">
              Review your items and complete your purchase
            </p>
          </div>

          {/* ---------------- ORDER ITEMS ---------------- */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Order Items
            </h2>

            <div className="flex flex-col divide-y">
              {loading ? (
                <p className="text-center py-5 text-gray-500 animate-pulse">
                  Loading items...
                </p>
              ) : items.length === 0 ? (
                <p className="text-center py-5 text-gray-500">
                  Your cart is empty
                </p>
              ) : (
                items.map((item, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-start py-4 gap-3"
                  >
                    {/* Item Left */}
                    <div className="flex items-start gap-3">
                      <img
                        src={item.image_link}
                        alt={item.title}
                        className="w-20 h-20 rounded-xl object-cover border"
                      />

                      <div className="flex-1">
                        <p className="font-semibold text-gray-900 text-sm md:text-base">
                          {item.title.substring(0, 35) + "..."}
                        </p>

                        <div className="flex justify-start items-end mt-1 gap-1">
                          <p className="text-red-600 animate-pulse font-semibold text-sm">
                            ₹{item.price}
                          </p>
                          <p className="line-through text-gray-900 text-xs">
                            ₹{item.price}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Quantity / Remove */}
                    <div className="flex flex-col items-center gap-2">
                      <div className="text-center">
                        <div className="flex items-center gap-1 border rounded-lg bg-gray-200">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              dispatch(
                                decreaseQuantity({
                                  id: item.id,
                                  dimensions: item.dimensions,
                                })
                              );
                            }}
                            className="w-[25px] flex justify-center text-lg font-semibold text-gray-700 hover:text-black active:scale-90 transition"
                          >
                            -
                          </button>

                          <span className="font-semibold text-xs w-[15px] text-gray-900">
                            {item.quantity || 1}
                          </span>

                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              dispatch(
                                increaseQuantity({
                                  id: item.id,
                                  dimensions: item.dimensions,
                                })
                              );
                            }}
                            className="w-[25px] flex justify-center text-lg font-semibold text-gray-700 hover:text-black active:scale-90 transition"
                          >
                            +
                          </button>
                        </div>
                      </div>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          dispatch(
                            removeFromCart({
                              id: item.id,
                              dimensions: item.dimensions,
                            })
                          );
                        }}
                        className="bg-gray-500 px-4 py-1.5 rounded-md text-xs font-semibold hover:bg-red-600 transition"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* ---------------- ADDRESS SECTION ---------------- */}
          {showBilling && (
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-3">
                Delivery Address
              </h2>

              <div className="text-gray-700 text-sm leading-relaxed">
                Avinash Chaurasia
                <br />
                U-52/24, U-Block, Sikanderpur, Gurgaon, Haryana India (122010)
                <br />
                Mobile: 9876543210
              </div>

              <button
                onClick={() => router.push("/address")}
                className="mt-4 px-5 py-2 bg-black text-white rounded-lg text-sm active:scale-95 transition cursor-pointer"
              >
                Change Address
              </button>
            </div>
          )}
        </div>

        {/* ---------------- RIGHT SECTION (SUMMARY) ---------------- */}
        {showBilling && (
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-5">
                Price Details
              </h2>

              <div className="space-y-3 text-sm">
                {/* Subtotal */}
                <div className="flex justify-between text-gray-700">
                  <span>Subtotal</span>
                  <span>₹799</span>
                </div>

                {/* Delivery Charges */}
                <div className="flex justify-between text-gray-700">
                  <span>Delivery Charges</span>
                  <span className="text-green-600 font-medium">Free</span>
                </div>

                {/* Promo Code */}
                <div className="mt-5">
                  <label className="text-sm font-medium text-gray-700">
                    Have a Promo Code?
                  </label>

                  <div className="flex mt-2 gap-2">
                    <input
                      type="text"
                      placeholder="Enter promo code"
                      className="flex-1 px-3 py-2 border rounded-lg text-sm outline-none"
                    />
                    <button className="px-4 py-2 bg-black text-white rounded-lg text-sm active:scale-95 transition">
                      Apply
                    </button>
                  </div>
                </div>

                {/* Discount */}
                <div className="flex justify-between text-gray-700">
                  <span>Discount</span>
                  <span className="text-green-600">- ₹100</span>
                </div>

                <hr className="my-4" />

                {/* Total */}
                <div className="flex justify-between text-gray-900 font-semibold text-lg">
                  <span>Total Amount</span>
                  <span>₹699</span>
                </div>
              </div>

              <hr className="my-4" />

              <div className="mt-6 space-y-4">
                <h2 className="text-lg font-semibold text-gray-900 mb-2">
                  Payment Options
                </h2>

                {/* Select Box */}
                <div>
                  <label className="font-medium text-gray-700 text-sm">
                    Choose Payment Method
                  </label>
                  <Select
                    value={paymentOptions.find(
                      (opt) => opt.value === paymentOpt
                    )}
                    onChange={(selected) => setPaymentOpt(selected.value)}
                    options={paymentOptions}
                    styles={customStyles}
                    placeholder="Select a payment method"
                    className="mt-2"
                    classNamePrefix="react-select"
                  />
                </div>

                {/* Dynamic Fields */}
                <div className="mt-4">
                  {/* COD */}
                  {paymentOpt === "cod" && (
                    <p className="text-gray-700 text-sm bg-gray-100 p-3 rounded-lg border">
                      You can pay when your order arrives at your doorstep.
                    </p>
                  )}

                  {/* UPI */}
                  {paymentOpt === "upi" && (
                    <div className="space-y-2 bg-gray-50 border p-4 rounded-xl">
                      <label className="text-xs text-gray-600">
                        Enter UPI ID
                      </label>
                      <div className="flex justify-between items-center gap-2">
                        <input
                          type="text"
                          placeholder="example@upi"
                          className="w-full border rounded-lg p-2.5 text-sm outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                        <button className="py-2 px-2 cursor-pointer bg-black text-white rounded-xl text-sm font-medium active:scale-95 transition">
                          Check
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Debit Card */}
                  {paymentOpt === "debit" && (
                    <div className="space-y-3 bg-gray-50 border p-4 rounded-xl">
                      <input
                        className="w-full border p-2.5 rounded-lg text-sm focus:ring-2 outline-none focus:ring-blue-500"
                        placeholder="Card Number"
                      />
                      <div className="grid grid-cols-2 gap-3">
                        <input
                          className="border p-2.5 rounded-lg text-sm focus:ring-2 outline-none focus:ring-blue-500"
                          placeholder="MM/YY"
                        />
                        <input
                          className="border p-2.5 rounded-lg text-sm focus:ring-2 outline-none focus:ring-blue-500"
                          placeholder="CVV"
                        />
                      </div>
                    </div>
                  )}

                  {/* Credit Card */}
                  {paymentOpt === "credit" && (
                    <div className="space-y-3 bg-gray-50 border p-4 rounded-xl">
                      <input
                        className="w-full border p-2.5 rounded-lg text-sm focus:ring-2 outline-none focus:ring-purple-500"
                        placeholder="Card Number"
                      />
                      <div className="grid grid-cols-2 gap-3">
                        <input
                          className="border p-2.5 rounded-lg text-sm focus:ring-2 outline-none focus:ring-purple-500"
                          placeholder="MM/YY"
                        />
                        <input
                          className="border p-2.5 rounded-lg text-sm focus:ring-2 outline-none focus:ring-purple-500"
                          placeholder="CVV"
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="mt-5">
                <p className="text-[11px]">
                  By continuing with the order, you confirm that you are above
                  18 years of age, and you agree to the{" "}
                  <bold className="font-semibold">
                    <bold className="text-red-600">X</bold>SNAPSTER's
                  </bold>{" "}
                  <Link
                    className="text-green-500"
                    href={"/terms-and-conditions"}
                  >
                    Terms of Use
                  </Link>{" "}
                  and{" "}
                  <Link className="text-green-500" href={"privacy-policy"}>
                    Privacy Policy
                  </Link>
                </p>
              </div>

              {/* Payment Button */}
              <button
                onClick={ProceedPayment}
                className="w-full mt-6 py-3 cursor-pointer bg-black text-white rounded-xl text-sm font-medium active:scale-95 transition"
              >
                {paymentOpt === "cod" ? "Place Order" : "Proceed to Payment"}
              </button>
            </div>
          </div>
        )}

        {/* Go Back / Go to Homepage Route */}
        {!showBilling && (
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex flex-col divide-y">
              <p className="text-center py-5 text-gray-500">
                Please add some items in the cart
              </p>
            </div>
            <div className="mt-2 flex justify-center items-center gap-3">
              <button
                onClick={() => window.history.back()}
                className="px-5 py-2 cursor-pointer rounded-xl border border-gray-300 text-gray-700 text-sm font-medium bg-white shadow-sm hover:bg-gray-50 active:scale-95 transition"
              >
                Go Back
              </button>

              <a
                href="/"
                className="px-5 py-2 cursor-pointer rounded-xl text-white text-sm font-medium bg-black shadow-md hover:bg-gray-900 active:scale-95 transition"
              >
                Go to Homepage
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BillingTemplate;
