document.addEventListener("DOMContentLoaded", () => {
    gsap.registerPlugin(ScrollTrigger);

    // Efek Shadow pada Navbar saat Scroll
    const navbar = document.getElementById("navbar");
    if (navbar) {
        window.addEventListener("scroll", () => {
            if (window.scrollY > 50) {
                navbar.classList.add("scrolled");
            } else {
                navbar.classList.remove("scrolled");
            }
        });
    }

    // Animasi Section saat di-scroll
    document.querySelectorAll("main section").forEach((section) => {
        // Hindari menganimasikan section yang hanya berisi gambar marquee
        if (section.id !== 'partners') {
            let wrapper = document.createElement("div");
            while (section.firstChild) {
                wrapper.appendChild(section.firstChild);
            }
            section.appendChild(wrapper);

            gsap.from(wrapper, {
                scrollTrigger: {
                    trigger: section,
                    start: "top 85%",
                    toggleActions: "play none none none"
                },
                opacity: 0,
                y: 50,
                duration: 0.8,
                ease: "power3.out",
            });
        }
    });

    // Penanda Navbar Aktif saat Scroll
    const navLinks = gsap.utils.toArray(".nav-link");
    const contentSections = gsap.utils.toArray("main section");
    contentSections.forEach(section => {
        ScrollTrigger.create({
            trigger: section,
            start: "top center",
            end: "bottom center",
            onToggle: self => {
                const navLink = document.querySelector(`.nav-link[href="#${section.id}"]`);
                if (navLink) {
                    navLink.classList.toggle("active", self.isActive);
                }
            }
        });
    });

    // Hamburger Menu Logic
    const hamburger = document.getElementById("hamburger-menu");
    const navMenu = document.getElementById("nav-menu");
    if (hamburger && navMenu) {
        hamburger.addEventListener("click", () => {
            const isActive = hamburger.classList.toggle("active");
            navMenu.classList.toggle("active");
            hamburger.setAttribute("aria-expanded", isActive);
        });

        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                hamburger.setAttribute("aria-expanded", "false");
            });
        });
    }

    // Tab Harga
    const tabButtons = document.querySelectorAll(".tab-btn");
    const tabPanes = document.querySelectorAll(".tab-pane");
    if (tabButtons.length > 0 && tabPanes.length > 0) {
        tabButtons.forEach(button => {
            button.addEventListener("click", () => {
                const targetTab = button.getAttribute("data-tab");
                tabButtons.forEach(btn => btn.classList.remove("active"));
                button.classList.add("active");
                tabPanes.forEach(pane => {
                    pane.id === targetTab ? pane.classList.add("active") : pane.classList.remove("active");
                });
            });
        });
    }

    // Form Kontak ke WhatsApp
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const nama = document.getElementById('nama').value;
            const email = document.getElementById('email').value;
            const subjek = document.getElementById('subjek').value;
            const pesan = document.getElementById('pesan').value;

            const nomorWhatsApp = '6283833962540'; // Ganti dengan nomor WA Anda

            const formatPesan = `
Halo, Ragency. Saya ingin bertanya.

*Nama:* ${nama}
*Email:* ${email}
*Subjek:* ${subjek}

*Pesan:*
${pesan}
            `;

            const whatsappURL = `https://wa.me/${nomorWhatsApp}?text=${encodeURIComponent(formatPesan.trim())}`;

            window.open(whatsappURL, '_blank');
        });
    }

    // Tombol Back to Top
    const backToTopButton = document.getElementById("back-to-top-btn");
    if (backToTopButton) {
        window.addEventListener("scroll", () => {
            if (window.scrollY > 300) {
                backToTopButton.classList.add("visible");
            } else {
                backToTopButton.classList.remove("visible");
            }
        });

        backToTopButton.addEventListener("click", (e) => {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        });
    }
});