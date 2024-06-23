import { jwtDecode } from "jwt-decode";
import decodeJwt from "jwt-decode";

const BASE_URL = "localhost:8000";

export const login = async (email: string, password: string) => {
  if (!(email.length > 0) || !(password.length > 0)) {
    throw new Error("Email or password was not provided");
  }
  const formData = new FormData();
  formData.append("username", email);
  formData.append("password", password);

  for (const key in formData) {
    console.log("formdata", key);
  }

  const request = new Request(BASE_URL + "/api/token", {
    method: "POST",
    body: formData,
  });

  const response = await fetch(request);

  if (response.status === 500) {
    throw new Error("Internal Server Error");
  }

  const data = await response.json();

  if (response.status > 400 && response.status < 500) {
    if (data.detail) {
      throw data;
    }
  }

  if ("access_token" in data) {
    const decodedToken = jwtDecode(data["access-token"]);
    localStorage.set("token", data["access-token"]);
    localStorage.set("permissions", decodedToken);
  }
};

export const signup = async (email: string, password: string, name: string) => {
  if (!(email.length > 0) || !(password.length > 0)) {
    throw new Error("Email or password was not provided");
  }
  const formData = new FormData();
  formData.append("username", email);
  formData.append("password", password);
  formData.append("name", name);

  const request = new Request("api/token", {
    method: "POST",
    body: formData,
  });

  const response = await fetch(request);

  if (response.status === 500) {
    throw new Error("Internal Server Error");
  }

  const data = await response.json();

  if (response.status > 400 && response.status < 500) {
    if (data.detail) {
      throw data;
    }
  }

  if ("access_token" in data) {
    const decodedToken = jwtDecode(data["access-token"]);
    localStorage.set("token", data["access-token"]);
    localStorage.set("permissions", decodedToken);
  }
};
