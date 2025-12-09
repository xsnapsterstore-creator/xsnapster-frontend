import React from "react";
import InstagramIcon from "@mui/icons-material/Instagram";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import Link from "next/link";
import { fetchAllSubCategories } from "../API/api";
import { useQuery } from "@tanstack/react-query";

const Footer = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["subCategories"],
    queryFn: async () => {
      const res = await fetchAllSubCategories();
      return res.json();
    },

    // ⏳ Cache the data for 10 minutes (600000 ms)
    staleTime: 600_000,

    // 💾 Keep the data in memory for 10 minutes even if component unmounts
    gcTime: 600_000,

    // ♻️ Automatically refetch after 10 minutes (same as staleTime)
    refetchInterval: 600_000,

    // 👇 Prevent refetching on mount if cached data exists
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
  return (
    <div>
      {/* For Mobile Screen */}
      <div className="lg:hidden block">
        <div className="wave-container">
          <div>
            <svg
              className="waves"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 24 150 28"
              preserveAspectRatio="none"
              shapeRendering="auto"
            >
              <defs>
                <path
                  id="gentle-wave"
                  d="M-160 44c30 0 58-18 88-18s58 18 88 18 58-18 88-18 58 18 88 18v44h-352z"
                />
              </defs>
              <g className="parallax">
                <use
                  href="#gentle-wave"
                  x="48"
                  y="0"
                  fill="rgba(158, 159, 161)"
                />
                <use
                  href="#gentle-wave"
                  x="48"
                  y="3"
                  fill="rgba(128, 129, 130)"
                />
                <use href="#gentle-wave" x="48" y="5" fill="rgba(94, 94, 94)" />
                <use href="#gentle-wave" x="48" y="7" fill="rgb(18, 18, 18)" />
              </g>
            </svg>
          </div>
        </div>
        <div className="text-white bg-[#121212]">
          <div className="pt-10 pl-5 p-5">
            <div className="flex items-center justify-center w-full border-b pb-5">
              {isLoading ? (
                // 🔄 Loading State (Skeleton Chips)
                <div className="flex flex-wrap gap-2 w-full max-w-3xl justify-center">
                  {Array.from({ length: 10 }).map((_, index) => (
                    <div
                      key={index}
                      className="px-8 py-2 h-6 rounded-lg bg-neutral-800 animate-pulse"
                    />
                  ))}
                </div>
              ) : (
                // ✅ Loaded State
                <div>
                  <p className="text-center text-xl m-4">Explore Categories</p>
                  <div className="flex flex-wrap gap-2 w-full max-w-3xl justify-center">
                    {data?.map((tag, i) => (
                      <div
                        key={i}
                        className="px-3 py-1 text-sm rounded-lg bg-neutral-900 text-white border border-neutral-700 cursor-pointer hover:bg-neutral-800 transition-all"
                      >
                        {tag.name}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="text-center pt-5">
              <h3 className="text-[15px] tracking-wide font-semibold">
                About Us
              </h3>
              <p className="text-[13px] text-center p-3">
                Welcome to <bold className="text-red-500">x</bold>snapster.store
                - where creativity meets artistry in the form of stunning
                customized and designer frames. We believe that every wall has a
                story to tell, and we are here to help you tell yours.
              </p>
              <p className="text-xs tracking-wide text-red-600 animate-pulse italic">
                Your walls deserve better.
              </p>
            </div>

            <div className="pt-10">
              <div>
                <h4 className="text-[17px] font-semibold">Quick links</h4>
              </div>
              <div className="pt-2">
                <ul className="text-[15px] text-gray-200 flex flex-col gap-2">
                  <li>
                    <Link href="/who-is-behind-the-camera">
                      Who's Behind The Camera
                    </Link>
                  </li>
                  <li>
                    <Link href="/contact-us">Contact Us</Link>
                  </li>
                  <li>
                    <Link href="/terms-and-conditions">
                      Terms and Conditions
                    </Link>
                  </li>
                  <li>
                    <Link href="/shipping-policy">
                      Cancellation and Shipping Policy
                    </Link>
                  </li>
                  <li>
                    <Link href="/faqs">FAQs</Link>
                  </li>
                  <li>
                    <Link href="/privacy-policy">Privacy Policy</Link>
                  </li>
                </ul>
              </div>
            </div>

            <div className="pt-10 flex justify-start items-center gap-3">
              <div>Connect with us :</div>
              <div>
                <ul className="flex justify-center items-center gap-2">
                  <li>
                    <InstagramIcon />
                  </li>
                  <li>
                    <WhatsAppIcon />
                  </li>
                  <li>
                    <MailOutlineIcon />
                  </li>
                </ul>
              </div>
            </div>

            <div className="pt-10">
              <h5 className="text-[15px]">Subscribe to our emails</h5>
              <div className="mt-2 flex justify-start items-center">
                <input
                  className="p-2 rounded-2xl bg-gray-500"
                  type="email"
                  placeholder="Enter your email"
                />
                <button className="ml-2 text-gray-800 bg-sky-300 drop-shadow-lg text-[13px] shadow py-2 px-3 rounded">
                  Subscribe
                </button>
              </div>
            </div>

            <div className="pt-10">
              <ul className="flex justify-start items-center text-[10px] gap-5">
                <li>
                  <Link href="/return-and-refund">Refund Policy</Link>
                </li>
                <li>
                  <Link href="/privacy-policy">Privacy Policy</Link>
                </li>
                <li>
                  <Link href="/shipping-policy">Shipping Policy</Link>
                </li>
                <li>
                  <Link href="/contact-us">Contact Information</Link>
                </li>
              </ul>
            </div>

            <div className="border-t border-gray-700 text-justify pt-6 mt-10">
              <p className="text-xs">
                All artwork posted on this website is intended as fan art and is
                not purported to be official merchandise unless indicated
                otherwise. If you have any issue regarding the artwork, please
                write to us at{" "}
                <Link
                  href="mailto:support@xsnapster.store"
                  className="underline"
                >
                  support@xsnapster.store
                </Link>
                .
              </p>
            </div>

            <div className="pt-5 text-center">
              <p className="text-[10px]">
                Copyright © 2025 XSNAPSTER. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* For Desktop Screen */}
      <div className="hidden lg:block">
        {/* Wave Divider */}
        <div className="wave-container">
          <svg
            className="waves"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 24 150 28"
            preserveAspectRatio="none"
            shapeRendering="auto"
          >
            <defs>
              <path
                id="gentle-wave"
                d="M-160 44c30 0 58-18 88-18s58 18 88 18 58-18 88-18 58 18 88 18v44h-352z"
              />
            </defs>
            <g className="parallax">
              <use href="#gentle-wave" x="48" y="0" fill="rgba(158,159,161)" />
              <use href="#gentle-wave" x="48" y="3" fill="rgba(128,129,130)" />
              <use href="#gentle-wave" x="48" y="5" fill="rgba(94,94,94)" />
              <use href="#gentle-wave" x="48" y="7" fill="rgb(18,18,18)" />
            </g>
          </svg>
        </div>

        {/* Footer Container */}
        <footer className="bg-[#121212] text-gray-300 py-16 px-10 lg:px-24">
          {/* Categories Data */}
          <div className="flex items-center justify-center w-full border-b pb-5">
            {isLoading ? (
              // 🔄 Loading State (Skeleton Chips)
              <div className="flex flex-wrap gap-2 w-full max-w-3xl justify-center">
                {Array.from({ length: 10 }).map((_, index) => (
                  <div
                    key={index}
                    className="px-8 py-2 h-6 rounded-lg bg-neutral-800 animate-pulse"
                  />
                ))}
              </div>
            ) : (
              // ✅ Loaded State
              <div>
                <p className="text-center text-xl m-4">Explore Categories</p>
                <div className="flex flex-wrap gap-2 w-full max-w-3xl justify-center">
                  {data?.map((tag, i) => (
                    <div
                      key={i}
                      className="px-3 py-1 text-sm rounded-lg bg-neutral-900 text-white border border-neutral-700 cursor-pointer hover:bg-neutral-800 transition-all"
                    >
                      {tag.name}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* About */}
          <div>
            <h4 className="text-lg font-semibold mb-1 mt-5">About Us</h4>
            <p className="text-sm leading-6 text-gray-400">
              Welcome to <span className="text-red-500 font-semibold">x</span>
              snapster.store — where creativity meets artistry in the form of
              stunning customized and designer frames. We believe that every
              wall has a story to tell, and we are here to help you tell yours.
            </p>
            <p className="text-xs text-red-600 animate-pulse mt-1 italic">
              Your walls deserve better.
            </p>
          </div>

          {/* Top Section */}
          <div className="grid lg:grid-cols-3 gap-10 mt-5">
            {/* Quick Links */}
            <div>
              <h4 className="text-lg font-semibold mb-3">Quick Links</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link
                    href="/who-is-behind-the-camera"
                    className="hover:text-white"
                  >
                    Who's Behind The Camera
                  </Link>
                </li>
                <li>
                  <Link href="/contact-us" className="hover:text-white">
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link
                    href="/terms-and-conditions"
                    className="hover:text-white"
                  >
                    Terms & Conditions
                  </Link>
                </li>
                <li>
                  <Link href="/shipping-policy" className="hover:text-white">
                    Shipping & Cancellation Policy
                  </Link>
                </li>
                <li>
                  <Link href="/faqs" className="hover:text-white">
                    FAQs
                  </Link>
                </li>
                <li>
                  <Link href="/privacy-policy" className="hover:text-white">
                    Privacy Policy
                  </Link>
                </li>
              </ul>
            </div>

            {/* Support */}
            <div>
              <h4 className="text-lg font-semibold mb-3">Support</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/return-and-refund" className="hover:text-white">
                    Refund Policy
                  </Link>
                </li>
                <li>
                  <Link href="/privacy-policy" className="hover:text-white">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/shipping-policy" className="hover:text-white">
                    Shipping Policy
                  </Link>
                </li>
                <li>
                  <Link href="/contact-us" className="hover:text-white">
                    Contact Information
                  </Link>
                </li>
              </ul>
            </div>

            {/* Newsletter + Social */}
            <div>
              <h4 className="text-lg font-semibold mb-3">Stay Updated</h4>
              <p className="text-sm text-gray-400 mb-3">
                Subscribe for updates, offers & new collections.
              </p>

              <div className="flex gap-2">
                <input
                  type="email"
                  className="w-full p-2 bg-gray-700 border border-gray-600 rounded-lg text-sm placeholder-gray-400 focus:ring-2 focus:ring-sky-400 outline-none"
                  placeholder="Enter your email"
                />
                <button className="bg-sky-500 hover:bg-sky-600 px-4 py-2 text-sm rounded-lg text-white transition">
                  Subscribe
                </button>
              </div>

              <div className="mt-6 flex gap-4">
                <Link href="https://instagram.com" target="_blank">
                  <InstagramIcon className="cursor-pointer hover:text-white scale-110 transition" />
                </Link>
                <Link href="https://instagram.com" target="_blank">
                  <WhatsAppIcon className="cursor-pointer hover:text-white scale-110 transition" />
                </Link>
                <Link href="https://instagram.com" target="_blank">
                  <MailOutlineIcon className="cursor-pointer hover:text-white scale-110 transition" />
                </Link>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-700 text-center pt-6 mt-10">
            <p className="text-xs">
              All artwork posted on this website is intended as fan art and is
              not purported to be official merchandise unless indicated
              otherwise. If you have any issue regarding the artwork, please
              write to us at{" "}
              <Link href="mailto:support@xsnapster.store" className="underline">
                support@xsnapster.store
              </Link>
              .
            </p>
          </div>

          {/* Bottom */}
          <div className="text-center pt-6 ">
            <p className="text-xs text-gray-500">
              Copyright © 2025 XSNAPSTER. All rights reserved.
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Footer;
