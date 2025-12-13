import React from "react";
import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.2 },
  }),
};

const PrivacyPolicy = () => {
  const sections = [
    {
      title: "Let's Get This Straight",
      content: `At XSNAPSTER, we care about your privacy – almost as much as we care about perfect wall aesthetics. We might have a spicy name, but your data stays as private as your search history. No leaks. No creeps. No selling your info to some shady dude in a hoodie.`,
    },
    {
      title: "What We Collect (and Why)",
      list: [
        {
          label: "Email & Contact Info",
          text: "So we can confirm your order and slide into your inbox professionally.",
        },
        {
          label: "Address Details",
          text: "So our delivery team knows where to drop the hot stuff (your frame, not drama).",
        },
        {
          label: "Payment Info",
          text: "Processed securely through trusted gateways – we never store your card details.",
        },
      ],
    },
    {
      title: "How We Use Your Data",
      list: [
        "Process and deliver your orders.",
        'Send order updates, promos, and the occasional "we miss you" email.',
        "Make our website smoother, faster, and sexier.",
      ],
      content:
        "We don't use your info to stalk you, sell you crypto, or slide into your DMs at 2 AM.",
    },
    {
      title: "Who We Share It With",
      list: [
        "Delivery Partners (because someone's gotta bring the frame).",
        "Payment Processors (the money magicians).",
      ],
      content: "No third-party nonsense, no creepy data orgies.",
    },
    {
      title: "How We Protect Your Data",
      content: `Your info is locked tighter than our sarcasm. We use SSL encryption, secure servers, and regular security audits – because privacy is sexy when done right. If anyone tries to hack us, they'll meet more firewalls than an ex with trust issues.`,
    },
    {
      title: "How Long We Keep Your Data",
      content: `We keep your info only as long as needed for legal, accounting, or aesthetic reasons. Once we're done, we delete it faster than a bad text.`,
    },
    {
      title: "Your Rights",
      list: [
        "Request a copy of your data.",
        "Ask us to delete your data.",
        "Opt out of marketing emails (though we'll cry a little).",
      ],
      content: (
        <>
          To do any of that, email us at{" "}
          <a
            href="mailto:support@xsnapster.store"
            className="text-sky-400 font-semibold hover:underline"
          >
            support@xsnapster.store
          </a>{" "}
          — no judgement, no drama.
        </>
      ),
    },
    {
      title: "Final Words",
      content: `We're here to make your walls hot, not your data. At XSNAPSTER, your trust means everything – and we'd never do you dirty. Now that we've handled the serious stuff, go back to browsing those frames like it's 3 A.M. and you're not supposed to be awake.`,
    },
  ];

  return (
    <div className="pt-[130px] pb-16 px-6 md:px-24 bg-gray-50 text-black relative overflow-hidden">
      {/* Glowing Blobs */}
      <div className="absolute top-0 left-0 w-96 h-96 blur-[120px] rounded-full -z-10"></div>
      <div className="absolute bottom-0 right-0 w-[450px] h-[450px] blur-[150px] rounded-full -z-10"></div>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-14"
      >
        <h1 className="text-[35px] font-extrabold mb-2">Privacy Policy</h1>
        <p className="text-red-500 text-sm md:text-base animate-pulse">
          Because We Like to Watch... Your Data (Safely)
        </p>
        <div className="w-16 h-1 bg-red-500 mx-auto mt-3 rounded-full"></div>
      </motion.div>

      {/* Sections */}
      <div className="space-y-10 max-w-4xl mx-auto">
        {sections.map((sec, i) => (
          <motion.div
            key={i}
            custom={i}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="bg-white p-6 md:p-8 rounded-2xl shadow-lg border border-white/10 backdrop-blur-xl hover:bg-amber-50 transition-all duration-300"
          >
            <h2 className="text-2xl font-semibold mb-3 bg-gradient-to-r text-red-500 bg-clip-text">
              {sec.title}
            </h2>

            {sec.content && (
              <p className="text-black text-[15px] md:text-[16px] leading-relaxed text-justify mb-3">
                {sec.content}
              </p>
            )}

            {sec.list && (
              <ul className="list-disc ml-6 text-black text-[15px] md:text-[16px] space-y-1">
                {sec.list.map((item, idx) =>
                  typeof item === "string" ? (
                    <li key={idx}>{item}</li>
                  ) : (
                    <li key={idx}>
                      <span className="font-semibold text-black">
                        {item.label}
                      </span>
                      : {item.text}
                    </li>
                  )
                )}
              </ul>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default PrivacyPolicy;
