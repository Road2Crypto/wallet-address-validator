// Import necessary modues and types
import { WalletType } from "./wallet"

// Possible Error Messages
export enum ValidationErrorMessage {
    EMPTY_ADDRESS = "The provided address is empty.",
    INVALID_ADDRESS = "The provided address does not match any supported wallet address patterns.",
}

// Return type of `isWalletValid` function
export interface WalletValidationResponseError {
    statusCode: number,
    message: ValidationErrorMessage,
}

interface WalletValidationResponseWithType {
    valid: true,
    type: WalletType,
    error?: undefined,
}

interface WalletValidationResponseWithError {
    valid: false,
    type?: undefined,
    error: WalletValidationResponseError
}

export type WalletValidationResponse = WalletValidationResponseWithType | WalletValidationResponseWithError
