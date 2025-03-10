import Link from 'next/link';

const Home = () => {
  return (
    <div className="flex items-center justify-center flex-col min-h-screen">
      <h2 className="text-4xl">Welcome to MindFuel Hub</h2>

      <Link className='my-4 underline ' href={'/register-farmer'}>Become a Farmer/Vendor/Supplier
      </Link>
    </div>
  );
};

export default Home;
