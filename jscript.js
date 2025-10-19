document.addEventListener("DOMContentLoaded", () => {
  // Scroll-triggered 
  const popUpEls = document.querySelectorAll(".popUp");
  const slideEls = document.querySelectorAll(".about, .highlight");
  const whyCards = document.querySelectorAll(".why-card");
  const reviewCards = document.querySelectorAll(".review-card");
  const contactBoxes = document.querySelectorAll(".contact-info, .socials");

  function animateOnIntersect(entries, observer, stagger = null, delay = 0) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        if (stagger) {
          stagger.forEach((el, i) => {
            setTimeout(() => el.classList.add("visible"), i * delay);
          });
        } else {
          entry.target.classList.add(
            entry.target.classList.contains("contact-info") || entry.target.classList.contains("socials") 
              ? "show" 
              : "visible"
          );
        }
        observer.unobserve(entry.target);
      }
    });
  }

  const observerOptions = { threshold: 0.2 };

  const popUpObserver = new IntersectionObserver((entries, observer) => animateOnIntersect(entries, observer), observerOptions);
  popUpEls.forEach(el => popUpObserver.observe(el));

  const slideObserver = new IntersectionObserver((entries, observer) => animateOnIntersect(entries, observer), observerOptions);
  slideEls.forEach(el => slideObserver.observe(el));

  const whyObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        whyCards.forEach((card, i) => setTimeout(() => card.classList.add("visible"), i * 200));
        observer.disconnect();
      }
    });
  }, observerOptions);
  if (whyCards.length) whyObserver.observe(whyCards[0]);

  const reviewObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        reviewCards.forEach((card, i) => setTimeout(() => card.classList.add("visible"), i * 250));
        observer.disconnect();
      }
    });
  }, observerOptions);
  if (reviewCards.length) reviewObserver.observe(reviewCards[0]);

  const contactObserver = new IntersectionObserver((entries) => animateOnIntersect(entries, null), { threshold: 0.3 });
  contactBoxes.forEach(box => contactObserver.observe(box));

  // Navbar click replay animation 
  document.querySelectorAll(".navbar ul li a").forEach(link => {
    link.addEventListener("click", e => {
      e.preventDefault();
      const targetId = link.getAttribute("href");
      const section = document.querySelector(targetId);
      if (!section) return;

      section.scrollIntoView({ behavior: "smooth" });

      // Replay animations for regular elements
      const regularEls = section.querySelectorAll(".popUp, .about, .highlight, .contact-info, .socials");
      regularEls.forEach(el => {
        el.classList.remove("visible", "show");
        void el.offsetWidth; 
        el.classList.add(el.classList.contains("contact-info") || el.classList.contains("socials") ? "show" : "visible");
      });

      // Replay stagered WHY
      const sectionWhyCards = section.querySelectorAll(".why-card");
      if (sectionWhyCards.length) {
        sectionWhyCards.forEach(c => c.classList.remove("visible"));
        sectionWhyCards.forEach((c, i) => setTimeout(() => c.classList.add("visible"), i * 200));
      }

      // Replay staggered Reviews
      const sectionReviewCards = section.querySelectorAll(".review-card");
      if (sectionReviewCards.length) {
        sectionReviewCards.forEach(c => c.classList.remove("visible"));
        sectionReviewCards.forEach((c, i) => setTimeout(() => c.classList.add("visible"), i * 250));
      }
    });
  });
});






  