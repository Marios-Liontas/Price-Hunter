import axios from 'axios'

const CHEAPSHARK_API_BASE = import.meta.env.VITE_CHEAPSHARK_API_BASE

export const fetchDeals = async (pageNumber = 0, pageSize = 20) => {
    try {
        const url = `https://www.cheapshark.com/api/1.0/deals?pageNumber=${pageNumber}&pageSize=${pageSize}`;
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        console.error('Error fetching deals from Cheapshark:', error);
        throw error;
    }
}