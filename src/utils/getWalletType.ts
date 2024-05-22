import { WalletType } from "../types/wallet";
import { allWalletRegexes, isValidEvmAddress, regexBitcoin } from "../validation/address";

// Function to get wallet address type
export const getWalletType = (address: string): WalletType | null => {
    // Check if the address is a Bitcoin address first
    if (regexBitcoin.test(address)) {
        return WalletType.BITCOIN;
    }

    // Validate EVM address separately
    if (isValidEvmAddress(address)) {
        return WalletType.EVM;
    }

    // Validate regex wallet address for non-EVM types
    for (const [walletType, regex] of Object.entries(allWalletRegexes)) {
        if (regex.test(address)) {
            return walletType as WalletType;
        }
    }

    // Return null when wallet is invalid
    return null;
};
