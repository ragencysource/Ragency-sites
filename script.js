document.addEventListener("DOMContentLoaded", () => {
    gsap.registerPlugin(ScrollTrigger);

    const navbar = document.getElementById("navbar");
    const backToTopButton = document.getElementById("back-to-top-btn");

    window.addEventListener("scroll", () => {
        const scrollY = window.scrollY;
        if (navbar) {
            if (scrollY > 50) {
                navbar.classList.add("scrolled");
            } else {
                navbar.classList.remove("scrolled");
            }
        }
        if (backToTopButton) {
            if (scrollY > 300) {
                backToTopButton.classList.add("visible");
            } else {
                backToTopButton.classList.remove("visible");
            }
        }
    });

    if (backToTopButton) {
        backToTopButton.addEventListener("click", (e) => {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        });
    }

    document.querySelectorAll("main section").forEach((section) => {
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

    const hamburger = document.getElementById("hamburger-menu");
    const navMenu = document.getElementById("nav-menu");
    if (hamburger && navMenu) {
        const closeMenu = () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            hamburger.setAttribute("aria-expanded", "false");
        };
        hamburger.addEventListener("click", () => {
            const isActive = hamburger.classList.toggle("active");
            navMenu.classList.toggle("active");
            hamburger.setAttribute("aria-expanded", isActive);
        });
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', closeMenu);
        });
        document.addEventListener('click', (e) => {
            if (navMenu.classList.contains('active') && !navMenu.contains(e.target) && !hamburger.contains(e.target)) {
                closeMenu();
            }
        });
    }

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

    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();
            const nama = document.getElementById('nama').value;
            const email = document.getElementById('email').value;
            const subjek = document.getElementById('subjek').value;
            const pesan = document.getElementById('pesan').value;
            const nomorWhatsApp = '6283833962540';
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

    const openModalButtons = document.querySelectorAll('[data-modal-target]');
    const closeModalElements = document.querySelectorAll('[data-modal-close]');

    const openModal = (modal) => {
        if (modal == null) return;
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    };

    const closeModal = (modal) => {
        if (modal == null) return;
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    };

    openModalButtons.forEach(button => {
        button.addEventListener('click', () => {
            const modal = document.getElementById(button.dataset.modalTarget);
            openModal(modal);
        });
    });

    closeModalElements.forEach(element => {
        element.addEventListener('click', () => {
            const modal = document.getElementById(element.dataset.modalClose);
            closeModal(modal);
        });
    });

    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            const activeModal = document.querySelector('.modal.active');
            closeModal(activeModal);
        }
    });
});