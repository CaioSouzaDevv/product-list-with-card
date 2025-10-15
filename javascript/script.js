const rowProducts = document.querySelector('.row');
const cardTemplate = document.querySelector('.product');

// Remove o card inicial do HTML, para não duplicar
cardTemplate.remove();

async function loading() {
    const response = await fetch('data.json');
    const data = await response.json();

    data.forEach(e => {
        const cardClone = cardTemplate.cloneNode(true);

        cardClone.querySelector('img').src = e.image.desktop;
        cardClone.querySelector('img').alt = e.image.name;
        cardClone.querySelector('img').title = e.image.name;

        cardClone.querySelector('h3').textContent = e.name;
        cardClone.querySelector('p').textContent = e.name;

        rowProducts.appendChild(cardClone);
    });
}

loading();
