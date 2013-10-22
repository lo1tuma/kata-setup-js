'use strict';
var products = ['book1', 'book2', 'book3', 'book4', 'book5'],
    pricePerBook = 8,
    discounts = [0, 5, 10, 20, 25];

function createSetForProducts(products) {
    var set = {book1: 0, book2: 0, book3: 0, book4: 0, book5: 0};

    products.forEach(function (product) {
        set[product] = 1;
    });

    return set;
}

function createPossibleSets(cart) {
    var sets = [],
        productsToInclude = [];

    products.forEach(function (prodcut) {
        if (cart[prodcut] > 0) {
            productsToInclude.push(prodcut);
            sets.push(createSetForProducts(productsToInclude));
        }
    });

    return sets;
}

function substractSetFromCart(set, cart) {
    var substractedCart = {};

    products.forEach(function (product) {
        substractedCart[product] = cart[product] - set[product];
    });

    return substractedCart;
}

function getTotalAmountOfCart(cart) {
    return products
        .reduce(function (previousValue, product) {
            return previousValue + cart[product];
        }, 0);
}

function getDifferentProducts(set) {
    return products.filter(function (product) {
        return set[product] > 0;
    });
}

function getNumberOfDifferentProducts(set) {
    return getDifferentProducts(set).length;
}

function getPriceForSet(set) {
    var numberOfDifferentProducts = getNumberOfDifferentProducts(set),
        discount = discounts[numberOfDifferentProducts - 1],
        discountFactor = 1 - discount / 100;

    return pricePerBook * numberOfDifferentProducts * discountFactor;
}

function getPossiblePricesForCart(cart, currentPrice) {
    var sets = createPossibleSets(cart);

    return sets.map(function (set) {
        return getPrice(cart, currentPrice, set);
    });
}

function getPrice(cart, currentPrice, set) {
    var price = currentPrice + getPriceForSet(set),
        substractedCart = substractSetFromCart(set, cart),
        prices;

    if (getTotalAmountOfCart(substractedCart) === 0) {
        return price;
    }

    prices = getPossiblePricesForCart(substractedCart, price);
    return Math.min.apply(null, prices);
}

function normalizeCart(cart) {
    var normalized = {book1: 0, book2: 0, book3: 0, book4: 0, book5: 0};

    Object.keys(cart).forEach(function (product) {
        normalized[product] = cart[product];
    });

    return normalized;
}

module.exports = {
    getPrice: function (cart) {
        var normalizedCart = normalizeCart(cart),
            prices = getPossiblePricesForCart(normalizedCart, 0);

        return Math.min.apply(null, prices);
    }
};

