"use client";
import React from "react";

export default function OrderPage() {
  const steps = [
    { label: "Order Placed", icon: "orderplaced.png", active: true },
    { label: "Packaging", icon: "packaging.png", active: true },
    { label: "On The Road", icon: "truck.png", active: false },
    { label: "Delivered", icon: "delievery.png", active: false },
  ];

  return (
    <div className="bg-white text-gray-800">
      {/* Header */}
      <div
        className="text-center py-180 bg-[url('/image1.png')] h-36 bg-no-repeat bg-center bg-cover"
        style={{ backgroundSize: "1520px 160px" }}
      >
        <div className="flex items-center justify-between max-w-7xl mx-auto px-1 h-32">
          <div className="hidden sm:flex items-center h-full">
            <img src="/cow.png" alt="Left Cow" className="h-28 object-contain" />
          </div>
          <h1 className="text-6xl font-extrabold font-baloo text-pink-500">Order</h1>
          <div className="hidden sm:flex items-center h-full">
            <img src="/cow.png" alt="Right Cow" className="h-28 object-contain" />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="min-h-screen font-sans text-gray-800">
        <main className="max-w-4xl mx-auto px-4 py-8">

          {/* Card Container Start */}
          <div className="border border-gray-300 rounded-lg shadow-sm overflow-hidden p-10 bg-white">

            {/* Order Info */}
            <div className="bg-yellow-50 border border-yellow-200 rounded p-4 flex justify-between items-center mb-6">
              <div>
                <p className="text-sm text-gray-600 font-semibold">#96459761</p>
                <p className="text-gray-700">
                  4 Products · Order Placed on 17 Jan, 2021 at 7:32 PM
                </p>
              </div>
              <p className="text-blue-600 text-lg">Rs 1199.00</p>
            </div>

            {/* Estimated Delivery */}
            <p className="text-sm text-gray-700 mb-4">
              Order expected arrival <span className="font-semibold">23 Jan, 2025</span>
            </p>

            {/* Static Image Progress Bar + Positioned Step Icons */}
            <div className="relative mb-10 ml-[80px]"> {/* ⬅️ Progress bar shifted right */}
              <img
                src="/icons/clean-progress-bar.png"
                alt="Progress Bar"
                className="w-50 h-[20px]"
              />

              {/* Positioned Steps */}
              <div className="absolute top-10 left-0 w-full h-300">
                {steps.map((step, index) => {
                  const positions = ["-5%", "23%", "50%", "78%"];
                  return (
                    <div
                      key={index}
                      className="absolute flex flex-col items-center"
                      style={{ left: positions[index] }}
                    >
                      <img
                        src={`/icons/${step.icon}`}
                        alt={step.label}
                        className={`w-8 h-8 ${step.active ? "" : "opacity-50"}`}
                      />
                      <p
                        className={`mt-2 text-sm  text-center ${
                          step.active ? "text-black" : "text-gray-500"
                        } ${step.label === "Order Placed" || step.label === "Packaging" ? "font-poppins" : ""}`}
                      >
                        {step.label}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Activity Log */}
            <div className="-mx-10 mt-28  border-t border-gray-300 pt-16">
              <h3 className="text-lg font-public sans text-left mb-5 ml-10 mt-[-20px]">Order Activity</h3>
              <ul className="space-y-6 text-sm text-gray-700 ml-10">
                {[ 
                  {
                    icon: "/icons/crt.png",
                    message: "Your order has been delivered. Thank you for shopping at BAABUS!",
                    time: "23 Jan, 2025 at 7:32 PM",
                  },
                  {
                    icon: "/icons/user.png",
                    message: "Our delivery man (John Wick) has picked-up your order for delivery.",
                    time: "23 Jan, 2025 at 2:00 PM",
                  },
                  {
                    icon: "/icons/location.png",
                    message: "Your order has reached at last mile hub.",
                    time: "22 Jan, 2025 at 8:00 AM",
                  },
                  {
                    icon: "/icons/map.png",
                    message: "Your order on the way to (last mile) hub.",
                    time: "21 Jan, 2025 at 5:32 AM",
                  },
                  {
                    icon: "/icons/success.png",
                    message: "Your order is successfully verified.",
                    time: "20 Jan, 2025 at 7:32 PM",
                  },
                  {
                    icon: "/icons/date1.png",
                    message: "Your order has been confirmed.",
                    time: "19 Jan, 2025 at 2:31 PM",
                  },
                ].map((log, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <img src={log.icon} alt="Order Step Icon" className="w-8 h-8 object-contain" />
                    <div>
                      <p className="font-medium">{log.message}</p>
                      <p className="text-gray-500">{log.time}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

          </div>
          {/* Card Container End */}

        </main>
      </div>
    </div>
  );
}
