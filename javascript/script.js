
const rowProducts = document.querySelector('.row');
const cardTemplate = document.querySelector('.product');
const price = document.querySelector('.data');

const listCar = document.querySelector('.cart__list');
let total = 0;
let totalCar = document.querySelector('.cart__total-value');
const btnCar = document.querySelector('.cart__button');
const btnNewOrder = document.querySelector('.btn__new');

let lightbox = document.querySelector('.lightbox');
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

        // create list the car
        cardClone.querySelector('.product__button').addEventListener('click', function (car) {
            car.preventDefault();

            const listInCart = document.createElement('li');
            listInCart.classList.add('cart__item');

            const itemName = document.createElement('span');
            itemName.classList.add('cart__item-name');
            itemName.textContent = e.name;


            const itemImage = document.createElement('img');
            itemImage.classList.add('cart__item-image');
            itemImage.src = e.image.thumbnail;


            const itemPrice = document.createElement('span');
            itemPrice.classList.add('cart__item-price');
            itemPrice.textContent = `$${e.price.toFixed(2)}`;

         



            const removeItem = document.createElement('a');
            removeItem.title = 'Clique para remover';
            removeItem.classList.add('cart__item-remove');
            removeItem.textContent = 'x';

            // Adiciona elementos no li
            listInCart.appendChild(itemImage);
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

        // End list the car



        // Logic pop-up car add
      btnCar.addEventListener('click', function (btn) {
  btn.preventDefault();

  const totalEnd = document.querySelector('.total-sum');
  const rowList = document.querySelector('.rowList');


  rowList.innerHTML = "";
  totalEnd.innerHTML = "";

  const items = document.querySelectorAll('.cart__item');
  let totalPopup = 0; 

  items.forEach(item => {
    const li = document.createElement('li');
    li.classList.add('cart__item');

    const name = item.querySelector('.cart__item-name').textContent;
    const priceText = item.querySelector('.cart__item-price').textContent;
    const image = item.querySelector('.cart__item-image').src;

    // extrai o número (remove o "$")
    const price = parseFloat(priceText.replace('$', ''));
    totalPopup += price; // <-- soma aqui

    const spanName = document.createElement('span');
    spanName.classList.add('cart__item-name');
    spanName.textContent = name;

    const popUpImage = document.createElement('img');
    popUpImage.classList.add('cart__item-image');
    popUpImage.src = image;
    popUpImage.alt = name;

    const spanPrice = document.createElement('span');
    spanPrice.classList.add('cart__item-price');
    spanPrice.textContent = `$${price.toFixed(2)}`;

    li.appendChild(popUpImage);
    li.appendChild(spanName);
    li.appendChild(spanPrice);

    rowList.appendChild(li);
  });


  const endTotal = document.createElement('h3');
  endTotal.textContent = `Total: $${totalPopup.toFixed(2)}`;
  totalEnd.appendChild(endTotal);

  // exibe o lightbox
  lightbox.style.display = "block";
});


    });


function resetCart() {
  listCar.innerHTML = '';
  total = 0;
  totalCar.textContent = total.toFixed(2);
  lightbox.style.display = 'none';
}

btnNewOrder.addEventListener('click', function(e) {
e.preventDefault();
resetCart();
})

    //End Logic pop-up car add


}

loading();


