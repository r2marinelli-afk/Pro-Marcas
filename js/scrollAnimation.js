document.addEventListener('DOMContentLoaded', () => {
  // ANIMAÇÃO PARA A SEÇÃO DE NÚMEROS
  const devBoxesNumeros = document.querySelectorAll('#dev-numeros .devbox');
  const observerNumeros = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        devBoxesNumeros.forEach((box, i) => {
          setTimeout(() => {
            box.classList.add('visible');
          }, i * 200);
        });
        observerNumeros.disconnect();
      }
    });
  }, { threshold: 0.2 });
  const devNumerosCont = document.querySelector('#dev-numeros .desenvolvercont');
  if (devNumerosCont) observerNumeros.observe(devNumerosCont);

  // ANIMAÇÃO PARA A SEÇÃO DE IMAGENS
  const devBoxesImagens = document.querySelectorAll('#dev-imagens .devbox');
  const observerImagens = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        devBoxesImagens.forEach((box, i) => {
          setTimeout(() => {
            box.classList.add('visible');
          }, i * 200);
        });
        observerImagens.disconnect();
      }
    });
  }, { threshold: 0.2 });
  const devImagensCont = document.querySelector('#dev-imagens .desenvolvercont');
  if (devImagensCont) observerImagens.observe(devImagensCont);

  // NOVO OBSERVER PARA .reveal
  const reveals = document.querySelectorAll('.reveal');
  const observerReveals = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        observerReveals.unobserve(entry.target); // só 1x
      }
    });
  }, { threshold: 0.1 });

  reveals.forEach(reveal => {
    observerReveals.observe(reveal);
  });
});
