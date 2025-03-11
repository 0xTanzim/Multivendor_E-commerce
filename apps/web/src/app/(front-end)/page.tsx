import CategoryList from '@/components/frontend/landing/CategoryList';
import CommunityTrainings from '@/components/frontend/landing/CommunityTrainings';
import MarketList from '@/components/frontend/landing/MarketList';
import Hero from '@/components/frontend/layout/Hero';
import Link from 'next/link';

const Home = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      <MarketList />
      
      <div className="py-12">
        <CategoryList />
      </div>

      <div className="py-12">
        <CategoryList />
      </div>

      <div className="py-12">
        <CategoryList />
      </div>

      <CommunityTrainings />

      <Link className="my-4 underline " href={'/register-farmer'}>
        Become a Farmer/Vendor/Supplier
      </Link>
    </div>
  );
};

export default Home;
