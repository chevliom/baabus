// "use client";
// import React from "react";

// export default function OrderPage() {
//   const navLinks = [
//     { name: "Home", href: "/" },
//     { name: "Categories", href: "/categories" },
//     { name: "About", href: "/about" },
//     { name: "Contact Us", href: "/contact" },
//   ];

//   return (
//     <div className="bg-white text-gray-800">
//       {/* Header Background Banner */}
//       <div
//         className="text-center py-12"
//         style={{
//           backgroundImage: "url('/cart-bg.png')",
//           backgroundSize: "1440px 225px",
//           backgroundRepeat: "no-repeat",
//           backgroundPosition: "center top",
//         }}
//       >
//         <h1 className="text-5xl font-extrabold text-pink-500">Orders</h1>
//       </div>

//       <div className="min-h-screen font-sans text-gray-800">
//         {/* Header Section with Background */}
//         <div className="bg-[url('/bg.png')] bg-cover bg-center w-full">
//           {/* Logo + Navbar */}
//           <header className="max-w-7xl mx-auto flex items-center justify-between px-4 py-4 relative">
//             <img src="/cow.png" alt="Left Cow" className="hidden sm:block h-28" />
//             <div className="flex flex-col items-center text-center space-y-2 bg-pink-100 px-6 py-2 rounded-xl">
//               <img src="/logo.png" alt="Baabus Logo" className="h-10" />
//               <nav className="hidden md:flex gap-4">
//                 {navLinks.map((link, i) => (
//                   <a
//                     key={i}
//                     href={link.href}
//                     className="bg-pink-500 text-white px-4 py-1 rounded-full hover:bg-pink-600 transition"
//                   >
//                     {link.name}
//                   </a>
//                 ))}
//               </nav>
//             </div>
//             <img src="/cow.png" alt="Right Cow" className="hidden sm:block h-28" />
//           </header>

//           {/* Search + Icons */}
//           <div className="max-w-7xl mx-auto flex justify-center md:justify-end items-center gap-4 px-4 pb-4">
//             <input
//               type="text"
//               placeholder="Search..."
//               className="rounded-full px-4 py-1 text-sm border border-blue-300 w-64 outline-none"
//             />
//             <div className="flex items-center gap-3">
//               <div className="w-8 h-8 bg-pink-100 rounded-full border border-pink-300" />
//               <div className="w-8 h-8 bg-pink-100 rounded-full border border-pink-300" />
//               <div className="w-8 h-8 bg-yellow-200 rounded-full border border-yellow-300" />
//             </div>
//           </div>

//           <h1 className="text-5xl font-bold text-pink-500 text-center pb-6">Orders</h1>
//         </div>

//         {/* Main Content */}
//         <main className="max-w-3xl mx-auto px-4 py-8 border border-blue-400 rounded-md">
//           {/* Order Summary */}
//           <div className="bg-yellow-50 border border-yellow-200 rounded p-4 flex justify-between items-center mb-6">
//             <div>
//               <p className="text-sm text-gray-600 font-semibold">#96459761</p>
//               <p className="text-gray-700">
//                 4 Products · Order Placed in 17 Jan, 2021 at 7:32 PM
//               </p>
//             </div>
//             <p className="text-blue-600 font-semibold text-lg">Rs 1199.00</p>
//           </div>

//           {/* Estimated Delivery */}
//           <p className="text-sm text-gray-700 mb-4">
//             Order expected arrival <span className="font-semibold">23 Jan, 2025</span>
//           </p>

//           {/* Progress Bar */}
//           <div className="relative mb-10">
//             <img
//               src="/icons/clean-progress-bar.png"
//               alt="Progress Bar"
//               className="w-full h-auto"
//             />
//             <div className="absolute top-20 left-[-21px] right-15 w-full flex justify-between items-center px-15 mt-[-38px] space-x-4">
//               {[
//                 { icon: "orderplaced.png", label: "Order Placed", active: true },
//                 { icon: "packaging.png", label: "Packaging", active: true },
//                 { icon: "truck.png", label: "On The Road", active: false },
//                 { icon: "delievery.png", label: "Delivered", active: false },
//               ].map((step, idx) => (
//                 <div className="flex flex-col items-center w-1/4" key={idx}>
//                   <img
//                     src={`/icons/${step.icon}`}
//                     alt={step.label}
//                     className={`w-8 h-8 ${step.active ? "" : "opacity-50"}`}
//                   />
//                   <p
//                     className={`mt-1 text-sm font-semibold ${
//                       step.active ? "text-black" : "text-gray-500"
//                     }`}
//                   >
//                     {step.label}
//                   </p>
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* Order Activity */}
//           <div className="border-t border-blue-300 pt-6">
//             <h3 className="text-lg font-semibold mb-4">Order Activity</h3>
//             <ul className="space-y-4 text-sm text-gray-700">
//               {[
//                 {
//                   icon: "✅",
//                   message: "Your order has been delivered. Thank you for shopping at BAABUS!",
//                   time: "23 Jan, 2025 at 7:32 PM",
//                 },
//                 {
//                   icon: "🚚",
//                   message: "Our delivery man (John Wick) has picked-up your order for delivery.",
//                   time: "23 Jan, 2025 at 2:00 PM",
//                 },
//                 {
//                   icon: "📦",
//                   message: "Your order has reached at last mile hub.",
//                   time: "22 Jan, 2025 at 8:00 AM",
//                 },
//                 {
//                   icon: "🚛",
//                   message: "Your order on the way to (last mile) hub.",
//                   time: "21 Jan, 2025 at 5:32 AM",
//                 },
//                 {
//                   icon: "🛡️",
//                   message: "Your order is successfully verified.",
//                   time: "20 Jan, 2025 at 7:32 PM",
//                 },
//                 {
//                   icon: "📥",
//                   message: "Your order has been confirmed.",
//                   time: "19 Jan, 2025 at 2:31 PM",
//                 },
//               ].map((log, i) => (
//                 <li key={i} className="flex items-start gap-2">
//                   <span className="text-lg">{log.icon}</span>
//                   <div>
//                     <p className="font-medium">{log.message}</p>
//                     <p className="text-gray-500">{log.time}</p>
//                   </div>
//                 </li>
//               ))}
//             </ul>
//           </div>
//         </main>
//       </div>
//     </div>
//   );
// }
