import { useEffect, useState } from "react";

export default function OfferPopup() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const seen = localStorage.getItem("offerPopupSeen");
    if (!seen) {
      setShow(true);
    }
  }, []);

  const handleClose = () => {
    localStorage.setItem("offerPopupSeen", "true");
    setShow(false);
  };

  if (!show) return null;

  return (
    <div className="fixed bottom-0 z-50 w-full flex items-end md:items-center justify-center md:justify-start">
      <div className="relative max-w-md w-full bg-[#333333] md:rounded-t-lg p-3 shadow-2xl animate-scaleIn">
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-1 right-2 cursor-pointer text-gray-300 hover:text-black text-xl"
        >
          ✕
        </button>

        {/* Content */}
        <h2 className="text-[13px] md:text-[15px] font-semibold text-gray-300 mb-2">
          🎁 SPECIAL OFFERS
        </h2>

        <div className="grid grid-cols-3 gap-2 text-center">
          <div className="bg-[#212121] rounded-lg py-2 px-3 shadow-sm">
            <p className="text-[10px] font-medium text-gray-400">
              Buy <span className="font-semibold text-gray-400">3 Frames</span>
            </p>
            <p className="text-[11px] text-red-600 italic animate-pulse font-semibold">
              Get 1 Frame Free
            </p>
          </div>

          <div className="bg-[#212121] rounded-lg py-2 px-3 shadow-sm">
            <p className="text-[10px] font-medium text-gray-400">
              Buy <span className="font-semibold text-gray-400">6 Frames</span>
            </p>
            <p className="text-[11px] text-red-600 italic animate-pulse font-semibold">
              Get 2 Frames Free
            </p>
          </div>

          <div className="bg-[#212121] rounded-lg py-2 px-3 shadow-sm">
            <p className="text-[10px] font-medium text-gray-400">
              Buy <span className="font-semibold text-gray-400">9 Frames</span>
            </p>
            <p className="text-[11px] text-red-600 italic animate-pulse font-semibold">
              Get 3 Frames Free
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
