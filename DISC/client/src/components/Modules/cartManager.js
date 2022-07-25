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

// export const addDiscToCart = (cartId, discId) => {
//   return fetch(baseUrl, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(cartId, discId),
//   });
// };