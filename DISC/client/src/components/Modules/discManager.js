const baseUrl = '/api/Disc';

export const getAllDiscs = () => {
    return fetch(baseUrl)
      .then((res) => res.json())
  };

  export const getDiscById = (discId) => {
    return fetch(`${baseUrl}/${discId}`)
    .then(res => res.json())
}
  
  export const addDisc = (disc) => {
    return fetch(baseUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(disc),
    });
  };

  export const deleteDisc = (id) => {
    return fetch(`${baseUrl}/${id}`, {
        method: "DELETE"
    })
};

export const updateDisc = (editedDisc) => {
    return fetch(`${baseUrl}/${editedDisc.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(editedDisc),
    });
};




export const getAllBrands = () => {
  return fetch(`${baseUrl}/GetBrands`)
  .then(res => res.json())
}