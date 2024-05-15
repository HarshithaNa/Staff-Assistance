import axios, { AxiosError, AxiosInstance, AxiosResponse, Method } from "axios";

export interface ApiResponse<T = any> {
  data: T;
}

interface ApiError {
  message: string;
}

// Create an Axios instance with custom configuration
const api: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    // Add any other headers you need,
  },
  withCredentials: true,
});

// Generic function to handle API requests
const request = async <T>(
  method: Method,
  url: string,
  data?: any
): Promise<ApiResponse<T>> => {
  try {
    const response: AxiosResponse<T> = await api.request({
      method,
      url,
      data,
    });

    return { data: response.data };
  } catch (error) {
    const axiosError = error as AxiosError<ApiError>;

    if (axiosError.response) {
      // The request was made and the server responded with a status code
      console.error("API Error - Status:", axiosError.response.status);
      console.error("API Error - Data:", axiosError.response.data);

      throw axiosError.response.data;
    } else if (axiosError.request) {
      // The request was made but no response was received
      console.error("API Error - No response received");
      throw { message: "No response received from the server" };
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error("API Error - Request setup error:", axiosError.message);
      throw { message: "Error setting up the request" };
    }
  }
};

// Define specific methods for different HTTP request types
const get = <T>(url: string): Promise<ApiResponse<T>> => request<T>("GET", url);
const post = <T>(url: string, data?: any): Promise<ApiResponse<T>> =>
  request<T>("POST", url, data);
const put = <T>(url: string, data?: any): Promise<ApiResponse<T>> =>
  request<T>("PUT", url, data);
const remove = <T>(url: string): Promise<ApiResponse<T>> =>
  request<T>("DELETE", url);

export { get, post, put, remove };
