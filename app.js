document.addEventListener('DOMContentLoaded', () => {
    // 1. MANEJO DEL FORMULARIO DE INSCRIPCIÓN
    const form = document.getElementById('form-inscripcion');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const formData = new FormData(form);
            const datos = Object.fromEntries(formData.entries());
            console.log("Datos capturados:", datos);
            alert("¡Excelente! Tus datos han sido enviados. El equipo de Comunidad Emprendedora se pondrá en contacto pronto.");
            form.reset();
        });
    }

    // 2. LÓGICA DEL CARRUSEL DE EMPRENDEDORES
    const container = document.getElementById('carousel-container');
    const nextBtn = document.getElementById('next-btn');
    const prevBtn = document.getElementById('prev-btn');

    if (container && nextBtn && prevBtn) {
        nextBtn.addEventListener('click', () => {
            container.scrollBy({ left: 300, behavior: 'smooth' });
        });
        prevBtn.addEventListener('click', () => {
            container.scrollBy({ left: -300, behavior: 'smooth' });
        });
    }

    // 3. FUNCIONAMIENTO DE LOS BOTONES DEL BANNER (HERO)
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

    // 4. EFECTO DE REVELACIÓN (SCROLL ANIMATIONS)
    const observerOptions = {
        threshold: 0.10,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealOnScroll = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = "1";
                entry.target.style.transform = "translateY(0)";
            }
        });
    }, observerOptions);

    document.querySelectorAll('section').forEach(section => {
        section.style.opacity = "0";
        section.style.transform = "translateY(20px)";
        section.style.transition = "all 0.6s ease-out";
        revealOnScroll.observe(section);
    });

    // LÓGICA DEL CARRUSEL DE GALERÍA
const galleryContainer = document.getElementById('gallery-container');
const galleryNext = document.getElementById('gallery-next');
const galleryPrev = document.getElementById('gallery-prev');

if (galleryContainer && galleryNext && galleryPrev) {
    galleryNext.addEventListener('click', () => {
        // Desplaza el ancho de una tarjeta aproximadamente
        galleryContainer.scrollBy({ left: galleryContainer.offsetWidth * 0.8, behavior: 'smooth' });
    });

    galleryPrev.addEventListener('click', () => {
        galleryContainer.scrollBy({ left: -galleryContainer.offsetWidth * 0.8, behavior: 'smooth' });
    });
}
});