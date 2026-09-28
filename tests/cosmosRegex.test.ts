import { testCosmos } from '../src/validators/cosmos';
import { isWalletValid } from '../src';
import { WalletType } from '../src/types/wallet';

describe('Cosmos Wallet Validation', () => {
    test('validAddresses', () => {
        const validAddresses = [
            'cosmos1hsk6jryyqjfhp5dhc55tc9jtckygx0eph6dd02',
            'cosmos17xpfvakm2amg962yls6f84z3kell8c5lserqta',
            'cosmos1jv65s3grqf6v6jl3dp4t6c9t9rk99cd88lyufl'
        ]
        validAddresses.forEach(address => {
            expect(testCosmos().test(address)).toBe(true);
            expect(isWalletValid(address).valid).toBe(true);
            expect(isWalletValid(address).type).toBe(WalletType.COSMOS);
        })
    })

    test('invalidAddresses', () => {
        const invalidAddresses = [
            'cosmos107ws403362483830493362953835678895085333', // 47 chars (too long)
            'cosmos107ws403362483830493362953835678895085', // 43 chars (too short)
            'cosmos107ws403362483830493362953835678895085i', // forbidden char 'i'
            'InvalidCosmosAddress12345',
            'cosmos207ws4033624838304933629538356788950853', // '2' instead of '1' separator
        ]
        invalidAddresses.forEach(address => {
            expect(testCosmos().test(address)).toBe(false);
            const result = isWalletValid(address);
            // Should not be identified as COSMOS, might match nothing or invalid
            if (result.valid) {
                expect(result.type).not.toBe(WalletType.COSMOS);
            } else {
                expect(result.valid).toBe(false);
            }
        })
    })

    test('invalidChecksums', () => {
        const invalidAddresses = [
            'cosmos1hsk6jryyqjfhp5dhc55tc9jtckygx0eph6dd03', // Last character mistyped
            'cosmos1hsk6jryyqjfhp5dhc55tc9jtckygx0epzxap2g', // Bech32m checksum
            'cosmos107ws4033624838304933629538356788950853',
        ]
        invalidAddresses.forEach(address => {
            expect(testCosmos().test(address)).toBe(true);
            expect(isWalletValid(address, { chains: [WalletType.COSMOS] }).valid).toBe(false);
        })
    })
})
