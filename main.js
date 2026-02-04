// main.js - Código Lógico Completo
const grid = document.getElementById('gallery-grid');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const exifContainer = document.getElementById('exif-data-container');
const closeBtn = document.getElementById('close-btn');

// 1. CARGA DE GALERÍA
if (grid && typeof portfolioData !== 'undefined') {
    portfolioData.forEach(foto => {
        const item = document.createElement('div');
        item.classList.add('photo-item');
        const img = document.createElement('img');
        img.src = foto.src;
        img.alt = foto.alt;
        img.loading = "lazy";
        
        img.onload = () => img.classList.add('loaded');
        item.addEventListener('click', () => openLightbox(foto));
        item.appendChild(img);
        grid.appendChild(item);
    });
}

// 2. LIGHTBOX
function openLightbox(foto) {
    if (!lightbox) return;
    lightboxImg.src = foto.src;
    
    const info = foto.exif || { camara: "-", lente: "-", iso: "-", f: "-" };
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
if(lightbox) lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox || e.target.classList.contains('lightbox-content-wrapper')) closeLightbox();
});
document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeLightbox(); });

// 3. MODO OSCURO
const themeToggle = document.getElementById('theme-toggle');
const icon = themeToggle ? themeToggle.querySelector('i') : null;

// Cargar preferencia
if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark-mode');
    if(icon) { icon.classList.remove('fa-moon'); icon.classList.add('fa-sun'); }
}

if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        const isDark = document.body.classList.contains('dark-mode');
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
        if(icon) {
            icon.classList.toggle('fa-moon');
            icon.classList.toggle('fa-sun');
        }
    });
}