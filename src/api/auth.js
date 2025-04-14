import API_URL from '../config/api';

export const registerUser = async (userData) => {
  try {
    const response = await fetch(`${API_URL}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
    
    return await response.json();
  } catch (error) {
    console.error('Error en registro:', error);
    throw error;
  }
};

export const loginUser = async (credentials) => {
  try {
    const response = await fetch(`${API_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });
    
    return await response.json();
  } catch (error) {
    console.error('Error en login:', error);
    throw error;
  }
};

export const getProfile = async (token) => {
  try {
    const response = await fetch(`${API_URL}/profile`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    
    return await response.json();
  } catch (error) {
    console.error('Error al obtener perfil:', error);
    throw error;
  }
};