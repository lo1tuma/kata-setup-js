var expect = require('chai').expect,
    cart = require('../index.js');

describe('KataPotter', function () {
    var testData = [
        {
            cart: { book1: 1},
            cartTotal: 8,
            description: 'charges 8 EUR for a single book'
        },
        {
            cart: { book1: 2},
            cartTotal: 16,
            description: 'charges 16 EURO fro two copies of the same book'
        },
        {
            cart: { book1: 1, book2: 1},
            cartTotal: 15.2,
            description: 'charges 95 % of 16 EUR for two separate books'
        },
        {
            cart: { book1: 1, book2: 1, book3: 1},
            cartTotal: 21.6,
            description: 'charges 90 % of 24 EUR for three separate books'
        },
        {
            cart: { book1: 2, book2: 2},
            cartTotal: 30.4,
            description: 'charges 95 % of 32 EUR for two copies of two separate books'
        },
        {
            cart: { book1: 2, book2: 1},
            cartTotal: 23.2,
            description: 'charges 95 % of a pair of two different books and 8 EUR for the remaining book'
        },
        {
            cart: { book1: 2, book2: 2, book3: 2, book4: 1, book5: 1},
            cartTotal: 51.2,
            description: 'should calculate the minimal price of the cart'
        }
    ];

    testData.forEach(function (data) {
        it(data.description, function () {
            expect(cart.getPrice(data.cart)).to.equal(data.cartTotal);
        });
    });
});
