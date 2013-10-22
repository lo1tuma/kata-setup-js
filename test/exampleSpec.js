var expect = require('chai').expect,
    _ = require('underscore');

function sum(cart) {
    return _.reduce(_.values(cart), function (a, b) {
        return a + b
    }, 0);
}

function priceFor(cart) {
    var defaultBookPrice = 8,
        discountFactorFor = {
            3: .9,
            2: .95,
            1: 1
        },
        numberOfTotalItems = sum(cart);

    var cartSum = 0;
    while (numberOfTotalItems > 0) {
        var uniqueItems = 0;
        _.each(cart, function (value, key) {
            if (value > 0) {
                uniqueItems += 1;
                cart[key] -= 1;
            }
        });

        cartSum += discountFactorFor[uniqueItems] * uniqueItems * defaultBookPrice;

        numberOfTotalItems = sum(cart);
    }

    return cartSum;
}

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
        }
    ];

    testData.forEach(function (data) {
        it(data.description, function () {
            expect(priceFor(data.cart)).to.equal(data.cartTotal);
        });
    });
});
