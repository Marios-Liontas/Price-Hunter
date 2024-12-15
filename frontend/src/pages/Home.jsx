import React, { useEffect, useState } from 'react';
import * as apiClient from '../api-client';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [featuredDeals, setFeaturedDeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFeaturedDeals = async () => {
      setLoading(true);
      setError('');

      try {
        const data = await apiClient.fetchDeals(0, 6); // Fetch a small number of featured deals
        setFeaturedDeals(data);
      } catch (err) {
        console.error('Error fetching featured deals:', err);
        setError('Failed to load featured deals.');
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedDeals();
  }, []);

  return (
    <div className="container mx-auto p-4 bg-gray-900 text-gray-200 min-h-screen">
      {/* Hero Section */}
      <div className="hero-section bg-orange-500 text-gray-900 p-6 rounded-lg text-center shadow-lg">
        <h1 className="text-3xl font-bold">Welcome to Price-Hunter</h1>
        <p className="text-lg mt-2">Track the best gaming deals across platforms!</p>
      </div>

      {/* Featured Deals */}
      <div className="featured-deals mt-8">
        <h2 className="text-2xl font-bold mb-4 text-orange-500">Featured Deals</h2>
        {loading && <p className="text-orange-400">Loading...</p>}
        {error && <p className="text-red-500">{error}</p>}
        {!loading && !error && featuredDeals.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredDeals.map((deal) => (
              <div
                key={deal.dealID}
                className="p-4 border border-gray-600 rounded-md shadow hover:shadow-lg transition bg-gray-800"
              >
                <img
                  src={deal.thumb}
                  alt={deal.title}
                  className="w-24 h-28 object-contain mb-2 filter contrast-110"
                />
                <h3 className="text-lg font-bold text-orange-500">{deal.title}</h3>
                <p>
                  <span className="line-through text-gray-400">€{deal.normalPrice}</span>{' '}
                  <span className="text-orange-500">€{deal.salePrice}</span>
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
        )}
      </div>

      {/* Categories */}
      <div className="categories mt-8 text-center">
        <h2 className="text-2xl font-bold mb-4 text-orange-500">Browse by Platform</h2>
        <div className="flex justify-center gap-4 flex-wrap">
          {['Steam', 'Epic Games', 'PlayStation', 'Xbox'].map((platform) => (
            <button
              key={platform}
              className="bg-orange-500 text-gray-900 px-4 py-2 rounded-md hover:bg-orange-600 transition"
              onClick={() => navigate(`/platform/${platform.toLowerCase()}`)}
            >
              {platform}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
