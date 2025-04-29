import CategoryList from '@/components/frontend/landing/CategoryList';
import CommunityTrainings from '@/components/frontend/landing/CommunityTrainings';
import FeaturedProducts from '@/components/frontend/landing/FeaturedProducts';
import MarketList from '@/components/frontend/landing/MarketList';
import Hero from '@/components/frontend/layout/Hero';
import { getData } from '@/lib/getData';
import { isCategoryArray, isTrainingArray } from '@repo/types';
import { ArrowRight, Leaf, ShoppingBasket, Sprout } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const Home = async () => {
  const categoriesData = await getData('categories?include=products');
  let categories = null;

  if (!isCategoryArray(categoriesData)) {
    categories = null;
  } else {
    categories = categoriesData;
  }

  const trainingData = await getData('trainings');
  let trainings = null;

  if (!isTrainingArray(trainingData)) {
    trainings = null;
  } else {
    trainings = trainingData;
  }

  // Get featured products
  const featuredProductsData = await getData('products?featured=true&limit=8');
  const featuredProducts = featuredProductsData?.data || [];

  return (
    <div className="min-h-screen space-y-16">
      {/* Hero section */}
      <section className="mb-6 bg-gradient-to-b from-green-50/50 to-transparent dark:from-slate-900/50 dark:to-transparent pt-4 pb-8">
        <div className="container mx-auto px-4">
          <Hero />
        </div>
      </section>

      {/* Featured Products Section - New Addition */}
      {featuredProducts && featuredProducts.length > 0 && (
        <section className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white">
                Featured Products
              </h2>
              <p className="text-slate-600 dark:text-slate-300">
                Handpicked fresh produce and organic items for you
              </p>
            </div>
            <Link
              href="/products"
              className="inline-flex items-center text-sm font-medium text-lime-600 dark:text-lime-400 hover:text-lime-700 dark:hover:text-lime-300"
            >
              View All
              <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </div>
          <FeaturedProducts products={featuredProducts} />
        </section>
      )}

      {/* Markets carousel section */}
      <section className="container mx-auto px-4 py-8 bg-slate-50 dark:bg-slate-800/30 rounded-xl">
        <MarketList />
      </section>

      {/* Featured categories section */}
      <section className="container mx-auto px-4">
        <div className="mb-8 text-center">
          <div className="inline-flex items-center mb-3 bg-lime-100 dark:bg-lime-900/40 px-3 py-1 rounded-full">
            <ShoppingBasket className="h-4 w-4 text-lime-600 dark:text-lime-400 mr-2" />
            <span className="text-xs font-medium text-slate-700 dark:text-slate-200">
              Fresh Categories
            </span>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-3">
            Shop By Categories
          </h2>
          <p className="text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
            Explore our wide range of fresh and organic products sorted by
            categories
          </p>
        </div>

        <div className="space-y-10">
          {categories &&
            categories.length > 0 &&
            categories.map((category) => (
              <div
                key={category.id}
                className="pb-8 border-b border-slate-200 dark:border-slate-700 last:border-0"
              >
                <CategoryList category={category} />
              </div>
            ))}
        </div>
      </section>

      {/* Community trainings section */}
      {trainings && trainings.length > 0 && (
        <section className="container mx-auto px-4 py-8 bg-gradient-to-br from-green-50 to-lime-50 dark:from-slate-800 dark:to-slate-800/60 rounded-xl">
          <CommunityTrainings
            title="Latest Farming Insights"
            trainings={trainings.slice(0, 3)}
          />
        </section>
      )}

      {/* Farmer CTA section */}
      <section className="container mx-auto px-4 my-16">
        <div className="bg-gradient-to-r from-lime-50 to-green-50 dark:from-slate-800 dark:to-slate-700 rounded-xl shadow-md overflow-hidden border border-lime-100 dark:border-slate-700">
          <div className="px-6 py-10 md:p-10 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex-1">
              <div className="inline-flex items-center mb-3 bg-white dark:bg-slate-600 px-3 py-1 rounded-full">
                <Leaf className="h-4 w-4 text-lime-600 dark:text-lime-400 mr-2" />
                <span className="text-xs font-medium text-slate-700 dark:text-slate-100">
                  Join our farming community
                </span>
              </div>

              <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-4">
                Become a Farmer, Vendor or Supplier
              </h2>

              <p className="text-slate-600 dark:text-slate-300 mb-6 max-w-lg">
                Join our growing community of farmers and suppliers. Get access
                to a wider market, connect with customers directly, and grow
                your agricultural business.
              </p>

              <Link
                href="/register-farmer"
                className="inline-flex items-center px-6 py-3 bg-lime-600 hover:bg-lime-700 transition-colors text-white rounded-lg shadow-sm"
              >
                <Sprout className="mr-2 h-5 w-5" />
                <span className="font-medium">Register as a Farmer</span>
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>

            <div className="md:w-1/3 relative">
              <div className="bg-white dark:bg-slate-700 p-3 rounded-lg shadow-lg transform rotate-3 max-w-xs mx-auto">
                <Image
                  src="/images/tometo.webp"
                  alt="Fresh produce"
                  width={300}
                  height={200}
                  className="rounded-md object-cover aspect-video"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
