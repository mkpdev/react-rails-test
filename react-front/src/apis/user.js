import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

export const createUser = async(action) => {
  try {
    const response = await axios.post(`${API_URL}/users`, action.payload, { headers: headers() } );
    return response;
  } catch(error) {
    console.log("api", error.response);
    return error.response.data;
  }
}

export const editUser = async(action) => {
  try {
    const response = await axios.put(`${API_URL}/users/${action.payload.id}`, action.payload, { headers: headers() });
    return response;
  } catch(error) {
    return error.response.data;
  }
}

export const listUser = async(action) => {
  try {
    const response = await axios.get(`${API_URL}/users?page=${action.payload.pageNumber}&search=${action.payload.search}&filter_by_role=${action.payload.filterRole}`, { headers: headers() } );
    return response;
  } catch(error) {
    return error.response.data;
  }
}

export const fetchUser = async(action) => {
  try {
    const response = await axios.get(`${API_URL}/users/${action.id}`, { headers: headers() });
    return response;
  } catch(error) {
    return error.response.data;
  }
}

export const deleteUser = async(action) => {
  try {
    const response = await axios.delete(`${API_URL}/users/${action.id}`, { headers: headers() });
    return response;
  } catch(error) {
    return error.response.data;
  }
}

function headers() {
  return {'access-token':localStorage.getItem('access-token'),'client':localStorage.getItem('client'),uid:localStorage.getItem('uid')};
}