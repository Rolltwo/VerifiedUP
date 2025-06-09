document.addEventListener('DOMContentLoaded', () => {
    const themeSwitch = document.getElementById('themeSwitch');
    const body = document.body;
    const quantidadeInput = document.getElementById('quantidade');
    const valorInput = document.getElementById('valor');

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

        // Only calculate if a valid number is entered
        if (!isNaN(quantidade)) {
            // Ensure quantity is at least the minimum (10)
            if (quantidade < 10) {
                // Optionally alert the user or handle this on form submission
                // For now, we allow typing but price reflects min value for calculation
                quantidade = 10;
                // Do NOT reset the input field here while typing
            }

            // Calculate value (R$ 0.15 for every 10 followers)
            const precoPorDez = 0.15;
            const valorTotal = (quantidade / 10) * precoPorDez;

            // Format value as currency (R$ X.XX)
            valorInput.value = `R$ ${valorTotal.toFixed(2).replace('.', ',')}`; // Format for Brazilian Real
        } else {
            // If input is not a number, clear the price or set to R$ 0.15 (for min quantity)
            valorInput.value = `R$ 0,15`; // Assuming R$ 0.15 is the price for the minimum 10
        }
    };

    // Add event listener to quantity input for input changes
    quantidadeInput.addEventListener('input', calculatePrice);

    // Add event listener to handle minimum value when the input field is unfocused
    quantidadeInput.addEventListener('blur', () => {
        let quantidade = parseInt(quantidadeInput.value, 10);
        if (isNaN(quantidade) || quantidade < 10) {
            quantidadeInput.value = 10; // Set to minimum if invalid or below minimum
             // Recalculate price based on corrected quantity
            const precoPorDez = 0.15;
            const valorTotal = (10 / 10) * precoPorDez; // Calculate for 10
            valorInput.value = `R$ ${valorTotal.toFixed(2).replace('.', ',')}`; // Format for Brazilian Real
        }
         // If a valid number >= 10 is already there, calculatePrice on input would have handled it
    });

    // Initial price calculation on page load
    calculatePrice();
}); 