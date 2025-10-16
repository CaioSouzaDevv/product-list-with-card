
const rowProducts = document.querySelector('.row');
const cardTemplate = document.querySelector('.product');
const price = document.querySelector('.data');

const listCar = document.querySelector('.cart__list');
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
        cardClone.querySelector('data').textContent = e.price.toFixed(2);

        rowProducts.appendChild(cardClone);

        cardClone.querySelector('.product__button').addEventListener('click', function (car) {
            car.preventDefault();

            const listInCart = document.createElement('li');
            listInCart.classList.add('cart__item'); // seu bloco BEM

            const itemName = document.createElement('span');
            itemName.classList.add('cart__item-name');
            itemName.textContent = e.name;

            const itemPrice = document.createElement('span');
            itemPrice.classList.add('cart__item-price');
            itemPrice.textContent = `$${e.price.toFixed(2)}`;

            // Adiciona os dois elementos no li
            listInCart.appendChild(itemName);
            listInCart.appendChild(itemPrice);

            // Adiciona o li na lista
            listCar.appendChild(listInCart);


        });

    });




}

loading();
