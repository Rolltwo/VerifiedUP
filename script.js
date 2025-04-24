// Tema escuro
const themeSwitch = document.getElementById('themeSwitch');
const htmlElement = document.documentElement;

themeSwitch.addEventListener('click', () => {
    if (htmlElement.getAttribute('data-theme') === 'dark') {
        htmlElement.removeAttribute('data-theme');
        themeSwitch.innerHTML = '<i class="fas fa-moon"></i>';
    } else {
        htmlElement.setAttribute('data-theme', 'dark');
        themeSwitch.innerHTML = '<i class="fas fa-sun"></i>';
    }
});

// Menu mobile
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    menuToggle.classList.toggle('active');
});

// Contador de estatísticas
const stats = document.querySelectorAll('.number');

stats.forEach(stat => {
    const target = parseInt(stat.getAttribute('data-target'));
    const increment = target / 200;
    
    function updateCount() {
        const current = parseInt(stat.innerText);
        if (current < target) {
            stat.innerText = Math.ceil(current + increment);
            setTimeout(updateCount, 10);
        } else {
            stat.innerText = target;
        }
    }
    
    updateCount();
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

// Formulário de contato
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Aqui você pode adicionar a lógica para enviar o formulário
    const formData = new FormData(contactForm);
    console.log('Formulário enviado:', Object.fromEntries(formData));
    
    // Feedback visual
    const submitButton = contactForm.querySelector('.submit-button');
    const originalText = submitButton.innerText;
    submitButton.innerText = 'Mensagem Enviada!';
    submitButton.style.backgroundColor = '#25D366';
    
    setTimeout(() => {
        submitButton.innerText = originalText;
        submitButton.style.backgroundColor = '';
        contactForm.reset();
    }, 3000);
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