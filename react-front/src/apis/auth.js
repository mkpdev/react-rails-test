import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

export const signupUser = async(action) => {
  try {
    const response = await axios.post(`${API_URL}/auth`, {user: action.payload });
    return response;
  } catch(error) {
    return error.response.data;
  }
}

export const loginUser = async(action) => {
  try {
    const response = await axios.post(`${API_URL}/auth/sign_in`, action.payload);
    return response;
  } catch(error) {
    return error.response.data;
  }
}