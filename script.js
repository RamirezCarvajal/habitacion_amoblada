document.addEventListener("DOMContentLoaded", () => {
  const carousels = document.querySelectorAll(".carousel");
  let lightboxIndex = 0;
  let currentCarousel = null;
  let autoSlideIntervals = [];
  
  // Inicializa los carruseles
  carousels.forEach((carousel, carouselIndex) => {
    const slides = carousel.querySelectorAll(".slides img");
    const dots = carousel.querySelectorAll(".dots span");
    let currentIndex = 0;
    
    const showSlide = (index) => {
      slides.forEach((slide, i) => {
        slide.style.display = i === index ? "block" : "none";
      });
      dots.forEach((dot, i) => {
        dot.classList.toggle("active", i === index);
      });
      currentIndex = index;
    };
    
    // Botones de navegación
    const prev = carousel.querySelector(".prev");
    const next = carousel.querySelector(".next");
    
    prev.addEventListener("click", () => {
      showSlide((currentIndex - 1 + slides.length) % slides.length);
    });
    
    next.addEventListener("click", () => {
      showSlide((currentIndex + 1) % slides.length);
    });
    
    // Dots
    dots.forEach((dot, i) => {
      dot.addEventListener("click", () => showSlide(i));
    });
    
    // Auto deslizamiento
    const startAutoSlide = () => {
      autoSlideIntervals[carouselIndex] = setInterval(() => {
        showSlide((currentIndex + 1) % slides.length);
      }, 5000);
    };
    
    const stopAutoSlide = () => {
      clearInterval(autoSlideIntervals[carouselIndex]);
    };
    
    // Pausar en hover o toque
    carousel.addEventListener("mouseenter", stopAutoSlide);
    carousel.addEventListener("mouseleave", startAutoSlide);
    carousel.addEventListener("touchstart", stopAutoSlide, { passive: true });
    carousel.addEventListener("touchend", startAutoSlide, { passive: true });
    
    // Mostrar la primera imagen y empezar auto
    showSlide(currentIndex);
    startAutoSlide();
    
    // Evento click para abrir el lightbox
    slides.forEach((img, i) => {
      img.addEventListener("click", () => {
        openLightbox(i, slides);
        currentCarousel = slides;
      });
    });
  });
  
  // Lightbox
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = lightbox.querySelector("img");
  const closeBtn = lightbox.querySelector(".close");
  const lightPrev = lightbox.querySelector(".light-prev");
  const lightNext = lightbox.querySelector(".light-next");
  
  const openLightbox = (index, slides) => {
    lightbox.style.display = "flex";
    lightboxImg.src = slides[index].src;
    lightboxIndex = index;
    currentCarousel = slides;
  };
  
  const closeLightbox = () => {
    lightbox.style.display = "none";
  };
  
  closeBtn.addEventListener("click", closeLightbox);
  
  lightPrev.addEventListener("click", () => {
    lightboxIndex = (lightboxIndex - 1 + currentCarousel.length) % currentCarousel.length;
    lightboxImg.src = currentCarousel[lightboxIndex].src;
  });
  
  lightNext.addEventListener("click", () => {
    lightboxIndex = (lightboxIndex + 1) % currentCarousel.length;
    lightboxImg.src = currentCarousel[lightboxIndex].src;
  });
  
  // Cerrar con clic fuera o tecla ESC
  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) closeLightbox();
  });
  
  document.addEventListener("keydown", (e) => {
    if (lightbox.style.display === "flex") {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") lightPrev.click();
      if (e.key === "ArrowRight") lightNext.click();
    }
  });
});