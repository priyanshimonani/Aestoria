function search(category) {
  document.getElementById("trial").innerText = category;
  document.getElementById("trial").innerText = "yayy";
  fetch(`https://api.harvardartmuseums.org/object?apikey=a3516175-d7de-4012-9a7c-73df61ff62c5&size=50&classification=${category}`)
    .then(response => response.json())
    .then(data => {
      const container = document.getElementById("images");
      container.innerHTML = "";

      if (data.records) {
        data.records.forEach(item => {
          if (item.primaryimageurl) {
            const image = document.createElement("div");
            image.innerHTML = `
              <div style="background:white; padding:10px; margin:15px; border-radius:8px; 
              box-shadow: 0 4px 8px rgba(0,0,0,0.2); text-align:center; width:320px;">
              <img src="${item.primaryimageurl}" width="300" style="margin:10px; border:1px solid #ccc"/>
              <h3>${item.title}</h3>
              <h3>${item.dated}</h3>
              </div>
            `;
            container.appendChild(image);
          } else {
            console.log("No image for:", item.title);
          }
        });
      }
    })
    .catch(error => console.error("Error fetching artworks:", error));
}
