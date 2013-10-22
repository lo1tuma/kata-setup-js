var expect = require('chai').expect;


function priceFor(cart) {
    var differentCategories = Object.keys(cart).length,
        discountFor2Products = 0.95,
        discountFor3Products = 0.9,
        defaultBookPrice = 8;

    if(differentCategories === 3) {
        return discountFor3Products * (3 * defaultBookPrice);
    } else if(differentCategories === 2) {
        return discountFor2Products * (2 * defaultBookPrice);
    } else {
        return cart.book1 * defaultBookPrice;
    }
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
