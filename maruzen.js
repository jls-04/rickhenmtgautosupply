document.addEventListener("DOMContentLoaded", () => {

    // SEARCH FILTER FUNCTION
    const searchInput = document.getElementById("searchInput");
    const items = document.querySelectorAll(".catalog-item");
  
    searchInput.addEventListener("input", () => {
      const query = searchInput.value.toLowerCase().trim();
  
      items.forEach(item => {
        const text = item.textContent.toLowerCase();
        if (text.includes(query)) {
          item.style.display = "block";
          item.style.animation = "fadeSlideUp 0.5s ease forwards";
        } else {
          item.style.display = "none";
        }
      });
    });
  
    // LIGHTBOX FUNCTIONALITY
    const lightbox = document.getElementById("lightbox");
    const lightboxImg = document.querySelector(".lightbox-img");
    const closeBtn = document.querySelector(".lightbox .close");
    const nextBtn = document.querySelector(".lightbox .next");
    const prevBtn = document.querySelector(".lightbox .prev");
  
    const imgElements = document.querySelectorAll(".catalog-item img");
    let currentIndex = 0;
  
    // Open Lightbox
    imgElements.forEach((img, index) => {
      img.addEventListener("click", () => {
        lightbox.style.display = "flex";
        lightboxImg.src = img.src;
        currentIndex = index;
        document.body.style.overflow = "hidden";
      });
    });
  
    // Close Lightbox
    closeBtn.addEventListener("click", () => {
      lightbox.style.display = "none";
      document.body.style.overflow = "auto";
    });
  
    // Next Image
    nextBtn.addEventListener("click", () => {
      currentIndex = (currentIndex + 1) % imgElements.length;
      lightboxImg.src = imgElements[currentIndex].src;
    });
  
    // Previous Image
    prevBtn.addEventListener("click", () => {
      currentIndex = (currentIndex - 1 + imgElements.length) % imgElements.length;
      lightboxImg.src = imgElements[currentIndex].src;
    });
  
    // Close on background click
    lightbox.addEventListener("click", (e) => {
      if (e.target === lightbox) {
        lightbox.style.display = "none";
        document.body.style.overflow = "auto";
      }
    });
  
    // Close on ESC key
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        lightbox.style.display = "none";
        document.body.style.overflow = "auto";
      }
    });
  
  });
  
  

  