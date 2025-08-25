// Registrar el plugin ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

/* === ANIMACIONES EXISTENTES (sin cambios) === */

/* LOGO NAVBAR */
gsap.from(".nav-logo", {
  x: -500,
  opacity: 0,
  duration: 2,
  ease: "power2.out"
});

/* SUBTITULO PORTADA */
gsap.to(".hero-subtitle", {
  duration: 3,
  width: "29ch",
  ease: "steps(29)",
  repeat: -1,      // infinito
  yoyo: true,      // escribe y borra
  repeatDelay: 1   // pausa antes de reiniciar
});

/* MARCA PORTADA */
gsap.from(".hero-marca", {
  scale: 0,
  duration: 2,
  ease: "back.out(1.7)"
});

gsap.to(".hero-marca", {
  duration: 4,
  color: "#ff6b6b",
  ease: "power2.inOut"
});

gsap.to(".hero-marca span", {
  rotationX: 360,
  duration: 3,        // gira más despacio (3 segundos)
  repeat: -1,          // infinito
  stagger: 2,          // espera entre letras (2 segundos)
  repeatDelay: 2,      // espera antes de volver a empezar
  ease: "power1.inOut"
});

/* SOCIAL LINKS */
document.querySelectorAll(".social-link").forEach((link) => {
  gsap.from(link, {
    scrollTrigger: {
      trigger: link,
      start: "top 90%",
      toggleActions: "restart none restart none"
    },
    opacity: 0,
    y: 50,
    duration: 1
  });
});

/* === CAMBIO DE FONDO: de #fcfcfe a #101013 al llegar a #about === */
gsap.to("body", {
  background: "#101013",
  duration: 1.2,
  ease: "power2.inOut",
  scrollTrigger: {
    trigger: ".pricing",
    start: "top 75%",
    end: "bottom 75%",
    toggleActions: "play reverse play reverse"
  }
});


/* === CAMBIO DE COLOR DEL TÍTULO (sin fondo, sin degradado) === */
gsap.to(".section-title", {
  color: "#ffffff", /* Blanco para fondo oscuro */
  duration: 1.2,
  ease: "power2.inOut",
  scrollTrigger: {
    trigger: ".about",
    start: "top 75%",
    end: "bottom 75%",
    toggleActions: "play reverse play reverse"
  }
});

/* === CAMBIO DE COLOR DEL TEXTO INTERNO EN .about === */
gsap.to(".about-text h3", {
  color: "#ffffff",
  duration: 1.2,
  ease: "power2.inOut",
  scrollTrigger: {
    trigger: ".about",
    start: "top 75%",
    end: "bottom 75%",
    toggleActions: "play reverse play reverse"
  }
});

gsap.to(".about-text p", {
  color: "#cccccc",
  duration: 1.2,
  ease: "power2.inOut",
  scrollTrigger: {
    trigger: ".about",
    start: "top 75%",
    end: "bottom 75%",
    toggleActions: "play reverse play reverse"
  }
});


// === EFECTO DE TEXTO "CÓDIGO SECRETO" ===
// Asegúrate de que ya tienes esto arriba:
// gsap.registerPlugin(ScrollTrigger, TextPlugin);

// Animación de "glitch" o "código secreto" que no mueve el layout
/* gsap.timeline({
  repeat: -1,
  repeatDelay: 1.5, // pausa después de mostrar el texto limpio
  delay: 1
})
  // Paso 1: Cambia a caracteres aleatorios (mismo largo que el original)
  .to(".secret-text", {
    duration: 2,
    text: {
      value: () => {
        const original = "Expertos en Tecnología Digital";
        return original.split('').map(char => 
          char === ' ' ? ' ' : 'abcdefghijklmnñopqrstuvwxyz0123456789!@#$%^&*()'.charAt(
            Math.floor(Math.random() * 44)
          )
        ).join('');
      },
      chars: null // no usar chars predeterminados
    },
    ease: "none",
    // Opcional: efecto de ruido ligero
    filter: "contrast(1.5) brightness(1.1)"
  })
  
  // Paso 2: Vuelve al texto original
  .to(".secret-text", {
    duration: 2,
    text: {
      value: "Expertos en Tecnología Digital"
    },
    filter: "contrast(1) brightness(1)",
    ease: "power1.out"
  }); */