import React, { useEffect, useState } from 'react';
import * as apiClient from '../api-client';
import Pagination from '../Components/Pagination';
import { storeNames } from '../../shared/storeNames';

const Deals = () => {
  const [deals, setDeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(20); // Initialize totalPages state
  const [inputPage, setInputPage] = useState(currentPage); // State for the input field

  // Function to handle page change
  const handlePageChange = (page) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
      setInputPage(page);  // Update input to the current page
    }
  };

  const handleInputChange = (e) => {
    const pageNumber = e.target.value;
    setInputPage(pageNumber);  // Update the input value
  };

  const handleInputSubmit = (e) => {
    e.preventDefault();
    handlePageChange(Number(inputPage));  // Go to the page entered by the user
  };

  useEffect(() => {
    const loadDeals = async () => {
      setLoading(true);
      setError(null);

      try {
        const pageSize = 30; // Items per page
        const data = await apiClient.fetchDeals(currentPage - 1, pageSize); // Adjust API pageNumber (0-based)

        setDeals(data);

        // Hardcoded totalPages to 5 (or any reasonable number) as a workaround
        // because CheapShark API doesn't provide the total number of results
        const estimatedTotalDeals = 600; // Assume there are 600 total deals
        setTotalPages(Math.ceil(estimatedTotalDeals / pageSize));
      } catch (err) {
        console.error('Error fetching deals:', err);
        setError('Failed to fetch deals.');
      } finally {
        setLoading(false);
      }
    };

    loadDeals();
  }, [currentPage]);

  if (loading) return <p>Loading deals...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {deals.map((deal) => (
          <div
            key={deal.dealID}
            className="p-4 border rounded shadow hover:shadow-lg transition"
          >
            <img
              src={deal.thumb}
              alt={deal.title}
              className="w-24 h-28 object-fit mb-2 filter contrast-110"
            />
            <h3 className="text-lg font-bold">{deal.title}</h3>
            <p>
              <span className="line-through text-gray-500">
                ${deal.normalPrice}
              </span>{' '}
              <span className="text-green-600">${deal.salePrice}</span>
            </p>
            <p className="text-sm text-gray-400">
              Savings: {deal.savings ? `${Number(deal.savings).toFixed(2)}%` : 'N/A'}
            </p>
            <p className="text-sm text-gray-500">Store: {storeNames[deal.storeID] || 'Unknown'}</p>
            <a
              href={`https://www.cheapshark.com/redirect?dealID=${deal.dealID}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline"
            >
              View Deal
            </a>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="mt-4">
        <Pagination
          page={currentPage}
          pages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>

      {/* Page input */}
      <div className="mt-4 flex justify-center">
        <form onSubmit={handleInputSubmit} className="flex items-center">
          <input
            type="text"
            value={inputPage}
            onChange={handleInputChange}
            min="1"
            max={totalPages}
            className="border-2 border-gray-300 rounded-md p-2 mr-2 w-20 text-center"
          />
          <button
            type="submit"
            className="bg-slate-700 text-white px-4 py-2 rounded-md hover:bg-slate-900"
          >
            Go
          </button>
        </form>
      </div>
    </div>
  );
};

export default Deals;
