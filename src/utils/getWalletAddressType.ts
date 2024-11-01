import { WalletType } from "../types/wallet"
import { testEVM, testSolana, testBitcoin, testCosmos } from "../validation/address"

// Function to get wallet address type
export const getWalletAddressType = (address: string): WalletType | null => {
    // Validate Bitcoin address first
    if (testBitcoin().test(address)) {
        return WalletType.BITCOIN
    }

    // Validate EVM address
    if (testEVM().test(address)) {
        return WalletType.EVM
    }

    // Validate Solana address
    if (testSolana().test(address)) {
        return WalletType.SOLANA
    }

    if (testCosmos().test(address)) {
        return WalletType.COSMOS
    }

    return null
}
