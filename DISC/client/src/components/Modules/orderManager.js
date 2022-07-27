const baseUrl = '/api/Order';

// export const getAllOrders = () => {
//     return fetch(baseUrl)
//       .then((res) => res.json())
// };

export const addOrder = (order) => {
    return fetch(baseUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(order),
    });
};