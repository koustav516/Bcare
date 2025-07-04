document.addEventListener("DOMContentLoaded", () => {
  const gallery = document.getElementById("dynamic-gallery");
  const title = document.getElementById("gallery-title");

  const urlParams = new URLSearchParams(window.location.search);
  const category = urlParams.get("category");
  const imageBasePath = `./public/${category}/`;

  const images = {
    lab: ["lab1.jpg", "lab2.jpg", "lab3.jpg","lab4.jpg","lab5.jpg","lab6.jpeg","lab7.jpeg","lab8.jpg","lab9.jpeg","lab10.jpeg","lab11.jpeg", "lab12.jpg","lab13.jpg","lab14.jpg"],
    event: ["event1.jpg", "event2.jpg", "event3.jpg","event4.jpg","event5.jpg"],
    campus: ["campus1.jpg", "campus2.jpg","campus3.jpg","campus4.jpg","campus5.jpg"]
  };

  if (!images[category]) {
    title.textContent = "Gallery - Unknown Category";
    gallery.innerHTML = "<p>No images found for this category.</p>";
    return;
  }

  title.textContent = `Gallery - ${category.charAt(0).toUpperCase() + category.slice(1)}`;

  images[category].forEach(img => {
    const imgElem = document.createElement("img");
    imgElem.src = `${imageBasePath}${img}`;
    imgElem.alt = `${category} image`;
    imgElem.className = "gallery-item";
    gallery.appendChild(imgElem);
  });
});

