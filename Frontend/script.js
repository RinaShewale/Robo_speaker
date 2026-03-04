gsap.registerPlugin(ScrollTrigger);

const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector("nav ul");
const signBtn = document.querySelector(".btn1"); // 🔥 add this

menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("active");
    document.body.classList.toggle("no-scroll");
    menuToggle.classList.toggle("open");
    signBtn.classList.toggle("active"); // 🔥 add this
});

const navItems = document.querySelectorAll("nav ul li a");

navItems.forEach(link => {
    link.addEventListener("click", () => {
        navLinks.classList.remove("active");
        document.body.classList.remove("no-scroll");
        menuToggle.classList.remove("open");
        signBtn.classList.remove("active"); // 🔥 add this
    });
});


const elements = document.querySelectorAll('.view3 *');

elements.forEach(el => {
  // Disable pointer events completely
  el.style.pointerEvents = 'none';

  // Remove all transform, scale, shadow effects
  el.style.transform = 'none';
  el.style.transition = 'none';
  el.style.boxShadow = 'none';

  // Remove hover via JS
  el.addEventListener('mouseenter', e => {
    e.stopPropagation();
    el.style.transform = 'none';
    el.style.boxShadow = 'none';
    el.style.transition = 'none';
  });

  // Prevent clicks
  el.addEventListener('click', e => e.preventDefault());
});


const heroHeading = document.querySelector(".view1 h1");
const heroPara = document.querySelector(".view1 p");
gsap.fromTo(heroHeading,
    { y: 0, opacity: 1, scale: 1 },
    {
        y: -100,        // bigger movement
        scale: 0.9,     // more shrink
        opacity: 0.8,   // slightly fade
        duration: 1.5,
        ease: "power3.out",
        scrollTrigger: {
            trigger: ".view1",
            start: "top top",
            end: "bottom top",
            scrub: 0.5
        }
    }
);

gsap.fromTo(heroPara,
    { y: 0, opacity: 1, scale: 1 },
    {
        y: -50,
        scale: 0.95,
        opacity: 0.9,
        duration: 1.5,
        ease: "power3.out",
        scrollTrigger: {
            trigger: ".view1",
            start: "top top",
            end: "bottom top",
            scrub: 0.5
        }
    }
);

// ===== Membership cards scroll animation =====
gsap.utils.toArray(".content").forEach((card, i) => {
    gsap.from(card, {
        opacity: 0,
        y: 50,
        duration: 1,
        delay: i * 0.2,
        ease: "power3.out",
        scrollTrigger: {
            trigger: card,
            start: "top 80%",
            toggleActions: "play none none reverse"
        }
    });

    // Hover futuristic scale + glow
    card.addEventListener("mouseenter", () => {
        gsap.to(card, {
            scale: 1.05,
            boxShadow: "0 20px 40px rgba(193,56,92,0.41), 0 0 20px #cf204f, 0 0 10px #af133d",
            duration: 0.3
        });
    });
    card.addEventListener("mouseleave", () => {
        gsap.to(card, {
            scale: 1,
            boxShadow: "0 0 0 rgba(0,0,0,0)",
            duration: 0.3
        });
    });
});


  


