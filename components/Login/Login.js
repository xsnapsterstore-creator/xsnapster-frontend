"use client";
import React, { useState } from "react";
import EmailIcon from "@mui/icons-material/Email";
import SmartphoneIcon from "@mui/icons-material/Smartphone";
import { requestOTP } from "../API/api";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);

  const toggleAuthMode = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div>
      {loading ? (
        <div className="min-h-screen flex items-center justify-center">
          <div className="relative">
            <div className="fixed inset-0 flex items-center justify-center bg-white/80 z-10">
              <Image
                src={"/loading.webp"}
                alt="Loading..."
                width={70}
                height={70}
                unoptimized
              />
            </div>
          </div>
        </div>
      ) : (
        <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-b from-gray-50 to-white">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="text-center mb-10 px-3"
          >
            <div className="flex justify-center items-center">
              <Image src="/logo.svg" alt="Logo" width={60} height={60} />
            </div>
            <h2 className="text-3xl mt-2 lg:text-4xl font-extrabold text-gray-900">
              Join the{" "}
              <span className="text-red-600 animate-pulse">Wall of Fame</span>
            </h2>
            <p className="text-gray-600 mt-2 text-sm lg:text-base">
              Because your walls deserve better — and so do you.
            </p>
          </motion.div>

          {/* Login Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="w-[90%] max-w-md bg-white shadow-2xl rounded-3xl p-8"
          >
            {/* Tabs */}
            <div className="mb-8 flex justify-center gap-6 border-b border-gray-200">
              <button
                className={`pb-3 text-sm font-semibold transition-colors duration-200 flex items-center gap-2 ${
                  isLogin
                    ? "border-b-2 border-black text-black"
                    : "text-gray-400 hover:text-black"
                }`}
                onClick={() => setIsLogin(true)}
              >
                <EmailIcon fontSize="small" />
                Email
              </button>
              <button
                className={`pb-3 text-sm font-semibold transition-colors duration-200 flex items-center gap-2 ${
                  !isLogin
                    ? "border-b-2 border-black text-black"
                    : "text-gray-400 hover:text-black"
                }`}
                onClick={() => setIsLogin(false)}
              >
                <SmartphoneIcon fontSize="small" />
                Mobile
              </button>
            </div>

            {/* Forms */}
            <div className="">{isLogin ? <EmailForm /> : <MobileForm />}</div>
          </motion.div>

          {/* Terms */}
          <div className="mt-8 text-center text-xs text-gray-500 px-6 max-w-xs">
            <p>
              By signing up, you agree to our{" "}
              <Link href={"/terms-and-conditions"} className="text-black font-medium cursor-pointer hover:underline">
                Terms & Conditions
              </Link>{" "}
              and{" "}
              <Link href={"/privacy-policy"} className="text-black font-medium cursor-pointer hover:underline">
                Privacy Policy
              </Link>
              .
            </p>
            <p className="mt-2">We promise to keep your information secure.</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default AuthPage;

const EmailForm = () => {
  const [email, SetEmail] = useState("");
  const [noEmail, SetNoEmail] = useState(false);
  const [loading, setLoading] = useState(false);
  const EmailSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    if (!email) {
      SetNoEmail(true);
    } else {
      const res = await requestOTP(email);
      setLoading(false);

      if (res.status === 200) {
        window.location.replace(
          `/login/otp-verification?email=${encodeURIComponent(email)}`
        );
      }
      SetNoEmail(false);
    }
  };
  return (
    <form className="space-y-5">
      <div>
        <label
          htmlFor="email"
          className="mb-1 block text-sm font-medium text-gray-700"
        >
          Email Address
        </label>
        {noEmail && (
          <span className="text-red-600 text-[10px]">
            Please enter your email
          </span>
        )}
        <input
          onChange={(e) => SetEmail(e.target.value)}
          type="email"
          id="email"
          className="w-full rounded-lg border border-gray-300 px-4 py-2 text-gray-800 focus:border-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-200"
          placeholder="you@example.com"
        />
      </div>

      <button
        onClick={EmailSubmit}
        type="submit"
        className="w-full rounded-lg bg-sky-500 px-4 py-2 text-white font-semibold shadow-md transition hover:bg-sky-600 focus:outline-none focus:ring-2 focus:ring-sky-300"
      >
        Request OTP
      </button>
    </form>
  );
};

const MobileForm = () => {
  return (
    <form className="space-y-5">
      <div>
        <label
          htmlFor="name"
          className="mb-1 block text-sm font-medium text-gray-700"
        >
          Mobile Number
        </label>
        <input
          type="tel"
          id="name"
          className="w-full rounded-lg border border-gray-300 px-4 py-2 text-gray-800 focus:border-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-200"
          placeholder="+91"
        />
      </div>

      <button
        type="submit"
        className="w-full rounded-lg bg-green-500 px-4 py-2 text-white font-semibold shadow-md transition hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-300"
      >
        Send OTP
      </button>
    </form>
  );
};
