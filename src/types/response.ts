// Import necessary modues and types
import { WalletType } from "./wallet";

// Possible Error Messages
export enum ValidationErrorMessage {
    EMPTY_ADDRESS = "The provided address is empty.",
    INVALID_ADDRESS = "The provided address does not match any supported wallet address patterns.",
}

// Return type of `isWalletValid` function
export interface Response {
    valid: boolean,
    type?: WalletType,
    error?: {
        statusCode: number,
        message: ValidationErrorMessage,
    },
}
