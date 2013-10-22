var expect = require('chai').expect;

function priceFor(cart) {
    return cart.book1 * 8;
}

describe('KataPotter', function () {
    it('charges 8 EUR for a single book', function () {
        expect(priceFor({ book1: 1})).to.equal(8);
    });

    it('charges 16 EURO fro two copies of the same book', function () {
        expect(priceFor({book1: 2})).to.equal(16);
    });
});
