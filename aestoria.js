function search() {
  document.getElementById("trial").innerText = "yayy";

  fetch("https://api.harvardartmuseums.org/object?apikey=a3516175-d7de-4012-9a7c-73df61ff62c5&size=50&classification=Paintings")
    .then(response => response.json())
    .then(data => {
      const container = document.getElementById("images");
      container.innerHTML = "";

      if (data.records) {
        data.records.forEach(item => {
          if (item.primaryimageurl) {
            const image = document.createElement("div");
            image.innerHTML = `
              <img src="${item.primaryimageurl}" width="400" style="margin:10px; border:1px solid #ccc"/>
              <h3>${item.title}</h3>
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