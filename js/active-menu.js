/**
 * Script para marcar o item de menu ativo baseado na página atual
 */
document.addEventListener('DOMContentLoaded', function() {
    // Pegar o caminho da página atual
    const currentPath = window.location.pathname;
    const currentPage = currentPath.split('/').pop() || 'index.html';
    
    // Remover todas as classes current-menu-item existentes
    document.querySelectorAll('.current-menu-item, .current-menu-ancestor').forEach(item => {
        item.classList.remove('current-menu-item', 'current-menu-ancestor');
    });
    
    // Função para ativar menu baseado na página
    function activateMenu(selector) {
        const menuItem = document.querySelector(selector);
        if (menuItem) {
            menuItem.classList.add('current-menu-item');
            
            // Se tem pai com submenu, ativar também
            const parentLi = menuItem.closest('li.menu-item-has-children');
            if (parentLi) {
                parentLi.classList.add('current-menu-ancestor');
            }
        }
    }
    
    // Desktop menu
    const desktopMenu = document.querySelector('#site-navigation .menu');
    if (desktopMenu) {
        // Home
        if (currentPage === 'index.html' || currentPage === '') {
            activateMenu('#site-navigation .menu > li:first-child');
        }
        // Sobre (about-us.html)
        else if (currentPage === 'about-us.html') {
            activateMenu('#site-navigation .menu > li:nth-child(2)');
        }
        // Serviços (it-services.html, web-development, mobile-development)
        else if (currentPage === 'it-services.html' || currentPage.includes('development.html')) {
            activateMenu('#site-navigation .menu > li:nth-child(3)');
        }
        // Projetos (portfolio)
        else if (currentPage.includes('portfolio')) {
            activateMenu('#site-navigation .menu > li:nth-child(4)');
        }
        // Contato
        else if (currentPage === 'contact.html') {
            activateMenu('#site-navigation .menu > li:last-child');
        }
    }
    
    // Mobile menu
    const mobileMenu = document.querySelector('.mobile_mainmenu');
    if (mobileMenu) {
        // Remover classes do mobile também
        mobileMenu.querySelectorAll('.current-menu-item, .current-menu-ancestor').forEach(item => {
            item.classList.remove('current-menu-item', 'current-menu-ancestor');
        });
        
        // Aplicar mesma lógica no mobile
        if (currentPage === 'index.html' || currentPage === '') {
            const homeItem = mobileMenu.querySelector('li:first-child');
            if (homeItem) homeItem.classList.add('current-menu-item');
        }
        else if (currentPage === 'about-us.html') {
            const aboutItem = mobileMenu.querySelector('li:nth-child(2)');
            if (aboutItem) aboutItem.classList.add('current-menu-item');
        }
        else if (currentPage === 'it-services.html' || currentPage.includes('development.html')) {
            const servicesItem = mobileMenu.querySelector('li:nth-child(3)');
            if (servicesItem) servicesItem.classList.add('current-menu-item');
        }
        else if (currentPage.includes('portfolio')) {
            const projectsItem = mobileMenu.querySelector('li:nth-child(4)');
            if (projectsItem) projectsItem.classList.add('current-menu-item');
        }
        else if (currentPage === 'contact.html') {
            const contactItem = mobileMenu.querySelector('li:last-child');
            if (contactItem) contactItem.classList.add('current-menu-item');
        }
    }
});

