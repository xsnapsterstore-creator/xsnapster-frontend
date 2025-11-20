"use client";
import React, { useState } from "react";
import PersonIcon from "@mui/icons-material/Person";
import CloseIcon from "@mui/icons-material/Close";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import MenuIcon from "@mui/icons-material/Menu";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Image from "next/image";
import PaidIcon from "@mui/icons-material/Paid";
import Cart from "../Cart/Cart";
import { useEffect } from "react";
import Link from "next/link";
import { useSelector } from "react-redux";
import { fetchCategories } from "../API/api";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const cart = useSelector((state) => state.cart.items);
  const [isOpen, setIsOpen] = useState(false);
  const toggleSidebar = () => setIsOpen(!isOpen);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
  const [isHelpCenterOpen, setIsHelpCenterOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [visible, setVisible] = useState(true);
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [isLogin, setIsLogin] = useState("Guest User");
  const router = useRouter();

  const toggleCategories = () => {
    setIsCategoriesOpen(!isCategoriesOpen);
    setIsHelpCenterOpen(false);
  };
  const toggleHelpCenter = () => {
    setIsHelpCenterOpen(!isHelpCenterOpen);
    setIsCategoriesOpen(false);
  };
  const toggleCart = () => setIsCartOpen(!isCartOpen);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    const res = async () => {
      const data = await fetchCategories();
      const categ_data = await data.json();
      setCategories(categ_data);
    };
    res();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;

      setVisible(
        prevScrollPos > currentScrollPos || // Scrolling up
        currentScrollPos < 10 // At the top
      );

      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [prevScrollPos]);

  if (!isMounted) return null;

  async function CheckLogin() {
    router.replace('/login');
  }

  return (
    <>
      <div
        className={`fixed top-0 left-0 right-0 shadow z-30 bg-white transition-transform duration-300 ${visible ? "translate-y-0" : "-translate-y-full"
          }`}
      >
        {/* For Mobile View */}
        <div className="flex lg:hidden justify-between items-center h-[65px]">
          <div className="pl-5">
            <MenuIcon onClick={toggleSidebar} className="cursor-pointer" />
          </div>
          <div>
            <Link href={"/"}>
              <div className="flex items-center gap-[2px] md:text-[25px] text-[20px] font-semibold">
                <Image src="/logo.svg" alt="xsnapster" width={27} height={27} />
                <div className="flex items-center">
                  <p className="text-black">
                    <bold className="text-red-500">X</bold>SNAPSTER
                  </p>
                </div>
              </div>
            </Link>
          </div>
          <div className="pr-5">
            <div className="relative inline-block">
              <span className="absolute -top-2 -right-2 flex items-center justify-center w-4 h-4 rounded-full bg-red-500 text-white text-xs">
                {cart.length}
              </span>
              <ShoppingCartIcon
                onClick={() => setIsCartOpen(true)}
                className="cursor-pointer"
              />
            </div>
          </div>
        </div>

        {/* For Desktop View */}
        <div className="lg:flex hidden justify-between items-center h-[65px]">
          <div className="pl-7">
            <Link href={"/"}>
              <div className="flex items-center gap-[2px] md:text-[25px] text-[20px] font-semibold">
                <Image src="/logo.svg" alt="xsnapster" width={30} height={30} />
                <div className="flex items-center">
                  <p className="text-black">
                    <bold className="text-red-500">X</bold>SNAPSTER
                  </p>
                </div>
              </div>
            </Link>
          </div>

          <div>
            <div>
              <ul className="flex items-center gap-6 relative">
                {/* ✅ Categories Dropdown */}
                <li
                  className="cursor-pointer relative"
                  onClick={toggleCategories}
                >
                  <span className="flex items-center">
                    Categories
                    <sup className="text-red-600 text-[10px] animate-pulse p-[4px] rounded-xl">
                      New
                    </sup>
                    {isCategoriesOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                  </span>

                  {/* Dropdown Menu */}
                  <div
                    className={`absolute left-0 top-[100%] bg-white shadow-lg border border-gray-200 rounded-lg overflow-hidden text-[15px] w-[250px] transform transition-all duration-300 ${isCategoriesOpen
                      ? "max-h-[500px] mt-2 opacity-100 visible"
                      : "max-h-0 opacity-0 invisible"
                      }`}
                  >
                    <div className="flex flex-col p-4 space-y-3">
                      {categories.map((item) => (
                        <a
                          href={`/categories/${item.slug}`}
                          key={item.name}
                          className="flex items-end justify-between hover:text-red-500 transition-all duration-200"
                        >
                          <p className="text-[15px]">{item.name}</p>
                          <p className="text-[10px] text-red-600 animate-pulse">
                            {item.one_liner}
                          </p>
                        </a>
                      ))}
                    </div>
                  </div>
                </li>

                {/* Other Menu Items */}
                {/* Help Center Dropdown */}
                <li
                  className="cursor-pointer relative"
                  onClick={toggleHelpCenter}
                >
                  <span className="flex items-center gap-1">
                    Help Center
                    {isHelpCenterOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                  </span>

                  {/* Dropdown Menu */}
                  <div
                    className={`absolute left-0 top-[100%] bg-white shadow-lg border border-gray-200 rounded-lg overflow-hidden text-[15px] w-[250px] transform transition-all duration-300 ${isHelpCenterOpen
                      ? "max-h-[500px] mt-2 opacity-100 visible"
                      : "max-h-0 opacity-0 invisible"
                      }`}
                  >
                    <div className="flex flex-col p-4 space-y-3">
                      {[
                        {
                          name: "Who's Behind The Camera",
                          link: "/who-is-behind-the-camera",
                        },
                        { name: "Reviews", link: "/reviews" },
                        { name: "FAQ's", link: "/faqs" },
                        { name: "Contact Us", link: "/contact-us" },
                        { name: "Privacy Policy", link: "/privacy-policy" },
                        {
                          name: "Refund Policy",
                          link: "/return-and-refund",
                        },
                        {
                          name: "Terms & Conditions",
                          link: "/terms-and-conditions",
                        },
                        { name: "Shipping Policy", link: "/shipping-policy" },
                      ].map((item) => (
                        <div
                          key={item.name}
                          className="hover:text-red-600 transition-all duration-200"
                        >
                          <Link
                            onClick={toggleHelpCenter}
                            href={item.link}
                            className="text-[15px]"
                          >
                            {item.name}
                          </Link>
                        </div>
                      ))}
                    </div>
                  </div>
                </li>
                <li>Track Order</li>

                <li>
                  <form type="submit" action="submit">
                    <input
                      className="w-[200px] h-[30px] border rounded-md px-2 focus:outline-none"
                      type="text"
                      placeholder="Search"
                    />
                  </form>
                </li>

                <li onClick={CheckLogin} className="px-2 py-1 bg-gray-200 rounded-lg hover:cursor-pointer flex items-center">
                  <PersonIcon />
                  <button className="ml-1 hover:cursor-pointer">
                    {isLogin}
                  </button>
                </li>
              </ul>
            </div>
          </div>

          <div className="pr-7">
            <div className="relative inline-block">
              <span className="absolute -top-2 -right-2 flex items-center justify-center w-4 h-4 rounded-full bg-red-500 text-white text-xs">
                {cart.length}
              </span>
              <ShoppingCartIcon
                onClick={() => setIsCartOpen(true)}
                className="cursor-pointer"
              />
            </div>
          </div>
        </div>

        <div className="bg-black">
          <ul className="text-white py-[8px] pl-5 pr-2 text-[14px] md:text-[15px] flex items-center gap-6 whitespace-nowrap justify-start overflow-x-auto scrollbar-hide ">
            <li className="text-red-600 animate-pulse font-semibold">
              • OnlyFrames
            </li>
            <li className="flex items-center gap-[2px] text-amber-300">
              <PaidIcon fontSize="small" /> Premium Frames
            </li>
            <li>Sexy Frames</li>
            <li>Hot Right Now</li>
            <li>Frame Stars</li>
            <li>Most Watched Frames</li>
          </ul>
        </div>
      </div>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar Drawer */}
      <div
        className={`fixed top-0 left-0 h-full w-80 bg-gray-900 lg:hidden shadow-lg z-50 transform transition-transform duration-300 ${isOpen ? "translate-x-0" : "-translate-x-full"
          }`}
      >
        <div className="flex h-[65px] justify-between items-center p-4 border-b">
          <div className="flex items-center gap-[1px]">
            <Link
              href={"/"}
              className="h-[27px] font-playfair font-display weight-700 text-[20px] text-white font-semibold"
            >
              <bold className="text-red-600">X</bold>SNAPSTER
            </Link>
          </div>
          <button className="text-white" onClick={toggleSidebar}>
            <CloseIcon />
          </button>
        </div>

        <div className="flex flex-col h-[calc(100%-120px)]">
          <div className="flex-1 text-[17px] scrollbar-hide overflow-y-auto p-4 text-white space-y-5">
            <Link href={"/login"} onClick={toggleSidebar} className="flex items-center bg-gray-300 p-3 text-black rounded-2xl gap-5">
              <PersonIcon />
              <p>Guest User</p>
            </Link>
            <div>
              <div
                className="flex items-center justify-between cursor-pointer"
                onClick={toggleCategories}
              >
                <span>
                  Categories
                  <sup className="text-red-500 text-[10px] animate-pulse p-[4px] rounded-xl">
                    New
                  </sup>
                </span>
                {isCategoriesOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
              </div>

              {isCategoriesOpen && (
                <div
                  className={`overflow-hidden text-[15px] transform transition-transform duration-300 ${isCategoriesOpen ? "max-h-96 mt-3" : "max-h-0"
                    } ml-4 flex flex-col space-y-5`}
                >
                  {categories.map((item) => (
                    <a
                      onClick={toggleSidebar}
                      href={`/categories/${item.slug}`}
                      key={item.id}
                      className="flex items-end justify-between"
                    >
                      <p>{item.name}</p>
                      <p className="text-[10px] text-red-500 animate-pulse">
                        {item.one_liner}
                      </p>
                    </a>
                  ))}
                </div>
              )}
            </div>
            <div className="flex items-center justify-between">
              <Link onClick={toggleSidebar} href="/who-is-behind-the-camera">
                Who's Behind the Camera?
              </Link>
            </div>
            <Link
              href={"/reviews"}
              onClick={toggleSidebar}
              className="flex items-center justify-between"
            >
              <p>Reviews</p>
            </Link>
            <Link
              href={"/track-order"}
              onClick={toggleSidebar}
              className="flex items-center justify-between"
            >
              <p>Track Order</p>
            </Link>
            <Link
              href={"/help-center"}
              onClick={toggleSidebar}
              className="flex items-center justify-between"
            >
              <p>Help Center</p>
            </Link>
            <Link
              href="/faqs"
              onClick={toggleSidebar}
              className="flex items-center justify-between"
            >
              <p>FAQ's</p>
            </Link>
            <Link
              href={"/contact-us"}
              onClick={toggleSidebar}
              className="flex items-center justify-between"
            >
              <p>Contact Us</p>
            </Link>
          </div>
        </div>
      </div>

      {/* Cart Component */}

      {isCartOpen && (
        <div className="fixed inset-0 bg-black/40 z-40" onClick={toggleCart} />
      )}

      <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
};

export default Navbar;
