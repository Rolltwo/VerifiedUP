// Preços dos pacotes
const precos = {
    '100': 12.99,
    '300': 19.99,
    '500': 29.99,
    '2000': 79.99,
    '5000': 149.99
};

const redeSelect = document.getElementById('rede');

const pacoteSelect = document.getElementById('pacote');
const quantidadeInput = document.getElementById('quantidade');
const valorExibido = document.getElementById('valorExibido');
const form = document.getElementById('formUnificado');

function atualizarValor() {
    let valor = 0;
    let quantidade = parseInt(quantidadeInput.value) || 0;
    let pacote = pacoteSelect.value;
    let rede = redeSelect.value;

    let precoPersonalizadoPor10 = 0.15;
    if (rede === 'tiktok') precoPersonalizadoPor10 = 0.16;
    if (rede === 'youtube') precoPersonalizadoPor10 = 0.20;

    if (precos[pacote]) {
        valor = precos[pacote];
        quantidadeInput.value = pacote;
        quantidadeInput.setAttribute('readonly', true);
    } else if (pacote === 'personalizado') {
        valor = ((quantidade / 10) * precoPersonalizadoPor10);
        quantidadeInput.removeAttribute('readonly');
    } else {
        valor = 0;
        quantidadeInput.removeAttribute('readonly');
    }
    valorExibido.textContent = `Valor: R$ ${valor.toFixed(2).replace('.', ',')}`;
}

redeSelect.addEventListener('change', atualizarValor);
pacoteSelect.addEventListener('change', atualizarValor);
quantidadeInput.addEventListener('input', atualizarValor);

form.addEventListener('submit', function(e) {
    e.preventDefault();
    let quantidade = quantidadeInput.value;
    let pacote = pacoteSelect.value;
    let valor = valorExibido.textContent.replace('Valor: R$ ', '');
    let rede = redeSelect.options[redeSelect.selectedIndex].text;
    if (!quantidade || quantidade < 10) {
        alert('Por favor, informe uma quantidade válida!');
        return;
    }
    let mensagem = `*Novo Pedido de Seguidores*%0A%0A`;
    mensagem += `*Rede Social:* ${rede}%0A`;
    if (precos[pacote]) {
        mensagem += `*Pacote:* ${pacote} seguidores%0A`;
    } else {
        mensagem += `*Pacote:* Personalizado%0A`;
    }
    mensagem += `*Quantidade:* ${quantidade}%0A*Valor:* R$ ${valor}`;
    const numeroWhatsApp = '5533998632041';
    const url = `https://wa.me/${numeroWhatsApp}?text=${mensagem}`;
    window.open(url, '_blank');
});

// Inicializar valor
atualizarValor(); 