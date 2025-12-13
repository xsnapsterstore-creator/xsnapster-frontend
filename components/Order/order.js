import React from "react";

const Order = () => {
  return (
    <div className="mt-12">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">
        Order History
      </h2>

      {userData.orders.length === 0 ? (
        // EMPTY UI
        <div className="bg-white rounded-2xl shadow-md p-8 flex flex-col items-center text-center border border-gray-200">
          <div className="w-24 h-24 bg-gray-100 flex items-center justify-center rounded-full">
            <Image
              src="/logo.svg"
              alt="Empty"
              width={100}
              height={100}
              className="w-14 h-14 opacity-70"
            />
          </div>

          <h3 className="text-lg font-semibold text-gray-800 mt-4">
            No Orders Found
          </h3>

          <p className="text-gray-500 text-sm mt-2">
            You have not placed any orders yet. Start shopping and explore our
            collections!
          </p>

          <button
            onClick={() => router.push("/")}
            className="mt-5 px-6 py-3 cursor-pointer bg-black text-white rounded-xl text-sm font-medium active:scale-95 transition"
          >
            Browse Products
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {userData.orders.map((order) => {
            const isOpen = openOrder === order.id;

            return (
              <div
                key={order.id}
                className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm"
              >
                <div className="flex justify-between items-center">
                  <p className="text-sm text-gray-500">Order ID</p>

                  <span
                    className={`px-3 py-1 text-xs rounded-full font-medium ${
                      order.order_status === "Delivered"
                        ? "bg-green-100 text-green-700"
                        : order.order_status === "Shipped"
                        ? "bg-blue-100 text-blue-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {order.status}
                  </span>
                </div>

                <p className="font-semibold text-gray-900 mt-1">{order.id}</p>

                <div className="mt-3 space-y-1 text-sm">
                  <p className="text-gray-600">
                    <span className="font-medium text-gray-800">Date:</span>{" "}
                    {order.created_at}
                  </p>
                  <p className="text-gray-600">
                    <span className="font-medium text-gray-800">Items:</span>{" "}
                    {order.total_items}
                  </p>
                </div>

                <div className="mt-4 flex justify-between items-center">
                  <p className="font-semibold text-gray-900 text-lg">
                    ₹{order.paid_amount}
                  </p>

                  <button
                    onClick={() => toggleOrder(order.id)}
                    className="text-blue-600 cursor-pointer text-sm font-medium hover:underline"
                  >
                    {isOpen ? "Hide Details" : "View Details"}
                  </button>
                </div>

                {/* Expandable Section */}
                <div
                  className={`transition-all duration-300 overflow-hidden ${
                    isOpen ? "max-h-[500px] mt-4" : "max-h-0"
                  }`}
                >
                  {/* Product List */}
                  <div className="bg-gray-50 p-4 rounded-xl space-y-4">
                    {order.product_ids.map((product) => (
                      <div
                        key={product}
                        className="flex items-center gap-4 border-b pb-3 last:border-none"
                      >
                        <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center">
                          <Image
                            src="/logo.svg"
                            alt="Product"
                            width={50}
                            height={50}
                            className="w-full h-full object-cover rounded-lg"
                          />
                        </div>

                        <div className="flex-1">
                          <p className="font-semibold text-gray-800 text-sm">
                            {product}
                          </p>
                          <p className="text-gray-600 text-xs mt-1">
                            Price: ₹{product}
                          </p>
                        </div>
                      </div>
                    ))}

                    <div className="pt-2">
                      <p className="text-gray-700 font-semibold text-right">
                        Total Amount: ₹{order.total_cost}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Order;
