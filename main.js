// Referencias al HTML
const grid = document.getElementById('gallery-grid');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const closeBtn = document.getElementById('close-btn');

// 1. RENDERIZADO (Pintar las fotos)
// Comprobamos si hay datos para evitar errores
if (typeof portfolioData !== 'undefined') {
    portfolioData.forEach(foto => {
        const item = document.createElement('div');
        item.classList.add('photo-item');

        const img = document.createElement('img');
        img.src = foto.src;
        img.alt = foto.alt;
        img.loading = "lazy"; 

        // Al hacer clic, abrimos el visor
        item.addEventListener('click', () => {
            openLightbox(foto.src);
        });

        item.appendChild(img);
        grid.appendChild(item);
    });
} else {
    console.error("No se encontró portfolioData. Revisa que data.js esté cargado antes.");
}

// 2. FUNCIONES DEL VISOR
function openLightbox(src) {
    lightboxImg.src = src;
    lightbox.classList.remove('hidden');
    document.body.style.overflow = 'hidden'; // Bloquea scroll
}

function closeLightbox() {
    lightbox.classList.add('hidden');
    lightboxImg.src = '';
    document.body.style.overflow = 'auto'; // Reactiva scroll
}

// Cerrar eventos
closeBtn.addEventListener('click', closeLightbox);
lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
});
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeLightbox();
});