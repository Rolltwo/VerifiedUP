// Tema escuro
const themeSwitch = document.getElementById('themeSwitch');
const htmlElement = document.documentElement;

// Carregar o tema salvo do localStorage ao carregar a página
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    if (savedTheme === 'dark') {
        htmlElement.setAttribute('data-theme', 'dark');
        themeSwitch.innerHTML = '<i class="fas fa-sun"></i>';
    } else {
        htmlElement.removeAttribute('data-theme');
        themeSwitch.innerHTML = '<i class="fas fa-moon"></i>';
    }
}

themeSwitch.addEventListener('click', () => {
    if (htmlElement.getAttribute('data-theme') === 'dark') {
        htmlElement.removeAttribute('data-theme');
        themeSwitch.innerHTML = '<i class="fas fa-moon"></i>';
        localStorage.setItem('theme', 'light'); // Salva o tema claro
    } else {
        htmlElement.setAttribute('data-theme', 'dark');
        themeSwitch.innerHTML = '<i class="fas fa-sun"></i>';
        localStorage.setItem('theme', 'dark'); // Salva o tema escuro
    }
});

// Menu mobile
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
const menuLinks = document.querySelectorAll('.nav-links a');

// Função para fechar o menu
const closeMenu = () => {
    navLinks.classList.remove('active');
    menuToggle.classList.remove('active');
};

// Toggle do menu ao clicar no botão
menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    menuToggle.classList.toggle('active');
});

// Fechar menu ao clicar em um link
menuLinks.forEach(link => {
    link.addEventListener('click', closeMenu);
});

// Fechar menu ao clicar fora
document.addEventListener('click', (e) => {
    if (!navLinks.contains(e.target) && !menuToggle.contains(e.target)) {
        closeMenu();
    }
});

// Animação suave ao rolar
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Slider de depoimentos
const testimonialTrack = document.querySelector('.testimonial-track');
const testimonials = document.querySelectorAll('.testimonial-card');
const prevButton = document.querySelector('.testimonial-nav .prev');
const nextButton = document.querySelector('.testimonial-nav .next');

let currentIndex = 0;

function updateSlider() {
    testimonialTrack.style.transform = `translateX(-${currentIndex * 100}%)`;
}

prevButton.addEventListener('click', () => {
    if (currentIndex > 0) {
        currentIndex--;
        updateSlider();
    }
});

nextButton.addEventListener('click', () => {
    if (currentIndex < testimonials.length - 1) {
        currentIndex++;
        updateSlider();
    }
});

// FAQ Accordion
const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    
    question.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        
        // Fecha todos os itens
        faqItems.forEach(faqItem => {
            faqItem.classList.remove('active');
            const icon = faqItem.querySelector('.faq-question i');
            icon.className = 'fas fa-plus';
        });
        
        // Abre o item clicado
        if (!isActive) {
            item.classList.add('active');
            const icon = item.querySelector('.faq-question i');
            icon.className = 'fas fa-minus';
        }
    });
});

// Formulário de contato com EmailJS
const contactForm = document.getElementById('contactForm');
const submitButton = contactForm.querySelector('.submit-button');

contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Desabilita o botão e mostra o spinner
    submitButton.disabled = true;
    submitButton.classList.add('loading');
    
    // Preparar os parâmetros do template
    const templateParams = {
        from_name: this.user_name.value,
        from_email: this.user_email.value,
        message: this.message.value
    };

    // Enviar o email
    emailjs.send(
        'service_nb0ex4i', // Service ID do EmailJS
        'template_oo2fkeq', // Template ID do EmailJS
        templateParams
    )
    .then(function() {
        // Sucesso
        submitButton.classList.remove('loading');
        submitButton.innerHTML = '<span>Mensagem Enviada!</span>';
        submitButton.style.backgroundColor = '#25D366';
        contactForm.reset();
        
        // Resetar o botão após 3 segundos
        setTimeout(() => {
            submitButton.disabled = false;
            submitButton.style.backgroundColor = '';
            submitButton.innerHTML = `
                <span>Enviar Mensagem</span>
                <div class="loading-spinner" style="display: none;">
                    <i class="fas fa-spinner fa-spin"></i>
                </div>
            `;
        }, 3000);
    })
    .catch(function(error) {
        // Erro
        console.error('Erro ao enviar email:', error);
        submitButton.classList.remove('loading');
        submitButton.innerHTML = '<span>Erro ao enviar. Tente novamente!</span>';
        submitButton.style.backgroundColor = '#ff4444';
        
        // Resetar o botão após 3 segundos
        setTimeout(() => {
            submitButton.disabled = false;
            submitButton.style.backgroundColor = '';
            submitButton.innerHTML = `
                <span>Enviar Mensagem</span>
                <div class="loading-spinner" style="display: none;">
                    <i class="fas fa-spinner fa-spin"></i>
                </div>
            `;
        }, 3000);
    });
});

// Navbar fixa com efeito de scroll
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
        navbar.classList.remove('scroll-up');
        return;
    }
    
    if (currentScroll > lastScroll && !navbar.classList.contains('scroll-down')) {
        // Scroll down
        navbar.classList.remove('scroll-up');
        navbar.classList.add('scroll-down');
    } else if (currentScroll < lastScroll && navbar.classList.contains('scroll-down')) {
        // Scroll up
        navbar.classList.remove('scroll-down');
        navbar.classList.add('scroll-up');
    }
    
    lastScroll = currentScroll;
});

