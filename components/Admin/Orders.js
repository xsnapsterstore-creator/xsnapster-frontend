import React from "react";

const Orders = () => {
  // Dummy data (replace with API data later)
  const orders = [
    {
      id: "ORD-10231",
      customer: "Amit Sharma",
      email: "amit@gmail.com",
      amount: 2499,
      status: "Delivered",
      date: "2025-01-15",
    },
    {
      id: "ORD-10232",
      customer: "Neha Verma",
      email: "neha@gmail.com",
      amount: 1799,
      status: "Shipped",
      date: "2025-01-16",
    },
    {
      id: "ORD-10233",
      customer: "Rahul Singh",
      email: "rahul@gmail.com",
      amount: 999,
      status: "Pending",
      date: "2025-01-16",
    },
    {
      id: "ORD-10283",
      customer: "Manoj Singh",
      email: "manoj@gmail.com",
      amount: 999,
      status: "Cancelled",
      date: "2025-01-16",
    },
  ];

  const statusStyles = {
    Delivered: "bg-green-100 text-green-700",
    Shipped: "bg-blue-100 text-blue-700",
    Pending: "bg-yellow-100 text-yellow-700",
    Cancelled: "bg-red-100 text-red-700",
  };

  return (
    <div className="p-6 bg-gray-50 rounded-xl shadow-sm border border-gray-200 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Orders</h1>
          <p className="text-sm text-gray-500 mt-1">
            Manage and track customer orders
          </p>
        </div>

        <button className="px-4 py-2 bg-black text-white rounded-lg text-sm hover:bg-gray-800 transition">
          Export Orders
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 mb-6 flex flex-col md:flex-row gap-4">
        <input
          type="text"
          placeholder="Search by Order ID / Customer"
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-black"
        />

        <select className="px-4 py-2 border border-gray-300 rounded-lg text-sm">
          <option>All Status</option>
          <option>Delivered</option>
          <option>Shipped</option>
          <option>Pending</option>
          <option>Cancelled</option>
        </select>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-100 text-gray-600">
            <tr>
              <th className="text-left px-5 py-3 font-medium">Order ID</th>
              <th className="text-left px-5 py-3 font-medium">Customer</th>
              <th className="text-left px-5 py-3 font-medium">Date</th>
              <th className="text-left px-5 py-3 font-medium">Amount</th>
              <th className="text-left px-5 py-3 font-medium">Status</th>
              <th className="text-right px-5 py-3 font-medium">Action</th>
            </tr>
          </thead>

          <tbody>
            {orders.map((order) => (
              <tr
                key={order.id}
                className="border-t hover:bg-gray-50 transition"
              >
                <td className="px-5 py-4 font-medium text-gray-900">
                  {order.id}
                </td>

                <td className="px-5 py-4">
                  <p className="font-medium text-gray-800">{order.customer}</p>
                  <p className="text-xs text-gray-500">{order.email}</p>
                </td>

                <td className="px-5 py-4 text-gray-600">{order.date}</td>

                <td className="px-5 py-4 font-semibold text-gray-900">
                  ₹{order.amount}
                </td>

                <td className="px-5 py-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      statusStyles[order.status]
                    }`}
                  >
                    {order.status}
                  </span>
                </td>

                <td className="px-5 py-4 text-right">
                  <button className="text-blue-600 text-sm hover:underline mr-3">
                    View
                  </button>
                  <button className="text-red-500 text-sm hover:underline">
                    Cancel
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Orders;
