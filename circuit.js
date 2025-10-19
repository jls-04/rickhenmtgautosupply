// Gets search input and catalog items
const searchInput = document.getElementById("searchInput");
const catalogItems = document.querySelectorAll(".catalog-item");

// Listen for input
searchInput.addEventListener("input", () => {
  const filter = searchInput.value.toLowerCase().trim();

  catalogItems.forEach(item => {
    const text = item.textContent.toLowerCase();
    const imgAlt = item.querySelector("img")?.alt.toLowerCase() || "";

    if (text.includes(filter) || imgAlt.includes(filter)) {
      item.style.display = "inline-block";
    } else {
      item.style.display = "none"; 
    }
  });
});


document.addEventListener("DOMContentLoaded", () => {
    const catalogItems = document.querySelectorAll(".catalog-item img");
    const lightbox = document.getElementById("lightbox");
    const lightboxImg = document.querySelector(".lightbox-img");
    const closeBtn = document.querySelector(".lightbox .close");
    const prevBtn = document.querySelector(".lightbox .prev");
    const nextBtn = document.querySelector(".lightbox .next");
  
    let currentIndex = 0;
    let zoomLevel = 1; 
  
    const images = Array.from(catalogItems).map(img => img.src);
  
    //Open lightbox 
    catalogItems.forEach((img, index) => {
      img.addEventListener("click", () => {
        lightbox.style.display = "flex";
        lightboxImg.src = images[index];
        lightboxImg.style.transform = "scale(1)";
        currentIndex = index;
        zoomLevel = 1;
      });
    });
  
    // Close lightbox 
    closeBtn.addEventListener("click", () => {
      lightbox.style.display = "none";
    });
  
    // Next buttons 
    prevBtn.addEventListener("click", () => {
      currentIndex = (currentIndex - 1 + images.length) % images.length;
      lightboxImg.src = images[currentIndex];
      zoomLevel = 1;
      lightboxImg.style.transform = "scale(1)";
    });
  
    nextBtn.addEventListener("click", () => {
      currentIndex = (currentIndex + 1) % images.length;
      lightboxImg.src = images[currentIndex];
      zoomLevel = 1;
      lightboxImg.style.transform = "scale(1)";
    });
  
    // Click otside to close
    lightbox.addEventListener("click", (e) => {
      if (e.target === lightbox) {
        lightbox.style.display = "none";
      }
    });
  
    // Zoom in/out with mouse wheel 
    lightboxImg.addEventListener("wheel", (e) => {
      e.preventDefault();
      if (e.deltaY < 0) {
        zoomLevel += 0.1; 
      } else {
        zoomLevel = Math.max(1, zoomLevel - 0.1); 
      }
      lightboxImg.style.transform = `scale(${zoomLevel})`;
    });
  
    // Drag image when zoom
    let isDragging = false;
    let startX, startY, moveX = 0, moveY = 0;
  
    lightboxImg.addEventListener("mousedown", (e) => {
      if (zoomLevel > 1) {
        isDragging = true;
        startX = e.clientX - moveX;
        startY = e.clientY - moveY;
        lightboxImg.style.cursor = "grabbing";
      }
    });
  
    window.addEventListener("mouseup", () => {
      isDragging = false;
      lightboxImg.style.cursor = "grab";
    });
  
    window.addEventListener("mousemove", (e) => {
      if (!isDragging) return;
      moveX = e.clientX - startX;
      moveY = e.clientY - startY;
      lightboxImg.style.transform = `scale(${zoomLevel}) translate(${moveX / zoomLevel}px, ${moveY / zoomLevel}px)`;
    });
  });
  