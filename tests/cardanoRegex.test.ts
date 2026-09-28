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
            'Ae2tdPwUPEZFRbyhz3cpfC2CumGzNkFBN2L42rcUc2yjQpEkxDbkPodpMAi', // Icarus
            'Ae2tdPwUPEYwQuL8cXMVstbEUvfdxwWpjepjKTD9BYQbcXJG8BdLjEpuD8Y', // Redemption
            'DdzFFzCqrhsfi5fFjJUHYPSnfTYrnMohzh3PrrtrVQgwua33HWPKUdTJXo3o77pSGCmDNrjYaAiZmJddaPW9iHyUDatvU2WhX7MgnNMy', // Daedalus
            'DdzFFzCqrht7PVrPU8FAnks5Ys6BxLxKjy7sFdNnkDFLoMaK8FoEiun6eMBowpnkS8h69w3VxTrJ6pTiwYSgF1mC22ifAqQhAPY4ty4j', // Daedalus
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

    test('invalidByronChecksums', () => {
        const invalid = [
            'Ae2tdPwUPEZFRbyhz3cpfC2CumGzNkFBN2L42rcUc2yjQpEkxDbkPodpMAj', // Last character mistyped
            'DdzFFzCqrhsfi5fFjJUHYPSnfTYrnMohzh3PrrtrVQgwua33HWPKUdTJXo3o77pSGCmDNrjYaAiZmJddaPW9iHyUDatvU2WhX7MgnNMz', // Last character mistyped
            'DdzFFzCqrhsfi5fFjJUHYPSnfTYrnMohzh3PrrtrVQgwua33HWPKUdTJXo3o77pSGCmDNrjYaAiZmJddaPW9iHyUDatvU2WhX7MgnNMyz', // Longer than any Byron address
            'Ae2tdPwUUEZui4yx123fd134234sfa',
            'Ae2tdPwUPEZLxjkmpiF29d5c8r2q8r5913e2',
            'DdzFFdpSdPsQ9d34346w6r51121d123fd134234sfa',
            'Ae2' + 'z'.repeat(20000),
        ];
        invalid.forEach(a => {
            expect(testCardano().test(a)).toBe(true);
            expect(getWalletAddressType(a, [WalletType.CARDANO])).toBeNull();
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
