// validator.ts

import { checkEmpty } from "../utils/string";
import { getWalletAddressType } from "./classifier";
import { WalletValidationResponse, ValidationErrorMessage } from "../types/validation";
import { ValidationOptions } from "../types/options";

// Validates a wallet address and returns its detected type or validation error.
export const isWalletValid = (address: string, options?: ValidationOptions): WalletValidationResponse => {
    // Remove extra spaces
    address = address.trim()

    // Check if the address is empty
    if (checkEmpty(address)) {
        return { valid: false, error: { statusCode: 400, message: ValidationErrorMessage.EMPTY_ADDRESS } }
    }

    // Get address type and validate it
    const walletAddressType = getWalletAddressType(address, options?.chains, options?.evmChainId)
    if (walletAddressType === null) {
        return { valid: false, error: { statusCode: 400, message: ValidationErrorMessage.INVALID_ADDRESS } }
    }

    // Return success response
    return { valid: true, type: walletAddressType }
}

// Returns whether a wallet address is valid for the supplied options.
export const isAddress = (address: string, options?: ValidationOptions): boolean => {
    const result = isWalletValid(address, options);
    return result.valid;
}
