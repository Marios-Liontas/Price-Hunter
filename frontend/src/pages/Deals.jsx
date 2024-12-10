// src/components/Deals.jsx
import React, { useEffect, useState } from 'react';
import * as apiClient from '../api-client';

const Deals = () => {
  const [deals, setDeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadDeals = async () => {
      try {
        const data = await apiClient.fetchDeals();
        console.log('Fetched deals:', data);
        setDeals(data);
      } catch (err) {
        setError('Failed to fetch deals.');
      } finally {
        setLoading(false);
      }
    };

    loadDeals();
  }, []);

  if (loading) return <p>Loading deals...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
      {deals.map((deal) => (
        <div
          key={deal.dealID}
          className="p-4 border rounded shadow hover:shadow-lg transition"
        >
          <img
            src={deal.thumb}
            alt={deal.title}
            className="w-24 h-24 object-fit mb-2 filter contrast-110"
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
  );
};

export default Deals;
