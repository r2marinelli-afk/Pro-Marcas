document.addEventListener('DOMContentLoaded', () => {
    const counters = document.querySelectorAll('.numerosbox span');

    const startCounting = () => {
        counters.forEach(counter => {
            const target = +counter.getAttribute('data-target');
            const duration = 2000; // Tempo total da animação em milissegundos
            const startTime = performance.now();

            const updateCounter = (currentTime) => {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);
                counter.innerText = Math.floor(progress * target);

                if (progress < 1) {
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.innerText = target.toLocaleString(); // Pra formatar com separador de milhar
                }
            };

            requestAnimationFrame(updateCounter);
        });
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                startCounting();
                observer.disconnect();  // Só anima uma vez
            }
        });
    }, {
        threshold: 0.3
    });

    observer.observe(document.querySelector('.numerosbackground'));
});
