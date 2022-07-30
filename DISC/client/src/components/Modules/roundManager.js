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


// export const getAllRounds = () => {
//     return fetch(baseUrl)
//     .then(res => res.json())
// }