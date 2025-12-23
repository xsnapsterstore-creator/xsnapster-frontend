import React from "react";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import PremiumProduct from "../PremiumProduct/PremiumProduct";

const PremiumCategory = ({ productName }) => {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState(productName);
  const [blackNavbar, setBlackNavbar] = useState(false);
  const router = useRouter();
  const { premium } = router.query;
  const pathname = router.pathname;

  useEffect(() => {
    const isBlackNavbar = pathname.includes("premium-categories");
    setBlackNavbar(isBlackNavbar);
  }, [pathname]);

  return (
    <div
      className={`${
        blackNavbar ? "bg-black/90 text-white/80" : "bg-white text-black"
      }`}
    >
      <div className="pt-[95px] bg-black/30">
        <h1 className={`text-[23px] font-semibold text-center mt-5`}>
          Build For People With Standards
        </h1>
        <div className="w-12 h-1 bg-red-400 mx-auto rounded-full mb-2"></div>
        <h3 className="text-center italic text-[12px] pb-2 text-gray-400">
          Once you go premium, there's no going back
        </h3>
        <hr />
      </div>
      {loading ? (
        <div className="h-[70vh] flex items-center justify-center">
          <div className="relative">
            <div className="fixed inset-0 flex items-center justify-center z-10">
              <Image
                src={"/logo.svg"}
                alt="Loading..."
                width={100}
                height={100}
                unoptimized
                className="opacity-25"
              />
            </div>
          </div>
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
        >
          <div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-2.5 mt-2 md:mt-5">
              {Array.isArray(products) && products.length > 0 ? (
                products.map((prod) => (
                  <PremiumProduct key={prod.id} product={prod} />
                ))
              ) : (
                <div className="col-span-full h-[60vh] flex flex-col items-center justify-center">
                  <h5 className="text-gray-500 text-lg">Coming Soon!</h5>
                  <p className="text-gray-400 text-md">Stay Tuned</p>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default PremiumCategory;
