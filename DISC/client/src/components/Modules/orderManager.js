const baseUrl = '/api/Order';

export const getAllOrders = () => {
    return fetch(baseUrl)
      .then((res) => res.json())
};

export const getOrderById = (orderId) => {
  return fetch(`${baseUrl}/${orderId}`)
  .then(res => res.json())
}

export const addOrder = (order) => {
    return fetch(baseUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(order),
    });
};

export const updateOrder = (editedOrder) => {
  return fetch(`${baseUrl}/${editedOrder.id}`, {
      method: "PUT",
      headers: {
          "Content-Type": "application/json"
      },
      body: JSON.stringify(editedOrder),
  });
};

export const getUsersMostRecentOrder = (userId) => {
  return fetch(`${baseUrl}/GetUsersMostRecentOrder/${userId}`)
    .then((res) => res.json())
};