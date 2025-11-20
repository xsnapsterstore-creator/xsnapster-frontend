import React from "react";
import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

const HelpCenter = () => {
  return (
    <div className="pt-[120px] pb-20 bg-gradient-to-br from-white via-gray-50 to-gray-100 min-h-screen">
      <div className="max-w-5xl mx-auto px-8">
        {/* HEADER */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Help Center
          </h1>
          <p className="text-red-600 text-sm tracking-wide animate-pulse">
            Where Problems Get Framed
          </p>
          <div className="w-16 h-1 bg-red-500 mx-auto mt-3 rounded-full"></div>
        </motion.div>

        {/* CONTENT */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          transition={{ staggerChildren: 0.15, delayChildren: 0.2 }}
          className="flex flex-col gap-10"
        >
          {/* Section 1 */}
          <motion.div
            variants={fadeUp}
            className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300"
          >
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">
              Lost? Confused? Mildly Panicking?
            </h2>
            <hr className="mb-4 border-gray-200" />
            <p className="text-[16px] leading-relaxed text-justify text-gray-700">
              Relax. You’re not on Incognito Mode — we actually help people
              here. This is the{" "}
              <b className="text-red-500">XSNAPSTER Help Center</b>, a safe
              space where your "WTF moments" meet their happy endings. We’ve
              broken things down so even your goldfish could understand (no
              offense).
            </p>
          </motion.div>

          {/* Section 2 - Orders & Shipping */}
          <motion.div
            variants={fadeUp}
            className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300"
          >
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Orders & Shipping
            </h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-[18px] font-semibold">
                  How do I know if my order went through?
                </h3>
                <p className="text-[16px] text-gray-700 text-justify">
                  If you got an email from us that says “Your wall’s about to
                  glow up,” congrats — it’s official! No email? Check your spam
                  folder before accusing us of ghosting.
                </p>
              </div>

              <div>
                <h3 className="text-[18px] font-semibold">
                  How long will it take to arrive?
                </h3>
                <p className="text-[16px] text-gray-700 text-justify">
                  Usually 3–7 business days, depending on how lazy your delivery
                  guy is. Don’t worry — we’ll send a tracking link so you can
                  stalk your frame guilt-free.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Section 3 - Payments and Refunds */}
          <motion.div
            variants={fadeUp}
            className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300"
          >
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Payments & Refunds
            </h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-[18px] font-semibold">
                  What payment methods do you accept?
                </h3>
                <p className="text-[16px] text-gray-700 text-justify">
                  All major cards, UPI, and wallets. No goats, no barter deals.
                </p>
              </div>

              <div>
                <h3 className="text-[18px] font-semibold">
                  How do refunds work?
                </h3>
                <p className="text-[16px] text-gray-700 text-justify">
                  If your frame arrives broken or looking like abstract art (and
                  not in a good way), contact us within 7 days. We’ll fix it
                  faster than you can say “refund me.”
                </p>
              </div>

              <div>
                <h3 className="text-[18px] font-semibold">
                  Can I cancel my order?
                </h3>
                <p className="text-[16px] text-gray-700 text-justify">
                  Sure, as long as we haven’t shipped it yet. Once it’s out, it’s
                  yours — we don’t believe in breakups after dispatch.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Section 4 - Products & Custom Orders */}
          <motion.div
            variants={fadeUp}
            className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300"
          >
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Products & Custom Orders
            </h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-[18px] font-semibold">
                  Can I get a custom frame?
                </h3>
                <p className="text-[16px] text-gray-700 text-justify">
                  Absolutely! Send us your idea at{" "}
                  <a
                    href="mailto:support@xsnapster.store"
                    className="text-sky-600 font-semibold hover:underline"
                  >
                    support@xsnapster.store
                  </a>{" "}
                  — we love weird requests. Challenge accepted.
                </p>
              </div>

              <div>
                <h3 className="text-[18px] font-semibold">
                  Are your frames ready to hang?
                </h3>
                <p className="text-[16px] text-gray-700 text-justify">
                  Yes, all our frames are wall-ready. No tools, no drama — just
                  hang it and admire your life choices.
                </p>
              </div>

              <div>
                <h3 className="text-[18px] font-semibold">
                  How do I clean my frame?
                </h3>
                <p className="text-[16px] text-gray-700 text-justify">
                  Soft cloth, gentle wipe, no attitude. Treat it like your
                  favorite playlist — carefully.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Section 5 - Still Need Help */}
          <motion.div
            variants={fadeUp}
            className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300"
          >
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Still Need Help?
            </h2>
            <h3 className="text-[18px] font-semibold">You can:</h3>
            <p className="text-[16px] text-gray-700 text-justify mt-2">
              Email us at{" "}
              <a
                href="mailto:support@xsnapster.store"
                className="text-sky-600 font-semibold hover:underline"
              >
                support@xsnapster.store
              </a>
              <br />
              Response time: <b>24–48 hours</b> (We promise, faster than your
              group chat replies.)
            </p>
          </motion.div>

          {/* Section 6 - Final Note */}
          <motion.div
            variants={fadeUp}
            className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300"
          >
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">
              Final Note
            </h2>
            <hr className="mb-4 border-gray-200" />
            <p className="text-[16px] text-gray-700 text-justify">
              We might joke a lot, but we take customer happiness seriously. If
              something’s wrong, we’ll fix it — no drama, no excuses, just pure
              frame redemption.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default HelpCenter;
