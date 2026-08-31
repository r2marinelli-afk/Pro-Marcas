// js/render-produtos.js

document.addEventListener('DOMContentLoaded', () => {
  const gridContainer = document.getElementById('produtos-grid-container');

  // Verifica se o container de produtos existe na página
  if (gridContainer) {
    // 'produtos' é a variável que vem do arquivo produtos-data.js
    produtos.forEach(produto => {
      // 1. Cria o elemento principal do card, que é um link (<a>)
      const cardLink = document.createElement('a');
      cardLink.href = `produto-detalhe.html?id=${produto.id}`; // Link para a página de detalhes

      // 2. Define o conteúdo HTML interno do card usando os dados do produto
      cardLink.innerHTML = `
        <div class="imgcont">
          <img src="${produto.imagem}" alt="Imagem do produto ${produto.nome}">
        </div>
        <h3>${produto.nome}</h3>
        <p>${produto.descricao}</p>
      `;

      // 3. Adiciona o card completo que acabamos de criar dentro do grid
      gridContainer.appendChild(cardLink);
    });
  }
});