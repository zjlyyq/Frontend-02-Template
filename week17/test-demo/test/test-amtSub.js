var assert = require('assert');
import amtSub from '../amtSub';

describe('test price utils', function () {
    describe('float price sub', function () {
        it('100.02 - 0.02 should be 100.00', function () {
            assert.strictEqual(amtSub('100.02', '0.02'), '100.00');
        });
        it('99.02 - 0.02 should be 90.00', function () {
            assert.strictEqual(amtSub('99.02', '.02'), '99.00');
        });
        it('99.02 - 0 should be 90.00', function () {
            assert.strictEqual(amtSub('99.02', '0'), '99.02');
        });
        it('9.02 - 3.56 should be 5.46', function () {
            assert.strictEqual(amtSub('9.02', '3.56'), '5.46');
        });
        it('9.56 - 3.56 should be 6.00', function () {
            assert.strictEqual(amtSub('9.56', '3.56'), '6.00');
        });
    });
});