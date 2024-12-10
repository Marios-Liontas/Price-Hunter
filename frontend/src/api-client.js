import axios from 'axios'

const CHEAPSHARK_API_BASE = import.meta.env.VITE_CHEAPSHARK_API_BASE

export const fetchDeals = async () => {
    try {
        const response = await axios.get(`${CHEAPSHARK_API_BASE}/deals`, {
            params: {
                pageSize: 50,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching deals from Cheapshark:', error);
        throw error;
    }
}