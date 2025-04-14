import API_URL from '../config/api';

export const getAllPosts = async () => {
  try {
    const response = await fetch(`${API_URL}/posts`);
    return await response.json();
  } catch (error) {
    console.error('Error obteniendo publicaciones:', error);
    throw error;
  }
};

export const getPostById = async (id) => {
  try {
    const response = await fetch(`${API_URL}/posts/${id}`);
    return await response.json();
  } catch (error) {
    console.error(`Error obteniendo publicación ${id}:`, error);
    throw error;
  }
};

export const createPost = async (postData, token) => {
  try {
    const response = await fetch(`${API_URL}/posts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(postData)
    });
    return await response.json();
  } catch (error) {
    console.error('Error creando publicación:', error);
    throw error;
  }
};

export const uploadFile = async (file, token) => {
  try {
    const formData = new FormData();
    formData.append('file', file);
    
    const response = await fetch(`${API_URL}/upload`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`
      },
      body: formData
    });
    
    return await response.json();
  } catch (error) {
    console.error('Error subiendo archivo:', error);
    throw error;
  }
};