// js/render-categoria.js

document.addEventListener('DOMContentLoaded', () => {
    // 1. Pegar o nome da categoria da URL (ex: ?categoria=mochilas-e-bags)
    const params = new URLSearchParams(window.location.search);
    const categoriaSlug = params.get('categoria');

    const gridContainer = document.getElementById('produtos-grid-container');
    const tituloCategoria = document.getElementById('titulo-categoria');

    // 2. Filtrar o array 'produtos' para pegar apenas os itens da categoria certa
    const produtosFiltrados = produtos.filter(produto => produto.categoria === categoriaSlug);

    // 3. Atualizar o título da página
    if (produtosFiltrados.length > 0) {
        // Formata o nome da categoria para o título (ex: 'mochilas-e-bags' vira 'Mochilas e bags')
        const nomeCategoriaFormatado = categoriaSlug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
        tituloCategoria.textContent = nomeCategoriaFormatado;
        document.title = nomeCategoriaFormatado; // Atualiza o título da aba
    } else {
        tituloCategoria.textContent = 'Nenhum produto encontrado nesta categoria';
    }

    // 4. Renderizar os cards dos produtos filtrados
    produtosFiltrados.forEach(produto => {
        const cardLink = document.createElement('a');
        cardLink.href = `produto-detalhe.html?id=${produto.id}`;

        cardLink.innerHTML = `
            <div class="imgcont">
                <img src="${produto.imagem}" alt="${produto.nome}">
            </div>
            <h3>${produto.nome}</h3>
            <p>${produto.descricao}</p>
        `;
        
        gridContainer.appendChild(cardLink);
    });
});