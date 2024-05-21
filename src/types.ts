export interface ReturnTypeValidationFunction {
    error: ValidationError | null;
}

export enum ValidationError {
    EMPTY_ADDRESS = "empty_address_error",
    INVALID_ADDRESS = "invalid_address_error"
}
