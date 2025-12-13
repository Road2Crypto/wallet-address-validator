import { isWalletValid } from '../src/core/validator';
import { WalletType } from '../src/types/wallet';

describe('Specific Chain Validation', () => {
    const validBitcoin = '1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa';
    const validEVM = '0x32Be343B94f860124dC4fEe278FDCBD38C102D88';
    const validSolana = 'EbR3gCd3w739e8Z64348633486334863348633486334'; // Dummy valid length base58

    // Real Solana address for better testing if needed, though length check is main logic
    const realSolana = '5U3bH5b6XtG99a8bCK9a3bCK9a3bCK9a3bCK9a3bCK9a';
    // Actually the classifier just checks base58 and length roughly, let's use a known valid one from other tests if possible or a mock.
    // Looking at existing tests, solana validates length of decoded base58.

    test('should validate bitcoin address when bitcoin is allowed', () => {
        const result = isWalletValid(validBitcoin, { chains: [WalletType.BITCOIN] });
        expect(result.valid).toBe(true);
        expect(result.type).toBe(WalletType.BITCOIN);
    });

    test('should fail bitcoin address when only EVM is allowed', () => {
        const result = isWalletValid(validBitcoin, { chains: [WalletType.EVM] });
        expect(result.valid).toBe(false);
    });

    test('should validate EVM address when EVM is allowed', () => {
        const result = isWalletValid(validEVM, { chains: [WalletType.EVM] });
        expect(result.valid).toBe(true);
        expect(result.type).toBe(WalletType.EVM);
    });

    test('should fail EVM address when only Bitcoin is allowed', () => {
        const result = isWalletValid(validEVM, { chains: [WalletType.BITCOIN] });
        expect(result.valid).toBe(false);
    });

    test('should validate with multiple allowed chains', () => {
        const result = isWalletValid(validBitcoin, { chains: [WalletType.BITCOIN, WalletType.EVM] });
        expect(result.valid).toBe(true);
        expect(result.type).toBe(WalletType.BITCOIN);

        const result2 = isWalletValid(validEVM, { chains: [WalletType.BITCOIN, WalletType.EVM] });
        expect(result2.valid).toBe(true);
        expect(result2.type).toBe(WalletType.EVM);
    });

    test('should work as before without options', () => {
        const result = isWalletValid(validBitcoin);
        expect(result.valid).toBe(true);
        expect(result.type).toBe(WalletType.BITCOIN);
    });

    test('should work as before with empty chains array', () => {
        // If chains is empty array, it might interpret as "no chains allowed" or "all chains allowed".
        // The logic `!chains || chains.includes(chain)` implies if chains is [], `chains.includes` is false.
        // So it should fail for everything if explicitly empty array is passed.
        // Let's verify this behavior is desired or if we should treat empty array as "all".
        // Usually empty list filter means "matches nothing".

        const result = isWalletValid(validBitcoin, { chains: [] });
        expect(result.valid).toBe(false);
    });
});
