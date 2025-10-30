import { isValidTron, isValidTronHex } from '../src/validation/address';
import { getWalletAddressType } from '../src/utils/getWalletAddressType';
import { WalletType } from '../src/types/wallet';

describe('tronAddress', () => {
    test('valid Base58Check addresses', () => {
        const addrs = [
            'TQGoz9QweUtCEvqXjsrHyYXDiDyhvTy7ev', // user-provided
            'TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t', // docs example
        ];
        addrs.forEach(a => expect(isValidTron(a)).toBe(true));
    });

    test('valid hex addresses', () => {
        expect(isValidTronHex('41A614F803B6FD780986A42C78EC9C7F77E6DED13C')).toBe(true);
        expect(isValidTronHex('0x41A614F803B6FD780986A42C78EC9C7F77E6DED13C')).toBe(true);
    });

    test('classification returns TRON', () => {
        expect(getWalletAddressType('TQGoz9QweUtCEvqXjsrHyYXDiDyhvTy7ev')).toBe(WalletType.TRON);
        expect(getWalletAddressType('41A614F803B6FD780986A42C78EC9C7F77E6DED13C')).toBe(WalletType.TRON);
    });

    test('rejects invalid TRON', () => {
        // tweak last char to break checksum
        expect(isValidTron('TQGoz9QweUtCEvqXjsrHyYXDiDyhvTy7e1')).toBe(false);
        // wrong hex version prefix
        expect(isValidTronHex('42A614F803B6FD780986A42C78EC9C7F77E6DED13C')).toBe(false);
    });
});
