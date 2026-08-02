// evmChecksum.test.ts

import { isAddress, isWalletValid } from "../src/core/validator";
import { WalletType } from "../src/types/wallet";

const INVALID_EIP55_ADDRESS = "0x8Ba1f109551bD432803012645Ac136ddd64DBa72";
const EIP55_MIXED_CASE_ADDRESS = "0x5aAeb6053F3E94C9b9A09f33669435E7Ef1BeAed";
const ROOTSTOCK_MAINNET_MIXED_CASE_ADDRESS = "0x5aaEB6053f3e94c9b9a09f33669435E7ef1bEAeD";

const EIP55_ADDRESSES = [
    "0x27b1fdb04752bbc536007a920d24acb045561c26",
    "0x3599689E6292b81B2d85451025146515070129Bb",
    "0x42712D45473476b98452f434e72461577D686318",
    "0x52908400098527886E0F7030069857D2E4169EE7",
    EIP55_MIXED_CASE_ADDRESS,
    "0x6549f4939460DE12611948b3f82b88C3C8975323",
    "0x66f9664f97F2b50F62D13eA064982f936dE76657",
    "0x8617E340B3D01FA5F11F306F4090FD50E238070D",
    "0x88021160C5C792225E4E5452585947470010289D",
    "0xD1220A0cf47c7B9Be7A2E6BA89F429762e7b9aDb",
    "0xdbF03B407c01E7cD3CBea99509d93f8DDDC8C6FB",
    "0xde709f2102306220921060314715629080e2fb77",
    "0xfB6916095ca1df60bB79Ce92cE3Ea74c37c5d359",
];

const ROOTSTOCK_MAINNET_ADDRESSES = [
    "0x27b1FdB04752BBc536007A920D24ACB045561c26",
    "0x3599689E6292B81B2D85451025146515070129Bb",
    "0x42712D45473476B98452f434E72461577d686318",
    "0x52908400098527886E0F7030069857D2E4169ee7",
    ROOTSTOCK_MAINNET_MIXED_CASE_ADDRESS,
    "0x6549F4939460DE12611948B3F82B88C3C8975323",
    "0x66F9664f97f2B50F62d13EA064982F936de76657",
    "0x8617E340b3D01Fa5f11f306f4090fd50E238070D",
    "0x88021160c5C792225E4E5452585947470010289d",
    "0xD1220A0Cf47c7B9BE7a2e6ba89F429762E7B9adB",
    "0xDBF03B407c01E7CD3cBea99509D93F8Dddc8C6FB",
    "0xDe709F2102306220921060314715629080e2FB77",
    "0xFb6916095cA1Df60bb79ce92cE3EA74c37c5d359",
];

const ROOTSTOCK_TESTNET_ADDRESSES = [
    "0x27B1FdB04752BbC536007a920D24acB045561C26",
    "0x3599689e6292b81b2D85451025146515070129Bb",
    "0x42712D45473476B98452F434E72461577D686318",
    "0x52908400098527886E0F7030069857D2e4169EE7",
    "0x5aAeb6053F3e94c9b9A09F33669435E7EF1BEaEd",
    "0x6549f4939460dE12611948b3f82b88C3c8975323",
    "0x66f9664F97F2b50f62d13eA064982F936DE76657",
    "0x8617e340b3D01fa5F11f306F4090Fd50e238070d",
    "0x88021160c5C792225E4E5452585947470010289d",
    "0xd1220a0CF47c7B9Be7A2E6Ba89f429762E7b9adB",
    "0xdbF03B407C01E7cd3cbEa99509D93f8dDDc8C6fB",
    "0xDE709F2102306220921060314715629080e2Fb77",
    "0xFb6916095CA1dF60bb79CE92ce3Ea74C37c5D359",
];

