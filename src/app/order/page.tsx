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
        className="text-center py-150 bg-[url('/image1.png')] bg-no-repeat bg-center bg-cover"
        style={{ backgroundSize: "1420px 150px" }}
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
          {/* Order Info */}
          <div className="bg-yellow-50 border border-yellow-200 rounded p-4 flex justify-between items-center mb-6">
            <div>
              <p className="text-sm text-gray-600 font-semibold">#96459761</p>
              <p className="text-gray-700">
                4 Products · Order Placed on 17 Jan, 2021 at 7:32 PM
              </p>
            </div>
            <p className="text-blue-600 font-semibold text-lg">Rs 1199.00</p>
          </div>

          {/* Estimated Delivery */}
          <p className="text-sm text-gray-700 mb-4">
            Order expected arrival <span className="font-semibold">23 Jan, 2025</span>
          </p>

          {/* Static Image Progress Bar + Positioned Step Icons */}
          <div className="relative mb-10">
            {/* Progress Bar */}
            <img
              src="/icons/clean-progress-bar.png"
              alt="Progress Bar"
              className="w-full h-[30px]"
            />

            {/* Positioned Steps */}
            <div className="absolute top-10 left-0 w-full h-300">
              {/* Order Placed */}
              <div className="absolute left-[-4%] flex flex-col items-center">
                <img
                  src={`/icons/${steps[0].icon}`}
                  alt={steps[0].label}
                  className={`w-8 h-8 ${steps[0].active ? "" : "opacity-50"}`}
                />
                <p className={`mt-2 text-sm font-semibold text-center ${steps[0].active ? "text-black" : "text-gray-500"}`}>
                  {steps[0].label}
                </p>
              </div>

              {/* Packaging */}
              <div className="absolute left-[29%] flex flex-col items-center">
                <img
                  src={`/icons/${steps[1].icon}`}
                  alt={steps[1].label}
                  className={`w-8 h-8 ${steps[1].active ? "" : "opacity-50"}`}
                />
                <p className={`mt-2 text-sm font-semibold text-center ${steps[1].active ? "text-black" : "text-gray-500"}`}>
                  {steps[1].label}
                </p>
              </div>

              {/* On The Road */}
              <div className="absolute left-[61%] flex flex-col items-center">
                <img
                  src={`/icons/${steps[2].icon}`}
                  alt={steps[2].label}
                  className={`w-8 h-8 ${steps[2].active ? "" : "opacity-50"}`}
                />
                <p className={`mt-2 text-sm font-semibold text-center ${steps[2].active ? "text-black" : "text-gray-500"}`}>
                  {steps[2].label}
                </p>
              </div>

              {/* Delivered */}
              <div className="absolute left-[95%] flex flex-col items-center">
                <img
                  src={`/icons/${steps[3].icon}`}
                  alt={steps[3].label}
                  className={`w-8 h-8 ${steps[3].active ? "" : "opacity-50"}`}
                />
                <p className={`mt-2 text-sm font-semibold text-center ${steps[3].active ? "text-black" : "text-gray-500"}`}>
                  {steps[3].label}
                </p>
              </div>
            </div>
          </div>

          {/* Activity Log */}
          <div className="pt-20 -ml-20 px-2">
  <h3 className="text-lg font-semibold text-left mb-4">Order Activity</h3>
  <ul className="space-y-5 text-sm text-gray-700">
  {[
    {
      icon: "/icons/crt.png", // Path to image in public/icons
      message: "Your order has been delivered. Thank you for shopping at BAABUS!",
      time: "23 Jan, 2025 at 7:32 PM",
    },
    {
      icon: "/icons/user.png", // Path to image in public/icons
      message: "Our delivery man (John Wick) has picked-up your order for delivery.",
      time: "23 Jan, 2025 at 2:00 PM",
    },
    {
      icon: "/icons/location.png", // Path to image in public/icons
      message: "Your order has reached at last mile hub.",
      time: "22 Jan, 2025 at 8:00 AM",
    },
    {
      icon: "/icons/map.png", // Path to image in public/icons
      message: "Your order on the way to (last mile) hub.",
      time: "21 Jan, 2025 at 5:32 AM",
    },
    {
      icon: "/icons/success.png", // Path to image in public/icons
      message: "Your order is successfully verified.",
      time: "20 Jan, 2025 at 7:32 PM",
    },
    {
      icon: "/icons/date1.png", // Path to image in public/icons
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
        </main>
      </div>
    </div>
  );
}
