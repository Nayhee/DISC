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
    }).then(result => result.json())
}

export const updateDisc  = (editedDisc) => {
    return fetch(`${baseUrl}/${editedDisc.id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(editedDisc)
    }).then(data => data.json());
}




export const getAllBrands = () => {
  return fetch(`${baseUrl}/GetBrands`)
  .then(res => res.json())
}