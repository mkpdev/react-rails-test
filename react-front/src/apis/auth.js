import axios from 'axios';

// Its define in .env.development file.
const API_URL = process.env.REACT_APP_API_URL;

// call api for signup and get response and handle with try/catch.
export const signupUser = async(action) => {
  try {
    const response = await axios.post(`${API_URL}/auth`, {user: action.payload });
    return response;
  } catch(error) {
    return error.response.data;
  }
}

// call api for login and get response and handle with try/catch.
export const loginUser = async(action) => {
  try {
    const response = await axios.post(`${API_URL}/auth/sign_in`, action.payload);
    return response;
  } catch(error) {
    return error.response.data;
  }
}