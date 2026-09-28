import { isWalletValid } from '../src';
import { WalletType } from '../src/types/wallet';
import { testLitecoin } from '../src/validators/litecoin';
import { testDogecoin } from '../src/validators/dogecoin';
import { testSui } from '../src/validators/sui';
import { testAptos } from '../src/validators/aptos';
import { testTon } from '../src/validators/ton';

describe('New Chains Validation', () => {
    describe('Litecoin', () => {
        const validAddresses = [
            'ltc1qg42tkwuuxefutzxezdkdel39gfstuap288mfea', // Bech32
            'LM2WMpR1Rp6j3Sa59cMXMs1SPzj9eXpGc1', // Legacy
            '3J98t1WpEZ73CNmQviecrnyiWrnqRhWNLy' // P2SH with the legacy 3 prefix shared with Bitcoin
        ];
        it('should validate valid Litecoin addresses', () => {
            validAddresses.forEach(addr => {
                expect(testLitecoin().test(addr)).toBe(true);
                const result = isWalletValid(addr, { chains: [WalletType.LITECOIN] });
                expect(result.valid).toBe(true);
                expect(result.type).toBe(WalletType.LITECOIN);
            });
        });
    });

    describe('Dogecoin', () => {
        const validAddresses = [
            'DH5yaieqoZN36fDVciNyRueRGvGLR3mr7L',
            'DBXu2kgc3xtvCUWFcxFE3r9hEYgmuaaCyD'
        ];
        it('should validate valid Dogecoin addresses', () => {
            validAddresses.forEach(addr => {
                expect(testDogecoin().test(addr)).toBe(true);
                const result = isWalletValid(addr, { chains: [WalletType.DOGECOIN] });
                expect(result.valid).toBe(true);
                expect(result.type).toBe(WalletType.DOGECOIN);
            });
        });
    });

    describe('Sui', () => {
        const validAddresses = [
            '0x1a052c15a0c3241b1842b1096053f0b2a8d3ccdd5a747926b471e956bc1b38f8',
            '0x0000000000000000000000000000000000000000000000000000000000000002'
        ];
        it('should validate valid Sui addresses', () => {
            validAddresses.forEach(addr => {
                expect(testSui().test(addr)).toBe(true);
                const result = isWalletValid(addr, { chains: [WalletType.SUI] });
                expect(result.valid).toBe(true);
                expect(result.type).toBe(WalletType.SUI);
            });
        });
    });

    describe('Aptos', () => {
        const validAddresses = [
            '0x83e24403164007f3544d03e92e5e1e76b1f236e7a63d91f24d9c4912e75e927c'
        ];
        it('should validate valid Aptos addresses', () => {
            validAddresses.forEach(addr => {
                expect(testAptos().test(addr)).toBe(true);
                const result = isWalletValid(addr, { chains: [WalletType.APTOS] });
                expect(result.valid).toBe(true);
                expect(result.type).toBe(WalletType.APTOS);
            });
        });
    });

    describe('TON', () => {
        const validAddresses = [
            'EQCD39VS5jcptHL8vMjEXrzGaRcCVYto7HUn4bpAOg8GB0aH'
        ];
        it('should validate valid TON addresses', () => {
            validAddresses.forEach(addr => {
                expect(testTon().test(addr)).toBe(true);
                const result = isWalletValid(addr, { chains: [WalletType.TON] });
                expect(result.valid).toBe(true);
                expect(result.type).toBe(WalletType.TON);
            });
        });
    });
});
