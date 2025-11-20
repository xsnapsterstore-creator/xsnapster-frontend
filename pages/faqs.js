import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Faqs = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (i) => setOpenIndex((prev) => (prev === i ? null : i));

  const faqs = [
    {
      q: "What is XSNAPSTER?",
      a: `XSNAPSTER is your go-to site for bold, cheeky, and aesthetic Frames. The only thing we expose here is your boring wall.`,
    },
    {
      q: "Do I need a subscription like OnlyFans?",
      a: `Nope, one-time payment. But if you want to 'subscribe to our OnlyFrames', we won’t stop you 😉.`,
    },
    {
      q: "How fast is delivery?",
      a: "Faster than your ex texted 'I miss you'. Usually ships within a few days. We don’t play hard to get.",
    },
    {
      q: "Why should I buy from you?",
      a: "Because we’re funny, bold, and sarcastic — just like our Frames. Also, your walls deserve better.",
    },
    {
      q: "Do the Frames come with pictures?",
      a: "Yes. Unlike your Tinder matches, these frames won’t ghost you empty.",
    },
    {
      q: "Can I request custom Frames?",
      a: "Absolutely. Slide into our DMs and we’ll frame whatever aesthetic sin you want.",
    },
    {
      q: "Will my parents judge me for shopping here?",
      a: "Only if they confuse us with the other 'X' site. Show them your wall after — they’ll thank us.",
    },
    {
      q: "Is Checkout safe?",
      a: "100%. The only thing you’ll catch is… compliments 😉.",
    },
  ];

  return (
    <div className="pt-[120px] pb-20 px-6 lg:px-20 bg-gradient-to-b from-gray-50 to-gray-100 min-h-screen">
      {/* Header */}
      <motion.div
        className="text-center mb-14"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-[38px] font-extrabold text-gray-900 leading-tight">
          F.A.S. –{" "}
          <span className="text-red-600 animate-pulse">
            Frequently Asked Sarcasm
          </span>
        </h1>
        <p className="text-gray-600 mt-2 text-sm">
          Here’s everything you *didn’t* know you needed to
          ask.
        </p>
        <div className="w-16 h-1 bg-red-500 mx-auto mt-3 rounded-full"></div>
      </motion.div>

      {/* FAQ Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
        {faqs.map((item, i) => {
          const isOpen = openIndex === i;
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              viewport={{ once: true }}
              className="bg-white border border-gray-200 shadow-md rounded-xl p-5 hover:shadow-lg hover:scale-[1.02] transition-all duration-300"
            >
              {/* Question */}
              <button
                onClick={() => toggle(i)}
                className="flex justify-between items-center w-full text-left cursor-pointer"
              >
                <motion.h3
                  className="text-[18px] lg:text-[20px] font-semibold text-gray-900"
                  whileHover={{ scale: 1.02 }}
                >
                  {item.q}
                </motion.h3>
                <motion.span
                  animate={{ rotate: isOpen ? 45 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="text-red-600 text-2xl font-bold select-none"
                >
                  +
                </motion.span>
              </button>

              {/* Answer */}
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    key="content"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.4 }}
                    className="mt-3 overflow-hidden"
                  >
                    <p className="text-[15px] text-gray-700 leading-relaxed">
                      {item.a}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default Faqs;
