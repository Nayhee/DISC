const baseUrl = '/api/Payment';

export const getAllPayments = () => {
    return fetch(baseUrl)
      .then((res) => res.json())
};


export const addPayment = (payment) => {
    return fetch(baseUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(payment),
    });
};


export const getPaymentById = (paymentId) => {
  return fetch(`${baseUrl}/${paymentId}`)
  .then(res => res.json())
}


export const updatePayment = (payment) => {
    return fetch(`${baseUrl}/${payment.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(payment),
    });
  };