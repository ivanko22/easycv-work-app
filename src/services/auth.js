import apiClient from "./api";

export async function signUp(firstName, lastName, email, password) {
    console.log("Signing up...", firstName, lastName, email, password);

    try {
      const response = await apiClient.post("sign-up/", {
        first_name: firstName,
        last_name: lastName,
        email,
        password,
      });
      console.log("Full response:", response.data);

      const { tokens } = response.data || {};
      if (tokens) {
          localStorage.setItem("accessToken", tokens.access);
          localStorage.setItem("refreshToken", tokens.refresh);
      } else {
          console.warn("Tokens not received in the response.");
      }

      console.log("Sign-up successful:", response.data);

    } catch (error) {
      console.error("Sign-up failed:", error.response?.data);
      throw error.response?.data || "An error occurred during sign-up.";
    }
}

export async function login(username, password) {
    const response = await apiClient.post("token/", { username, password });
    const { access, refresh } = response.data;

    localStorage.setItem("accessToken", access);
    localStorage.setItem("refreshToken", refresh);

    return response.data;
}

export async function logout() {
    const refreshToken = localStorage.getItem("refreshToken");

    try {
        await apiClient.post("logout/", { refresh: refreshToken });
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");

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
