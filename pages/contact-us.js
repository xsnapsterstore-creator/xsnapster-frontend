import React from "react";
import { motion } from "framer-motion";
import EmailIcon from "@mui/icons-material/Email";

const ContactUs = () => {
  return (
    <div className="pt-[130px] pb-20 px-6 md:px-20 bg-gray-50">
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-12"
      >
        <h1 className="text-[35px] font-bold text-gray-900">
          Contact Us
          <br />
          <span className="text-red-600 animate-pulse text-lg">Slide Into Our Inbox 💌</span>
        </h1>
        <p className="text-gray-600 text-sm mt-2">
          Got a question, complaint, or an ego that needs validation? We’re all
          ears (and keyboards).
        </p>
        <div className="w-16 h-1 bg-red-500 mx-auto mt-3 rounded-full"></div>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto items-center">
        {/* Left Section — Info Card */}
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100 relative overflow-hidden"
        >
          <div className="absolute w-40 h-40 bg-pink-300 opacity-20 rounded-full -top-10 -right-10 blur-3xl"></div>
          <div className="absolute w-56 h-56 bg-yellow-300 opacity-20 rounded-full bottom-0 -left-20 blur-3xl"></div>

          <h2 className="text-2xl font-bold mb-3 text-gray-900">
            We Don’t Bite{" "}
            <span className="text-red-500 text-sm animate-pulse">
              (Unless You’re a Dusty Wall)
            </span>
          </h2>
          <hr className="border-gray-200 mb-4" />

          <p className="text-gray-700 leading-relaxed text-[15px]">
            Whether it’s about your order, a custom frame, or just to tell us
            how hilarious we are — we love hearing from you. Our customer
            support team replies faster than your ex’s “seen” message.
          </p>

          <div className="mt-6 flex items-center gap-2 text-gray-800 hover:text-red-600 cursor-pointer transition">
            <EmailIcon />
            <p className="text-[15px] font-medium">support@xsnapster.store</p>
          </div>

          <p className="text-[14px] mt-3 text-gray-500 italic">
            Got sarcasm better than ours? We dare you to out-snark us.
          </p>
        </motion.div>

        {/* Right Section — Contact Form */}
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="relative backdrop-blur-2xl bg-white/10 border border-white/20 text-white p-10 rounded-2xl shadow-2xl overflow-hidden"
        >
          {/* Gradient Accents */}
          <div className="absolute top-0 left-0 w-40 h-40 bg-purple-500/30 rounded-full blur-3xl -z-10"></div>
          <div className="absolute bottom-0 right-0 w-56 h-56 bg-blue-500/30 rounded-full blur-3xl -z-10"></div>

          <h2 className="text-3xl font-extrabold mb-8 text-center bg-gradient-to-r from-purple-400 to-blue-400 text-transparent bg-clip-text">
            Reach Out to Us ✨
          </h2>

          <form method="post" action="#" className="space-y-8">
            {/* Full Name */}
            <div className="relative">
              <input
                type="text"
                id="name"
                required
                className="peer w-full px-4 pt-5 pb-2 text-black placeholder-transparent bg-transparent border-b-2 border-gray-500 focus:border-purple-400 outline-none transition duration-300"
                placeholder="Full Name"
              />
              <label
                htmlFor="name"
                className="absolute left-4 top-3 text-gray-400 text-sm transition-all duration-300 
          peer-placeholder-shown:top-5 peer-placeholder-shown:text-gray-500 peer-placeholder-shown:text-base
          peer-focus:top-2 peer-focus:text-sm peer-focus:text-purple-400"
              >
                Full Name
              </label>
            </div>

            {/* Email */}
            <div className="relative">
              <input
                type="email"
                id="email"
                required
                className="peer w-full px-4 pt-5 pb-2 text-black placeholder-transparent bg-transparent border-b-2 border-gray-500 focus:border-purple-400 outline-none transition duration-300"
                placeholder="Email Address"
              />
              <label
                htmlFor="email"
                className="absolute left-4 top-3 text-gray-400 text-sm transition-all duration-300 
          peer-placeholder-shown:top-5 peer-placeholder-shown:text-gray-500 peer-placeholder-shown:text-base
          peer-focus:top-2 peer-focus:text-sm peer-focus:text-purple-400"
              >
                Email Address
              </label>
            </div>

            {/* Message */}
            <div className="relative">
              <textarea
                id="message"
                rows="4"
                required
                className="peer w-full px-4 pt-5 pb-2 text-black placeholder-transparent bg-transparent border-b-2 border-gray-500 focus:border-purple-400 outline-none transition duration-300 resize-none"
                placeholder="Your Message"
              ></textarea>
              <label
                htmlFor="message"
                className="absolute left-4 top-3 text-gray-400 text-sm transition-all duration-300 
          peer-placeholder-shown:top-5 peer-placeholder-shown:text-gray-500 peer-placeholder-shown:text-base
          peer-focus:top-2 peer-focus:text-sm peer-focus:text-purple-400"
              >
                Message
              </label>
            </div>

            {/* Button */}
            <motion.button
              whileHover={{
                scale: 1.05,
                boxShadow: "0px 0px 12px rgba(168,85,247,0.7)",
              }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="w-full bg-gradient-to-r from-purple-500 via-pink-400 to-blue-500 text-white font-bold py-3 rounded-full transition-all duration-300 hover:shadow-lg hover:opacity-95"
            >
              Send Message 🚀
            </motion.button>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default ContactUs;
