import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import * as apiClient from "../api-client";
import { storeNames } from "../../shared/storeNames";

const SearchResults = () => {
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    // Get the query parameter from the URL
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const searchQuery = queryParams.get("query"); // Retrieve the query from URL

    useEffect(() => {
        if (!searchQuery) return;

        const fetchResults = async () => {
            setResults([]);
            setLoading(true);
            setError("");
            try {
                const data = await apiClient.searchGames(searchQuery);

                // Filter out games that are not on sale
                const filteredResults = data.filter((deal) => deal.isOnSale === "1");

                setResults(filteredResults); // Store only on-sale results
            } catch (error) {
                setError("Error fetching search results");
            } finally {
                setLoading(false);
            }
        };

        fetchResults();
    }, [searchQuery, location.key]); // Listen to changes in `searchQuery` or `location.key`

    return (
        <div className="container mx-auto p-4 bg-gray-900 text-white">
            <h1 className="text-center text-2xl font-bold mb-4 text-orange-500">
                Search Results for "{searchQuery}"
            </h1>

            {loading && <p className="text-orange-400">Loading...</p>}
            {error && <p className="text-red-500">{error}</p>}

            {results.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {results.map((deal) => (
                        <div
                            key={deal.gameID}
                            className="p-4 border border-gray-800 rounded-md shadow-md hover:shadow-lg transition duration-300 bg-gray-800"
                        >
                            <img
                                src={deal.thumb}
                                alt={deal.title}
                                className="w-24 h-28 object-contain mb-2 filter contrast-110"
                            />
                            <h3 className="text-lg font-bold text-orange-500">{deal.title}</h3>
                            <p>
                                <span className="flex gap-1">
                                    <span className="line-through text-gray-500">
                                        €{deal.normalPrice}
                                    </span>{" "}
                                    <span className="text-orange-500">
                                        €{deal.salePrice}
                                    </span>
                                    
                                </span>
                            </p>
                            <p className="text-sm text-gray-400">
                                Savings:{" "}
                                {deal.savings ? `${Number(deal.savings).toFixed(2)}%` : "N/A"}
                            </p>
                            <p className="text-sm text-gray-500">
                                Store: {storeNames[deal.storeID] || "Unknown"}
                            </p>
                            <a
                                href={`https://www.cheapshark.com/redirect?dealID=${deal.cheapestDealID}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-orange-400 hover:text-orange-500 underline"
                            >
                                View Deal
                            </a>
                        </div>
                    ))}
                </div>
            )}

            {results.length === 0 && !loading && !error && searchQuery.trim() && (
                <p className="text-orange-400">No results found for "{searchQuery}".</p>
            )}
        </div>
    );
};

export default SearchResults;
