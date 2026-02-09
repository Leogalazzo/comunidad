document.addEventListener('DOMContentLoaded', () => {
    
    // 1. LÓGICA DEL BOTÓN SCROLL TOP
    const scrollTopBtn = document.getElementById('scroll-top-btn');
    if (scrollTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 400) {
                scrollTopBtn.classList.add('visible');
            } else {
                scrollTopBtn.classList.remove('visible');
            }
        });
        scrollTopBtn.onclick = () => window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    // 2. CARRUSEL INFINITO Y FLUIDO (EMPRENDEDORES)
    const container = document.getElementById('carousel-container');
    if (container) {
        container.innerHTML += container.innerHTML; 
        let scrollPos = 0;
        const speed = 0.5; 

        function autoScroll() {
            scrollPos += speed;
            if (scrollPos >= container.scrollWidth / 2) {
                scrollPos = 0;
            }
            container.scrollLeft = scrollPos;
            requestAnimationFrame(autoScroll);
        }
        requestAnimationFrame(autoScroll);
    }

    // 3. LÓGICA DE PREGUNTAS FRECUENTES (FAQ ACCORDION)
    document.querySelectorAll('.faq-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const item = btn.parentElement;
            item.classList.toggle('active');
        });
    });

    // 4. FUNCIONAMIENTO DE LOS BOTONES DEL BANNER (HERO)
    const btnParticipar = document.getElementById('btn-participar');
    const btnFeria = document.getElementById('btn-feria');

    if (btnParticipar) {
        btnParticipar.onclick = () => {
            document.getElementById('inscripcion').scrollIntoView({ behavior: 'smooth' });
        };
    }

    if (btnFeria) {
        btnFeria.onclick = () => {
            document.getElementById('seccion-feria').scrollIntoView({ behavior: 'smooth' });
        };
    }

    // 5. MANEJO DE LA POSTULACIÓN (REDIRIGE A WHATSAPP)
    // Ahora configurado como Solicitud de Admisión para filtrar nuevos emprendedores.
    const form = document.getElementById('form-inscripcion');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            // Captura de datos usando los nuevos IDs del formulario de admisión
            const nombre = document.getElementById('nombre-completo').value;
            const emprendimiento = document.getElementById('nombre-emprendimiento').value;
            const celular = document.getElementById('whatsapp-solicitante').value;
            const instagram = document.getElementById('instagram-emprendimiento').value;
            const productos = document.getElementById('descripcion-productos').value;

            // NÚMERO DEL COORDINADOR (Cambialo por el real aquí)
            const nroCoordinador = "5493735000000"; 

            // Construcción del mensaje para WhatsApp
            const mensaje = `*SOLICITUD DE ADMISIÓN - WEB*%0A` +
                            `----------------------------%0A` +
                            `👤 *Nombre:* ${nombre}%0A` +
                            `🚀 *Emprendimiento:* ${emprendimiento}%0A` +
                            `📱 *WhatsApp:* ${celular}%0A` +
                            `📸 *Instagram:* ${instagram}%0A` +
                            `📝 *Productos:* ${productos}`;

            // URL de WhatsApp y redirección
            const urlWa = `https://wa.me/${nroCoordinador}?text=${mensaje}`;
            
            // Abrir en pestaña nueva
            window.open(urlWa, '_blank');

            alert("¡Gracias por postularte! Se abrirá WhatsApp para que envíes tu información al equipo coordinador.");
            form.reset();
        });
    }

    // 6. EFECTO DE REVELACIÓN AL HACER SCROLL
    const revealOnScroll = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = "1";
                entry.target.style.transform = "translateY(0)";
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('section').forEach(section => {
        section.style.opacity = "0";
        section.style.transform = "translateY(20px)";
        section.style.transition = "all 0.6s ease-out";
        revealOnScroll.observe(section);
    });

    // 7. LÓGICA DEL CARRUSEL DE GALERÍA DE FOTOS
    const galleryContainer = document.getElementById('gallery-container');
    const galleryNext = document.getElementById('gallery-next');
    const galleryPrev = document.getElementById('gallery-prev');

    if (galleryContainer && galleryNext && galleryPrev) {
        galleryNext.addEventListener('click', () => {
            galleryContainer.scrollBy({ left: galleryContainer.offsetWidth * 0.8, behavior: 'smooth' });
        });
        galleryPrev.addEventListener('click', () => {
            galleryContainer.scrollBy({ left: -galleryContainer.offsetWidth * 0.8, behavior: 'smooth' });
        });
    }
});

