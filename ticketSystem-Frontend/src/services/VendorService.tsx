import axios from "axios";

const REST_API_BASE_URL = "http://localhost:8080/api/vendors";
const LOGIN_API_URL = "http://localhost:8080/api/vendors/login"; 

export const listVendors = () => {
  return axios.get(REST_API_BASE_URL)
}

export const createVendor = (vendor: any) => axios.post(REST_API_BASE_URL, vendor);

export const getVendor = (vendorId: any) => axios.get(REST_API_BASE_URL + '/' + vendorId);

export const updateVendor = (vendorId: any, vendor: any) => axios.put(REST_API_BASE_URL + '/' + vendorId, vendor);

export const deleteVendor = (vendorId: any) => axios.delete(REST_API_BASE_URL + '/' + vendorId);

// Register vendor (Sign Up)
export const registerVendor = (customer: { name: string; email: string; password: string }) => {
  return axios.post(REST_API_BASE_URL, {
    name: customer.name,
    email: customer.email,
    password: customer.password
  });
};

// Login vendor
export const loginVendor = (credentials: { email: string; password: string }) => {
  return axios.post(LOGIN_API_URL, credentials);
};