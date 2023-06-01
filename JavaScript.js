let openOrder = document.querySelector('.order');
let closeOrder = document.querySelector('.closeOrder');
let list = document.querySelector('.list');
let listCard = document.querySelector('.listCard');
let body = document.querySelector('body');
let total = document.querySelector('.total');
let quantity = document.querySelector('.quantity');

openOrder.addEventListener('click', ()=>{
    body.classList.add('active');
})
closeOrder.addEventListener('click', ()=>{
    body.classList.remove('active');
})

let products = [
    {
        id: 1,
        name: 'Breakfast',
        image: 'Breakfast.JPG',
        price: 11000 ,
        ingredients: 'Ingredients: eggs, bacon, pankakes, orange juice'
    },
    {
        id: 2,
        name: 'Pizza',
        image: 'Pizza.JPG',
        price: 15000,
        ingredients: 'Ingredients: bacon, mozarella, tomatoes, pepper'

    },
    {
        id: 3,
        name: 'Beef Grill',
        image: 'Grill.JPG',
        price: 17000,
        ingredients: 'Ingredients: beef, fries, tomatoes, mushrooms'

    },
    {
        id: 4,
        name: 'Spaghetti',
        image: 'Spaghetti.JPG',
        price: 9000,
        ingredients: 'Ingredients: spaghetti, tomatoes, parmesan'

    },
    {
        id: 5,
        name: 'Burger',
        image: 'Burger.JPG',
        price: 19000,
        ingredients: 'Ingredients: beef, fries, tomatoes, salad, eggs, sauce'

    },
    {
        id: 6,
        name: 'Carrot Cake',
        image: 'CarrotCake.JPG',
        price: 7000,
        ingredients: 'Ingredients: carrots, hazelnuts, cinnamon'

    }
];
let listCards  = [];
function initApp(){
    products.forEach((value, key) =>{
        let newDiv = document.createElement('div');
        newDiv.classList.add('item');
        newDiv.innerHTML = `
            <img src="image/${value.image}">
            <div class="title">${value.name}</div>
            <div class="title">${value.ingredients}</div>
            <div class="price">${value.price.toLocaleString()+' £'}</div>
            <button onclick="addToCard(${key})">Add To List</button>`;
        list.appendChild(newDiv);
    })
}
initApp();
function addToCard(key){
    if(listCards[key] == null){
        // copy product form list to list card
        listCards[key] = JSON.parse(JSON.stringify(products[key]));
        listCards[key].quantity = 1;
    }
    reloadCard();
}
function reloadCard(){
    listCard.innerHTML = '';
    let count = 0;
    let totalPrice = 0;
    listCards.forEach((value, key)=>{
        totalPrice = totalPrice + value.price;
        count = count + value.quantity;
        if(value != null){
            let newDiv = document.createElement('li');
            newDiv.innerHTML = `
                <div><img src="image/${value.image}"/></div>
                <div>${value.name}</div>
                <div>${value.price.toLocaleString()+' £'}</div>
                <div>
                    <button onclick="changeQuantity(${key}, ${value.quantity - 1})">-</button>
                    <div class="count">${value.quantity}</div>
                    <button onclick="changeQuantity(${key}, ${value.quantity + 1})">+</button>
                </div>`;
                listCard.appendChild(newDiv);
        }
    })
    total.innerText ='Total :  '+ totalPrice.toLocaleString() +' £';
    quantity.innerText = count;
}
function changeQuantity(key, quantity){
    if(quantity == 0){
        delete listCards[key];
    }else{
        listCards[key].quantity = quantity;
        listCards[key].price = quantity * products[key].price;
    }
    reloadCard();
}