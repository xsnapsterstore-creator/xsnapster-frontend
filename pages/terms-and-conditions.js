import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";

const sectionVariant = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.6, ease: "easeOut" },
  }),
};

const TermsAndConditions = () => {
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
          <h1 className="text-4xl font-bold tracking-tight text-gray-800">
            Terms & Conditions
          </h1>
          <p className="text-red-600 text-sm mt-2 font-medium animate-pulse">
            The Rules of The (Frame) Game 🎯
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
            Let’s Keep It Real
          </h2>
          <div className="h-[1px] bg-gray-200 mb-4"></div>
          <p className="text-gray-600 leading-relaxed text-[16px]">
            Welcome to the <span className="text-red-500">X</span>
            SNAPSTER — where your walls get hotter and your taste gets louder.
            Before you start adding things to your cart like you’re redecorating
            the Louvre, here’s the fine print (with mild sarcasm included).
            <br />
            By browsing, buying, or even scrolling past our website, you agree
            to these terms. If you don’t… that’s okay. But you’ll miss out on
            some seriously aesthetic vibes.
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
            Ordering From Us
          </h2>
          <div className="h-[1px] bg-gray-200 mb-4"></div>
          <p className="text-gray-600 mb-3">
            When you click “Place Order”, it means:
          </p>
          <ul className="list-disc ml-6 text-gray-700 leading-relaxed space-y-2">
            <li>You're over 18 (or at least pretending responsibly).</li>
            <li>
              The info you give us (name, address, etc.) is correct — not your
              neighbour’s.
            </li>
            <li>
              You actually intend to pay for what you ordered (we love
              commitment).
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
            Payments
          </h2>
          <div className="h-[1px] bg-gray-200 mb-4"></div>
          <p className="text-gray-600 leading-relaxed">
            We accept all major payment methods — cards, UPI, and wallets.
            <br />
            All payments are processed securely because we’re classy like that.
            <br />
            If your payment fails, don’t panic. Just retry — or check if your
            bank thinks you’re being too generous today.
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
            Shipping & Delivery
          </h2>
          <div className="h-[1px] bg-gray-200 mb-4"></div>
          <p className="text-gray-600 leading-relaxed">
            We ship across India — fast, safe, and sometimes sexier than
            expected. Shipping timelines are clearly mentioned on our{" "}
            <Link
              href="/shipping-policy"
              className="text-red-500 font-semibold"
            >
              Shipping Policy
            </Link>{" "}
            page.
            <br />
            If your parcel takes longer than usual, it’s probably doing a
            photoshoot somewhere.
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
            Returns & Refunds
          </h2>
          <div className="h-[1px] bg-gray-200 mb-4"></div>
          <p className="text-gray-600 leading-relaxed">
            Things don’t always work out — and that’s okay. We’ve got a chill,
            clear process outlined in our{" "}
            <Link
              href="/return-and-refund"
              className="text-red-500 font-semibold"
            >
              Return & Refund Policy
            </Link>
            . If your frame arrives broken, scratched, or looking like modern
            art, we’ll sort it out.
            <br />
            But once the frame’s been printed and shipped, we can’t cancel it —
            art is permanent, baby.
          </p>
        </motion.section>

        {/* Section 6 */}
        <motion.section
          custom={5}
          variants={sectionVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="bg-white shadow-sm rounded-2xl p-8 border border-gray-100"
        >
          <h2 className="text-2xl font-semibold mb-2 text-gray-800">
            Intellectual Property
          </h2>
          <div className="h-[1px] bg-gray-200 mb-4"></div>
          <p className="text-gray-600 leading-relaxed">
            Every photo, design, layout, and witty line on{" "}
            <span className="text-red-500">X</span>SNAPSTER is our intellectual
            property. Copying it is like stealing our sense of humor — and
            that’s a crime in 69 countries.
            <br />
            If you’d like to feature or collaborate, just ask. We’re fun — not
            free.
          </p>
        </motion.section>

        {/* Section 7 */}
        <motion.section
          custom={6}
          variants={sectionVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="bg-white shadow-sm rounded-2xl p-8 border border-gray-100"
        >
          <h2 className="text-2xl font-semibold mb-2 text-gray-800">
            Final Words
          </h2>
          <div className="h-[1px] bg-gray-200 mb-4"></div>
          <p className="text-gray-600 leading-relaxed">
            <span className="text-red-500">X</span>SNAPSTER was built for people
            who appreciate sarcasm, art, and walls that speak louder than words.
            By shopping with us, you’re not just buying a frame — you’re joining
            a movement of bold, cheeky, and unapologetically aesthetic souls.
            <br />
            Now, go hang something worth staring at.
          </p>
        </motion.section>
      </div>
    </div>
  );
};

export default TermsAndConditions;
