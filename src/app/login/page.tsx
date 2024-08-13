import PageTitle from '@/components/reusable comps/PageTitle';
import React from 'react';

export default function LoginPage() {
  return (
    <div className="flex flex-col w-full items-center min-h-screen pt-16">
      <div className='w-[90%] md:w-[70%] flex flex-col gap-y-8 '>

        <PageTitle title="پنل انجمن" />

        <div className="bg-white rounded-lg shadow-lg">
          <form>
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                id="email"
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                id="password"
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-primary text-white py-2 px-4 rounded-md hover:bg-secondary"
            >
              Sign In
            </button>
          </form>

        </div>

      </div>
    </div>
  );
}