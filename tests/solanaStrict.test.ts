import { isValidSolana } from '../src/validators/solana';
import { getWalletAddressType } from '../src/core/classifier';
import { WalletType } from '../src/types/wallet';

describe('solanaStrict', () => {
    test('accepts valid Solana addresses (32-byte pubkeys)', () => {
        const addrs = [
            '4Nd1mQ2foW7qSwk89NzVFTva9UtaYenEF69k1ysEVnnK',
            '7QdSkQZn7yyRCicHTrjqAMR1NTsFYpJHyEnfjqWRd9XN',
        ];
        addrs.forEach(a => expect(isValidSolana(a)).toBe(true));
    });

    test('rejects TRON Base58 address as Solana', () => {
        const tron = 'TQGoz9QweUtCEvqXjsrHyYXDiDyhvTy7ev';
        expect(isValidSolana(tron)).toBe(false);
    });

    test('classification prefers TRON over Solana for TRON address', () => {
        const tron = 'TQGoz9QweUtCEvqXjsrHyYXDiDyhvTy7ev';
        expect(getWalletAddressType(tron)).toBe(WalletType.TRON);
    });
});
