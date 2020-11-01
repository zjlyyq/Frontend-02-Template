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
        // 测试 减数不含小数点
        it('9 - 3.00 should be 6.56', function () {
            assert.strictEqual(amtSub('9', '3.00'), '6.00');
        });
        // 测试 减数小数部分长度小于2
        it('9.1 - 3.99 should be 5.11', function () {
            assert.strictEqual(amtSub('9.1', '3.99'), '5.11');
        });
        // 测试 减数小数部分长度小于2
        it('9.1 - 3.9 should be 5.20', function () {
            assert.strictEqual(amtSub('9.1', '3.9'), '5.20');
        });
        it('9. - 3.9 should be 5.10', function () {
            assert.strictEqual(amtSub('9.', '3.9'), '5.10');
        });

        it('19. - 13.9 should be 5.10', function () {
            assert.strictEqual(amtSub('19.', '13.9'), '5.10');
        });
    });
});