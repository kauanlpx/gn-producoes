document.addEventListener("DOMContentLoaded", () => {

    /* =========================================
       MENU MOBILE
    ========================================= */

    const menuButton = document.getElementById("menuButton");
    const nav = document.getElementById("nav");

    if (menuButton && nav) {

        menuButton.addEventListener("click", () => {

            const isOpen = nav.classList.toggle("active");

            menuButton.setAttribute(
                "aria-expanded",
                isOpen ? "true" : "false"
            );

            const icon = menuButton.querySelector("i");

            if (icon) {

                icon.classList.toggle(
                    "fa-bars",
                    !isOpen
                );

                icon.classList.toggle(
                    "fa-xmark",
                    isOpen
                );

            }

        });


        nav.querySelectorAll("a").forEach(link => {

            link.addEventListener("click", () => {

                nav.classList.remove("active");

                menuButton.setAttribute(
                    "aria-expanded",
                    "false"
                );

                const icon = menuButton.querySelector("i");

                if (icon) {

                    icon.classList.remove("fa-xmark");
                    icon.classList.add("fa-bars");

                }

            });

        });

    }


    /* =========================================
       HEADER
    ========================================= */

    const header = document.getElementById("header");

    function updateHeader() {

        if (!header) return;

        header.classList.toggle(
            "scrolled",
            window.scrollY > 40
        );

    }

    window.addEventListener(
        "scroll",
        updateHeader,
        { passive: true }
    );

    updateHeader();


    /* =========================================
       REVEAL ANIMATION
    ========================================= */

    const revealElements =
        document.querySelectorAll(
            ".reveal, .animate-on-scroll"
        );

    if ("IntersectionObserver" in window) {

        const revealObserver =
            new IntersectionObserver(
                (entries, observer) => {

                    entries.forEach(entry => {

                        if (!entry.isIntersecting) return;

                        entry.target.classList.add(
                            "visible"
                        );

                        observer.unobserve(
                            entry.target
                        );

                    });

                },
                {
                    threshold: 0.12,
                    rootMargin: "0px 0px -40px 0px"
                }
            );

        revealElements.forEach(element => {

            revealObserver.observe(element);

        });

    } else {

        revealElements.forEach(element => {

            element.classList.add("visible");

        });

    }


    /* =========================================
       SCROLL SUAVE
    ========================================= */

    document
        .querySelectorAll('a[href^="#"]')
        .forEach(link => {

            link.addEventListener(
                "click",
                event => {

                    const targetId =
                        link.getAttribute("href");

                    if (
                        !targetId ||
                        targetId === "#"
                    ) {
                        return;
                    }

                    const target =
                        document.querySelector(
                            targetId
                        );

                    if (!target) return;

                    event.preventDefault();

                    const headerHeight =
                        header
                            ? header.offsetHeight
                            : 0;

                    const targetPosition =
                        target.getBoundingClientRect().top +
                        window.scrollY -
                        headerHeight;

                    window.scrollTo({

                        top: targetPosition,

                        behavior: "smooth"

                    });

                }
            );

        });


    /* =========================================
       WHATSAPP
    ========================================= */

    const whatsappNumber =
        "5511980820249";

    document
        .querySelectorAll(".whatsapp-link")
        .forEach(link => {

            link.addEventListener(
                "click",
                event => {

                    event.preventDefault();

                    const message =
                        link.dataset.message ||
                        "Olá! Vim através do site da GN Produções e gostaria de solicitar um orçamento.";

                    const whatsappUrl =
                        `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

                    window.open(
                        whatsappUrl,
                        "_blank",
                        "noopener,noreferrer"
                    );

                }
            );

        });


    /* =========================================
       FORMULÁRIO
    ========================================= */

    const budgetForm =
        document.getElementById("budgetForm");

    if (budgetForm) {

        budgetForm.addEventListener(
            "submit",
            event => {

                event.preventDefault();

                const getValue = id =>
                    document
                        .getElementById(id)
                        ?.value
                        .trim() || "";

                const name =
                    getValue("name");

                const company =
                    getValue("company");

                const phone =
                    getValue("phone");

                const email =
                    getValue("email");

                const eventName =
                    getValue("event");

                const city =
                    getValue("city");

                const date =
                    document
                        .getElementById("date")
                        ?.value || "";

                const size =
                    document
                        .getElementById("size")
                        ?.value || "";

                const message =
                    getValue("message");


                let text =
                    "Olá! Vim através do site da GN Produções e gostaria de solicitar um orçamento.\n\n";

                text +=
                    `*Nome:* ${name}\n`;

                text +=
                    `*Empresa:* ${company}\n`;

                text +=
                    `*WhatsApp:* ${phone}\n`;

                text +=
                    `*E-mail:* ${email}\n`;


                if (eventName) {

                    text +=
                        `*Evento:* ${eventName}\n`;

                }

                if (city) {

                    text +=
                        `*Cidade:* ${city}\n`;

                }

                if (date) {

                    const parts =
                        date.split("-");

                    if (parts.length === 3) {

                        text +=
                            `*Data do evento:* ${parts[2]}/${parts[1]}/${parts[0]}\n`;

                    }

                }

                if (size) {

                    text +=
                        `*Tamanho aproximado:* ${size}\n`;

                }

                if (message) {

                    text +=
                        `\n*Detalhes do projeto:*\n${message}\n`;

                }


                const whatsappUrl =
                    `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`;

                window.open(
                    whatsappUrl,
                    "_blank",
                    "noopener,noreferrer"
                );

            }
        );

    }


    /* =========================================
       MÁSCARA TELEFONE
    ========================================= */

    const phoneInput =
        document.getElementById("phone");

    if (phoneInput) {

        phoneInput.addEventListener(
            "input",
            event => {

                let value =
                    event.target.value
                        .replace(/\D/g, "")
                        .slice(0, 11);

                if (value.length <= 10) {

                    value =
                        value.replace(
                            /^(\d{0,2})(\d{0,4})(\d{0,4}).*/,
                            (_, ddd, first, second) => {

                                let result = "";

                                if (ddd) {
                                    result += `(${ddd}`;
                                }

                                if (ddd.length === 2) {
                                    result += ") ";
                                }

                                if (first) {
                                    result += first;
                                }

                                if (second) {
                                    result += `-${second}`;
                                }

                                return result;

                            }
                        );

                } else {

                    value =
                        value.replace(
                            /^(\d{2})(\d{5})(\d{4}).*/,
                            "($1) $2-$3"
                        );

                }

                event.target.value =
                    value;

            }
        );

    }


    /* =========================================
       IMAGENS
    ========================================= */

    document
        .querySelectorAll("img")
        .forEach(image => {

            if (
                !image.hasAttribute("loading")
            ) {

                image.setAttribute(
                    "loading",
                    "lazy"
                );

            }

        });


    /* =========================================
       ANO DO FOOTER
    ========================================= */

    const footerYear =
        document.querySelector(
            ".footer-bottom p"
        );

    if (footerYear) {

        footerYear.textContent =
            `© ${new Date().getFullYear()} GN PRODUÇÕES. Todos os direitos reservados.`;

    }


    /* =========================================
       PARALLAX HERO
    ========================================= */

    const hero =
        document.querySelector(".hero");

    let ticking = false;

    function updateHeroParallax() {

        if (
            !hero ||
            window.innerWidth <= 768
        ) {
            ticking = false;
            return;
        }

        const scroll =
            window.scrollY;

        if (
            scroll <= window.innerHeight
        ) {

            hero.style.backgroundPosition =
                `center ${scroll * 0.18}px`;

        }

        ticking = false;

    }


    window.addEventListener(
        "scroll",
        () => {

            if (!ticking) {

                window.requestAnimationFrame(
                    updateHeroParallax
                );

                ticking = true;

            }

        },
        { passive: true }
    );


    /* =========================================
       PORTFÓLIO
       CATEGORIA → EVENTO → IMAGENS
    ========================================= */

    const portfolioCategories =
        document.querySelectorAll(
            ".portfolio-tab[data-category]"
        );

    const portfolioCategoryPanels =
        document.querySelectorAll(
            ".portfolio-category"
        );


    /*
       TROCA ENTRE:

       STANDS
       CENOGRAFIA
    */

    function activatePortfolioCategory(category) {

        if (!category) return;


        /* ABAS PRINCIPAIS */

        portfolioCategories.forEach(
            tab => {

                const isActive =
                    tab.getAttribute(
                        "data-category"
                    ) === category;

                tab.classList.toggle(
                    "active",
                    isActive
                );

                tab.setAttribute(
                    "aria-selected",
                    isActive
                        ? "true"
                        : "false"
                );

            }
        );


        /* PAINÉIS DAS CATEGORIAS */

        portfolioCategoryPanels.forEach(
            panel => {

                const isActive =
                    panel.getAttribute(
                        "data-category-panel"
                    ) === category;

                panel.hidden =
                    !isActive;

                panel.classList.toggle(
                    "active",
                    isActive
                );


                /*
                   Quando entrar em uma categoria,
                   ativa automaticamente o primeiro evento.
                */

                if (isActive) {

                    const firstEventTab =
                        panel.querySelector(
                            ".portfolio-event-tab"
                        );

                    if (firstEventTab) {

                        activatePortfolioEvent(
                            panel,
                            firstEventTab
                        );

                    }

                }

            }
        );

    }


    /*
       TROCA ENTRE OS EVENTOS
    */

    function activatePortfolioEvent(
        categoryPanel,
        tab
    ) {

        if (
            !categoryPanel ||
            !tab
        ) {
            return;
        }


        const event =
            tab.getAttribute(
                "data-event"
            );

        if (!event) return;


        /*
           ATIVA A ABA DO EVENTO
        */

        categoryPanel
            .querySelectorAll(
                ".portfolio-event-tab"
            )
            .forEach(
                currentTab => {

                    const isActive =
                        currentTab === tab;

                    currentTab.classList.toggle(
                        "active",
                        isActive
                    );

                    currentTab.setAttribute(
                        "aria-selected",
                        isActive
                            ? "true"
                            : "false"
                    );

                }
            );


        /*
           MOSTRA SOMENTE O PROJETO
           SELECIONADO
        */

        categoryPanel
            .querySelectorAll(
                ".portfolio-panel"
            )
            .forEach(
                panel => {

                    const isTarget =
                        panel.getAttribute(
                            "data-event-panel"
                        ) === event;

                    panel.hidden =
                        !isTarget;

                    panel.classList.toggle(
                        "active",
                        isTarget
                    );


                    /*
                       Ativa as animações das imagens
                       do projeto selecionado.
                    */

                    if (isTarget) {

                        panel
                            .querySelectorAll(
                                ".reveal, .animate-on-scroll"
                            )
                            .forEach(
                                element => {

                                    element.classList.add(
                                        "visible"
                                    );

                                }
                            );

                    }

                }
            );

    }


    /*
       CLIQUES NAS CATEGORIAS
    */

    portfolioCategories.forEach(
        tab => {

            tab.addEventListener(
                "click",
                () => {

                    const category =
                        tab.getAttribute(
                            "data-category"
                        );

                    activatePortfolioCategory(
                        category
                    );

                }
            );

        }
    );


    /*
       CLIQUES NOS EVENTOS
    */

    document
        .querySelectorAll(
            ".portfolio-event-tab"
        )
        .forEach(
            tab => {

                tab.addEventListener(
                    "click",
                    () => {

                        const categoryPanel =
                            tab.closest(
                                ".portfolio-category"
                            );

                        activatePortfolioEvent(
                            categoryPanel,
                            tab
                        );

                    }
                );

            }
        );


    /*
       INICIALIZA O PORTFÓLIO

       STANDS → Fanta CCXP
    */

    if (portfolioCategories.length) {

        const activeCategory =
            document.querySelector(
                ".portfolio-tab[data-category].active"
            ) ||
            portfolioCategories[0];

        activatePortfolioCategory(
            activeCategory.getAttribute(
                "data-category"
            )
        );

    }


    /* =========================================
       PORTFÓLIO — MICROINTERAÇÃO
    ========================================= */

    document
        .querySelectorAll(".portfolio-item")
        .forEach(item => {

            const image =
                item.querySelector("img");

            if (!image) return;

            item.addEventListener(
                "mouseenter",
                () => {

                    image.style.transform =
                        "scale(1.08)";

                }
            );

            item.addEventListener(
                "mouseleave",
                () => {

                    image.style.transform =
                        "scale(1)";

                }
            );

        });


    /* =========================================
       FECHAR MENU AO REDIMENSIONAR
    ========================================= */

    window.addEventListener(
        "resize",
        () => {

            if (
                window.innerWidth > 800 &&
                nav
            ) {

                nav.classList.remove(
                    "active"
                );

                if (menuButton) {

                    menuButton.setAttribute(
                        "aria-expanded",
                        "false"
                    );

                    const icon =
                        menuButton.querySelector(
                            "i"
                        );

                    if (icon) {

                        icon.classList.remove(
                            "fa-xmark"
                        );

                        icon.classList.add(
                            "fa-bars"
                        );

                    }

                }

            }

        }
    );


    /* =========================================
       CARROSSEL HERO
    ========================================= */

    const carouselSlides =
        document.querySelectorAll(
            ".hero-slide"
        );

    const carouselDots =
        document.querySelectorAll(
            ".carousel-dot"
        );

    const carouselPrev =
        document.querySelector(
            ".carousel-prev"
        );

    const carouselNext =
        document.querySelector(
            ".carousel-next"
        );

    let currentSlide = 0;

    let carouselInterval;


    function showCarouselSlide(index) {

        if (!carouselSlides.length) return;


        if (index >= carouselSlides.length) {

            currentSlide = 0;

        }

        else if (index < 0) {

            currentSlide =
                carouselSlides.length - 1;

        }

        else {

            currentSlide = index;

        }


        carouselSlides.forEach(
            (slide, slideIndex) => {

                slide.classList.toggle(
                    "active",
                    slideIndex === currentSlide
                );

            }
        );


        carouselDots.forEach(
            (dot, dotIndex) => {

                dot.classList.toggle(
                    "active",
                    dotIndex === currentSlide
                );

            }
        );

    }


    function nextCarouselSlide() {

        showCarouselSlide(
            currentSlide + 1
        );

    }


    function previousCarouselSlide() {

        showCarouselSlide(
            currentSlide - 1
        );

    }


    function startCarousel() {

        clearInterval(
            carouselInterval
        );

        carouselInterval =
            setInterval(
                nextCarouselSlide,
                2000
            );

    }


    if (carouselSlides.length) {

        showCarouselSlide(0);


        if (carouselNext) {

            carouselNext.addEventListener(
                "click",
                () => {

                    nextCarouselSlide();

                    startCarousel();

                }
            );

        }


        if (carouselPrev) {

            carouselPrev.addEventListener(
                "click",
                () => {

                    previousCarouselSlide();

                    startCarousel();

                }
            );

        }


        carouselDots.forEach(
            (dot, index) => {

                dot.addEventListener(
                    "click",
                    () => {

                        showCarouselSlide(index);

                        startCarousel();

                    }
                );

            }
        );


        const heroCarousel =
            document.querySelector(
                ".hero"
            );


        if (heroCarousel) {

            heroCarousel.addEventListener(
                "mouseenter",
                () => {

                    clearInterval(
                        carouselInterval
                    );

                }
            );


            heroCarousel.addEventListener(
                "mouseleave",
                () => {

                    startCarousel();

                }
            );

        }


        startCarousel();

    }

});