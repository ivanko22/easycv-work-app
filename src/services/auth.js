import apiClient from "./api";

export async function login(username, password) {
    console.log('username, password', 'username, password');

    const response = await apiClient.post("token/", { username, password });
    const { access, refresh } = response.data;

    // Save tokens to localStorage
    localStorage.setItem("accessToken", access);
    localStorage.setItem("refreshToken", refresh);

    console.log('response.data', response.data);

    return response.data;
}

export function logout() {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
}

export async function refreshToken() {
    const refresh = localStorage.getItem("refreshToken");
    if (!refresh) throw new Error("No refresh token available");

    const response = await apiClient.post("token/refresh/", { refresh });
    const { access } = response.data;

    localStorage.setItem("accessToken", access);
    return access;
}
