import axios from 'axios'

const CHEAPSHARK_API_BASE = import.meta.env.VITE_CHEAPSHARK_API_BASE

export const fetchDeals = async (pageNumber, pageSize) => {
    try {
        const url = `https://www.cheapshark.com/api/1.0/deals?pageNumber=${pageNumber}&pageSize=${pageSize}`;
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        console.error('Error fetching deals from Cheapshark:', error);
        throw new Error("Cannot fetch Deals, something went wrong!")
    }
}

export const searchGames = async (nameOfGame) => {
    try {
        const url = `https://www.cheapshark.com/api/1.0/deals?title=${nameOfGame}`;
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        console.error('Error finding or fetching requested game', error);
        throw new Error('Cannot fetch Game, something went wrong!');
    }
}