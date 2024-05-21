import { isAddress } from "web3-validator";
import { ReturnTypeValidationFunction, ValidationErrorMessage, WalletType } from "./types";

// Utility function to check for empty strings
const checkEmpty = (value: string): boolean => !value || value.trim().length === 0;

// Regular expressions for Bitcoin and Solana address validation
const testBitcoin = (): RegExp => {
    const p2pkh = /^[13][a-km-zA-HJ-NP-Z0-9]{25,34}$/;
    const p2sh = /^3[a-km-zA-HJ-NP-Z0-9]{25,34}$/;
    const bech32 = /^(bc1)[0-9a-z]{39,59}$/;
    return new RegExp(`${p2pkh.source}|${p2sh.source}|${bech32.source}`);
};

const testSolana = (): RegExp => /^[1-9A-HJ-NP-Za-km-z]{32,44}$/;

// Wallet regexes
const walletRegexes: Partial<Record<WalletType, RegExp>> = {
    [WalletType.SOLANA]: testSolana(),
    [WalletType.BITCOIN]: testBitcoin(),
};

// Function to get wallet address type
const getWalletAddressType = (address: string): WalletType | null => {
    // Check if the address is a Bitcoin address first
    if (walletRegexes[WalletType.BITCOIN]?.test(address)) {
        return WalletType.BITCOIN;
    }

    // Validate EVM address separately
    if (isAddress(address)) {
        return WalletType.EVM;
    }

    // Validate regex wallet address for non-EVM types
    for (const [walletType, regex] of Object.entries(walletRegexes)) {
        if (regex.test(address)) {
            return walletType as WalletType;
        }
    }

    return null;
};

// Main function to check crypto address
const isWalletValid = (address: string): ReturnTypeValidationFunction => {
    // Remove extra spaces
    address = address.trim();

    // Check if the address is empty
    if (checkEmpty(address)) return { valid: false, error: { statusCode: 400, message: ValidationErrorMessage.EMPTY_ADDRESS } };

    // Get address type and validate it
    const walletAddressType = getWalletAddressType(address);
    if (walletAddressType === null) return { valid: false, error: { statusCode: 400, message: ValidationErrorMessage.INVALID_ADDRESS } };

    // Return success response
    return { valid: true, type: walletAddressType };
};

export default isWalletValid;
