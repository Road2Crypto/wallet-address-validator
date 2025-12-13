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
            'ltc1q063s48wwx45y2y7zz6pf70x96009942d93g3k5', // Bech32
            'LQtpS3TaYh3R8y6G169y5a9y6G169y5a9y', // Legacy (mock)
            '3CDJnfdWX8m2NwuGUV3nhXHXEeLygMXoAj' // P2SH (BTC-like but valid format for regex)
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
            'DS76q997iL4d4c539k7fA6k4q997iL4d4c',
            'DQH5N4aX4S1p3Z3M8N7J9J3G2J3M8N7J9'
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
