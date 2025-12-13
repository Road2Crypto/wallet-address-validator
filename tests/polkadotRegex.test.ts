import { isWalletValid } from '../src';
import { WalletType } from '../src/types/wallet';

describe('Polkadot Wallet Validation', () => {
    it('should validate valid Polkadot addresses', () => {
        const validAddresses = [
            '131MmXTN7xzy6wcb9di1JgChVoGjBfXMpphcGkGT6btu5YTo',
            '13YMK2efcJncYrXsaJCvHbaaDt3vfubdn75r4hdVxcggU4n2',
            '13KhihBbz9tULu34g4adsUTYErmK3EKQRPwK3BPP7fcQdqth',
        ];

        validAddresses.forEach(address => {
            // Note: Since we are mocking exact valid addresses, we are testing against our Regex capability
            // In a real scenario we'd use actual addresses.
            // Let's use some real found addresses or constructed ones that match the regex.
            // Address 1: 1FRMM8PEiWXYax7rpS6X4XZX1aAAxSWx1CrKTyrVYhV24fg (Starters with 1, base58 chars)
            expect(isWalletValid(address).valid).toBe(true);
            expect(isWalletValid(address).type).toBe(WalletType.POLKADOT);
        });
    });

    it('should invalidate invalid Polkadot addresses', () => {
        const invalidAddresses = [
            '2frMM8PEiWXYax7rpS6X4XZX1aAAxSWx1CrKTyrVYhV24fg', // Starts with 2
            '1FRMM8PEiWXYax7rpS6X4XZX1aAAxSWx1CrKTyrVYhV24fI', // Contains 'I' (invalid base58)
            '1FRMM8PEiWXYax7rpS6X4XZX1aAAxSWx1CrKTyrVYhV24fg1234567890', // Too long
            '1FRMM', // Too short
            '', // Empty
        ];

        invalidAddresses.forEach(address => {
            // We need to ensure it doesn't match OTHER chains either, or at least not Polkadot
            const result = isWalletValid(address);
            if (result.valid) {
                expect(result.type).not.toBe(WalletType.POLKADOT);
            } else {
                expect(result.valid).toBe(false);
            }
        });
    });
});