// Animação de elementos ao rolar
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
        }
    });
}, observerOptions);

// Aplicar animação aos elementos
document.querySelectorAll('.benefit-item, .package-item, .feature, .step, .testimonial-card, .faq-item').forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    observer.observe(element);
});

// Adicionar classe fade-in quando o elemento estiver visível
document.querySelectorAll('.benefit-item, .package-item, .feature').forEach(element => {
    element.addEventListener('transitionend', () => {
        if (element.classList.contains('fade-in')) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
});

// Adicionar efeito de hover nos botões
document.querySelectorAll('.cta-button, .package-button, .support-button').forEach(button => {
    button.addEventListener('mouseenter', () => {
        button.style.transform = 'translateY(-3px)';
    });
    
    button.addEventListener('mouseleave', () => {
        button.style.transform = 'translateY(0)';
    });
});

// Seção de Quantidade Customizada
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM completamente carregado. Inicializando script de quantidade.');
    const quantityInput = document.getElementById('follower-quantity');
    const orderValueInput = document.getElementById('order-value');
    const buyButton = document.querySelector('.custom-quantity .cta-button');

    // Preço por seguidor (baseado em 10 seguidores por R$ 0.15)
    const pricePerFollower = 0.15 / 10; // R$ 0.015 por seguidor

    // Função para calcular e atualizar o valor
    const updateOrderValue = () => {
        console.log('updateOrderValue chamada.');
        // Obter a quantidade diretamente do input, tratando como 0 se não for um número válido
        let quantity = parseInt(quantityInput.value) || 0;
        console.log('Quantidade:', quantity);
        
        const calculatedValue = (quantity * pricePerFollower).toFixed(2); // Calcula e formata com 2 casas decimais
        console.log('Valor calculado:', calculatedValue);
        orderValueInput.value = `R$ ${calculatedValue.replace('.', ',')}`; // Formatar para moeda Brasileira (R$ XX,XX)
        console.log('Valor exibido:', orderValueInput.value);
    };

    // Atualizar o valor ao mudar o input de quantidade
    if (quantityInput && orderValueInput) {
        console.log('Inputs de quantidade e valor encontrados. Adicionando event listener.');
        quantityInput.addEventListener('input', updateOrderValue);
        // Chamar a função no carregamento da página para definir o valor inicial
        console.log('Chamando updateOrderValue no carregamento da página.');
        updateOrderValue();
    } else {
        console.log('Inputs de quantidade ou valor NÃO encontrados no DOM.');
    }

    // Adicionar evento de clique ao botão Enviar
    if (buyButton && quantityInput && orderValueInput) {
        console.log('Botão de comprar, quantidade e valor inputs encontrados. Adicionando event listener de clique.');
        buyButton.addEventListener('click', (e) => {
            e.preventDefault();
            const selectedQuantity = quantityInput.value;
            const calculatedValue = orderValueInput.value;
            console.log(`Comprar ${selectedQuantity} seguidores por ${calculatedValue}`);
            // TODO: Adicionar aqui a lógica de compra, redirecionamento, etc. com a quantidade e valor
            // Por enquanto, apenas loga as informações selecionadas.
        });
    } else {
        console.log('Botão de comprar, quantidade ou valor inputs NÃO encontrados no DOM.');
    }
});
// Redirecionamento para WhatsApp ao selecionar pacote

document.querySelectorAll('.package-button').forEach((button) => {
    button.addEventListener('click', function (e) {
        e.preventDefault();
        console.log('Botão Selecionar Pacote clicado'); // Depuração
        const packageItem = button.closest('.package-item');
        const packageTitle = packageItem.querySelector('.package-title').innerText;
        const packagePrice = packageItem.querySelector('h3').innerText;

        const message = `Olá! Tenho interesse no pacote ${packageTitle} (${packagePrice}). Como posso pagar?`;
        const phoneNumber = '5533998632041';
        const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
        window.open(whatsappURL, '_blank');
    });
});

// Contador animado para números
function animateCounter(element, target, duration = 1800) {
    let start = 0;
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        element.textContent = Math.floor(progress * (target - start) + start);
        if (progress < 1) {
            window.requestAnimationFrame(step);
        } else {
            element.textContent = target;
        }
    };
    window.requestAnimationFrame(step);
}

document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.number').forEach(el => {
        const target = parseInt(el.getAttribute('data-target'));
        if (!isNaN(target)) {
            animateCounter(el, target);
        }
    });
});

// Dropdown de navegação (Soluções)
document.addEventListener('DOMContentLoaded', () => {
  const dropdowns = document.querySelectorAll('.nav-dropdown');
  dropdowns.forEach(drop => {
    const toggle = drop.querySelector('.dropdown-toggle');
    toggle.addEventListener('click', (e) => {
      e.stopPropagation();
      // Fecha outros dropdowns
      dropdowns.forEach(d => { if (d !== drop) d.classList.remove('open'); });
      drop.classList.toggle('open');
    });
  });
  // Fecha dropdown ao clicar fora
  document.addEventListener('click', () => {
    dropdowns.forEach(drop => drop.classList.remove('open'));
  });
});
