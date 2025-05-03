// pages/wishlist.tsx
import React from 'react';

const WishlistPage = () => {
  const wishlistItems = [
    { id: 1, name: 'Bus Bottle', price: '₹14.99', oldPrice: '₹20.00', stock: 'In Stock', urgency: '1 item left. Hurry!' },
    { id: 2, name: 'Bus Bottle', price: '₹45.00', stock: 'In Stock' },
    { id: 3, name: 'Bus Bottle', price: '₹69.00', stock: 'Out of Stock' },
  ];

  return (
    <main className="bg-blue-50 min-h-screen px-4 py-10">
      <div className="max-w-5xl mx-auto bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-4xl font-bold text-pink-500 text-center mb-8">Wishlist</h1>
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="text-gray-600 border-b">
              <th className="pb-4">Product</th>
              <th className="pb-4">Price</th>
              <th className="pb-4">Stock Status</th>
              <th className="pb-4">Action</th>
            </tr>
          </thead>
          <tbody>
            {wishlistItems.map((item) => (
              <tr key={item.id} className="border-b py-4">
                <td className="py-4">
                  <div className="flex items-center gap-4">
                    <img src="/icon.png" alt={item.name} className="w-16 h-16 rounded-lg border" />
                    <div>
                      <div className="font-medium">{item.name}</div>
                      {item.urgency && (
                        <div className="text-sm text-green-600">{item.urgency}</div>
                      )}
                    </div>
                  </div>
                </td>
                <td className="py-4">
                  <span className="font-semibold text-gray-800">{item.price}</span>
                  {item.oldPrice && (
                    <span className="text-gray-400 line-through ml-2">{item.oldPrice}</span>
                  )}
                </td>
                <td className="py-4">
                  <span
                    className={`text-sm px-2 py-1 rounded-full font-medium ${
                      item.stock === 'In Stock'
                        ? 'bg-pink-100 text-pink-600'
                        : 'bg-gray-200 text-gray-600'
                    }`}
                  >
                    {item.stock}
                  </span>
                </td>
                <td className="py-4">
                  <button
                    className={`px-4 py-2 rounded-md text-sm font-semibold ${
                      item.stock === 'In Stock'
                        ? 'bg-pink-500 text-white hover:bg-pink-600'
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                    disabled={item.stock !== 'In Stock'}
                  >
                    Add to Cart
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="text-sm text-red-500 mt-6 font-semibold text-center">
          Love it? Someone else does too! Buy before it’s too late.
        </div>

        <div className="text-center mt-6">
          <button className="px-6 py-2 bg-gray-100 rounded-md hover:bg-gray-200 text-sm font-medium text-gray-800">
            Explore More
          </button>
        </div>
      </div>
    </main>
  );
};

export default WishlistPage;
