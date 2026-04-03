import { isWalletValid } from '../src';
import { WalletType } from '../src/types/wallet';
import { isValidXrp, isValidXrpClassicAddress, isValidXrpXAddress } from '../src/validators/xrp';

describe('XRP Validation', () => {
    describe('Classic addresses (r...)', () => {
        const validAddresses = [
            'rHb9CJAWyB4rj91VRWn96DkukG4bwdtyTh',
            'r9cZA1mLK5R5Am25ArfXFmqgNwjZgnfk59',
            'rPEPPER7kfTD9w2To4CQk6UCfuHM9c6GDY',
            'rrrrrrrrrrrrrrrrrrrrrhoLvTp',
        ];

        it('should match valid XRP classic addresses', () => {
            validAddresses.forEach(addr => {
                expect(isValidXrpClassicAddress(addr)).toBe(true);
                expect(isValidXrp(addr)).toBe(true);
            });
        });

        it('should validate via isWalletValid', () => {
            validAddresses.forEach(addr => {
                const result = isWalletValid(addr, { chains: [WalletType.XRP] });
                expect(result.valid).toBe(true);
                expect(result.type).toBe(WalletType.XRP);
            });
        });
    });

    describe('X-addresses (X...)', () => {
        const validAddresses = [
            'X7AcgcsBL6XDcUb289X4mJ8djcdyKaB5hJDWMArnXr61cqZ',
            'XV5sbjUmgPpvXv4ixFWZ5ptAYZ6PD2qwGkhgc48zzcx6Gkr',
            'T719a5UwUCnEs54UsxG9CJYYDhwmFCqkr7wxCcNcfZ6p5GZ',
        ];

        it('should match valid XRP X-addresses', () => {
            validAddresses.forEach(addr => {
                expect(isValidXrpXAddress(addr)).toBe(true);
                expect(isValidXrp(addr)).toBe(true);
            });
        });

        it('should validate via isWalletValid', () => {
            validAddresses.forEach(addr => {
                const result = isWalletValid(addr, { chains: [WalletType.XRP] });
                expect(result.valid).toBe(true);
                expect(result.type).toBe(WalletType.XRP);
            });
        });
    });

    describe('Invalid addresses', () => {
        const invalidAddresses = [
            '',
            'r',
            'rHb9CJAWyB4rj91VRWn96DkukG4bwdtyT1',
            'rHb9CJAWyB4rj91VRWn96DkukG4bwdtyThXXXXXXX',
            '0x742d35Cc6634C0532925a3b844Bc454e4438f44e',
            'XVLhHMPHU98es4dbozjVtdWzVrDjtV5fdx1mHp98tDMoQXa',
            'XVLhHMPHU98es4dbozjVtdWzVrDjtV18pX8zeUygYrCgrPh',
            'RHb9CJAWyB4rj91VRWn96DkukG4bwdtyTh',
            'not-an-address',
        ];

        it('should reject invalid addresses', () => {
            invalidAddresses.forEach(addr => {
                expect(isValidXrp(addr)).toBe(false);
            });
        });
    });
});
