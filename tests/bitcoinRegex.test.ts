import { isWalletValid } from '../src';
import { WalletType } from '../src/types/wallet';
import { testBitcoin } from '../src/validators/bitcoin';

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
            'bc1qw508d6qejxtdg4y5r3zarvary0c5xw7kv8f3t4',
            'bc1qrp33g0q5c5txsp9arysrx4k6zdkfs4nce4xj0gdcccefvpysxf3qccfmv3',
            'bc1pte3whnyw640zhaqcwxwtknxgtshyhgjs2h7m78h7mqc6te2x8p7q5gm0vu',
            'BC1QW508D6QEJXTDG4Y5R3ZARVARY0C5XW7KV8F3T4',
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

describe('bitcoinAddressValidation', () => {
    test('acceptsSegwitAddressesWithValidChecksums', () => {
        const validSegwit = [
            'bc1qw508d6qejxtdg4y5r3zarvary0c5xw7kv8f3t4', // P2WPKH
            'BC1QW508D6QEJXTDG4Y5R3ZARVARY0C5XW7KV8F3T4', // P2WPKH fully uppercase
            'bc1qrp33g0q5c5txsp9arysrx4k6zdkfs4nce4xj0gdcccefvpysxf3qccfmv3', // P2WSH
            'bc1p0xlxvlhemja6c4dqv22uapctqupfhlxm9h8z3k2e72q4k9hcz7vqzk5jj0', // Taproot
        ];
        validSegwit.forEach(address => {
            expect(isWalletValid(address, { chains: [WalletType.BITCOIN] })).toEqual({ valid: true, type: WalletType.BITCOIN });
        });
    });

    test('rejectsSegwitAddressesWithInvalidChecksums', () => {
        const invalidSegwit = [
            'bc1qw508d6qejxtdg4y5r3zarvary0c5xw7kv8f3t5', // Last character mistyped
            'bc1qw508d6qejxtdg4y5r3zarvary0C5xw7kv8f3t4', // Mixed case
            'bc1qw508d6qejxtdg4y5r3zarvary0c5xw7kemeawh', // Version 0 with a bech32m checksum
            'bc1p0xlxvlhemja6c4dqv22uapctqupfhlxm9h8z3k2e72q4k9hcz7vqh2y7hd', // Version 1 with a bech32 checksum
            'bc1qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq', // Matches the pattern with no valid checksum
        ];
        invalidSegwit.forEach(address => {
            expect(isWalletValid(address, { chains: [WalletType.BITCOIN] }).valid).toBe(false);
        });
    });

    test('rejectsBase58AddressesWithInvalidChecksums', () => {
        expect(isWalletValid('1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNb', { chains: [WalletType.BITCOIN] }).valid).toBe(false);
        expect(isWalletValid('3J98t1WpEZ73CNmQviecrnyiWrnqRhWNLz', { chains: [WalletType.BITCOIN] }).valid).toBe(false);
    });
});
