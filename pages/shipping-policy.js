import React from "react";
import { motion } from "framer-motion";

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

const ShippingPolicy = () => {
  return (
    <div className="pt-[130px] pb-20 bg-gradient-to-br from-white via-gray-50 to-gray-100">
      <div className="max-w-5xl mx-auto px-8">
        {/* Header */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-[35px] font-bold text-gray-800 mb-2">
            Shipping & Delivery Policy
          </h1>
          <p className="text-red-600 text-sm tracking-wide animate-pulse">
            Because Good Things Take a Little Teasing
          </p>
          <div className="w-16 h-1 bg-red-500 mx-auto mt-3 rounded-full"></div>
        </motion.div>

        {/* Content */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          transition={{ staggerChildren: 0.15, delayChildren: 0.2 }}
          className="flex flex-col gap-10 text-gray-700"
        >
          {/* Section 1 */}
          <motion.div
            variants={fadeInUp}
            className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300"
          >
            <h2 className="text-2xl font-semibold mb-2 text-gray-800">
              Your Wall's About to Get Lucky
            </h2>
            <hr className="mb-4 border-gray-200" />
            <p className="text-[16px] leading-relaxed text-justify">
              Once you hit <b>"Place Order"</b>, your aesthetic upgrade begins.
              We print, pack, and ship your frames with more care than your ex
              ever showed you. This page explains how your order travels from
              our lair to your wall of fame.
            </p>
          </motion.div>

          {/* Section 2 */}
          <motion.div
            variants={fadeInUp}
            className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300"
          >
            <h2 className="text-2xl font-semibold mb-2 text-gray-800">
              Processing Time
            </h2>
            <hr className="mb-4 border-gray-200" />
            <p className="text-[16px] leading-relaxed text-justify">
              We're fast — but not instant noodles fast. Each order takes 1–3
              business days to process because every frame deserves a little
              foreplay (quality check, printing, packing, etc). Once your
              package leaves our warehouse, it’s officially in transit — aka the
              "long-distance relationship" phase.
            </p>
          </motion.div>

          {/* Section 3 */}
          <motion.div
            variants={fadeInUp}
            className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300"
          >
            <h2 className="text-2xl font-semibold mb-2 text-gray-800">
              Delivery Time
            </h2>
            <hr className="mb-4 border-gray-200" />
            <p className="text-[16px] mb-3 text-justify">
              We ship all across India through trusted delivery partners. Here’s
              the usual timeline:
            </p>
            <ul className="list-disc ml-5 text-[16px] leading-relaxed">
              <li>
                <b>Metro Cities:</b> 3–5 business days.
              </li>
              <li>
                <b>Non-Metro Cities:</b> 5–8 business days.
              </li>
              <li>
                <b>Remote Locations:</b> Depends on whether Google Maps can find
                you.
              </li>
            </ul>
            <p className="text-[16px] mt-3 text-justify">
              You'll get a tracking link once your order ships, so you can stalk
              it guilt-free.
            </p>
          </motion.div>

          {/* Section 4 */}
          <motion.div
            variants={fadeInUp}
            className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300"
          >
            <h2 className="text-2xl font-semibold mb-2 text-gray-800">
              Shipping Charges
            </h2>
            <hr className="mb-4 border-gray-200" />
            <p className="text-[16px] text-justify">
              We believe art should hang on your wall — not your wallet.
            </p>
            <ul className="list-disc ml-5 text-[16px] leading-relaxed mt-2">
              <li>
                <b>Standard Shipping:</b> Free for orders above ₹999.
              </li>
              <li>
                <b>Below ₹999:</b> A tiny shipping fee applies (think of it as
                delivery guy motivation money).
              </li>
            </ul>
          </motion.div>

          {/* Section 5 */}
          <motion.div
            variants={fadeInUp}
            className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300"
          >
            <h2 className="text-2xl font-semibold mb-2 text-gray-800">
              Delayed Shipments
            </h2>
            <hr className="mb-4 border-gray-200" />
            <p className="text-[16px] text-justify">
              Sometimes life happens — floods, strikes, or courier crushes. If
              your delivery is delayed, we'll keep you updated. We hate ghosting
              more than you do.
            </p>
          </motion.div>

          {/* Section 6 */}
          <motion.div
            variants={fadeInUp}
            className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300"
          >
            <h2 className="text-2xl font-semibold mb-2 text-gray-800">
              Order Tracking
            </h2>
            <hr className="mb-4 border-gray-200" />
            <p className="text-[16px] text-justify">
              You’ll receive a tracking ID via email once your order ships. Use
              it to see where your frame is — or just pretend you're watching a
              slow-burn thriller. If tracking shows "Delivered" but you’re still
              waiting, check with neighbours, guards, or that one cousin who
              “borrows” things permanently.
            </p>
          </motion.div>

          {/* Section 7 */}
          <motion.div
            variants={fadeInUp}
            className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300"
          >
            <h2 className="text-2xl font-semibold mb-2 text-gray-800">
              Address & Delivery Issues
            </h2>
            <hr className="mb-4 border-gray-200" />
            <ul className="list-disc ml-5 text-[16px] leading-relaxed">
              <li>
                Make sure your shipping address is correct before checkout. Once
                it’s shipped, not even Sherlock can reroute it.
              </li>
              <li>
                If the courier couldn’t reach you, your order may be sent back.
                Don’t worry — we’ll contact you before reshipping.
              </li>
            </ul>
          </motion.div>

          {/* Section 8 */}
          <motion.div
            variants={fadeInUp}
            className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300"
          >
            <h2 className="text-2xl font-semibold mb-2 text-gray-800">
              Final Words
            </h2>
            <hr className="mb-4 border-gray-200" />
            <p className="text-[16px] text-justify">
              We pack every frame like it's our first crush — safe, secure, and
              a little dramatic. If anything goes wrong, we'll fix it faster
              than your internet provider responds to complaints. For any
              delivery-related emergencies, drop us a line at{" "}
              <a
                href="mailto:support@xsnapster.store"
                className="text-sky-600 font-semibold hover:underline"
              >
                support@xsnapster.store
              </a>
              .
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default ShippingPolicy;
