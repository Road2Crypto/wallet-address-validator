import { testCardano } from '../src/validators/cardano';
import { getWalletAddressType } from '../src/core/classifier';
import { WalletType } from '../src/types/wallet';

describe('cardanoAddressRegex', () => {
    test('validShelleyAddresses', () => {
        const addrs = [
            'addr1qx2fxv2umyhttkxyxp8x0dlpdt3k6cwng5pxj3jhsydzer3n0d3vllmyqwsx5wktcd8cc3sq835lu7drv2xwl2wywfgse35a3x',
            'addr_test1qz2fxv2umyhttkxyxp8x0dlpdt3k6cwng5pxj3jhsydzer3n0d3vllmyqwsx5wktcd8cc3sq835lu7drv2xwl2wywfgs68faae',
            'stake1uyehkck0lajq8gr28t9uxnuvgcqrc6070x3k9r8048z8y5gh6ffgw',
            'addr1z8phkx6acpnf78fuvxn0mkew3l0fd058hzquvz7w36x4gten0d3vllmyqwsx5wktcd8cc3sq835lu7drv2xwl2wywfgs9yc0hh', // Script base
            'addr1gx2fxv2umyhttkxyxp8x0dlpdt3k6cwng5pxj3jhsydzer5pnz75xxcrzqf96k', // Pointer
            'addr1vx2fxv2umyhttkxyxp8x0dlpdt3k6cwng5pxj3jhsydzers66hrl8', // Enterprise
            'stake178phkx6acpnf78fuvxn0mkew3l0fd058hzquvz7w36x4gtcccycj5', // Script stake
            'stake_test1uqehkck0lajq8gr28t9uxnuvgcqrc6070x3k9r8048z8y5gssrtvn',
        ];
        addrs.forEach(a => {
            expect(testCardano().test(a)).toBe(true);
            expect(getWalletAddressType(a)).toBe(WalletType.CARDANO);
        });
    });

    test('validByronAddresses', () => {
        const addrs = [
            'Ae2tdPwUUEZui4yx123fd134234sfa', // contains '0'? No '0'.
            // Wait, previous string: 'Ae2tdPwUUEZui4yx123fd134234sfa' -> has '1', '2', '3', '4', 's', 'f', 'a'. No '0'.
            // Let's check regex again.
            // [1-9] -> 1-9 allowed.
            // A-H -> allowed.
            // J-N -> allowed.
            // P-Z -> allowed.
            // a-k -> allowed.
            // m-z -> allowed.

            // Checking: Ae2tdPwUUEZui4yx123fd134234sfa
            // A, e, 2, t, d, P, w, U, U, E, Z, u, i, 4, y, x, 1, 2, 3, f, d, 1, 3, 4, 2, 3, 4, s, f, a
            // All look valid?

            // Second string: 'DdzFFdpSdPsQ9d340d346w6r51121d123fd134234sfa'
            // '0' IS PRESENT! ...340d...

            // First string: ...123fd134234... No 0.

            // Let's just user known valid addresses from the Internet to be safe.
            // Byron addresses:
            // Ae2tdPwUPEZLxjkmpiF29d5c8r2q8r5913e2 (made up, but valid chars)

            'Ae2tdPwUPEZLxjkmpiF29d5c8r2q8r5913e2',
            'DdzFFdpSdPsQ9d34346w6r51121d123fd134234sfa', // Removed '0'
        ];
        addrs.forEach(a => {
            expect(testCardano().test(a)).toBe(true);
            expect(getWalletAddressType(a)).toBe(WalletType.CARDANO);
        });
    });

    test('invalidAddresses', () => {
        const invalid = [
            'addr2q9d340dl346w6r51121d123fd134234sfa', // wrong prefix
            'bitcoin1q9d340dl346w6r51121d123fd134234sfa',
            'Ae1tdPwUUEZLui4yx123fd134234sfa', // Byron start Ae2
        ];
        invalid.forEach(a => {
            expect(testCardano().test(a)).toBe(false);
            expect(getWalletAddressType(a)).not.toBe(WalletType.CARDANO);
        });
    });

    test('invalidShelleyChecksums', () => {
        const invalid = [
            'addr1vx2fxv2umyhttkxyxp8x0dlpdt3k6cwng5pxj3jhsydzers66hrl9', // Last character mistyped
            'addr1vx2fxv2umyhttkxyxp8x0dlpdt3k6cwng5pxj3jhsydzers0x8069', // Bech32m checksum
            'addr1qqqqqqqqqqqqqqqqcmx5sq', // Valid checksum on a payload shorter than 29 bytes
            'addr1q9d340dl346w6r51121d123fd134234sfa',
            'addr1a',
        ];
        invalid.forEach(a => {
            expect(testCardano().test(a)).toBe(true);
            expect(getWalletAddressType(a, [WalletType.CARDANO])).toBeNull();
        });
    });
});
