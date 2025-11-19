document.addEventListener('DOMContentLoaded', function() {

    // ===============================
    // Smooth Scroll (Anchor Only)
    // ===============================
    const navLinks = document.querySelectorAll('nav a');

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');

            // kalau bukan anchor (#), biarin jalan normal
            if (!href || !href.startsWith('#')) return;

            e.preventDefault();
            const targetSection = document.querySelector(href);

            if (targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });



    // ===============================
    // Animasi card & foto
    // ===============================
    const cards = document.querySelectorAll('.card');
    const photos = document.querySelectorAll('.photo-rectangle, .photo-ellipse');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0) scale(1)';
            }
        });
    }, { threshold: 0.1 });

    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.5s, transform 0.5s';
        observer.observe(card);
    });

    photos.forEach(photo => {
        photo.style.opacity = '0';
        photo.style.transform = 'scale(0.9)';
        photo.style.transition = 'opacity 0.5s, transform 0.5s';
        observer.observe(photo);
    });



    // ===============================
    // Upload gambar
    // ===============================
    const photoPlaceholders = document.querySelectorAll('.photo-placeholder');

    photoPlaceholders.forEach(placeholder => {
        placeholder.addEventListener('click', function() {
            const parent = this.parentElement;
            const input = document.createElement('input');
            input.type = 'file';
            input.accept = 'image/*';

            input.addEventListener('change', function() {
                if (this.files && this.files[0]) {
                    const reader = new FileReader();
                    reader.onload = function(e) {
                        parent.style.backgroundImage = `url(${e.target.result})`;
                        parent.innerHTML = '';
                    }
                    reader.readAsDataURL(this.files[0]);
                }
            });

            input.click();
        });
    });

});