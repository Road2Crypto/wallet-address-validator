import { regexSolana } from '../src/validation/address';

describe('Solana Address Regex', () => {
    test('Valid Solana addresses', () => {
        const validSolanaAddresses = [
            '4Nd1mQ2foW7qSwk89NzVFTva9UtaYenEF69k1ysEVnnK',
            '7QdSkQZn7yyRCicHTrjqAMR1NTsFYpJHyEnfjqWRd9XN',
        ];
        validSolanaAddresses.forEach(address => {
            expect(regexSolana.test(address)).toBe(true);
        });
    });

    test('Invalid Solana addresses', () => {
        const invalidSolanaAddresses = [
            '4Nd1mQ2foW7qSwk89NzVFTva9UtaYenEF69k1ysEVnn', // too short
            '4Nd1mQ2foW7qSwk89NzVFTva9UtaYenEF69k1ysEVnnK3m', // too long
            'InvalidSolanaAddress12345',
        ];
        invalidSolanaAddresses.forEach(address => {
            expect(regexSolana.test(address)).toBe(false);
        });
    });
});
