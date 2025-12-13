import { testCosmos } from '../src/validators/cosmos';
import { isWalletValid } from '../src';
import { WalletType } from '../src/types/wallet';

describe('Cosmos Wallet Validation', () => {
    test('validAddresses', () => {
        const validAddresses = [
            'cosmos107ws4033624838304933629538356788950853', // 45 chars
            'cosmos1cyyzpx86952796989932470732439589369680a'  // 46 chars
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
})
