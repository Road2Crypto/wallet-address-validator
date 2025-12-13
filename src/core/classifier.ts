import { WalletType } from "../types/wallet";
import { testBitcoin } from "../validators/bitcoin";
import { testCosmos } from "../validators/cosmos";
import { testEVM } from "../validators/evm";
import { isValidSolana } from "../validators/solana";
import { isValidTron, isValidTronHex } from "../validators/tron";
import { testCardano } from "../validators/cardano";
import { testPolkadot } from "../validators/polkadot";
import { testLitecoin } from "../validators/litecoin";
import { testDogecoin } from "../validators/dogecoin";
import { testSui } from "../validators/sui";
import { testAptos } from "../validators/aptos";
import { testTon } from "../validators/ton";

// Function to get wallet address type
export const getWalletAddressType = (address: string, chains?: WalletType[]): WalletType | null => {
    // Helper to check if a chain is allowed
    const isChainAllowed = (chain: WalletType) => !chains || chains.includes(chain);

    // Validate Bitcoin address first
    if (isChainAllowed(WalletType.BITCOIN) && testBitcoin().test(address)) {
        return WalletType.BITCOIN
    }

    // Validate EVM address
    if (isChainAllowed(WalletType.EVM) && testEVM().test(address)) {
        return WalletType.EVM
    }

    // Validate TRON address (Base58Check or hex 41..., optional 0x)
    if (isChainAllowed(WalletType.TRON) && (isValidTron(address) || isValidTronHex(address))) {
        return WalletType.TRON
    }

    // Validate Solana address (strict: 32-byte Base58 public key)
    if (isChainAllowed(WalletType.SOLANA) && isValidSolana(address)) {
        return WalletType.SOLANA
    }

    if (isChainAllowed(WalletType.COSMOS) && testCosmos().test(address)) {
        return WalletType.COSMOS
    }

    if (isChainAllowed(WalletType.CARDANO) && testCardano().test(address)) {
        return WalletType.CARDANO
    }

    if (isChainAllowed(WalletType.POLKADOT) && testPolkadot().test(address)) {
        return WalletType.POLKADOT
    }

    if (isChainAllowed(WalletType.LITECOIN) && testLitecoin().test(address)) {
        return WalletType.LITECOIN
    }

    if (isChainAllowed(WalletType.DOGECOIN) && testDogecoin().test(address)) {
        return WalletType.DOGECOIN
    }

    if (isChainAllowed(WalletType.SUI) && testSui().test(address)) {
        return WalletType.SUI
    }

    if (isChainAllowed(WalletType.APTOS) && testAptos().test(address)) {
        return WalletType.APTOS
    }

    if (isChainAllowed(WalletType.TON) && testTon().test(address)) {
        return WalletType.TON
    }

    return null
}
