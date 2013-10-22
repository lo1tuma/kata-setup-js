var expect = require('chai').expect;


function priceFor(cart) {
    var differentProducts = Object.keys(cart).length,
        defaultBookPrice = 8,
        discountFactorFor = {
            3: .9,
            2: .95,
            1: 1
        };

    return discountFactorFor[differentProducts] * defaultBookPrice * ((cart.book1 || 0) + (cart.book2 || 0) + (cart.book3 || 0));
}

describe('KataPotter', function () {
    it('charges 8 EUR for a single book', function () {
        expect(priceFor({ book1: 1})).to.equal(8);
    });

    it('charges 16 EURO fro two copies of the same book', function () {
        expect(priceFor({book1: 2})).to.equal(16);
    });

    it('charges 95 % of 16 EUR for two separate books', function () {
        expect(priceFor({book1: 1, book2: 1})).to.equal(15.2);
    });

    it('charges 90 % of 24 EUR for three separate books', function () {
        expect(priceFor({book1: 1, book2: 1, book3: 1})).to.equal(21.6);
    });
});
