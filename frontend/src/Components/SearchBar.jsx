import { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as apiClient from "../api-client";

const SearchBar = () => {
    const [searchInput, setSearchInput] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const navigate = useNavigate();

    const handleInputChange = (e) => {
        setSearchInput(e.target.value);
    };

    const handleSearch = async (e) => {
        e.preventDefault();
        if (!searchInput.trim()) return;

        setLoading(true);
        setError("");

        try {
            // Fetch results to check before redirecting (optional, for initial display)
            const data = await apiClient.searchGames(searchInput);
            console.log(data); // optional: to check the fetched data

            // Redirect with the query in the URL
            navigate(`/search?query=${searchInput}`, { replace: true });
        } catch (error) {
            setError("Error fetching data");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mx-auto p-4">
            <div className="search-container p-4 flex flex-col items-center justify-center">
                <form
                    onSubmit={handleSearch}
                    className="mb-4 w-full sm:w-3/4 md:w-1/2 lg:w-1/3 flex"
                >
                    <input
                        type="text"
                        value={searchInput}
                        onChange={handleInputChange}
                        placeholder="Search for games..."
                        className="px-4 py-2 w-full border border-gray-700 rounded-l-md focus:outline-none focus:ring-2 focus:ring-orange-500 bg-gray-800 text-gray-300 placeholder-gray-400"
                    />
                    <button
                        type="submit"
                        className="ml-2 bg-orange-500 text-white px-4 py-2 rounded-r-md hover:bg-orange-600"
                    >
                        Search
                    </button>
                </form>

                {error && <p className="text-red-500">{error}</p>}
            </div>
        </div>
    );
};

export default SearchBar;
