'use client';

import { useAppSelector } from '@/hooks/storeHook';
import { ChevronRight } from 'lucide-react';
import Link from 'next/link';

type StepsProps = {
  steps: {
    id: string | number;
    title: string;
  }[];
};

const Steps = ({ steps }: StepsProps) => {
  const currentStep = useAppSelector((state) => state.checkout.currentStep);

  return (
    <>
      <nav className="flex md:text-xl text-sm mb-8">
        <ol
          role="list"
          className="flex flex-wrap gap-y-5 md:gap-y-0 items-center gap-x-1.5"
        >
          <li>
            <div className="-m-1">
              <Link
                href="/cart"
                title=""
                className="inline-flex items-center p-1 text-sm  md:text-base font-medium text-gray-500 rounded-md focus:outline-none focus:ring-2 focus:text-gray-900 focus:ring-gray-900 hover:text-gray-700 dark:hover:text-lime-300"
              >
                Cart
                <span className="inline-flex items-center justify-center w-5 h-5 ml-2 text-xs font-bold bg-lime-400 rounded-full text-gray-50">
                  4
                </span>
              </Link>
            </div>
          </li>

          {steps.map((step) => {
            return (
              <li key={step.id}>
                <div className="flex items-center">
                  <ChevronRight className="flex-shrink-0 w-4 h-4 text-gray-400" />
                  <div className="-m-1">
                    <p
                      title=""
                      className={`p-1 ml-1.5 text-sm md:text-base font-medium text-gray-500 rounded-md focus:outline-none focus:ring-2 focus:text-gray-900 focus:ring-gray-900 ${currentStep === step.id ? 'text-lime-700 dark:text-lime-500' : ''}`}
                    >
                      {step.title}
                    </p>
                  </div>
                </div>
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
};

export default Steps;
