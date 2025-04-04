import { Check } from 'lucide-react';
import Link from 'next/link';

const Pricing = () => {
  const plans = [
    {
      id: 1,
      title: 'Free',
      value: 'free',
      isRecommended: false,
      description: '+5% transaction fee. Great for testing.',
      price: 0,
      features: [
        'Basic features',
        'Limited support',
        'Up to 10 products',
        'Up to 1000 customers',
        'Limited revenue',
      ],
    },
    {
      id: 2,
      title: 'Silver',
      value: 'silver',
      isRecommended: true,
      description: 'No transaction fee. Great for small businesses.',
      price: 49,
      features: [
        'All features',
        'Priority support',
        'Up to 100 products',
        'Up to 10,000 customers',
        'Unlimited revenue',
      ],
    },
    {
      id: 3,
      title: 'Gold',
      value: 'gold',
      isRecommended: false,
      description: 'No transaction fee. Great for large businesses.',
      price: 99,
      features: [
        'All features',
        'Dedicated support',
        'Up to 1000 products',
        'Unlimited customers',
        'Unlimited revenue',
      ],
    },
  ];

  return (
    <div className="p-6 md:p-12 bg-slate-100 dark:bg-slate-900 text-slate-900 dark:text-white">
      <div className="text-center">
        <h2 className="text-3xl font-bold">Choose the Right Plan</h2>
        <p className="mt-2 text-lg">Upgrade or downgrade anytime.</p>
      </div>

      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {plans.map((plan) => (
          <div
            key={plan.id}
            className={`border rounded-xl shadow-lg p-6 bg-white dark:bg-slate-800 transition-all ${
              plan.isRecommended ? 'border-green-500' : 'border-slate-200'
            }`}
          >
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-semibold">{plan.title}</h3>
              {plan.isRecommended && (
                <span className="bg-green-100 text-green-700 px-2 py-1 text-xs rounded-full">
                  Recommended
                </span>
              )}
            </div>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              {plan.description}
            </p>
            <p className="mt-4 text-3xl font-bold">
              ${plan.price} <span className="text-lg">/mo</span>
            </p>
            <ul className="mt-4 space-y-2">
              {plan.features.map((feature, index) => (
                <li key={index} className="flex items-center space-x-2">
                  <Check className="text-green-500" size={18} />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>

            <Link
              href={`/register-farmer?plan=${plan.value}`}
              className="mt-6 w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition text-center block"
            >
              Get Started
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Pricing;
