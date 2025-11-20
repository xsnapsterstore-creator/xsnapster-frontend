import React from "react";
import { motion } from "framer-motion";

const sectionVariant = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.6, ease: "easeOut" },
  }),
};

const ReturnAndRefund = () => {
  return (
    <div className="pt-[95px] bg-gradient-to-b from-white to-gray-50 min-h-screen">
      <div className="max-w-5xl mx-auto px-8 py-10 flex flex-col gap-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h1 className="text-[35px] font-bold tracking-tight text-black">
            Return & Refund Policy
          </h1>
          <p className="text-red-600 text-sm font-medium animate-pulse">
            Because Sometimes, Love Fails 💔
          </p>
          <div className="w-16 h-1 bg-red-500 mx-auto mt-3 rounded-full"></div>
        </motion.div>

        {/* Section 1 */}
        <motion.section
          variants={sectionVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="bg-white shadow-sm rounded-2xl p-8 border border-gray-100"
        >
          <h2 className="text-2xl font-semibold mb-2 text-gray-800">
            We Got It. Not Every Frame Is “The One”
          </h2>
          <div className="h-[1px] bg-gray-200 mb-4"></div>
          <p className="text-gray-600 leading-relaxed text-[16px]">
            Sometimes what looked sexy on-screen doesn’t vibe on your wall —
            we’ve been there.
            <br />
            But don’t worry,{" "}
            <span className="font-semibold">
              <span className="text-red-500">X</span>SNAPSTER
            </span>{" "}
            got your back (and your wall). This page explains when and how you
            can return or refund your order without losing your cool.
          </p>
        </motion.section>

        {/* Section 2 */}
        <motion.section
          custom={1}
          variants={sectionVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="bg-white shadow-sm rounded-2xl p-8 border border-gray-100"
        >
          <h2 className="text-2xl font-semibold mb-2 text-gray-800">
            Eligibility for Returns
          </h2>
          <div className="h-[1px] bg-gray-200 mb-4"></div>
          <p className="text-gray-600 mb-3">You can request a return if:</p>
          <ul className="list-disc ml-6 text-gray-700 leading-relaxed space-y-2">
            <li>Your frame arrived damaged, scratched, or not-so-aesthetic.</li>
            <li>
              You received the wrong product (we promise we weren’t
              experimenting).
            </li>
            <li>
              You changed your mind before we shipped it — because once it’s
              out, it’s like sending an ex a text: you can’t take it back.
            </li>
          </ul>
        </motion.section>

        {/* Section 3 */}
        <motion.section
          custom={2}
          variants={sectionVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="bg-white shadow-sm rounded-2xl p-8 border border-gray-100"
        >
          <h2 className="text-2xl font-semibold mb-2 text-gray-800">
            How to Request a Return
          </h2>
          <div className="h-[1px] bg-gray-200 mb-4"></div>
          <ol className="list-decimal ml-6 text-gray-700 leading-relaxed space-y-2">
            <li>
              Email us at{" "}
              <span className="font-semibold text-sky-500">
                support@xsnapster.store
              </span>{" "}
              within 7 days of delivery.
            </li>
            <li>
              Attach clear pictures of the issue (no filters, please — we trust
              you).
            </li>
            <li>
              Sit back while our Frame Doctors review your case within 24–48
              hours.
            </li>
          </ol>
          <p className="text-gray-600 mt-3 italic">
            Once approved, we’ll guide you through the return or refund process
            faster than your crush ghosts you.
          </p>
        </motion.section>

        {/* Section 4 */}
        <motion.section
          custom={3}
          variants={sectionVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="bg-white shadow-sm rounded-2xl p-8 border border-gray-100"
        >
          <h2 className="text-2xl font-semibold mb-2 text-gray-800">
            Refund Timeline
          </h2>
          <div className="h-[1px] bg-gray-200 mb-4"></div>
          <ul className="list-decimal ml-6 text-gray-700 leading-relaxed space-y-2">
            <li>
              <span className="font-semibold text-gray-800">Refund Method</span>
              : Same method you paid with.
            </li>
            <li>
              <span className="font-semibold text-gray-800">
                Processing Time
              </span>
              : Within 3–5 business days after we receive and inspect the
              product.
            </li>
            <li>
              <span className="font-semibold text-gray-800">
                Refund Confirmation
              </span>
              : We’ll email you once your money starts its journey back home.
            </li>
          </ul>
          <p className="text-gray-600 mt-3 italic">
            If your bank moves slower than your Wi-Fi, give it a few more days.
          </p>
        </motion.section>

        {/* Section 5 */}
        <motion.section
          custom={4}
          variants={sectionVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="bg-white shadow-sm rounded-2xl p-8 border border-gray-100"
        >
          <h2 className="text-2xl font-semibold mb-2 text-gray-800">
            Non-Returnable Items
          </h2>
          <div className="h-[1px] bg-gray-200 mb-4"></div>
          <p className="text-gray-600 mb-3">Here’s what we can’t take back:</p>
          <ul className="list-disc ml-6 text-gray-700 leading-relaxed space-y-2">
            <li>Custom or personalized frames</li>
            <li>Gift cards</li>
            <li>Items damaged by you</li>
          </ul>
        </motion.section>
      </div>
    </div>
  );
};

export default ReturnAndRefund;
