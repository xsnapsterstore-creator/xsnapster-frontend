import React from "react";
import { useRouter } from "next/router";

export default function Alert({ open, title = "Alert", message, onClose }) {
  const router = useRouter();
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white w-[90%] max-w-sm rounded-lg shadow-xl p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">{title}</h3>

        <p className="text-sm text-gray-600 mb-6">{message}</p>

        <div className="flex justify-center">
          <button
            onClick={() => {
              onClose();
              router.reload();
            }}
            className="px-6 py-2 rounded-md bg-black text-white text-sm font-medium hover:bg-gray-900 active:scale-95 transition"
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );
}
