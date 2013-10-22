var expect = require('chai').expect;

function priceFor() {
    return 8;
}

describe('KataPotter', function () {
    it('charges 8 EUR for a single book', function () {
        expect(priceFor({ book1: 1})).to.equal(8);
    });
});
