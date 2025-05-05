import Image from 'next/image';
import Link from 'next/link';

export default function OrderSuccessPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 text-center bg-white font-poppins">
      {/* Image */}
      <div className="w-64 h-64 relative mb-6">
        <Image
          src="/icons/cloud.png"
          alt="Success Emoji"
          fill
          className="object-contain"
        />
      </div>

      {/* Content */}
      <div className="flex flex-col items-center space-y-4 max-w-xl">
        <h1 className="text-2xl md:text-3xl font-semibold text-gray-900">
          Your order is successfully placed
        </h1>

        <p className="text-gray-500 text-base whitespace-nowrap">
          Pellentesque sed lectus nec tortor tristique accumsan quis dictum risus. Donec volutpat mollis nulla non facilisis.
        </p>

         {/* Buttons Section with top spacing */}
         <div className="flex flex-col sm:flex-row gap-6 justify-center mt-12">
          <Link href="/dashboard">
            <button
              className="flex items-center justify-center gap-2 px-5 py-2 rounded hover:bg-pink-50 transition font-publicsans uppercase font-semibold text-sm"
              style={{ border: '2px solid #FFE7D6', color: '#EC4899' }}
            >
              <Image
                src="/icons/dashboard-icon.png"
                alt="Dashboard Icon"
                width={20}
                height={20}
              />
              Go to Dashboard
            </button>
          </Link>

          <Link href="/orders/123">
            <button className="bg-pink-600 text-white px-5 py-2 rounded hover:bg-pink-700 transition font-publicsans uppercase font-semibold text-sm">
              View Order →
            </button>
          </Link>
        {/* </div> */}
        </div>
      </div>
    </div>
  );
}
