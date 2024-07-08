import axios from 'axios';
const BASE_URL = 'http://localhost:8000/api/account-auth/'

const API_URL = 'https://6676ab2b145714a1bd727114.mockapi.io/test-api/articles';

const getNotes = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

const getNoteById = async (id: string) => { 
    try {
        const response = await axios.get(`${API_URL}/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
    
}

export const journalService = {
    getNotes,
    getNoteById
};