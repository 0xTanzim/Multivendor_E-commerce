import { Facebook, Github, Instagram, Twitter } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <section className="py-10 bg-gray-50 dark:bg-slate-900 sm:pt-16 lg:pt-24">
      <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
        <div className="grid grid-cols-2 md:col-span-3 lg:grid-cols-6 gap-y-16 gap-x-12">
          <div className="col-span-2 md:col-span-3 lg:col-span-2 lg:pr-8">
            <Image
              className="w-auto h-12"
              src="/images/logo.png"
              alt="MindFuel"
              width={150}
              height={50}
            />

            <p className="text-base leading-relaxed text-gray-600 dark:text-gray-300 mt-7">
              Your trusted marketplace for fresh, local produce. Connect with
              farmers and discover the best organic products delivered right to
              your door.
            </p>

            <ul className="flex items-center space-x-3 mt-9">
              <li>
                <Link
                  href="#"
                  className="flex items-center justify-center text-white transition-all duration-200 bg-gray-800 dark:bg-gray-700 rounded-full w-8 h-8 hover:bg-lime-600 dark:hover:bg-lime-600"
                >
                  <Twitter className="w-4 h-4" />
                </Link>
              </li>

              <li>
                <Link
                  href="#"
                  className="flex items-center justify-center text-white transition-all duration-200 bg-gray-800 dark:bg-gray-700 rounded-full w-8 h-8 hover:bg-lime-600 dark:hover:bg-lime-600"
                >
                  <Facebook className="w-4 h-4" />
                </Link>
              </li>

              <li>
                <Link
                  href="#"
                  className="flex items-center justify-center text-white transition-all duration-200 bg-gray-800 dark:bg-gray-700 rounded-full w-8 h-8 hover:bg-lime-600 dark:hover:bg-lime-600"
                >
                  <Instagram className="w-4 h-4" />
                </Link>
              </li>

              <li>
                <Link
                  href="#"
                  className="flex items-center justify-center text-white transition-all duration-200 bg-gray-800 dark:bg-gray-700 rounded-full w-8 h-8 hover:bg-lime-600 dark:hover:bg-lime-600"
                >
                  <Github className="w-4 h-4" />
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <p className="text-sm font-semibold tracking-widest text-gray-400 dark:text-gray-400 uppercase">
              Company
            </p>

            <ul className="mt-6 space-y-4">
              <li>
                <Link
                  href="/about"
                  className="flex text-base text-gray-800 dark:text-gray-200 transition-all duration-200 hover:text-lime-600 dark:hover:text-lime-400"
                >
                  About Us
                </Link>
              </li>

              <li>
                <Link
                  href="/markets"
                  className="flex text-base text-gray-800 dark:text-gray-200 transition-all duration-200 hover:text-lime-600 dark:hover:text-lime-400"
                >
                  Our Markets
                </Link>
              </li>

              <li>
                <Link
                  href="/blogs"
                  className="flex text-base text-gray-800 dark:text-gray-200 transition-all duration-200 hover:text-lime-600 dark:hover:text-lime-400"
                >
                  Blog
                </Link>
              </li>

              <li>
                <Link
                  href="/farmer-pricing"
                  className="flex text-base text-gray-800 dark:text-gray-200 transition-all duration-200 hover:text-lime-600 dark:hover:text-lime-400"
                >
                  Become a Seller
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <p className="text-sm font-semibold tracking-widest text-gray-400 dark:text-gray-400 uppercase">
              Help
            </p>

            <ul className="mt-6 space-y-4">
              <li>
                <Link
                  href="/contact"
                  className="flex text-base text-gray-800 dark:text-gray-200 transition-all duration-200 hover:text-lime-600 dark:hover:text-lime-400"
                >
                  Customer Support
                </Link>
              </li>

              <li>
                <Link
                  href="/delivery"
                  className="flex text-base text-gray-800 dark:text-gray-200 transition-all duration-200 hover:text-lime-600 dark:hover:text-lime-400"
                >
                  Delivery Details
                </Link>
              </li>

              <li>
                <Link
                  href="/terms"
                  className="flex text-base text-gray-800 dark:text-gray-200 transition-all duration-200 hover:text-lime-600 dark:hover:text-lime-400"
                >
                  Terms & Conditions
                </Link>
              </li>

              <li>
                <Link
                  href="/privacy"
                  className="flex text-base text-gray-800 dark:text-gray-200 transition-all duration-200 hover:text-lime-600 dark:hover:text-lime-400"
                >
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          <div className="col-span-2 md:col-span-1 lg:col-span-2 lg:pl-8">
            <p className="text-sm font-semibold tracking-widest text-gray-400 dark:text-gray-400 uppercase">
              Subscribe to newsletter
            </p>

            <form action="#" method="POST" className="mt-6">
              <div>
                <label htmlFor="email" className="sr-only">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Enter your email"
                  className="block w-full p-4 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-all duration-200 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-md focus:outline-none focus:border-lime-600 dark:focus:border-lime-400 caret-lime-600"
                />
              </div>

              <button
                type="submit"
                className="inline-flex items-center justify-center px-6 py-4 mt-3 font-semibold text-white transition-all duration-200 bg-lime-600 rounded-md hover:bg-lime-700 focus:bg-lime-700 dark:bg-lime-600 dark:hover:bg-lime-700"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <hr className="mt-16 mb-10 border-gray-200 dark:border-gray-700" />

        <p className="text-sm text-center text-gray-600 dark:text-gray-400">
          © Copyright {currentYear}, All Rights Reserved by MindFuel
        </p>
      </div>
    </section>
  );
};
export default Footer;
