const baseUrl = 'api/Round';



export const getAUsersRounds = (userId) => {
    return fetch(`${baseUrl}/${userId}`)
    .then(res => res.json())
}

export const addRound = (newRound) => {
    return fetch(baseUrl, {
      method: "POST",
      headers: {
          "Content-Type": "application/json"
      },
      body: JSON.stringify(newRound),
    });
};

export const deleteRound = (id) => {
    return fetch(`${baseUrl}/${id}`, {
        method: "DELETE"
    })
};