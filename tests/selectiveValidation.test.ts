
import { isWalletValid } from "../src/core/validator";
import { WalletType } from "../src/types/wallet";

describe("Selective Validation", () => {
    it("should validate only specified chains", () => {
        const evmAddress = "0x742d35Cc6634C0532925a3b844Bc454e4438f44e";
        const btcAddress = "1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa";

        // Validate EVM only
        const result1 = isWalletValid(evmAddress, { chains: [WalletType.EVM] });
        expect(result1.valid).toBe(true);
        expect(result1.type).toBe(WalletType.EVM);

        // Validate Bitcoin only with EVM address (should fail)
        const result2 = isWalletValid(evmAddress, { chains: [WalletType.BITCOIN] });
        expect(result2.valid).toBe(false);

        // Validate Bitcoin with Bitcoin address
        const result3 = isWalletValid(btcAddress, { chains: [WalletType.BITCOIN] });
        expect(result3.valid).toBe(true);
        expect(result3.type).toBe(WalletType.BITCOIN);
    });
});
