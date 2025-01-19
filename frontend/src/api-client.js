import axios from 'axios'

const CHEAPSHARK_API_BASE = import.meta.env.VITE_CHEAPSHARK_API_BASE
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "";

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

export const registerUser = async (formData) => {
    const response = await fetch(`${API_BASE_URL}/api/auth/register`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData),
            credentials:"include"
        });
    
    const responseBody = await response.json();

    if (!response.ok) {
        throw new Error(responseBody.message);
    }

    return responseBody;
};


export const loginUser = async (data) => {
    const response = await fetch(`${API_BASE_URL}/api/auth/login`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data),
            credentials:"include"
        });
    
    const responseBody = await response.json();

    if (!response.ok) {
        throw new Error(responseBody.message);
    }

    return responseBody; // return the response data
};



export const validateToken = async () => {
    const response = await fetch(`${API_BASE_URL}/api/validate-token`, {
        credentials: "include"
    });
    if (!response.ok) {
        throw new Error("Token invalid");
    }

    return response.json();
};


export const SignOut = async () => {
    const response = await fetch(`${API_BASE_URL}/api/logout`, {
        credentials: "include",
        method: "POST"
    });

    if (!response.ok) {
        throw new Error("Error during sign out");
    }
};