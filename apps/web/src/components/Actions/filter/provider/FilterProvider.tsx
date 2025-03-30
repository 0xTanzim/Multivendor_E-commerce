'use client';

import { Product } from '@repo/types';
import React, { useState } from 'react';

import { createContext, useContext } from 'react';

interface FilterContextType {
  totalProducts: Product[];
  totalPageCount: number;
  totalProductCount: number;
  setTotalProducts: React.Dispatch<React.SetStateAction<Product[]>>;
  setTotalPageCount: React.Dispatch<React.SetStateAction<number>>;
  setTotalProductCount: React.Dispatch<React.SetStateAction<number>>;
}

const FilterContext = createContext<FilterContextType | undefined>(undefined);

export const useFilterContext = () => {
  const context = useContext(FilterContext);
  if (!context) {
    throw new Error('useFilterContext must be used within a FilterProvider');
  }
  return context;
};

const FilterProvider = ({
  children,
  className,
  products,
  totalPages,
  totalCount,
}: {
  children: React.ReactNode;
  className?: string;
  products: Product[];
  totalPages: number;
  totalCount: number;
}) => {
  const [totalProducts, setTotalProducts] = useState(products);
  const [totalPageCount, setTotalPageCount] = useState(totalPages);
  const [totalProductCount, setTotalProductCount] = useState(totalCount);

  return (
    <FilterContext.Provider
      value={{
        totalProducts,
        totalPageCount,
        totalProductCount,
        setTotalProducts,
        setTotalPageCount,
        setTotalProductCount,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};

export default FilterProvider;
