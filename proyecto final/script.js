let currentIndex = 0;

const images = document.querySelectorAll('.slider-container img');
const totalImages = images.length;

function showImage(index) {
    const sliderContainer = document.querySelector('.slider-container');
    const offset = -index * (100 / totalImages);
    sliderContainer.style.transform = `translateX(${offset}%)`;
}

function nextImage() {
    currentIndex = (currentIndex + 1) % totalImages; // Ciclo al inicio
    showImage(currentIndex);
}

function prevImage() {
    currentIndex = (currentIndex - 1 + totalImages) % totalImages; // Ciclo al final
    showImage(currentIndex);
}

// Cambiar automáticamente cada 3 segundos
setInterval(nextImage, 3000);

// Comentado para ocultar botones
/*
const prevButton = document.createElement('button');
prevButton.textContent = 'Prev';
prevButton.classList.add('prev');
prevButton.onclick = prevImage;

const nextButton = document.createElement('button');
nextButton.textContent = 'Next';
nextButton.classList.add('next');
nextButton.onclick = nextImage;

document.querySelector('.carrusel').appendChild(prevButton);
document.querySelector('.carrusel').appendChild(nextButton);
*/