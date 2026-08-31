document.addEventListener('DOMContentLoaded', () => {

    // --- LÓGICA DO MENU DESKTOP (ATUALIZADA) ---
    const categoriasDropdown = document.getElementById('categorias');
    const submenuModal = document.getElementById('menuCategorias');
    const backdrop = document.getElementById('backdrop');
    const menuItems = document.querySelectorAll('.submenu-left .menu-item');
    const submenus = document.querySelectorAll('.submenu-right');

    // Função para abrir o menu desktop
    categoriasDropdown.addEventListener('mouseenter', () => {
        submenuModal.classList.add('show');
        backdrop.classList.add('show');

        // LÓGICA: Ativa o primeiro item se nenhum estiver ativo
        const activeItem = document.querySelector('.submenu-left .menu-item.active');
        if (!activeItem) {
            const firstMenuItem = menuItems[0];
            if (firstMenuItem) {
                firstMenuItem.classList.add('active');
                const firstTargetId = firstMenuItem.getAttribute('data-target');
                const firstSubmenu = document.getElementById(firstTargetId);
                if (firstSubmenu) {
                    firstSubmenu.classList.add('active');
                }
            }
        }
    });

    // Função para fechar o menu desktop
    function closeDesktopMenu() {
        submenuModal.classList.remove('show');
        backdrop.classList.remove('show');
        // LÓGICA: Reseta o estado ativo ao fechar
        menuItems.forEach(item => item.classList.remove('active'));
        submenus.forEach(submenu => submenu.classList.remove('active'));
    }

    submenuModal.addEventListener('mouseleave', closeDesktopMenu);
    backdrop.addEventListener('click', closeDesktopMenu);

    // Lógica para trocar de subcategoria com o hover
    menuItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            const targetId = item.getAttribute('data-target');
            
            menuItems.forEach(i => i.classList.remove('active'));
            item.classList.add('active');

            submenus.forEach(submenu => {
                submenu.classList.remove('active');
                if (submenu.id === targetId) {
                    submenu.classList.add('active');
                }
            });
        });
    });
    // --- FIM DA LÓGICA DO MENU DESKTOP ---



    // ==================================
    // ==   LÓGICA DO MENU MOBILE      ==
    // ==================================

    const hamburger = document.getElementById('hamburger');
    const mobileNavContainer = document.getElementById('mobileNavContainer');
    const mainMenuPanel = document.getElementById('main-menu-panel');
    const submenuPanel = document.getElementById('submenu-panel');
    const backButton = document.getElementById('back-to-main-menu');
    const submenuTitle = document.getElementById('submenu-title').querySelector('a');
    const submenuLinksContainer = document.getElementById('submenu-links-container');
    const submenuImage = document.getElementById('submenu-image'); // NOVO: Seleciona a tag da imagem

    // --- Passo 1: Popular o menu principal com as categorias do menu desktop ---
    const desktopCategories = document.querySelectorAll('.submenu-left .menu-item');
    
    desktopCategories.forEach(desktopLink => {
        const mobileLink = document.createElement('a');
        mobileLink.href = '#'; // O clique será controlado pelo JS
        mobileLink.className = 'mobile-category-trigger';
        mobileLink.dataset.target = desktopLink.dataset.target; // Copia o data-target
        mobileLink.dataset.href = desktopLink.href; // Armazena o link real da categoria
        
        mobileLink.innerHTML = `
            <span>${desktopLink.textContent}</span>
            <i class="fa-solid fa-chevron-right"></i>
        `;
        // Verifica se o container existe antes de adicionar
        if (document.getElementById('mobile-category-links')) {
            document.getElementById('mobile-category-links').appendChild(mobileLink);
        } else {
             mainMenuPanel.appendChild(mobileLink);
        }
    });

    // --- Passo 2: Controlar a abertura/fechamento do menu ---
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('open');
        mobileNavContainer.classList.toggle('open');
        backdrop.classList.toggle('show');
        document.body.classList.toggle('menu-open');
    });

    function closeMobileMenu() {
         hamburger.classList.remove('open');
         mobileNavContainer.classList.remove('open');
         backdrop.classList.remove('show');
         document.body.classList.remove('menu-open');
         // Garante que o menu volte para o painel principal ao fechar
         setTimeout(() => {
             mobileNavContainer.classList.remove('submenu-active');
         }, 400); // Tempo da transição
    }

    // Altera o listener para fechar o menu mobile OU o desktop, dependendo do que está aberto
    backdrop.addEventListener('click', () => {
        if (mobileNavContainer.classList.contains('open')) {
            closeMobileMenu();
        } else if (submenuModal.classList.contains('show')) {
            closeDesktopMenu();
        }
    });

    // --- Passo 3: Controlar a navegação entre painéis ---
    document.querySelectorAll('.mobile-category-trigger').forEach(trigger => {
        trigger.addEventListener('click', (e) => {
            e.preventDefault();
            
            const targetId = trigger.dataset.target;
            const categoryTitle = trigger.querySelector('span').textContent;
            const categoryHref = trigger.dataset.href;

            // Encontra as subcategorias correspondentes no HTML do desktop
            const subMenuData = document.querySelector(`.submenu-right#${targetId}`);
            
            if (subMenuData) {
                // Limpa o container de sublinks
                submenuLinksContainer.innerHTML = '';
                
                // Popula o título do submenu
                submenuTitle.textContent = categoryTitle;
                submenuTitle.href = categoryHref;

                // Clona os links da subcategoria e os adiciona ao painel
                const links = subMenuData.querySelectorAll('a');
                links.forEach(link => {
                    submenuLinksContainer.appendChild(link.cloneNode(true));
                });
                
                // NOVO: Lógica para encontrar e exibir a imagem
                const image = subMenuData.querySelector('img');
                if (image) {
                    submenuImage.src = image.src;
                    submenuImage.alt = image.alt; // Boa prática: copiar o texto alternativo
                    submenuImage.style.display = 'block'; // Mostra a imagem
                } else {
                    submenuImage.style.display = 'none'; // Esconde se não houver imagem
                }
                
                // Ativa a animação de slide
                mobileNavContainer.classList.add('submenu-active');
            }
        });
    });

    // --- Passo 4: Controlar o botão "Voltar" ---
    backButton.addEventListener('click', () => {
        mobileNavContainer.classList.remove('submenu-active');
    });
});