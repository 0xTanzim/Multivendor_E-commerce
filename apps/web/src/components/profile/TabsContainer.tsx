'use client';

import { useState } from 'react';

interface TabProps {
  id: string;
  label: React.ReactNode;
  content: React.ReactNode;
}

interface TabsContainerProps {
  tabs: TabProps[];
  defaultTab?: string;
}

const TabsContainer = ({ tabs, defaultTab }: TabsContainerProps) => {
  const [activeTab, setActiveTab] = useState(defaultTab || tabs[0]?.id);

  return (
    <div className="w-full">
      <div className="flex w-full border-b border-gray-200 dark:border-gray-700">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center justify-center px-4 py-3 text-sm font-medium ${
              activeTab === tab.id
                ? 'border-b-2 border-emerald-500 text-emerald-600 dark:text-emerald-400'
                : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="py-6">
        {tabs.find((tab) => tab.id === activeTab)?.content}
      </div>
    </div>
  );
};

export default TabsContainer;
