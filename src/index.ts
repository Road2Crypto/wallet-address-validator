import { checkEmpty } from "./utils/checkEmpty";
import { getWalletType } from "./utils/getWalletType";
import { Response, ValidationErrorMessage } from "./types/response";

// Function to check crypto address
const isWalletValid = (address: string): Response => {
    // Remove extra spaces
    address = address.trim();

    // Check if the address is empty
    if (checkEmpty(address)) return { valid: false, error: { statusCode: 400, message: ValidationErrorMessage.EMPTY_ADDRESS } };

    // Get address type and validate it
    const walletAddressType = getWalletType(address);
    if (walletAddressType === null) return { valid: false, error: { statusCode: 400, message: ValidationErrorMessage.INVALID_ADDRESS } };

    // Return success response
    return { valid: true, type: walletAddressType };
};

export default isWalletValid;
