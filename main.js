import { portfolioData } from './data.js';

const grid = document.getElementById('gallery-grid');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const closeBtn = document.getElementById('close-btn');

// 1. RENDERIZADO DEL GRID
portfolioData.forEach(foto => {
    // Crear contenedor de la foto
    const item = document.createElement('div');
    item.classList.add('photo-item');

    // Crear la imagen
    const img = document.createElement('img');
    img.src = foto.src;
    img.alt = foto.alt;
    img.loading = "lazy"; // CRÍTICO: Carga diferida para rendimiento

    // Evento para abrir Lightbox
    item.addEventListener('click', () => {
        openLightbox(foto.src);
    });

    // Ensamblar
    item.appendChild(img);
    grid.appendChild(item);
});

// 2. LÓGICA DEL LIGHTBOX (VISOR)
function openLightbox(src) {
    lightboxImg.src = src;
    lightbox.classList.remove('hidden');
    document.body.style.overflow = 'hidden'; // Bloquea el scroll del fondo
}

function closeLightbox() {
    lightbox.classList.add('hidden');
    lightboxImg.src = ''; // Limpiar src
    document.body.style.overflow = 'auto'; // Reactiva el scroll
}

// Cerrar con botón, click fuera o tecla ESC
closeBtn.addEventListener('click', closeLightbox);

lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeLightbox();
});