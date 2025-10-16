
const rowProducts = document.querySelector('.row');
const cardTemplate = document.querySelector('.product');
const price = document.querySelector('.data');

const listCar = document.querySelector('.cart__list');
let total = 0;
let totalCar = document.querySelector('.cart__total-value');
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



            const removeItem = document.createElement('a');
            removeItem.title = 'Clique para remover';
            removeItem.classList.add('cart__item-remove');
            removeItem.textContent = 'x';

            // Adiciona elementos no li
            listInCart.appendChild(itemName);
            listInCart.appendChild(itemPrice);
            listInCart.appendChild(removeItem);

            listCar.appendChild(listInCart);

            total += Number.parseFloat(e.price);

            totalCar.textContent = total.toFixed(2);

            // Lógica para remover os <li> do carrinho
            removeItem.addEventListener('click', function () {
                listInCart.remove();


            })
        });




    });




}

loading();
