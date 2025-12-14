import { isAddress } from '../src/index';

describe('isAddress', () => {
    test('should return true for valid address', () => {
        const validAddress = '1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa'; // Bitcoin address
        expect(isAddress(validAddress)).toBe(true);
    });

    test('should return false for invalid address', () => {
        const invalidAddress = 'invalid-address';
        expect(isAddress(invalidAddress)).toBe(false);
    });

    test('should return false for empty address', () => {
        expect(isAddress('')).toBe(false);
    });
});
