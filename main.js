// main.js - Versión Educativa
const grid = document.getElementById('gallery-grid');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const exifContainer = document.getElementById('exif-data-container'); // Nuevo contenedor
const closeBtn = document.getElementById('close-btn');

if (grid && typeof portfolioData !== 'undefined') {
    portfolioData.forEach(foto => {
        const item = document.createElement('div');
        item.classList.add('photo-item');
        
        const img = document.createElement('img');
        img.src = foto.src;
        img.alt = foto.alt;
        img.loading = "lazy";

        img.onload = () => img.classList.add('loaded');
        
        item.addEventListener('click', () => {
            openLightbox(foto); // Pasamos el OBJETO entero, no solo la src
        });

        item.appendChild(img);
        grid.appendChild(item);
    });
}

function openLightbox(foto) {
    if (!lightbox) return;
    
    lightboxImg.src = foto.src;
    
    // INYECTAR DATOS EXIF
    // Si la foto tiene datos, los mostramos. Si no, ponemos "N/A"
    const info = foto.exif || { camara: "-", lente: "-", iso: "-", f: "-" };
    
    // Renderizamos el HTML del panel EXIF dinámicamente
    if(exifContainer) {
        exifContainer.innerHTML = `
            <div class="exif-panel">
                <h3 class="exif-title">${foto.category || 'Fotografía'}</h3>
                <div class="exif-data">
                    <p>Cámara <span>${info.camara}</span></p>
                    <p>Lente <span>${info.lente}</span></p>
                    <p>ISO <span>${info.iso}</span></p>
                    <p>Apertura <span>${info.f}</span></p>
                    <p>Velocidad <span>${info.exp}</span></p>
                </div>
            </div>
        `;
    }

    lightbox.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    lightbox.classList.add('hidden');
    setTimeout(() => { lightboxImg.src = ''; }, 300);
    document.body.style.overflow = 'auto';
}

if(closeBtn) closeBtn.addEventListener('click', closeLightbox);
if(lightbox) {
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox || e.target.classList.contains('lightbox-content-wrapper')) closeLightbox();
    });
}
document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeLightbox(); });
// --- LÓGICA MODO OSCURO / CLARO ---
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;
const icon = themeToggle ? themeToggle.querySelector('i') : null;

// 1. Verificar si ya hay una preferencia guardada
const currentTheme = localStorage.getItem('theme');

if (currentTheme === 'dark') {
    body.classList.add('dark-mode');
    if(icon) {
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun'); // Cambiar icono a sol
    }
}

// 2. Función al hacer clic
if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
        
        // Cambiar icono y guardar preferencia
        if (body.classList.contains('dark-mode')) {
            localStorage.setItem('theme', 'dark');
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
        } else {
            localStorage.setItem('theme', 'light');
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
        }
    });
}