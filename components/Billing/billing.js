import React from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import Link from "next/link";

const BillingTemplate = () => {
  const router = useRouter();
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
              {/* Item */}
              <div className="flex items-center gap-4 py-4">
                <Image
                  src="/logo.svg"
                  height={80}
                  width={80}
                  className="w-20 h-20 rounded-xl object-cover border"
                />

                <div className="flex-1">
                  <p className="font-semibold text-gray-900 text-sm md:text-base">
                    Wired Bluetooth Headphones
                  </p>
                  <p className="text-gray-500 text-xs md:text-sm">
                    Quantity: 1
                  </p>
                </div>

                <p className="font-semibold text-gray-900 text-sm md:text-base">
                  ₹799
                </p>
              </div>

              {/* Repeat for more items */}
            </div>
          </div>

          {/* ---------------- ADDRESS SECTION ---------------- */}
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
        </div>

        {/* ---------------- RIGHT SECTION (SUMMARY) ---------------- */}
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

            <div className="mt-5">
              <p className="text-[11px]">
                By continuing with the order, you confirm that you are above 18
                years of age, and you agree to the{" "}
                <bold className="font-semibold">
                  <bold className="text-red-600">X</bold>SNAPSTER's
                </bold>{" "}
                <Link className="text-green-500" href={"/terms-and-conditions"}>
                  Terms of Use
                </Link>{" "}
                and{" "}
                <Link className="text-green-500" href={"privacy-policy"}>
                  Privacy Policy
                </Link>
              </p>
            </div>

            {/* Payment Button */}
            <button className="w-full mt-6 py-3 cursor-pointer bg-black text-white rounded-xl text-sm font-medium active:scale-95 transition">
              Proceed to Payment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BillingTemplate;
