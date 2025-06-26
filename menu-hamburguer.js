document.addEventListener('DOMContentLoaded', function() {
  const menuToggle = document.getElementById('menuToggle');
  const navLinks = document.getElementById('navLinks');

  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', function(e) {
      e.stopPropagation();
      navLinks.classList.toggle('active');
    });
    // Fecha o menu ao clicar em um link
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('active');
      });
    });
    // Fecha o menu ao clicar fora
    document.addEventListener('click', function(e) {
      if (navLinks.classList.contains('active') && !navLinks.contains(e.target) && e.target !== menuToggle) {
        navLinks.classList.remove('active');
      }
    });
  }
}); 