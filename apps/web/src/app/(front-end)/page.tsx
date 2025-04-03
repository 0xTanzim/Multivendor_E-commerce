import CategoryList from '@/components/frontend/landing/CategoryList';
import CommunityTrainings from '@/components/frontend/landing/CommunityTrainings';
import MarketList from '@/components/frontend/landing/MarketList';
import Hero from '@/components/frontend/layout/Hero';
import { getData } from '@/lib/getData';
import { isCategoryArray, isTrainingArray } from '@repo/types';
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

  return (
    <div className="min-h-screen">
      <Hero />
      <MarketList />

      {categories &&
        categories.length > 0 &&
        categories.map((category) => (
          <div className="py-12" key={category.id}>
            <CategoryList category={category}  />
          </div>
        ))}

      {trainings && (
        <CommunityTrainings
          title="Read latest Trainings"
          trainings={trainings.slice(0, 3)}
        />
      )}

      <Link className="my-4 underline " href={'/register-farmer'}>
        Become a Farmer/Vendor/Supplier
      </Link>
    </div>
  );
};

export default Home;
