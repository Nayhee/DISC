import { getToken } from "./authManager";
const baseUrl = "/api/UserProfile";

export const getAllUsers= () => {
    return fetch(baseUrl).then((response) =>response.json())
};

export const getUserById= (id) =>{
    return fetch(`${baseUrl}/Details/${id}`).then((response) =>response.json())
}



export const getLoggedInUser = () => {
  return getToken().then((token) =>
    fetch(baseUrl + `/GetCurrentUser`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((response) => response.json())
  );
};

export const updateProfile = (profile) => {
  return fetch(`${baseUrl}/Edit`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(profile),
  });
};



