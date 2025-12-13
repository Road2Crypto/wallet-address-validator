import { testCardano } from '../src/validators/cardano';
import { getWalletAddressType } from '../src/core/classifier';
import { WalletType } from '../src/types/wallet';

describe('cardanoAddressRegex', () => {
    test('validShelleyAddresses', () => {
        const addrs = [
            'addr1q9d340dl346w6r51121d123fd134234sfa',
            'addr_test1uq9d340dl346w6r51121d123fd134234sfa',
            'stake1ux9d340dl346w6r51121d123fd134234sfa',
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
});
