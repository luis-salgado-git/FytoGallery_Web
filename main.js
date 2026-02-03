// main.js - Lógica Principal

// Referencias a los elementos del HTML
const grid = document.getElementById('gallery-grid');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const closeBtn = document.getElementById('close-btn');

// ==========================================
// 1. LÓGICA DE LA GALERÍA (Solo si existe el grid)
// ==========================================
if (grid) {
    // Comprobamos si la base de datos (data.js) cargó correctamente
    if (typeof portfolioData !== 'undefined') {
        
        portfolioData.forEach(foto => {
            // Crear el contenedor de la foto (la tarjeta)
            const item = document.createElement('div');
            item.classList.add('photo-item');

            // Crear la imagen
            const img = document.createElement('img');
            img.src = foto.src;
            img.alt = foto.alt;
            img.loading = "lazy"; // Carga diferida para rendimiento

            // --- LÓGICA DE CARGA SUAVE (Skeleton + Fade In) ---
            // Esta función se ejecuta cuando la imagen termina de descargarse del internet
            const imageLoaded = () => {
                img.classList.add('loaded'); // Activa la opacidad 1 en CSS
                item.style.animation = 'none'; // Detiene el parpadeo gris de carga
            };

            img.onload = imageLoaded;

            // Verificación extra: Si la imagen ya estaba en caché (memoria), 
            // el evento onload a veces no salta, así que forzamos la función.
            if (img.complete) {
                imageLoaded();
            }
            // --------------------------------------------------

            // Evento click para abrir el Lightbox
            item.addEventListener('click', () => {
                if (lightbox) openLightbox(foto.src);
            });

            // Ensamblaje: Meter img dentro de item, y item dentro del grid
            item.appendChild(img);
            grid.appendChild(item);
        });

    } else {
        console.error("Error: No se encontró 'portfolioData'. Asegúrate de cargar data.js antes que main.js");
    }
}

// ==========================================
// 2. LÓGICA DEL LIGHTBOX (Visor a pantalla completa)
// ==========================================
if (lightbox) {

    // Función para ABRIR
    function openLightbox(src) {
        lightboxImg.src = src; // Pone la foto que has clicado
        lightbox.classList.remove('hidden'); // Quita la invisibilidad
        document.body.style.overflow = 'hidden'; // Bloquea el scroll de la página de fondo
    }

    // Función para CERRAR
    function closeLightbox() {
        lightbox.classList.add('hidden'); // Vuelve a ocultarlo
        setTimeout(() => {
            lightboxImg.src = ''; // Limpia la imagen para ahorrar memoria (tras la animación)
        }, 300);
        document.body.style.overflow = 'auto'; // Reactiva el scroll
    }

    // --- Eventos de Cierre ---
    
    // 1. Clic en la "X"
    closeBtn.addEventListener('click', closeLightbox);

    // 2. Clic en el fondo negro (fuera de la foto)
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) closeLightbox();
    });

    // 3. Pulsar la tecla ESCAPE
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeLightbox();
    });
}