import axios from "axios";

const REST_API_BASE_URL = "http://localhost:8080/api/customers";
const LOGIN_API_URL = "http://localhost:8080/api/customers/login"; 

export const listCustomers = () => {
    return axios.get(REST_API_BASE_URL);
}

export const createCustomer = (customer: any) => axios.post(REST_API_BASE_URL, customer);

export const getCustomer = (customerId: any) => axios.get(REST_API_BASE_URL + '/' + customerId);

export const updateCustomer = (customerId: any, customer: any) => axios.put(REST_API_BASE_URL + '/' + customerId, customer);

export const deleteCustomer = (customerId: any) => axios.delete(REST_API_BASE_URL + '/' + customerId);

// Register customer (Sign Up)
export const registerCustomer = (customer: { name: string; email: string; password: string }) => {
    return axios.post(REST_API_BASE_URL, {
      name: customer.name,
      email: customer.email,
      password: customer.password
    });
  };
  
  // Login customer
  export const loginCustomer = (credentials: { email: string; password: string }) => {
    return axios.post(LOGIN_API_URL, credentials);
  };