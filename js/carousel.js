// Carousel functionality for homepage

let currentSlideIndex = 1;
let autoSlideInterval;

function initCarousel() {
    showSlide(currentSlideIndex);
    startAutoSlide();
}

function startAutoSlide() {
    // Auto-advance every 5 seconds
    autoSlideInterval = setInterval(() => {
        moveCarousel(1);
    }, 5000);
}

function stopAutoSlide() {
    clearInterval(autoSlideInterval);
}

function moveCarousel(n) {
    stopAutoSlide();
    showSlide(currentSlideIndex += n);
    startAutoSlide();
}

function currentSlide(n) {
    stopAutoSlide();
    showSlide(currentSlideIndex = n);
    startAutoSlide();
}

function showSlide(n) {
    const slides = document.getElementsByClassName('carousel-slide');
    const dots = document.getElementsByClassName('dot');
    
    if (!slides.length) return;
    
    if (n > slides.length) {
        currentSlideIndex = 1;
    }
    if (n < 1) {
        currentSlideIndex = slides.length;
    }
    
    // Hide all slides
    for (let i = 0; i < slides.length; i++) {
        slides[i].classList.remove('active');
    }
    
    // Remove active from all dots
    for (let i = 0; i < dots.length; i++) {
        dots[i].classList.remove('active');
    }
    
    // Show current slide
    slides[currentSlideIndex - 1].classList.add('active');
    dots[currentSlideIndex - 1].classList.add('active');
}

// Pause auto-slide on hover
document.addEventListener('DOMContentLoaded', () => {
    const carouselContainer = document.querySelector('.carousel-container');
    if (carouselContainer) {
        carouselContainer.addEventListener('mouseenter', stopAutoSlide);
        carouselContainer.addEventListener('mouseleave', startAutoSlide);
    }
});
