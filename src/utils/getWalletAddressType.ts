import { WalletType } from "../types/wallet"
import { testEVM, testSolana, testBitcoin, testCosmos, isValidTron, isValidSolana, isValidTronHex } from "../validation/address"

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

    // Validate TRON address (Base58Check or hex 41..., optional 0x)
    if (isValidTron(address) || isValidTronHex(address)) {
        return WalletType.TRON
    }

    // Validate Solana address (strict: 32-byte Base58 public key)
    if (isValidSolana(address)) {
        return WalletType.SOLANA
    }

    if (testCosmos().test(address)) {
        return WalletType.COSMOS
    }

    return null
}
