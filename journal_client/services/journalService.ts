import axios from 'axios';

export const BASE_URL = 'http://10.0.2.2:8000/api/notes/'
const CATEGORY_URL = 'http://10.0.2.2:8000/api/categories/'

const getNotes = async (page: string | null) => {
  try {
    if (!page) {
      const response = await axios.get(BASE_URL);
      return response.data;
      
    } else {
      // "http://api.example.org/accounts/?cursor=cj0xJnA9NDg3"
      // grab the cursor from the url
      const cursor = page.split('=')[1];
      const response = await axios.get(`${BASE_URL}?cursor=${cursor}`);
      return response.data;
    }
  } catch (error) {
    const message = (error as any).response.data

    return { error: true, msg: message }

  }
}

const getNoteById = async (id: number) => {
  try {
    const response = await axios.get(`${BASE_URL}${id}`);
    return response.data;
  } catch (error) {
    const message = (error as any).response.data
    return { error: true, msg: message }
  }

}

const getNotesByCategory = async (categoryId: number) => {
  if (categoryId == 0) { // we are getting everything
    return getNotes(null);
  }
  try {
    const response = await axios.get(`${BASE_URL}?category=${categoryId}`);
    return response.data;
  } catch (error) {
    const message = (error as any).response.data
    return { error: true, msg: message }
  }

}

const getCategories = async () => {
  try {
    const response = await axios.get(`${CATEGORY_URL}`);
    return response.data;
  } catch (error) {
    const message = (error as any).response.data
    return { error: true, msg: message }
  }

}

const createCategory = async (name: string) => {

  try {
    const response = await axios.post(`${BASE_URL}categories/`, { name });
    return response.data;
  } catch (error) {
    const message = (error as any).response.data
    return { error: true, msg: message }
  }
}

const createNote = async (title: string, content: string, category: string) => {
  // lowercase and remove spaces from category
  const category_name = category.toLowerCase().replace(/\s/g, '');

  try {
    const response = await axios.post(`${BASE_URL}`, { title, content, category_name });
    return response.data;
  } catch (error) {
    const message = (error as any).response.data
    return { error: true, msg: message }
  }
}

const deleteNote = async (id: string) => {
  try {
    const response = await axios.delete(`${BASE_URL}${id}/`);
    return response.data;
  } catch (error) {
    const message = (error as any).response.data
    return { error: true, msg: message }
  }

}

const updateNote = async (id: string, title: string, content: string, category: string) => {
  try {
    const response = await axios.patch(`${BASE_URL}${id}/`, { title, content, category });
    return response.data;
  } catch (error) {
    const message = (error as any).response.data
    return { error: true, msg: message }
  }
}

export const journalService = {
  createNote,
  getNotes,
  getNoteById,
  updateNote,
  deleteNote,
  getNotesByCategory,
  getCategories,
};