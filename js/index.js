let index = 0;
const slides = document.querySelectorAll(".carousel-item");
const totalSlides = slides.length;
const indicators = document.querySelectorAll(".indicator");

function showSlide(i) {
  const carouselInner = document.querySelector(".carousel-inner");
  index = (i + totalSlides) % totalSlides;
  carouselInner.style.transform = `translateX(-${index * 100}%)`;
  updateIndicators();
}

function nextSlide() {
  showSlide(index + 1);
}

function prevSlide() {
  showSlide(index - 1);
}

function updateIndicators() {
  indicators.forEach((dot, i) => {
    dot.classList.toggle("active", i === index);
  });
}

setInterval(nextSlide, 3000);


