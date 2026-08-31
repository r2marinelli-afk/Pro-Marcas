// js/render-paginado.js

document.addEventListener('DOMContentLoaded', () => {
    // --- CONFIGURAÇÕES ---
    const PRODUTOS_POR_PAGINA = 16; // Você pode mudar este número. 16 é bom para grids de 4 colunas.

    // --- ELEMENTOS DO DOM ---
    const gridContainer = document.getElementById('produtos-grid-container');
    const paginacaoContainer = document.getElementById('paginacao-container');
    const tituloCategoriaH1 = document.getElementById('titulo-categoria'); // Apenas para a página de categoria

    // --- LÓGICA PRINCIPAL ---
    if (!gridContainer) {
        console.error("Container de produtos não encontrado.");
        return;
    }

    // 1. Pega os parâmetros da URL (página e categoria)
    const params = new URLSearchParams(window.location.search);
    const categoriaSlug = params.get('categoria');
    let paginaAtual = parseInt(params.get('pagina')) || 1;

    // 2. Determina qual lista de produtos usar (todos ou filtrados por categoria)
    const listaDeProdutos = categoriaSlug 
        ? produtos.filter(p => p.categoria === categoriaSlug) 
        : produtos;

    // 3. Lógica de Paginação
    const totalPaginas = Math.ceil(listaDeProdutos.length / PRODUTOS_POR_PAGINA);
    if (paginaAtual > totalPaginas) paginaAtual = totalPaginas;
    if (paginaAtual < 1) paginaAtual = 1;

    const indiceInicio = (paginaAtual - 1) * PRODUTOS_POR_PAGINA;
    const indiceFim = indiceInicio + PRODUTOS_POR_PAGINA;
    const produtosDaPagina = listaDeProdutos.slice(indiceInicio, indiceFim);

    // 4. Renderiza os produtos da página atual e a navegação
    renderizarProdutos(produtosDaPagina);
    renderizarPaginacao(totalPaginas, paginaAtual, categoriaSlug);

    // 5. Atualiza o título (se for uma página de categoria)
    if (tituloCategoriaH1 && categoriaSlug) {
        const nomeCategoriaFormatado = categoriaSlug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
        tituloCategoriaH1.textContent = nomeCategoriaFormatado;
        document.title = nomeCategoriaFormatado;
    }

    // 6. MELHORIA DE SEO: Adiciona a tag canonical para evitar conteúdo duplicado
    adicionarTagCanonical(categoriaSlug);


    // --- FUNÇÕES AUXILIARES ---

    /**
     * Limpa o grid e renderiza os cards de produtos.
     * @param {Array} produtosParaRenderizar - O array de produtos para mostrar na página.
     */
    function renderizarProdutos(produtosParaRenderizar) {
        gridContainer.innerHTML = ''; // Limpa o container antes de adicionar novos produtos

        if (produtosParaRenderizar.length === 0) {
            gridContainer.innerHTML = '<p class="aviso-sem-produtos">Nenhum produto encontrado.</p>';
            return;
        }

        produtosParaRenderizar.forEach(produto => {
            const cardLink = document.createElement('a');
            cardLink.href = `produto-detalhe.html?id=${produto.id}`;
            cardLink.className = 'produto-card'; // Adiciona uma classe para estilização

            // Otimização de Performance e SEO: Adicionado `loading="lazy"` na imagem
            cardLink.innerHTML = `
                <div class="imgcont">
                    <img src="${produto.imagem}" alt="${produto.nome}" loading="lazy" width="250" height="250">
                </div>
                <h3>${produto.nome}</h3>
                <p>${produto.descricao}</p>
            `;
            gridContainer.appendChild(cardLink);
        });
    }

    /**
     * Cria e renderiza os links de paginação (1, 2, 3...).
     * @param {number} totalPaginas - O número total de páginas.
     * @param {number} paginaAtual - O número da página atual.
     * @param {string|null} categoriaSlug - A categoria atual, para manter nos links.
     */
    function renderizarPaginacao(totalPaginas, paginaAtual, categoriaSlug) {
        if (totalPaginas <= 1) {
            paginacaoContainer.innerHTML = ''; // Não mostra paginação se só tiver 1 página
            return;
        }
        
        let paginacaoHTML = '<ul class="lista-paginacao">';

        // Link "Anterior"
        if (paginaAtual > 1) {
            paginacaoHTML += `<li class="item-pagina"><a class="link-pagina" href="${criarLinkPagina(paginaAtual - 1, categoriaSlug)}">Anterior</a></li>`;
        }

        // Links de Números
        for (let i = 1; i <= totalPaginas; i++) {
            const classeAtiva = (i === paginaAtual) ? 'ativo' : '';
            paginacaoHTML += `<li class="item-pagina ${classeAtiva}"><a class="link-pagina" href="${criarLinkPagina(i, categoriaSlug)}">${i}</a></li>`;
        }

        // Link "Próximo"
        if (paginaAtual < totalPaginas) {
            paginacaoHTML += `<li class="item-pagina"><a class="link-pagina" href="${criarLinkPagina(paginaAtual + 1, categoriaSlug)}">Próximo</a></li>`;
        }

        paginacaoHTML += '</ul>';
        paginacaoContainer.innerHTML = paginacaoHTML;
    }

    /**
     * Cria a URL correta para o link de paginação, mantendo o filtro de categoria.
     * @param {number} pagina - O número da página para o link.
     * @param {string|null} categoriaSlug - A categoria atual.
     * @returns {string} A URL completa para o link <a>.
     */
    function criarLinkPagina(pagina, categoriaSlug) {
        const urlBase = categoriaSlug ? 'categoria.html' : 'produtos.html';
        const params = new URLSearchParams();
        if (categoriaSlug) {
            params.append('categoria', categoriaSlug);
        }
        params.append('pagina', pagina);
        return `${urlBase}?${params.toString()}`;
    }

    /**
     * Adiciona uma tag <link rel="canonical"> no <head> da página.
     * Isso ajuda o SEO ao indicar ao Google qual é a URL "principal" para este conteúdo.
     * @param {string|null} categoriaSlug - A categoria atual.
     */
    function adicionarTagCanonical(categoriaSlug) {
        const link = document.createElement('link');
        link.setAttribute('rel', 'canonical');
        
        const urlBase = categoriaSlug 
            ? `${window.location.origin}${window.location.pathname}?categoria=${categoriaSlug}`
            : `${window.location.origin}${window.location.pathname}`;

        link.setAttribute('href', urlBase);
        document.head.appendChild(link);
    }
});