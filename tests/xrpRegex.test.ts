import { isWalletValid } from '../src';
import { WalletType } from '../src/types/wallet';
import { testXrp } from '../src/validators/xrp';

describe('XRP Validation', () => {
    describe('Classic addresses (r...)', () => {
        const validAddresses = [
            'rHb9CJAWyB4rj91VRWn96DkukG4bwdtyTh',
            'rN7n3473SaZBCG4dFL85RGwBKnDXCB6e5E',
            'r3AdW9AhbsB4mGCNgKSNqWYnAW7WqTWD52',
            'rDsbeomae4FXwgQTJp9Rs64Qg9vDiTCdBv',
        ];

        it('should match valid XRP classic addresses', () => {
            validAddresses.forEach(addr => {
                expect(testXrp().test(addr)).toBe(true);
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
            'X7AcgcsBL4QSjdqo1hM7o1YSgQtNKr2J7tEqq5n3Nz6SLT',
        ];

        it('should match valid XRP X-addresses', () => {
            validAddresses.forEach(addr => {
                expect(testXrp().test(addr)).toBe(true);
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
            'rHb9CJAWyB4rj91VRWn96DkukG4bwdtyThXXXXXXX', 
            '0x742d35Cc6634C0532925a3b844Bc454e4438f44e',
            'rHb9CJAWyB4rj91VRWn96DkukG4bwd0yTh', 
            'RHb9CJAWyB4rj91VRWn96DkukG4bwdtyTh',        
            'not-an-address',
        ];

        it('should reject invalid addresses', () => {
            invalidAddresses.forEach(addr => {
                expect(testXrp().test(addr)).toBe(false);
            });
        });
    });
});
