/* lOGO NAVBAR */
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
  stagger: 2,          // espera entre letras (1 segundo)
  repeatDelay: 2,      // espera antes de volver a empezar
  ease: "power1.inOut"
});

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