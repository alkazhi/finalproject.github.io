console.log('External JS Loaded!');

const shopData = [
    {
        id: 'coffee01',
        name: 'Flat White',
        description: 'A flat white is a coffee drink consisting of espresso with microfoam (steamed milk with small, fine bubbles and a glossy or velvety consistency)',
        variations: [
            {size: 'Small', price: 4, quantity: 0 },
            {size: 'Medium', price: 5, quantity: 0 },
            {size: 'Large', price: 6.5, quantity: 0 },
        ],
    },
    {
        id: 'coffee02',
        name: 'Long Black',
        description: 'A long black is a style of coffee commonly found in Australia and New Zealand. It is similar to an Americano, but with a stronger aroma and taste. A long black is made by pouring a double-shot of espresso or ristretto over hot water.',
        variations: [
            {size: 'Small', price: 3, quantity: 0 },
            {size: 'Medium', price: 4, quantity: 0 },
            {size: 'Large', price: 5.5, quantity: 0 },
        ],
    },
    {
        id: 'coffee03',
        name: 'Cappuccino',
        description: 'A cappuccino is an espresso-based coffee drink that originated in Italy and is traditionally prepared with steamed milk foam. Variations of the drink involve the use of cream instead of milk, using non-dairy milk substitutes and flavoring with cinnamon or chocolate powder.',
        variations: [
            {size: 'Small', price: 4.5, quantity: 0 },
            {size: 'Medium', price: 5.5, quantity: 0 },
            {size: 'Large', price: 7, quantity: 0 },
        ],
    }
];


// console.log(shopData[2].variations[1].price);
const menuArea = document.querySelector('.menu');
const cart = document.querySelector('.cart');
const cartTotal = document.querySelector('.total');
let shopTotal = 0;

// const clearAll = document.querySelector('.clear');

// clearAll.addEventListener('click', () => {
//     shopTotal = 0;
//     cartTotal.innerHTML = price(shopTotal);
//     cart.innerHTML = '';
// });

// Helper function
const price = value => `$${value.toFixed(2)}`;

const shopItem = (product) => {
    return `
        <div class="shop-item mb-5">
            <h3 class="text-xl font-bold">${product.name}</h3>
            <p>${product.description}</p>
            <div class="variations">
                <button data-id="${product.id}" data-size="${product.variations[0].size}" class="px-4 py-2 my-2 mr-2 bg-blue-300 rounded-md">
                    ${product.variations[0].size} - ${ price(product.variations[0].price) }
                </button>
                <button data-id="${product.id}" data-size="${product.variations[1].size}" class="px-4 py-2 my-2 mr-2 bg-blue-300 rounded-md">
                    ${product.variations[1].size} - ${ price(product.variations[1].price) }
                </button>
                <button data-id="${product.id}" data-size="${product.variations[2].size}" class="px-4 py-2 my-2 mr-2 bg-blue-300 rounded-md">
                    ${product.variations[2].size} - ${ price(product.variations[2].price) }
                </button>
            </div>
        </div>
    `;
}



for(let i = 0; i < shopData.length; i++) {
    menuArea.innerHTML += shopItem(shopData[i]);
}


const buttonsAll = document.querySelectorAll('button');
// console.log(buttonsAll);

buttonsAll.forEach((button) => {
    button.addEventListener('click', () => {
        const itemId = button.dataset.id;
        const itemSize = button.dataset.size;
        // console.log(itemId, itemSize);

        // const targetProduct = shopData.find((x) => {
        //     return x.id === itemId;
        // });

        const targetProduct = shopData.find(x => x.id === itemId);
        // console.log(targetProduct);

        const targetProductSize = targetProduct.variations.find(v => v.size === itemSize);
        targetProductSize.quantity += 1;
        // console.log(targetProductSize);

        updateCart();

    });
});


const cartItem = (product) => {

    let productTotal = 0;

    const calculateTotal = (pos) => {

        const runningTotal = product.variations[pos].quantity * product.variations[pos].price;
        productTotal += runningTotal;

        return runningTotal;
    }

    const isVisible = (pos) => {
        // Ternary operator
        // condition ? true : false 
        return product.variations[pos].quantity > 0 ? 'block' : 'hidden';
    }

    // const isVisible = (pos) => product.variations[pos].quantity > 0 ? 'block' : 'hidden';

    const template = `
        <h3>${product.name}</h3>
        <p class="${isVisible(0)}">${product.variations[0].quantity}x Small ${ price( calculateTotal(0) ) }</p>
        <p class="${isVisible(1)}">${product.variations[1].quantity}x Med ${ price( calculateTotal(1) ) }</p>
        <p class="${isVisible(2)}">${product.variations[2].quantity}x Large ${ price( calculateTotal(2) ) }</p>
    `;

    return {
        template: `<div class="${productTotal > 0 ? 'block' : 'hidden'}">${template}</div>`,
        productTotal: productTotal
    };

    // return { template, productTotal };
}


function updateCart() {
    cart.innerHTML = '';
    shopTotal = 0;

    shopData.forEach((product) => {

        // cart.innerHTML = cartItem(product);

        const cartData = cartItem(product); // Returing template and product total

        console.log(cartData.productTotal);

        cart.innerHTML += cartData.template;
        shopTotal += cartData.productTotal;
        cartTotal.innerHTML = price(shopTotal);
        
    }); 

}