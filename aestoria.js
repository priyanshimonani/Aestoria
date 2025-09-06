function search(category) {
  document.getElementById("trial").innerText = category;
  document.getElementById("trial").innerText = "yayy";
  fetch(`https://api.harvardartmuseums.org/object?apikey=a3516175-d7de-4012-9a7c-73df61ff62c5&size=10&classification=${category}`)
    .then(response => response.json())
    .then(data => {
      const container = document.getElementById("images");
      container.innerHTML = "";

      if (data.records) {
        data.records.forEach(item => {
          if (item.primaryimageurl) {
            const image = document.createElement("div");
            const artist = item.people && item.people.length > 0 ? item.people[0].name : "Unknown Artist";
            const titlemodalc=item.title;
            image.innerHTML = `
              <div style="background:white; color:black; padding:10px; margin:15px; border-radius:8px; padding-top:4px; 
              box-shadow: 0 4px 8px rgba(0,0,0,0.2); text-align:center; width:320px; ">
              
              <img class="open-img" src="${item.primaryimageurl}" loading="lazy" width="300"  data-msrc="${item.primaryimageurl}" data-title="${item.title || 'Untitled'}" data-artistm="${item.people && item.people.length > 0 ? item.people[0].name : "Unknown Artist"}" data-desc="${item.description || 'No Description Available'}" 
              style="margin:auto; border:1px solid #ccc; border-radius: 8px; box-shadow: 0 4px 8px rgba(0,0,0,0.2); max-height: 500px;"/>
              <h3>${item.title}</h3>
              </div>
            `;
            container.appendChild(image);
          } else {
            console.log("No image for:", item.title);
          }
        });
          document.querySelectorAll(".open-img").forEach(img => {
  img.addEventListener("click", function() {
    console.log("Clicked image:", this.src);
    const modal = document.getElementById("modal-container");
    document.getElementById("modalimg").src = this.dataset.msrc;
    document.getElementById("title").innerText=this.dataset.title;
    document.getElementById("artist").innerText="by"+this.dataset.artistm;
    document.getElementById("desc").innerText=this.dataset.desc;
    modal.classList.remove("hidden");   // show modal
    
  });
});

// Close button
document.getElementById("close").addEventListener("click", function() {
  const modal = document.getElementById("modal-container");
  modal.classList.add("hidden");   // hide modal
});

      }
    })    .catch(error => console.error("Error fetching artworks:", error));
}