// 8. FUNCIONES GLOBALES PARA EL MODAL DEL MAPA
function abrirMapa(urlEmbed) {
    const modal = document.getElementById('modal-mapa');
    const iframe = document.getElementById('iframe-mapa');
    const loader = document.getElementById('map-loader');
    const linkExterno = document.getElementById('link-google-maps');

    if (modal && iframe) {
        iframe.classList.add('opacity-0');
        if (loader) loader.classList.remove('hidden');
        
        iframe.src = urlEmbed;
        if (linkExterno) linkExterno.href = urlEmbed.replace('embed?', 'view?'); 
        
        modal.classList.remove('hidden');
        modal.classList.add('flex');
        document.body.style.overflow = 'hidden';
    }
}

function quitarLoader() {
    const loader = document.getElementById('map-loader');
    const iframe = document.getElementById('iframe-mapa');
    if (loader) loader.classList.add('hidden');
    if (iframe) iframe.classList.remove('opacity-0');
}

function cerrarMapa() {
    const modal = document.getElementById('modal-mapa');
    const iframe = document.getElementById('iframe-mapa');
    if (modal && iframe) {
        iframe.src = "";
        modal.classList.add('hidden');
        modal.classList.remove('flex');
        document.body.style.overflow = 'auto';
    }
}

window.onclick = function(event) {
    const modal = document.getElementById('modal-mapa');
    if (event.target == modal) {
        cerrarMapa();
    }
}

// 9. LÓGICA PARA EL MODAL DE FOTOS CON NAVEGACIÓN
let imagenesGaleria = [];
let indiceActual = 0;

// Al cargar el DOM, detectamos todas las fotos disponibles en la galería
document.addEventListener('DOMContentLoaded', () => {
    const imagenesHTML = document.querySelectorAll('#gallery-container img');
    imagenesGaleria = Array.from(imagenesHTML).map(img => img.getAttribute('src'));
});

// Ajuste en la función abrirFoto para manejar imágenes fuera de la galería
function abrirFoto(src) {
    const modal = document.getElementById('modal-foto');
    const img = document.getElementById('img-ampliada');
    
    if (modal && img) {
        // Buscamos si la imagen está en la galería para habilitar flechas
        const index = imagenesGaleria.indexOf(src);
        indiceActual = index !== -1 ? index : 0; 
        
        img.src = src;
        modal.classList.remove('hidden');
        modal.classList.add('flex');
        document.body.style.overflow = 'hidden';

        // Opcional: Ocultar flechas si la imagen no es parte de la galería
        const flechas = modal.querySelectorAll('button[onclick^="cambiarFoto"]');
        flechas.forEach(f => f.style.display = index === -1 ? 'none' : 'block');
    }
}
function cambiarFoto(direccion) {
    const img = document.getElementById('img-ampliada');
    const caption = document.getElementById('caption-foto'); // Seleccionamos el texto
    
    indiceActual += direccion;
    
    if (indiceActual < 0) {
        indiceActual = imagenesGaleria.length - 1;
    } else if (indiceActual >= imagenesGaleria.length) {
        indiceActual = 0;
    }
    
    // Efecto de transición para imagen y texto
    img.style.opacity = '0';
    caption.style.opacity = '0';
    caption.style.transform = 'translateY(10px)';

    setTimeout(() => {
        img.src = imagenesGaleria[indiceActual];
        img.style.opacity = '1';
        
        // El texto aparece con un leve movimiento hacia arriba
        caption.style.opacity = '1';
        caption.style.transform = 'translateY(0)';
        caption.style.transition = 'all 0.4s ease';
    }, 150);
}

function cerrarFoto() {
    const modal = document.getElementById('modal-foto');
    const img = document.getElementById('img-ampliada');
    
    if (modal && img) {
        img.classList.remove('scale-100');
        img.classList.add('scale-95');
        
        setTimeout(() => {
            modal.classList.add('hidden');
            modal.classList.remove('flex');
            document.body.style.overflow = 'auto';
            img.src = "";
        }, 200);
    }
}

// Control por teclado (Esc, Flechas Izquierda y Derecha)
window.addEventListener('keydown', (e) => {
    const modal = document.getElementById('modal-foto');
    if (modal && !modal.classList.contains('hidden')) {
        if (e.key === "Escape") cerrarFoto();
        if (e.key === "ArrowRight") cambiarFoto(1);
        if (e.key === "ArrowLeft") cambiarFoto(-1);
    }
});
