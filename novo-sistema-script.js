document.addEventListener('DOMContentLoaded', () => {
    const themeSwitch = document.getElementById('themeSwitch');
    const body = document.body;
    const quantidadeInput = document.getElementById('quantidade');
    const valorInput = document.getElementById('valor');
    const servicoSelect = document.getElementById('servico'); // Get the service select element
    const quantidadeMinMaxText = document.getElementById('quantidade-min-max'); // Get the min/max text element

    // Theme switch functionality
    themeSwitch.addEventListener('click', () => {
        body.classList.toggle('dark-theme');
        // Save theme preference to localStorage
        if (body.classList.contains('dark-theme')) {
            localStorage.setItem('theme', 'dark');
        } else {
            localStorage.setItem('theme', 'light');
        }
    });

    // Apply saved theme on load
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        body.classList.add('dark-theme');
    } else {
        body.classList.remove('dark-theme');
    }

    // Mobile menu toggle functionality (if you add a mobile menu)
    // const menuToggle = document.querySelector('.menu-toggle');
    // const navLinks = document.querySelector('.nav-links');
    // menuToggle.addEventListener('click', () => {
    //     navLinks.classList.toggle('active');
    // });

    // Price calculation functionality
    const calculatePrice = () => {
        let quantidade = parseInt(quantidadeInput.value, 10);
        const selectedService = servicoSelect.value; // Get the currently selected service

        let precoPorDez;
        let minQuantity;
        let maxQuantity;

        if (selectedService === 'tiktok-seguidores') {
            precoPorDez = 0.16; // R$ 0.16 for TikTok
            minQuantity = 10; // TikTok min quantity
            maxQuantity = 1000000; // TikTok max quantity
        } else if (selectedService === 'youtube-visualizacoes') {
            precoPorDez = 0.20; // R$ 0.20 for YouTube
            minQuantity = 100; // YouTube min quantity
            maxQuantity = 10000000; // YouTube max quantity
        } else {
            precoPorDez = 0.15; // R$ 0.15 for other services (e.g., Instagram)
            minQuantity = 10; // Default min quantity
            maxQuantity = 1000000; // Default max quantity
        }

        // Update the min/max display text
        quantidadeMinMaxText.textContent = `Mín.: ${minQuantity} - Máx.: ${maxQuantity.toLocaleString('pt-BR')}`;

        // Set the min and max attributes for the quantity input
        quantidadeInput.setAttribute('min', minQuantity);
        quantidadeInput.setAttribute('max', maxQuantity);

        // Only calculate if a valid number is entered
        if (!isNaN(quantidade)) {
            // Ensure quantity is at least the minimum for the selected service
            if (quantidade < minQuantity) {
                quantidade = minQuantity;
            } else if (quantidade > maxQuantity) { // Ensure quantity is not more than the maximum
                quantidade = maxQuantity;
            }

            const valorTotal = (quantidade / 10) * precoPorDez;

            // Format value as currency (R$ X.XX)
            valorInput.value = `R$ ${valorTotal.toFixed(2).replace('.', ',')}`; // Format for Brazilian Real
        } else {
            // If input is not a number, clear the price or set to initial price for 10
            valorInput.value = `R$ ${precoPorDez.toFixed(2).replace('.', ',')}`; // Set to the base price for 10 followers for the selected service
        }
    };

    // Add event listener to quantity input for input changes
    quantidadeInput.addEventListener('input', calculatePrice);

    // Add event listener to service select for changes
    servicoSelect.addEventListener('change', calculatePrice); // Call calculatePrice when service changes

    // Add event listener to handle minimum and maximum value when the input field is unfocused
    quantidadeInput.addEventListener('blur', () => {
        let quantidade = parseInt(quantidadeInput.value, 10);
        const selectedService = servicoSelect.value;

        let currentMinQuantity;
        let currentMaxQuantity;

        if (selectedService === 'youtube-visualizacoes') {
            currentMinQuantity = 100;
            currentMaxQuantity = 10000000;
        } else {
            currentMinQuantity = 10;
            currentMaxQuantity = 1000000;
        }

        if (isNaN(quantidade) || quantidade < currentMinQuantity) {
            quantidadeInput.value = currentMinQuantity;
            calculatePrice();
        } else if (quantidade > currentMaxQuantity) {
            quantidadeInput.value = currentMaxQuantity;
            calculatePrice();
        }
    });

    // Initial price calculation on page load
    calculatePrice();
}); 