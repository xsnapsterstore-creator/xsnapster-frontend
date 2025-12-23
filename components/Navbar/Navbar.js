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
import { useSelector, useDispatch } from "react-redux";
import { fetchCategories } from "../API/api";
import { useRouter } from "next/router";
import { setUserDetails } from "../store/cartSlice";
import SearchIcon from "@mui/icons-material/Search";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import MaleIcon from "@mui/icons-material/Male";
import FemaleIcon from "@mui/icons-material/Female";
import TransgenderIcon from "@mui/icons-material/Transgender";
import { Button } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import clsx from "clsx";

const Navbar = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.items);
  const user = useSelector((state) => state.cart.user);
  const [isOpen, setIsOpen] = useState(false);
  const toggleSidebar = () => setIsOpen(!isOpen);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
  const [isHelpCenterOpen, setIsHelpCenterOpen] = useState(false);
  const [visible, setVisible] = useState(true);
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  const [mobileSearchTerm, setMobileSearchTerm] = useState("");
  const [isGenderOpen, setIsGenderOpen] = useState(false);
  const [blackNavbar, setBlackNavbar] = useState(false);

  let toggle = false;
  const router = useRouter();

  const toggleCategories = () => {
    setIsCategoriesOpen(!isCategoriesOpen);
    setIsHelpCenterOpen(false);
  };
  const toggleHelpCenter = () => {
    setIsHelpCenterOpen(!isHelpCenterOpen);
    setIsCategoriesOpen(false);
  };
  const toggleGender = () => {
    setIsGenderOpen((prev) => !prev);
  };
  const toggleCart = () => setIsCartOpen(!isCartOpen);
  const [isMounted, setIsMounted] = useState(false);

  const { data, isLoading } = useQuery({
    queryKey: ["Categories"],
    queryFn: async () => {
      const res = await fetchCategories();
      return res.json();
    },

    staleTime: 600_000,
    gcTime: 600_000,
    refetchInterval: 600_000,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  const pathname = router.pathname;

  useEffect(() => {
    const isBlackNavbar = pathname.includes("premium-categories");
    setBlackNavbar(isBlackNavbar);
  }, [pathname]);

  useEffect(() => {
    dispatch(setUserDetails());
  }, []);

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

  async function CheckLogin(toggle) {
    if (user.userEmail && user.userID) {
      router.replace(`/user/${user.userID}`);
    } else {
      router.replace("/login");
    }
    if (toggle) {
      toggleSidebar();
    }
  }

  async function searchItem(e) {
    e.preventDefault();
    console.log("This is search Item:", mobileSearchTerm);
    setMobileSearchTerm("");
  }

  return (
    <>
      <div
        className={`fixed top-0 left-0 right-0 shadow z-30 transition-transform duration-300 ${
          visible ? "translate-y-0" : "-translate-y-full"
        } ${
          blackNavbar ? "bg-black/80 text-white/80" : "bg-white text-black"
        }`}
      >
        {/* For Mobile View */}
        <div className="flex lg:hidden justify-between w-full items-center h-[65px]">
          <div className="pl-3 flex justify-center items-center gap-2">
            <Link href={"/"}>
              <div className="flex items-center gap-[2px] text-[22px]">
                <Image
                  src={`${blackNavbar ? "/white-logo.svg" : "/logo.svg"}`}
                  alt="xsnapster"
                  width={40}
                  height={40}
                />
                <div className="flex items-center">
                  <p className="font-semibold">
                    <strong className="text-red-500">X</strong>SNAPSTER
                  </p>
                </div>
              </div>
            </Link>
            <div className="relative" onClick={toggleGender}>
              {/* Trigger */}
              <div className="flex justify-center items-center cursor-pointer">
                <Image
                  src={`${blackNavbar ? "/white-gender.svg" : "/gender.svg"}`}
                  className="text-red-600"
                  width={22}
                  height={22}
                  alt="gender"
                />
                {isGenderOpen ? (
                  <KeyboardArrowUpIcon
                    fontSize="small"
                    sx={{ fontSize: "15px" }}
                  />
                ) : (
                  <KeyboardArrowDownIcon
                    fontSize="small"
                    sx={{ fontSize: "15px" }}
                  />
                )}
              </div>

              {/* Dropdown */}
              <div
                className={`
      absolute left-1/2 -translate-x-1/2 top-[110%]
      bg-[#333333] shadow-lg text-white
      rounded-lg overflow-hidden text-[14px] w-[110px]
      transform transition-all duration-300 z-50
      ${
        isGenderOpen
          ? "max-h-[300px] opacity-100 visible"
          : "max-h-0 opacity-0 invisible"
      }
    `}
              >
                <div className="flex flex-col p-3 space-y-2">
                  <Link
                    href={"/categories/for-him"}
                    className="hover:text-red-500 hover:cursor-pointer transition flex justify-center items-center"
                  >
                    <span>For Him</span>
                    <MaleIcon />
                  </Link>
                  <Link
                    href={"/categories/for-her"}
                    className="hover:text-red-500 hover:cursor-pointer transition flex justify-center items-center"
                  >
                    <span>For Her</span>
                    <FemaleIcon />
                  </Link>
                  <Link
                    href={"/categories/others"}
                    className="hover:text-red-500 hover:cursor-pointer transition flex justify-center items-center"
                  >
                    <span>Others</span>
                    <TransgenderIcon />
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="pr-3 flex justify-center items-center gap-3 md:gap-4">
            <div className="">
              <SearchIcon
                sx={{ fontSize: "30px" }}
                onClick={() => setShowMobileSearch((prev) => !prev)}
                className="cursor-pointer"
                aria-label="Toggle search"
              />
            </div>
            <div className="relative inline-block">
              <span className="absolute -top-2 -right-2 flex items-center justify-center w-4 h-4 rounded-full bg-red-500 text-white text-xs">
                {cart.length}
              </span>
              <ShoppingCartIcon
                sx={{ fontSize: "28px" }}
                onClick={() => setIsCartOpen(true)}
                className="cursor-pointer"
              />
            </div>
            <div className="">
              <MenuIcon
                sx={{ fontSize: "33px" }}
                onClick={toggleSidebar}
                className="cursor-pointer"
              />
            </div>
          </div>
        </div>

        {/* For Desktop View */}
        <div className="lg:flex hidden justify-between items-center h-[65px]">
          <div className="pl-7 flex items-center gap-2">
            <Link href={"/"}>
              <div className="flex items-center gap-[2px] md:text-[27px] text-[20px] font-semibold">
                <Image
                  src={`${blackNavbar ? "/white-logo.svg" : "/logo.svg"}`}
                  alt="xsnapster"
                  width={47}
                  height={30}
                />
                <div className="flex items-center">
                  <p className="">
                    <strong className="text-red-500">X</strong>SNAPSTER
                  </p>
                </div>
              </div>
            </Link>
            <div className="relative" onClick={toggleGender}>
              {/* Trigger */}
              <div className="flex justify-center items-center cursor-pointer">
                <Image
                  src={`${blackNavbar ? "/white-gender.svg" : "/gender.svg"}`}
                  width={25}
                  height={25}
                  alt="gender"
                />
                {isGenderOpen ? (
                  <KeyboardArrowUpIcon fontSize="small" />
                ) : (
                  <KeyboardArrowDownIcon fontSize="small" />
                )}
              </div>

              {/* Dropdown */}
              <div
                className={`
      absolute left-1/2 -translate-x-1/2 top-[110%]
      bg-[#333333] shadow-lg text-white
      rounded-lg overflow-hidden text-[14px] w-[110px]
      transform transition-all duration-300 z-50
      ${
        isGenderOpen
          ? "max-h-[300px] opacity-100 visible"
          : "max-h-0 opacity-0 invisible"
      }
    `}
              >
                <div className="flex flex-col p-3 space-y-2">
                  <Link
                    href={"/categories/for-him"}
                    className="hover:text-red-500 hover:cursor-pointer transition flex justify-center items-center"
                  >
                    <span>For Him</span>
                    <MaleIcon />
                  </Link>
                  <Link
                    href={"/categories/for-her"}
                    className="hover:text-red-500 hover:cursor-pointer transition flex justify-center items-center"
                  >
                    <span>For Her</span>
                    <FemaleIcon />
                  </Link>
                  <Link
                    href={"/categories/others"}
                    className="hover:text-red-500 hover:cursor-pointer transition flex justify-center items-center"
                  >
                    <span>Others</span>
                    <TransgenderIcon />
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div>
            <div>
              <ul className="flex items-center gap-6 relative">
                {/* ✅ Categories Dropdown */}
                <li
                  className="cursor-pointer relative"
                  onClick={toggleCategories}
                >
                  <span className="flex text-[14px] hover:text-red-500 items-center">
                    Categories
                    <sup className="text-red-600 text-[10px] animate-pulse p-[4px] rounded-xl">
                      New
                    </sup>
                    {isCategoriesOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                  </span>

                  {/* Dropdown Menu */}
                  <div
                    className={`${
                      blackNavbar
                        ? "bg-[#333333] text-white/80"
                        : "bg-white text-black"
                    } absolute z-20 left-0 top-[100%] shadow-lg border border-gray-200 rounded-lg overflow-hidden text-[15px] w-[250px] transform transition-all duration-300 ${
                      isCategoriesOpen
                        ? "max-h-[500px] mt-2 opacity-100 visible"
                        : "max-h-0 opacity-0 invisible"
                    }`}
                  >
                    {isLoading ? (
                      // 🔄 Loading State (Skeleton Chips)
                      <div className="text-center text-xl p-4">
                        <p>Loading...</p>
                      </div>
                    ) : (
                      <div className="flex flex-col p-4 space-y-3">
                        {data?.map((item) => (
                          <a
                            href={`/categories/${item.slug}`}
                            key={item.name}
                            className="flex items-end justify-between hover:text-red-500 transition-all duration-200"
                          >
                            <p className="text-[13px]">{item.name}</p>
                            <p className="text-[10px] text-red-600 animate-pulse">
                              {item.one_liner}
                            </p>
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                </li>

                {/* Other Menu Items */}
                {/* Help Center Dropdown */}
                <li
                  className="cursor-pointer relative"
                  onClick={toggleHelpCenter}
                >
                  <span className="flex text-[14px] hover:text-red-500 items-center gap-1">
                    Help Center
                    {isHelpCenterOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                  </span>

                  {/* Dropdown Menu */}
                  <div
                    className={`${
                      blackNavbar
                        ? "bg-[#333333] text-white/80"
                        : "bg-white text-black"
                    } absolute z-20 left-0 top-[100%] shadow-lg border border-gray-200 rounded-lg overflow-hidden text-[15px] w-[250px] transform transition-all duration-300 ${
                      isHelpCenterOpen
                        ? "max-h-[500px] mt-2 opacity-100 visible"
                        : "max-h-0 opacity-0 invisible"
                    }`}
                  >
                    <div className="flex flex-col p-4 space-y-2">
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
                            className="text-[13px]"
                          >
                            {item.name}
                          </Link>
                        </div>
                      ))}
                    </div>
                  </div>
                </li>

                <li>
                  <form onSubmit={searchItem} type="submit" action="submit">
                    <input
                      type="text"
                      value={mobileSearchTerm}
                      onChange={(e) => setMobileSearchTerm(e.target.value)}
                      placeholder="Search products"
                      className="border rounded-md px-2 w-[180px] h-[30px] py-2 focus:outline-none focus:ring-1 focus:ring-red-500"
                      autoFocus
                    />
                  </form>
                </li>

                <li
                  onClick={() => CheckLogin(toggle)}
                  className="
    flex items-center gap-2
    px-3 py-1
    bg-white
    border border-gray-200
    rounded-md
    shadow-sm
    cursor-pointer
    transition-all duration-200
    hover:bg-gray-50
    hover:shadow-md
    active:bg-gray-100
  "
                >
                  <PersonIcon className="text-gray-600 w-4 h-4" />

                  <span className="text-sm font-medium text-gray-700">
                    {user?.userEmail?.length > 13
                      ? user.userEmail.substring(0, 9) + "..."
                      : user?.userEmail}
                  </span>
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

        {/* Premium Links  */}
        <div
          className={`${
            blackNavbar ? "bg-white/30 text-white" : "bg-black text-white"
          }`}
        >
          <ul className="py-[5px] pl-5 pr-2 text-[13px] flex items-center gap-6 whitespace-nowrap justify-start overflow-x-auto scrollbar-hide ">
            <li className="text-red-600 animate-pulse font-semibold">
              <Link href={`/premium-categories/only-frames`}>• OnlyFrames</Link>
            </li>
            <li className=" text-amber-300">
              <Link
                className="flex items-center gap-[2px]"
                href={`/premium-categories/premium-frames`}
              >
                <PaidIcon fontSize="small" /> Premium Frames
              </Link>
            </li>
            <li>
              <Link href={`/premium-categories/sexy-frames`}>Sexy Frames</Link>
            </li>
            <li>
              <Link href={`/premium-categories/hot-right-now`}>
                Hot Right Now
              </Link>
            </li>
            <li>
              <Link href={`/premium-categories/frame-stars`}>Frame Stars</Link>
            </li>
            <li>
              <Link href={`/premium-categories/most-watched-frames`}>
                Most Watched Frames
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Search Bar */}
      {showMobileSearch && (
        <div
          className="lg:hidden px-2 pt-26 absolute bg-white w-full
      transition-all duration-300 ease-out
      animate-slide-down flex itme justify-start gap-3 p-2"
        >
          <form onSubmit={searchItem} type="submit" action="submit">
            <input
              value={mobileSearchTerm}
              onChange={(e) => setMobileSearchTerm(e.target.value)}
              placeholder="Search products"
              className="border rounded-md px-4 py-2 focus:outline-none focus:ring-1 focus:ring-red-500"
              autoFocus
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  // handle search submit here (e.g., navigate or call search)
                }
              }}
            />
          </form>
          <Button
            onClick={(e) => {
              searchItem(e);
            }}
            sx={{
              fontSize: "14px",
              bgcolor: "black",
              padding: "2px 2px",
            }}
            variant="contained"
            className="w-[95px] rounded-lg shadow-md text-xl font-semibold bg-black text-white hover:bg-gray-900 transition"
          >
            Search
          </Button>
        </div>
      )}

      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar Drawer */}
      <div
        className={`fixed top-0 left-0 h-full overflow-auto w-80 bg-[#333333] lg:hidden shadow-lg z-50 transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-[65px] justify-between items-center rounded-2xl bg-[#212121] m-3 p-2 border-b">
          <div className="flex items-center gap-[1px]">
            <Link
              href={"/"}
              className="h-[27px] font-playfair font-display weight-700 text-[20px] text-white/80 font-semibold pl-1"
            >
              <bold className="text-red-600">X</bold>SNAPSTER
            </Link>
          </div>
          <button className="text-white pr-1" onClick={toggleSidebar}>
            <CloseIcon />
          </button>
        </div>

        <div
          onClick={(e) => CheckLogin((toggle = true))}
          className="flex items-center h-[60px] p-2 pl-4 m-3 text-white/80 text-[13px] bg-[#212121] rounded-2xl gap-2"
        >
          <PersonIcon />
          <p>
            {user?.userEmail?.length > 13
              ? user.userEmail?.substring(0, 20) + "..."
              : user?.userEmail}
          </p>
        </div>

        <div
          onClick={toggleCategories}
          className="text-white/80 bg-[#212121] text-[13px] flex flex-col justify-center rounded-2xl m-3"
        >
          <div className="flex items-center justify-between cursor-pointer min-h-[60px] pl-5 pr-3">
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
              className={`overflow-auto text-[13px] transform transition-transform duration-300 ${
                isCategoriesOpen ? "max-h-68 mt-1" : "max-h-0"
              } m-4 flex flex-col space-y-5`}
            >
              {data?.map((item) => (
                <a
                  onClick={toggleSidebar}
                  href={`/categories/${item.slug}`}
                  key={item.id}
                  className="flex items-end justify-between border-b pb-3 pl-2"
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

        <div className="flex flex-col">
          <div className="flex-1 text-[13px] scrollbar-hide overflow-y-auto p-5 text-white/80 bg-[#212121] rounded-2xl m-3">
            <Link
              className="flex items-center justify-between h-[50px] border-b"
              onClick={toggleSidebar}
              href="/who-is-behind-the-camera"
            >
              Who's Behind the Camera?
            </Link>
            <Link
              href={"/reviews"}
              onClick={toggleSidebar}
              className="flex items-center justify-between h-[50px] border-b"
            >
              <p>Reviews</p>
            </Link>
            <Link
              href={"/track-order"}
              onClick={toggleSidebar}
              className="flex items-center justify-between h-[50px] border-b"
            >
              <p>Track Order</p>
            </Link>
            <Link
              href={"/help-center"}
              onClick={toggleSidebar}
              className="flex items-center justify-between h-[50px] border-b"
            >
              <p>Help Center</p>
            </Link>
            <Link
              href="/faqs"
              onClick={toggleSidebar}
              className="flex items-center justify-between h-[50px] border-b"
            >
              <p>FAQ's</p>
            </Link>
            <Link
              href={"/contact-us"}
              onClick={toggleSidebar}
              className="flex items-center justify-between h-[50px] border-b"
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
