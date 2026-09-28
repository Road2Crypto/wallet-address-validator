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
            'MQMcJhpWHYVeQArcZR3sBgyPZxxRtnH441', // P2SH
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

        it('should reject Litecoin addresses with a wrong checksum', () => {
            const invalidAddresses = [
                'ltc1qg42tkwuuxefutzxezdkdel39gfstuap288mfeb', // Last character mistyped
                'LM2WMpR1Rp6j3Sa59cMXMs1SPzj9eXpGc2', // Last character mistyped
                'L0tpS3TaYh3R8y6G169y5a9y6G169y5a9y', // Contains 0, which Base58 excludes
                'ltc1q063s48wwx45y2y7zz6pf70x96009942d93g3k5',
                'LQtpS3TaYh3R8y6G169y5a9y6G169y5a9y',
            ];
            invalidAddresses.forEach(addr => {
                expect(testLitecoin().test(addr)).toBe(true);
                expect(isWalletValid(addr, { chains: [WalletType.LITECOIN] }).valid).toBe(false);
            });
        });

        it('should not accept a mistyped Bitcoin 3 address as Litecoin', () => {
            expect(isWalletValid('3J98t1WpEZ73CNmQviecrnyiWrnqRhWNLz').valid).toBe(false);
        });
    });

    describe('Dogecoin', () => {
        const validAddresses = [
            'DH5yaieqoZN36fDVciNyRueRGvGLR3mr7L',
            'DBXu2kgc3xtvCUWFcxFE3r9hEYgmuaaCyD',
            'A4P9hrGY87f2ZC6oRMiRYuU8EtCniT44Sk' // P2SH
        ];
        it('should validate valid Dogecoin addresses', () => {
            validAddresses.forEach(addr => {
                expect(testDogecoin().test(addr)).toBe(true);
                const result = isWalletValid(addr, { chains: [WalletType.DOGECOIN] });
                expect(result.valid).toBe(true);
                expect(result.type).toBe(WalletType.DOGECOIN);
            });
        });

        it('should reject Dogecoin addresses with a wrong checksum', () => {
            const invalidAddresses = [
                'DH5yaieqoZN36fDVciNyRueRGvGLR3mr7M', // Last character mistyped
                'D0S76q997iL4d4c539k7fA6k4q997iL4d', // Contains 0, which Base58 excludes
                'DS76q997iL4d4c539k7fA6k4q997iL4d4c',
                'DQH5N4aX4S1p3Z3M8N7J9J3G2J3M8N7J9',
            ];
            invalidAddresses.forEach(addr => {
                expect(testDogecoin().test(addr)).toBe(true);
                expect(isWalletValid(addr, { chains: [WalletType.DOGECOIN] }).valid).toBe(false);
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

        it('should report the format shared with Sui as Sui when both chains are allowed', () => {
            validAddresses.forEach(addr => {
                expect(isWalletValid(addr)).toEqual({ valid: true, type: WalletType.SUI });
            });
        });
    });

    describe('TON', () => {
        const validAddresses = [
            'EQCD39VS5jcptHL8vMjEXrzGaRcCVYto7HUn4bpAOg8xqB2N', // Bounceable
            'UQCD39VS5jcptHL8vMjEXrzGaRcCVYto7HUn4bpAOg8xqEBI', // Non bounceable
            'kQCD39VS5jcptHL8vMjEXrzGaRcCVYto7HUn4bpAOg8xqKYH', // Testnet bounceable
            '0QCD39VS5jcptHL8vMjEXrzGaRcCVYto7HUn4bpAOg8xqPvC', // Testnet non bounceable
            'Ef8zMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzM0vF' // Masterchain
        ];
        it('should validate valid TON addresses', () => {
            validAddresses.forEach(addr => {
                expect(testTon().test(addr)).toBe(true);
                const result = isWalletValid(addr, { chains: [WalletType.TON] });
                expect(result.valid).toBe(true);
                expect(result.type).toBe(WalletType.TON);
            });
        });

        it('should reject TON addresses with a wrong checksum or tag', () => {
            const invalidAddresses = [
                'EQCD39VS5jcptHL8vMjEXrzGaRcCVYto7HUn4bpAOg8xqB2M', // Last character mistyped
                'UQCD39VS5jcptHL8vMjEXrzGaRcCVYto7HUn4bpAOg8xqB2N', // Tag changed without its checksum
                'KQCD39VS5jcptHL8vMjEXrzGaRcCVYto7HUn4bpAOg8xqEmq', // Unknown tag with a matching checksum
                'EQCD39VS5jcptHL8vMjEXrzGaRcCVYto7HUn4bpAOg8GB0aH',
            ];
            invalidAddresses.forEach(addr => {
                expect(testTon().test(addr)).toBe(true);
                expect(isWalletValid(addr, { chains: [WalletType.TON] }).valid).toBe(false);
            });
        });
    });
});
