import { testBitcoin } from '../src/validation/address';

describe('bitcoinAddressRegex', () => {
    test('validP2PKHAddresses', () => {
        const validP2PKH = [
            '1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa',
            '1BoatSLRHtKNngkdXEeobR76b53LETtpyT',
        ];
        validP2PKH.forEach(address => {
            expect(testBitcoin().test(address)).toBe(true);
        });
    });

    test('validP2SHAddresses', () => {
        const validP2SH = [
            '3J98t1WpEZ73CNmQviecrnyiWrnqRhWNLy',
            '3QJmV3qfvL9SuYo34YihAf3sRCW3qSinyC',
        ];
        validP2SH.forEach(address => {
            expect(testBitcoin().test(address)).toBe(true);
        });
    });

    test('validBech32Addresses', () => {
        const validBech32 = [
            'bc1qw508d6qejxtdg4y5r3zarvary0c5xw7kygt080',
            'bc1qrp33g0qyz8f7g4wy9kpq0unsq3m6yx4xsl522z',
            'bc1pte3whnyw640zhaqcwxwtknxgtshyhgjs2h7m78h7mqc6te2x8p7q5gm0vu',
        ];
        validBech32.forEach(address => {
            expect(testBitcoin().test(address)).toBe(true);
        });
    });

    test('invalidBitcoinAddresses', () => {
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
