import React, { useEffect, useState } from "react";
import * as apiClient from "../api-client";
import Pagination from "../Components/Pagination";
import { storeNames } from "../../shared/storeNames";

const Deals = () => {
  const [deals, setDeals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [inputPage, setInputPage] = useState(currentPage);

  const pageSize = 30; // Number of deals per page
  const estimatedTotalDeals = 600; // Estimated total number of deals (CheapShark API does not provide this info)

  useEffect(() => {
    const loadDeals = async () => {
      setLoading(true);
      setError("");

      try {
        // Fetch deals from the API
        const data = await apiClient.fetchDeals(currentPage - 1, pageSize); // API uses 0-based pages
        setDeals(data);

        // Calculate and set the total number of pages
        setTotalPages(Math.ceil(estimatedTotalDeals / pageSize));
      } catch (err) {
        console.error("Error fetching deals:", err);
        setError("Failed to fetch deals. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    loadDeals();
  }, [currentPage]);

  // Handle page input changes
  const handleInputChange = (e) => {
    const value = e.target.value;
    if (value === "" || /^[0-9]+$/.test(value)) {
      setInputPage(value);
    }
  };

  // Handle page input submission
  const handleInputSubmit = (e) => {
    e.preventDefault();
    const page = Number(inputPage);
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    } else {
      alert(`Please enter a valid page number between 1 and ${totalPages}.`);
    }
  };

  // Handle direct page changes via pagination controls
  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      setInputPage(page); // Update input field with the current page
    }
  };

  if (loading) return <p className="text-lime-400">Loading deals...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="p-4 bg-gray-900 text-white">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {deals.map((deal) => (
          <div
            key={deal.dealID}
            className="p-4 border border-gray-800 rounded shadow-md hover:shadow-lg bg-gray-800 transition"
          >
            <img
              src={deal.thumb}
              alt={deal.title}
              className="w-24 h-28 object-contain mb-2 filter contrast-125"
            />
            <h3 className="text-lg font-bold text-lime-400">{deal.title}</h3>
            <p>
              <span className="line-through text-gray-500">
                €{deal.normalPrice}
              </span>{" "}
              <span className="text-lime-400">€{deal.salePrice}</span>
            </p>
            <p className="text-sm text-gray-400">
              Savings: {deal.savings ? `${Number(deal.savings).toFixed(2)}%` : "N/A"}
            </p>
            <p className="text-sm text-gray-500">
              Store: {storeNames[deal.storeID] || "Unknown"}
            </p>
            <a
              href={`https://www.cheapshark.com/redirect?dealID=${deal.dealID}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-lime-400 hover:text-lime-500 underline"
            >
              View Deal
            </a>
          </div>
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="mt-4">
        <Pagination
          page={currentPage}
          pages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>

      {/* Page Input Navigation */}
      <div className="mt-4 flex justify-center">
        <form onSubmit={handleInputSubmit} className="flex items-center">
          <input
            type="text"
            value={inputPage}
            onChange={handleInputChange}
            className="border-2 border-gray-700 rounded-md p-2 mr-2 w-20 text-center bg-gray-800 text-white"
          />
          <button
            type="submit"
            className="bg-lime-400 text-black px-4 py-2 rounded-md hover:bg-lime-500"
          >
            Go
          </button>
        </form>
      </div>
    </div>
  );
};

export default Deals;
