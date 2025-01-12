import apiClient from "./api";

export async function signUp(firstName, lastName, email, password) {
    try {
      const response = await apiClient.post("sign-up/", {
        first_name: firstName,
        last_name: lastName,
        email,
        password,
      });

      const { tokens } = response.data;
      localStorage.setItem("accessToken", tokens.access);
      localStorage.setItem("refreshToken", tokens.refresh);

      return response.data;
    } catch (error) {
      console.error("Sign-up failed:", error.response?.data);
      throw error.response?.data || "An error occurred during sign-up.";
    }
}

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

export async function logout() {
    console.log('logout');

    const refreshToken = localStorage.getItem("refreshToken");

    console.log('refreshToken', refreshToken);

    try {
        await apiClient.post("logout/", { refresh: refreshToken });

        // Clear tokens from localStorage
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");

        console.log("Logged out successfully!");
    } catch (error) {
        console.error("Logout failed:", error.response?.data);
    }
}

export async function refreshToken() {
    const refresh = localStorage.getItem("refreshToken");
    if (!refresh) throw new Error("No refresh token available");

    const response = await apiClient.post("token/refresh/", { refresh });
    const { access } = response.data;

    localStorage.setItem("accessToken", access);
    return access;
}