describe("EVM checksum validation", () => {
    it("preserves format validation when the EVM chain ID is omitted", () => {
        expect(isWalletValid(INVALID_EIP55_ADDRESS)).toEqual({
            valid: true,
            type: WalletType.EVM,
        });
        expect(isWalletValid(INVALID_EIP55_ADDRESS, {
            chains: [WalletType.EVM],
        })).toEqual({
            valid: true,
            type: WalletType.EVM,
        });
    });

    it.each(EIP55_ADDRESSES)("accepts the official Ethereum checksum vector %s", address => {
        expect(isWalletValid(address, {
            chains: [WalletType.EVM],
            evmChainId: 1,
        }).valid).toBe(true);
    });

    it.each(ROOTSTOCK_MAINNET_ADDRESSES)("accepts the official Rootstock mainnet vector %s", address => {
        expect(isWalletValid(address, {
            chains: [WalletType.EVM],
            evmChainId: 30,
        }).valid).toBe(true);
    });

    it.each(ROOTSTOCK_TESTNET_ADDRESSES)("accepts the official Rootstock testnet vector %s", address => {
        expect(isWalletValid(address, {
            chains: [WalletType.EVM],
            evmChainId: 31,
        }).valid).toBe(true);
    });

    it("rejects an invalid mixed case checksum for Ethereum", () => {
        expect(isWalletValid(INVALID_EIP55_ADDRESS, {
            chains: [WalletType.EVM],
            evmChainId: 1,
        }).valid).toBe(false);
    });

    it("does not interchange Ethereum and Rootstock checksums", () => {
        expect(isWalletValid(EIP55_MIXED_CASE_ADDRESS, { evmChainId: 30 }).valid).toBe(false);
        expect(isWalletValid(ROOTSTOCK_MAINNET_MIXED_CASE_ADDRESS, { evmChainId: 1 }).valid).toBe(false);
    });

    it.each([56, 137, 8453, 42161, 11297108109, 999999])(
        "uses EIP 55 for non adopting chain ID %s",
        evmChainId => {
            expect(isWalletValid(EIP55_MIXED_CASE_ADDRESS, { evmChainId }).valid).toBe(true);
            expect(isWalletValid(ROOTSTOCK_MAINNET_MIXED_CASE_ADDRESS, { evmChainId }).valid).toBe(false);
        }
    );

    it.each([1, 30, 31])("accepts uniform case for chain ID %s", evmChainId => {
        const lowercaseAddress = "0x5aaeb6053f3e94c9b9a09f33669435e7ef1beaed";
        const uppercaseAddress = "0x5AAEB6053F3E94C9B9A09F33669435E7EF1BEAED";

        expect(isWalletValid(lowercaseAddress, { evmChainId }).valid).toBe(true);
        expect(isWalletValid(uppercaseAddress, { evmChainId }).valid).toBe(true);
    });

    it.each([
        { label: "zero", evmChainId: 0 },
        { label: "negative", evmChainId: -1 },
        { label: "fractional", evmChainId: 1.5 },
        { label: "not a number", evmChainId: Number.NaN },
        { label: "positive infinity", evmChainId: Number.POSITIVE_INFINITY },
        { label: "negative infinity", evmChainId: Number.NEGATIVE_INFINITY },
        { label: "unsafe integer", evmChainId: Number.MAX_SAFE_INTEGER + 1 },
        { label: "numeric string", evmChainId: "1" as unknown as number },
        { label: "null", evmChainId: null as unknown as number },
    ])(
        "rejects invalid EVM chain ID $label",
        ({ evmChainId }) => {
            expect(isWalletValid(EIP55_MIXED_CASE_ADDRESS, { evmChainId }).valid).toBe(false);
        }
    );

    it.each([
        "0x742d35Cc6634C0532925a3b844Bc454e4438f44",
        "0x742d35Cc6634C0532925a3b844Bc454e4438f44g",
        "0X742d35Cc6634C0532925a3b844Bc454e4438f44e",
    ])("rejects malformed EVM address %s", address => {
        expect(isWalletValid(address, { evmChainId: 1 }).valid).toBe(false);
    });

    it("forwards EVM chain context through isAddress", () => {
        expect(isAddress(EIP55_MIXED_CASE_ADDRESS, { evmChainId: 1 })).toBe(true);
        expect(isAddress(INVALID_EIP55_ADDRESS, { evmChainId: 1 })).toBe(false);
    });

    it("keeps EVM chain context scoped to EVM validation", () => {
        const bitcoinAddress = "1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa";

        expect(isWalletValid(EIP55_MIXED_CASE_ADDRESS, {
            chains: [],
            evmChainId: 1,
        }).valid).toBe(false);
        expect(isWalletValid(EIP55_MIXED_CASE_ADDRESS, {
            chains: [WalletType.BITCOIN],
            evmChainId: 1,
        }).valid).toBe(false);
        expect(isWalletValid(bitcoinAddress, {
            chains: [WalletType.BITCOIN],
            evmChainId: -1,
        }).valid).toBe(true);
    });
});
