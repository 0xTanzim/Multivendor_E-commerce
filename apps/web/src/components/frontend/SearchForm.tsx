'use client';
import { DoorOpen, Search } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';

const SearchForm = () => {
  const { register, handleSubmit, reset, formState } = useForm();
  const router = useRouter();

  function handleSearch(data: any) {
    const { searchTerm } = data;

    reset();

    if (searchTerm) {
      router.push(`/search?search=${searchTerm}`);
    }
  }

  return (
    <form className="flex items-center" onSubmit={handleSubmit(handleSearch)}>
      <label htmlFor="voice-search" className="sr-only">
        Search
      </label>

      <div className="relative w-full">
        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
          <DoorOpen className="w-4 h-4 text-gray-500 dark:text-gray-300" />
        </div>
        <input
          id="voice-search"
          type="search"
          placeholder="Search for Product, Category, Markets..."
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-lime-500 focus:border-lime-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-lime-500 dark:focus:border-lime-500 "
          {...register('searchTerm', { required: true })}
          required
          autoComplete="off"
        />
      </div>

      <button
        type="submit"
        className="inline-flex items-center py-2.5 px-3 ms-2 text-sm font-medium text-white bg-lime-700 rounded-lg border border-lime-700 hover:bg-lime-800 focus:ring-4 focus:outline-none focus:ring-lime-300 dark:bg-lime-600 dark:hover:bg-lime-700 dark:focus:ring-lime-800"
      >
        <Search className="w-4 h-4 me-2" /> Search
      </button>
    </form>
  );
};

export default SearchForm;
