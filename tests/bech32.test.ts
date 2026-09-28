// bech32.test.ts

import { Bech32Encoding, decodeBech32, isValidSegwitAddress } from "../src/utils/bech32";

describe("bech32 decoding", () => {
    it.each([
        "A12UEL5L",
        "a12uel5l",
        "an83characterlonghumanreadablepartthatcontainsthenumber1andtheexcludedcharactersbio1tt5tgs",
        "abcdef1qpzry9x8gf2tvdw0s3jn54khce6mua7lmqqqxw",
        "split1checkupstagehandshakeupstreamerranterredcaperred2y9e3w",
        "?1ezyfcl",
    ])("decodes the BIP 173 bech32 vector %s", value => {
        expect(decodeBech32(value)?.encoding).toBe(Bech32Encoding.BECH32);
    });

    it.each([
        "A1LQFN3A",
        "a1lqfn3a",
        "an83characterlonghumanreadablepartthatcontainsthetheexcludedcharactersbioandnumber11sg7hg6",
        "abcdef1l7aum6echk45nj3s0wdvt2fg8x9yrzpqzd3ryx",
        "split1checkupstagehandshakeupstreamerranterredcaperredlc445v",
        "?1v759aa",
    ])("decodes the BIP 350 bech32m vector %s", value => {
        expect(decodeBech32(value)?.encoding).toBe(Bech32Encoding.BECH32M);
    });

    it.each([
        { label: "space in the human readable part", value: " 1nwldj5" },
        { label: "delete character in the human readable part", value: "\x7f1axkwrx" },
        { label: "character above ASCII in the human readable part", value: "\x801eym55h" },
        { label: "missing separator", value: "pzry9x0s0muk" },
        { label: "empty human readable part", value: "1pzry9x0s0muk" },
        { label: "invalid data character", value: "x1b4n0q5v" },
        { label: "checksum that is too short", value: "li1dgmt3" },
        { label: "invalid checksum character", value: "de1lg7wt\xff" },
        { label: "checksum computed with the uppercase human readable part", value: "A1G7SGD8" },
        { label: "empty human readable part before data", value: "10a06t8" },
        { label: "empty human readable part before checksum", value: "1qzzfhee" },
        { label: "mixed case", value: "a12UEL5L" },
    ])("rejects a string with $label", ({ value }) => {
        expect(decodeBech32(value)).toBeNull();
    });
});

describe("segwit address validation", () => {
    it.each([
        { hrp: "bc", address: "BC1QW508D6QEJXTDG4Y5R3ZARVARY0C5XW7KV8F3T4" },
        { hrp: "tb", address: "tb1qrp33g0q5c5txsp9arysrx4k6zdkfs4nce4xj0gdcccefvpysxf3q0sl5k7" },
        { hrp: "bc", address: "bc1pw508d6qejxtdg4y5r3zarvary0c5xw7kw508d6qejxtdg4y5r3zarvary0c5xw7kt5nd6y" },
        { hrp: "bc", address: "BC1SW50QGDZ25J" },
        { hrp: "bc", address: "bc1zw508d6qejxtdg4y5r3zarvaryvaxxpcs" },
        { hrp: "tb", address: "tb1qqqqqp399et2xygdj5xreqhjjvcmzhxw4aywxecjdzew6hylgvsesrxh6hy" },
        { hrp: "tb", address: "tb1pqqqqp399et2xygdj5xreqhjjvcmzhxw4aywxecjdzew6hylgvsesf3hn0c" },
        { hrp: "bc", address: "bc1p0xlxvlhemja6c4dqv22uapctqupfhlxm9h8z3k2e72q4k9hcz7vqzk5jj0" },
    ])("accepts the BIP 173 or BIP 350 vector $address", ({ hrp, address }) => {
        expect(isValidSegwitAddress(address, hrp)).toBe(true);
    });

    it.each([
        { label: "unexpected human readable part", hrp: "tb", address: "tc1p0xlxvlhemja6c4dqv22uapctqupfhlxm9h8z3k2e72q4k9hcz7vq5zuyut" },
        { label: "different network", hrp: "bc", address: "tb1qw508d6qejxtdg4y5r3zarvary0c5xw7kxpjzsx" },
        { label: "version 1 with a bech32 checksum", hrp: "bc", address: "bc1p0xlxvlhemja6c4dqv22uapctqupfhlxm9h8z3k2e72q4k9hcz7vqh2y7hd" },
        { label: "version 2 with a bech32 checksum", hrp: "tb", address: "tb1z0xlxvlhemja6c4dqv22uapctqupfhlxm9h8z3k2e72q4k9hcz7vqglt7rf" },
        { label: "version 16 with a bech32 checksum", hrp: "bc", address: "BC1S0XLXVLHEMJA6C4DQV22UAPCTQUPFHLXM9H8Z3K2E72Q4K9HCZ7VQ54WELL" },
        { label: "version 0 with a bech32m checksum", hrp: "bc", address: "bc1qw508d6qejxtdg4y5r3zarvary0c5xw7kemeawh" },
        { label: "version 0 with a bech32m checksum on testnet", hrp: "tb", address: "tb1q0xlxvlhemja6c4dqv22uapctqupfhlxm9h8z3k2e72q4k9hcz7vq24jc47" },
        { label: "invalid character", hrp: "bc", address: "bc1p38j9r5y49hruaue7wxjce0updqjuyyx0kh56v8s25huc6995vvpql3jow4" },
        { label: "witness version above 16", hrp: "bc", address: "BC130XLXVLHEMJA6C4DQV22UAPCTQUPFHLXM9H8Z3K2E72Q4K9HCZ7VQ7ZWS8R" },
        { label: "one byte program", hrp: "bc", address: "bc1pw5dgrnzv" },
        { label: "41 byte program", hrp: "bc", address: "bc1p0xlxvlhemja6c4dqv22uapctqupfhlxm9h8z3k2e72q4k9hcz7v8n0nx0muaewav253zgeav" },
        { label: "version 0 program that is not 20 or 32 bytes", hrp: "bc", address: "BC1QR508D6QEJXTDG4Y5R3ZARVARYV98GJ9P" },
        { label: "mixed case", hrp: "tb", address: "tb1p0xlxvlhemja6c4dqv22uapctqupfhlxm9h8z3k2e72q4k9hcz7vq47Zagq" },
        { label: "padding longer than 4 bits", hrp: "bc", address: "bc1p0xlxvlhemja6c4dqv22uapctqupfhlxm9h8z3k2e72q4k9hcz7v07qwwzcrf" },
        { label: "padding bits that are not zero", hrp: "tb", address: "tb1p0xlxvlhemja6c4dqv22uapctqupfhlxm9h8z3k2e72q4k9hcz7vpggkg4j" },
        { label: "empty data", hrp: "bc", address: "bc1gmk9yu" },
    ])("rejects the vector with $label", ({ hrp, address }) => {
        expect(isValidSegwitAddress(address, hrp)).toBe(false);
    });
});
