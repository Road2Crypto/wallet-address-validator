import { testBitcoin } from '../src/validation/address';

describe('Bitcoin Address Regex', () => {
    test('Valid P2PKH addresses', () => {
        const validP2PKH = [
            '1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa',
            '1BoatSLRHtKNngkdXEeobR76b53LETtpyT',
        ];
        validP2PKH.forEach(address => {
            expect(testBitcoin().test(address)).toBe(true);
        });
    });

    test('Valid P2SH addresses', () => {
        const validP2SH = [
            '3J98t1WpEZ73CNmQviecrnyiWrnqRhWNLy',
            '3QJmV3qfvL9SuYo34YihAf3sRCW3qSinyC',
        ];
        validP2SH.forEach(address => {
            expect(testBitcoin().test(address)).toBe(true);
        });
    });

    test('Valid Bech32 addresses', () => {
        const validBech32 = [
            'bc1qw508d6qejxtdg4y5r3zarvary0c5xw7kygt080',
            'bc1qrp33g0qyz8f7g4wy9kpq0unsq3m6yx4xsl522z',
        ];
        validBech32.forEach(address => {
            expect(testBitcoin().test(address)).toBe(true);
        });
    });

    test('Invalid Bitcoin addresses', () => {
        const invalidAddresses = [
            '1InvalidAddress12345',
            '3WrongAddressLengthToTest',
            'bc1qInvalidCharactersInAddress',
            'NotEvenCloseToValid123',
        ];
        invalidAddresses.forEach(address => {
            expect(testBitcoin().test(address)).toBe(false);
        });
    });
});
