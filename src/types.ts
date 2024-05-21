// Supported wallet types
export enum WalletType {
    EVM = "evm",
    SOLANA = "solana",
    BITCOIN = "bitcoin",
}

// Possible Error Messages
export enum ValidationErrorMessage {
    EMPTY_ADDRESS = "The provided address is empty.",
    INVALID_ADDRESS = "The provided address does not match any supported wallet address patterns.",
}

// Return type of `isWalletValid` function
export interface ReturnTypeValidationFunction {
    valid: boolean,
    type?: WalletType,
    error?: {
        statusCode: number,
        message: ValidationErrorMessage,
    },
}
