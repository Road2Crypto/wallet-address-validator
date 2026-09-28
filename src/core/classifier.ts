// classifier.ts

import { WalletType } from "../types/wallet";
import { isValidBitcoin } from "../validators/bitcoin";
import { isValidCosmos } from "../validators/cosmos";
import { isValidEvm } from "../validators/evm";
import { isValidSolana } from "../validators/solana";
import { isValidTron, isValidTronHex } from "../validators/tron";
import { isValidCardano } from "../validators/cardano";
import { isValidPolkadot } from "../validators/polkadot";
import { isValidLitecoin } from "../validators/litecoin";
import { isValidDogecoin } from "../validators/dogecoin";
import { testSui } from "../validators/sui";
import { testAptos } from "../validators/aptos";
import { isValidTon } from "../validators/ton";
import { isValidXrp } from "../validators/xrp";

// Detects the wallet type using the allowed chains and optional EVM chain context.
export const getWalletAddressType = (address: string, chains?: WalletType[], evmChainId?: number): WalletType | null => {
    // Helper to check if a chain is allowed
    const isChainAllowed = (chain: WalletType) => !chains || chains.includes(chain);

    // Validate Bitcoin address first
    if (isChainAllowed(WalletType.BITCOIN) && isValidBitcoin(address)) {
        return WalletType.BITCOIN
    }

    // Validate EVM address
    if (isChainAllowed(WalletType.EVM) && isValidEvm(address, evmChainId)) {
        return WalletType.EVM
    }

    // Validate TRON address (Base58Check or hex 41..., optional 0x)
    if (isChainAllowed(WalletType.TRON) && (isValidTron(address) || isValidTronHex(address))) {
        return WalletType.TRON
    }

    if (isChainAllowed(WalletType.LITECOIN) && isValidLitecoin(address)) {
        return WalletType.LITECOIN
    }

    // Validate Solana address (strict: 32-byte Base58 public key)
    if (isChainAllowed(WalletType.SOLANA) && isValidSolana(address)) {
        return WalletType.SOLANA
    }

    if (isChainAllowed(WalletType.COSMOS) && isValidCosmos(address)) {
        return WalletType.COSMOS
    }

    if (isChainAllowed(WalletType.CARDANO) && isValidCardano(address)) {
        return WalletType.CARDANO
    }

    if (isChainAllowed(WalletType.POLKADOT) && isValidPolkadot(address)) {
        return WalletType.POLKADOT
    }

    if (isChainAllowed(WalletType.DOGECOIN) && isValidDogecoin(address)) {
        return WalletType.DOGECOIN
    }

    if (isChainAllowed(WalletType.SUI) && testSui().test(address)) {
        return WalletType.SUI
    }

    if (isChainAllowed(WalletType.APTOS) && testAptos().test(address)) {
        return WalletType.APTOS
    }

    if (isChainAllowed(WalletType.TON) && isValidTon(address)) {
        return WalletType.TON
    }

    if (isChainAllowed(WalletType.XRP) && isValidXrp(address)) {
        return WalletType.XRP
    }

    return null
}
