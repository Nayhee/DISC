const baseUrl = '/api/Image';


export const getImageById = (id) => {
    return fetch(`${baseUrl}/${id}`)
      .then((response) => {
        const reader = response.body.getReader();
        return new ReadableStream({
          start(controller) {
            return pump();
            function pump() {
              return reader.read().then(({ done, value }) => {
                if (done) {
                  controller.close();
                  return;
                }
                controller.enqueue(value);
                return pump();
              });
            }
          },
        });
      })
      .then((stream) => new Response(stream))
      .then((response) => response.blob())
      .then((blob) => {
        return URL.createObjectURL(blob); //will return the URL. 
      });
  };
  
  export const postImage = (image) => {
    return fetch(baseUrl, {
      method: "POST",
      body: image,
    });
  };