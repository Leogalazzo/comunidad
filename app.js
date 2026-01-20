document.addEventListener('DOMContentLoaded', () => {
    
    // 1. LÓGICA DEL BOTÓN SCROLL TOP
    // Aparece cuando el usuario baja 400px y lo lleva al inicio suavemente.
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
    // Duplica el contenido y se mueve permanentemente hacia la izquierda.
    const container = document.getElementById('carousel-container');
    if (container) {
        container.innerHTML += container.innerHTML; // Duplicamos para el bucle infinito
        let scrollPos = 0;
        const speed = 0.5; // Ajusta para cambiar la velocidad

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
    // Controla la apertura y cierre de las respuestas en faq.html.
    document.querySelectorAll('.faq-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const item = btn.parentElement;
            item.classList.toggle('active');
        });
    });

    // 4. FUNCIONAMIENTO DE LOS BOTONES DEL BANNER (HERO)
    // Desplazamiento suave a las secciones de Villa Ángela.
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

    // 5. MANEJO DEL FORMULARIO DE INSCRIPCIÓN
    // Captura los datos de los emprendedores locales.
    const form = document.getElementById('form-inscripcion');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const formData = new FormData(form);
            const datos = Object.fromEntries(formData.entries());
            console.log("Inscripción recibida:", datos);
            alert("¡Excelente! Tus datos han sido enviados. El equipo de Comunidad Emprendedora se pondrá en contacto pronto.");
            form.reset();
        });
    }

    // 6. EFECTO DE REVELACIÓN AL HACER SCROLL
    // Animación de entrada para todas las secciones.
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
// Movidas fuera del DOMContentLoaded para que el atributo 'onclick' de HTML pueda encontrarlas.

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

// Cerrar modal al hacer clic fuera del contenido
window.onclick = function(event) {
    const modal = document.getElementById('modal-mapa');
    if (event.target == modal) {
        cerrarMapa();
    }
}
