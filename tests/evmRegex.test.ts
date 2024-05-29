import { testEVM } from "../src/validation/address";

describe('evmAddressRegex', () => {
    test('validEvmAddresses', () => {
        const validEvmAddresses = [
            '0x742d35Cc6634C0532925a3b844Bc454e4438f44e',
            '0x51a1449b3B6D635EddeC781cD47a99221712De97',
            '0x3C351E1afdd1b1BC44e931E12D4E05D6125eaeCa',
            '0x530fff22987E137e7C8D2aDcC4c15eb45b4FA752',
            '0x09383137C1eEe3E1A8bc781228E4199f6b4A9bbf',
        ];
        validEvmAddresses.forEach(address => {
            expect(testEVM().test(address)).toBe(true);
        });
    });

    test('invalidEvmAddresses', () => {
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
