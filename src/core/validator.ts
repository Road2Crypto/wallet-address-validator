import { checkEmpty } from "../utils/string";
import { getWalletAddressType } from "./classifier";
import { WalletValidationResponse, ValidationErrorMessage } from "../types/validation";
import { ValidationOptions } from "../types/options";

// Function to check crypto address
export const isWalletValid = (address: string, options?: ValidationOptions): WalletValidationResponse => {
    // Remove extra spaces
    address = address.trim()

    // Check if the address is empty
    if (checkEmpty(address)) {
        return { valid: false, error: { statusCode: 400, message: ValidationErrorMessage.EMPTY_ADDRESS } }
    }

    // Get address type and validate it
    const walletAddressType = getWalletAddressType(address, options?.chains)
    if (walletAddressType === null) {
        return { valid: false, error: { statusCode: 400, message: ValidationErrorMessage.INVALID_ADDRESS } }
    }

    // Return success response
    return { valid: true, type: walletAddressType }
}
