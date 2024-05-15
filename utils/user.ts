import { API } from "@/constants/api-routes";
import { get, post, remove } from "./axios";

export const fetchUserDetails = async () => {
  const {
    data: { result },
  } = await get<{ result: any }>(API.USER);

  return result;
};

export const loginUser = async (email: string, password: string) => {
  const { data } = await post(API.LOGIN, { email, password });

  return data;
};

export const logoutUser = async () => {
  await remove<{ result: any }>(API.LOGIN_SSO);
  console.log("logged out successfully")
};

export const postUser = async (email: string) => {
  try {
    const response = await post<{ result: any }>(`${API.LOGIN_SSO}`, {
      grantType: "client_credentials",
      email: email,
    });
    const result = response.data;

    return result;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

export const refreshAccessToken = async (refreshToken: string) => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}${API.LOGIN_SSO}`, {
      method: "POST",
      body: JSON.stringify({
        grantType: "refresh_token",
        refreshToken: refreshToken,
      }),
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    const result = await response.json();
    console.log("refresh token",result.accessToken)
    await refreshAccessToken(refreshToken)
    return result;
  } catch (error) {
    console.error("Error in refreshtoken :", error);
    throw error;
  }
  

  // try {
  //   console.log("sharanya",refreshToken)
  //   const response = await post(`${API.LOGIN_SSO}`, {
  //     grantType: "refresh_token",
  //     refreshToken: refreshToken,
  //   });
  //   const result = response;
  //   console.log("cccccc",response.data)
  //   return result;
  // } catch (error) {
  //   console.error("Error pleaade:", error);
  //   throw error;
  // }
};


