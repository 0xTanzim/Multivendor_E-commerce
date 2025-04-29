import Link from 'next/link';

const EmptyCart = () => {
  return (
    <div className="flex flex-col items-center justify-center h-96 text-center">
      <h2 className="text-3xl font-bold text-slate-500">Your cart is empty</h2>
      <p className="text-slate-400 mt-2">
        Add items to your cart and they will appear here.
      </p>

      <Link
        href="/products"
        className="mt-6 bg-lime-600 text-white px-6 py-3 rounded-lg text-lg font-medium transition-all duration-300 hover:bg-lime-700 focus:ring-2 focus:ring-lime-500 focus:outline-none"
        aria-label="Start shopping"
      >
        Start Shopping
      </Link>
    </div>
  );
};

export default EmptyCart;
