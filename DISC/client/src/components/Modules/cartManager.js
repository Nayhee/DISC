const baseUrl = '/api/Cart';


export const addCart = (cart) => {
    return fetch(baseUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(cart),
    });
  };

  export const getUsersCurrentCart = (userId) => {
    return fetch(`${baseUrl}/${userId}`)
    .then(res => res.json())
}


export const getCartDiscId = (cartId, discId) => {
  return fetch(`${baseUrl}Disc/GetCartDiscId/${cartId}/${discId}`)
  .then(res => res.json())
}


export const addDiscToCart = (cartDisc) => {
  return fetch(`${baseUrl}Disc`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(cartDisc),
  });
};

export const removeDiscFromCart = (cartDiscId) => {
  return fetch(`${baseUrl}Disc/${cartDiscId}`, {
      method: "DELETE"
  });
}