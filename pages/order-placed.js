"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@mui/material";
export default function OrderSuccess() {
  const { data, isLoading } = useQuery({
    queryKey: ["order_id"],
    queryFn: async () => {
      if (typeof window === "undefined") return null; // prevent SSR crash

      const order = localStorage.getItem("order_id");
      const user = localStorage.getItem("userID");
      const data = {
        order: order,
        user: user,
      };
      return data;
    },

    staleTime: 600_000,
    gcTime: 600_000,
    refetchInterval: 600_000,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  return (
    <div className="pt-[85px] min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="bg-white shadow-2xl rounded-3xl p-10 max-w-md w-full text-center"
      >
        {/* Animated SVG Success Icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 140, damping: 12 }}
          className="flex justify-center mb-6"
        >
          <svg
            className="text-green-500"
            width="90"
            height="90"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <motion.circle
              cx="12"
              cy="12"
              r="10"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.7 }}
            />
            <motion.path
              d="M8 12l3 3 5-6"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            />
          </svg>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="text-3xl font-semibold text-gray-900"
        >
          Order Placed Successfully!
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.25, duration: 0.5 }}
          className="text-gray-600 mt-3 leading-relaxed"
        >
          Thank you for your order. We are processing it and will notify you
          once it's ready for delivery.
          <br />
          <span className="text-red-600 font-semibold animate-pulse">
            Your wall's about to glow up
          </span>
          <br />
          <span>Your Order ID: {data?.order}</span>
        </motion.p>

        {/* Divider Line */}
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="h-[1px] bg-gray-200 my-7"
        />

        {/* Buttons */}
        <div className="flex flex-col gap-3">
          <div
            onClick={(e) => {
              Promise.resolve().then(() => {
                localStorage.removeItem("address_id");
                localStorage.removeItem("order_id");
                localStorage.removeItem("razorpay_id");
              });
              window.location.href = `/user/${data?.user}`;
            }}
          >
            <motion.button
              whileTap={{ scale: 0.95 }}
              whileHover={{ scale: 1.02 }}
              className="w-full py-3 bg-black text-white rounded-xl text-sm font-medium shadow-md"
            >
              View My Orders
            </motion.button>
          </div>

          <div
            onClick={(e) => {
              Promise.resolve().then(() => {
                localStorage.removeItem("address_id");
                localStorage.removeItem("order_id");
                localStorage.removeItem("razorpay_id");
              });
              window.location.href = "/";
            }}
          >
            <motion.button
              whileTap={{ scale: 0.95 }}
              whileHover={{ scale: 1.02 }}
              className="w-full py-3 border border-gray-300 rounded-xl text-sm font-medium text-gray-800"
            >
              Continue Shopping
            </motion.button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
