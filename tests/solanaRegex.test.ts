import { testSolana } from '../src/validation/address';

describe('solanaAddressRegex', () => {
    test('validAddresses', () => {
        const validSolanaAddresses = [
            '4Nd1mQ2foW7qSwk89NzVFTva9UtaYenEF69k1ysEVnnK',
            '7QdSkQZn7yyRCicHTrjqAMR1NTsFYpJHyEnfjqWRd9XN',
            'Picanmgae1ZFueTPZLwLzPRhNG4Y7H1yQtrqxCqUZLe',
            'cHinUpMekg5GDr7w53B6Cb7M6SdK7uMojbpQg6QCc11',
            'BLhx1pi4rCLZY2qTqLmUAueLXzPzprhaiarysxLbFwVa',
            'mrgn4sJJu5GBa5wbKyjuASzhyCifvcedGoLtpKjB3Wf',
        ];
        validSolanaAddresses.forEach(address => {
            expect(testSolana().test(address)).toBe(true);
        });
    });

    test('invalidAddresses', () => {
        const invalidSolanaAddresses = [
            '4Nd1mQ2foW7qSwk89NzVFTva9UtaYenEF69k1ysEVnnK3m', // too long
            'InvalidSolanaAddress12345',
        ];
        invalidSolanaAddresses.forEach(address => {
            expect(testSolana().test(address)).toBe(false);
        });
    });
});
