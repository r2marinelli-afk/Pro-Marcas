document.addEventListener('DOMContentLoaded', function() {
    const faqQuestions = document.querySelectorAll('.faq-question');

    faqQuestions.forEach(button => {
        button.addEventListener('click', () => {
            const item = button.parentElement;

            // Fecha todas as outras abertas
            document.querySelectorAll('.faq-item').forEach(i => {
                if (i !== item) i.classList.remove('active');
            });

            // Alterna o item clicado
            item.classList.toggle('active');
        });
    });
});