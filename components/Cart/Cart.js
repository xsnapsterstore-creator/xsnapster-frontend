import React from "react";
import Image from "next/image";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
} from "../store/cartSlice";
import GppGoodIcon from "@mui/icons-material/GppGood";

const Cart = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.items);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    // Cleanup on unmount
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  const checkout = async () => {
    onClose();
    window.location.href = "/login";
  };

  async function GoToProd(id, category, subcategory) {
    const categ = category
      ? category.trim().replace(/\s+/g, "-").toLowerCase()
      : "";
    const subcateg = subcategory
      ? subcategory.trim().replace(/\s+/g, "-").toLowerCase()
      : "";
    onClose();
    window.location.href = `/categories/${categ}/${subcateg}/${id}`;
  }

  const tot = cart.map((item) => item.price);
  const total = tot.reduce((sum, item) => sum + item, 0);

  return (
    <div
      className={`fixed top-0 right-0 h-full w-80 bg-gray-900 shadow-lg z-50 transform transition-transform duration-300 ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      {/* Header */}
      <div className="flex h-[65px] justify-between items-center text-white p-4 border-b">
        <h2 className="text-lg font-bold">Your Walls's Wish List</h2>
        <button onClick={onClose} className="text-xl font-bold">
          ✕
        </button>
      </div>

      {cart.length === 0 && (
        <div className="flex flex-col justify-center items-center h-[calc(100%-65px)] text-center px-4">
          {/* Content */}
          <h2 className="text-2xl font-semibold text-white tracking-wide">
            Your Cart is Empty
          </h2>
          <p className="text-gray-400 mt-2 text-sm">
            Looks like you haven’t added anything yet.
          </p>
        </div>
      )}

      {/* Cart Content (flex column with scrollable items) */}
      <div className="flex flex-col h-[calc(100vh-65px)] text-white bg-grey-900">
        {/* Cart Header */}
        <div className="p-4 border-b border-neutral-800 flex justify-between items-center">
          <h2 className="text-lg font-semibold">Your Cart</h2>
          <p className="text-sm text-gray-400">{cart.length || 0} items</p>
        </div>

        {/* Scrollable Items */}
        <div className="flex-1 overflow-y-auto scrollbar-hide p-4 space-y-5">
          {cart.map((item, index) => (
            <div
              onClick={(e) =>
                GoToProd(item.id, item.category, item.subcategory)
              }
              key={Math.random()}
              className="flex  items-center justify-between cursor-pointer bg-neutral-600 hover:bg-neutral-800 transition-colors rounded-xl p-3 shadow-sm"
            >
              {/* Product Image */}
              <div className="flex items-center gap-2">
                <img
                  className="h-[70px] w-[70px] object-cover rounded-lg"
                  src={item.image_link}
                  width={70}
                  height={70}
                  alt={item.title}
                />
                <div>
                  <h3 className="text-sm font-medium line-clamp-2 text-gray-100">
                    {item.title}
                  </h3>
                  <div className="flex items-end gap-2 mt-1">
                    <p className="text-green-400 font-semibold text-sm animate-pulse">
                      ₹{item.price}
                    </p>
                    <p className="line-through text-gray-500 text-xs">₹699</p>
                  </div>
                </div>
              </div>

              {/* Quantity / Remove */}
              <div className="flex flex-col items-center gap-2">
                <div className="text-center">
                  <div className="flex items-center gap-1 border rounded-lg bg-gray-300">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        dispatch(
                          decreaseQuantity({
                            id: item.id,
                            dimensions: item.dimensions,
                          })
                        );
                      }}
                      className="w-[25px] flex justify-center text-lg font-semibold text-gray-700 hover:text-black active:scale-90 transition"
                    >
                      -
                    </button>

                    <span className="font-semibold text-xs w-[15px] text-gray-900">
                      {item.quantity || 1}
                    </span>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        dispatch(
                          increaseQuantity({
                            id: item.id,
                            dimensions: item.dimensions,
                          })
                        );
                      }}
                      className="w-[25px] flex justify-center text-lg font-semibold text-gray-700 hover:text-black active:scale-90 transition"
                    >
                      +
                    </button>
                  </div>
                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    dispatch(
                      removeFromCart({
                        id: item.id,
                        dimensions: item.dimensions,
                      })
                    );
                  }}
                  className="bg-neutral-800 px-4 py-1.5 rounded-md text-xs hover:bg-red-600 transition"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Footer / Checkout (sticky) */}
        <div className="p-4 border-t border-neutral-800 bg-grey-900 backdrop-blur-md sticky bottom-0">
          <div className="flex gap-3 justify-between items-center mb-3">
            <GppGoodIcon fontSize="small" />
            <p className="text-xs">
              Safe and Secure Payments. Easy Returns. 100% Authentic Products
            </p>
          </div>
          <div className="flex justify-between mb-3 text-sm">
            <span className="text-gray-400">Total</span>
            <span className="font-semibold">₹{total}</span>
          </div>
          <button
            onClick={checkout}
            className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white py-2 rounded-lg font-semibold transition-all duration-300 shadow-md"
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
