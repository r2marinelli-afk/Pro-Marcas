// js/render-detalhe.js

document.addEventListener('DOMContentLoaded', () => {
    // 1. Pegar o ID do produto da URL
    const params = new URLSearchParams(window.location.search);
    const produtoId = params.get('id');

    // 2. Encontrar o objeto do produto correspondente no nosso array 'produtos'
    const produto = produtos.find(p => p.id === produtoId);
    
    const container = document.getElementById('produto-detalhe-container');

    // 3. Verificar se o produto foi encontrado
    if (produto) {
        // Se encontrou, vamos preencher o HTML dinamicamente

        // Muda o título da aba do navegador para o nome do produto
        document.title = produto.nome;

        // Monta a mensagem e o link para o WhatsApp
        const numeroWhatsApp = '555198847633'; // <-- Lembre-se de colocar seu número aqui
        const mensagem = `Olá! Tenho interesse no produto: ${produto.nome} (ID: ${produto.id}). Gostaria de solicitar um orçamento.`;
        const linkWhatsApp = `https://api.whatsapp.com/send?phone=${numeroWhatsApp}&text=${encodeURIComponent(mensagem)}`;

        // ==================================================================
        // PASSO A: GERAÇÃO DA ESTRUTURA HTML COM A GALERIA
        // ==================================================================
        container.innerHTML = `
            <div class="produto-imagem-container">
                <div class="imagem-principal-wrapper">
                    <img id="imagem-principal" src="${produto.imagem}" alt="Imagem principal do produto ${produto.nome}">
                </div>

                <div class="produto-thumbnails">
                    ${
                        // Verifica se existe uma galeria de imagens para o produto
                        produto.galeriaDeImagens ? 
                        // Se existir, usa .map() para criar um <img> para cada foto na lista
                        produto.galeriaDeImagens.map(imgSrc => `
                            <img class="thumbnail-img" src="${imgSrc}" alt="Miniatura do produto ${produto.nome}">
                        `).join('') // .join('') une todos os <img> em um único texto
                        : '' // Se não houver galeria, não renderiza nada aqui
                    }
                </div>
            </div>

            <div class="produto-info">
                <h1>${produto.nome}</h1>
                <p class="descricao">${produto.descricaoCompleta || produto.descricao}</p>
                ${produto.especificacoes ? `
                <div class="especificacoes">
                    ${Object.entries(produto.especificacoes).map(([chave, valor]) => `<p><strong>${chave}:</strong> ${valor}</p>`).join('')}
                </div>
                ` : ''}
                <a href="${linkWhatsApp}" class="whatsapp-button" target="_blank">
                     Solicitar Orçamento <i class="fab fa-whatsapp"></i>
                </a> 
            </div>
        `;
        
        // ==================================================================
        // PASSO B: ADIÇÃO DA INTERATIVIDADE NA GALERIA
        // (Este código roda DEPOIS que o HTML acima foi inserido na página)
        // ==================================================================
        const imagemPrincipal = document.getElementById('imagem-principal');
        const thumbnails = document.querySelectorAll('.thumbnail-img');

        if (thumbnails.length > 0) {
            // Define a primeira miniatura como 'ativa' por padrão
            thumbnails[0].classList.add('active');

            // Adiciona um "ouvinte de clique" para cada miniatura
            thumbnails.forEach(thumb => {
                thumb.addEventListener('click', () => {
                    // Troca a imagem principal pela imagem da miniatura clicada
                    imagemPrincipal.src = thumb.src;

                    // Remove a classe 'active' de todas as outras miniaturas
                    thumbnails.forEach(t => t.classList.remove('active'));

                    // Adiciona a classe 'active' apenas na que foi clicada
                    thumb.classList.add('active');
                });
            });
        }

    } else {
        // Se o produto não for encontrado, mostra uma mensagem de erro
        container.innerHTML = `
            <div class="produto-nao-encontrado">
                <h1>Oops! Produto não encontrado.</h1>
                <p>O produto que você está procurando não existe ou foi removido.</p>
                <a href="produtos.html" class="whatsapp-button" style="background-color: #007bff;">Ver todos os produtos</a>
            </div>
        `;
    }
});