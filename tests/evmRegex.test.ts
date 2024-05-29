import { testEVM } from "../src/validation/address";

describe('EVM Wallet Address Validation', () => {
    test('Valid EVM addresses', () => {
        const validEvmAddresses = [
            '0x742d35Cc6634C0532925a3b844Bc454e4438f44e', // valid
        ];
        validEvmAddresses.forEach(address => {
            expect(testEVM().test(address)).toBe(true);
        });
    });

    test('Invalid EVM addresses', () => {
        const invalidEvmAddresses = [
            '0x742d35Cc6634C0532925a3b844Bc454e4438f44', // too short
            '0x742d35Cc6634C0532925a3b844Bc454e4438f44g', // invalid character
            '742d35Cc6634C0532925a3b844Bc454e4438f44e', // missing 0x prefix
            'NotAnEthereumAddress12345',
        ];
        invalidEvmAddresses.forEach(address => {
            expect(testEVM().test(address)).toBe(false);
        });
    });
});
