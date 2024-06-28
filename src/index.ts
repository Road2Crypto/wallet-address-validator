import { checkEmpty } from "./utils/checkEmpty";
import { getWalletAddressType } from "./utils/getWalletAddressType";
import { WalletValidationResponse, ValidationErrorMessage } from "./types/response";

// Function to check crypto address
export const isWalletValid = (address: string): WalletValidationResponse => {
    // Remove extra spaces
    address = address.trim();

    // Check if the address is empty
    if (checkEmpty(address)) {
        return { valid: false, error: { statusCode: 400, message: ValidationErrorMessage.EMPTY_ADDRESS } };
    }

    // Get address type and validate it
    const walletAddressType = getWalletAddressType(address);
    if (walletAddressType === null) {
        return { valid: false, error: { statusCode: 400, message: ValidationErrorMessage.INVALID_ADDRESS } };
    }

    // Return success response
    return { valid: true, type: walletAddressType };
};

// Re-exporting types for easier import in other files
export { ValidationErrorMessage, WalletValidationResponseError, WalletValidationResponse } from "./types/response";
export { WalletType } from "./types/wallet";
