# r2c-wallet-validator

A simple utility to validate a cryptocurrency wallet address.

## Installation

To install the package, run:

```sh
npm install r2c-wallet-validator
```

## Usage

Import the necessary functions and types from `r2c-wallet-validator` and use them in your code.

```typescript
import { isWalletValid } from "r2c-wallet-validator";

const result = isWalletValid("your_wallet_address_here");

if (!result.valid) {
  console.error("Error message:", result.error?.message);
} else {
  console.log("Wallet address type:", result.type);
}

```

### Example

```typescript
import { isWalletValid, ValidationErrorMessage, WalletType } from "r2c-wallet-validator";

const addresses = [
  "0x742d35Cc6634C0532925a3b844Bc454e4438f44e", // EVM
  "3J98t1WpEZ73CNmQviecrnyiWrnqRhWNLy", // Bitcoin
  "9A5oG2fXhxpBnh9qVHVk3dxp4Up1gkp8q5vj5rwiUJr", // Solana
  "invalid_address",
];

addresses.forEach((address) => {
  const result = isWalletValid(address);
  if (!result.valid) {
    switch (result.error?.message) {
      case ValidationErrorMessage.EMPTY_ADDRESS:
        console.log(`Address: ${address} is invalid: Address is empty.`);
        break;
      case ValidationErrorMessage.INVALID_ADDRESS:
        console.log(`Address: ${address} is invalid: Address format is incorrect.`);
        break;
      default:
        console.log(`Address: ${address} is invalid.`);
        break;
    }
  } else {
    switch (result.type) {
      case WalletType.EVM:
        console.log(`Address: ${address} is valid and of type EVM.`);
        break;
      case WalletType.SOLANA:
        console.log(`Address: ${address} is valid and of type Solana.`);
        break;
      case WalletType.BITCOIN:
        console.log(`Address: ${address} is valid and of type Bitcoin.`);
        break;
      default:
        console.log(`Address: ${address} is valid but of unknown type.`);
        break;
    }
  }
});

```

## Function Details

### `isWalletValid(address: string): { valid: boolean, type?: WalletType, error?: { statusCode: number, message: ValidationErrorMessage } }`

- **Parameters**:

  - `address` (string): The cryptocurrency wallet address to validate.

- **Returns**:
  - An object with the following properties:
    - `valid` (boolean): Indicates whether the address is valid.
    - `type` (WalletType, optional): The type of the wallet address if valid (`evm`, `solana`, `bitcoin`).
    - `error` (object, optional): Contains error details if the address is invalid:
      - `statusCode` (number): The HTTP status code representing the error.
      - `message` (ValidationErrorMessage): The error message.

## Types

### `ValidationErrorMessage`

- An enum containing possible error messages when validating wallet addresses.
- Possible values:
  - `EMPTY_ADDRESS`: The provided address is empty.
  - `INVALID_ADDRESS`: The provided address does not match any supported wallet address patterns.

### `WalletType`

- An enum representing the type of cryptocurrency wallet addresses.
- Possible values:
  - `EVM`: Ethereum Virtual Machine (EVM) wallet.
  - `SOLANA`: Solana wallet.
  - `BITCOIN`: Bitcoin wallet.

### `WalletValidationResponseError`

- An interface representing the structure of an error response when validating wallet addresses.
- Properties:
  - `statusCode`: A number representing the HTTP status code of the error.
  - `message`: A `ValidationErrorMessage` indicating the specific error.

### `WalletValidationResponse`

- An interface representing the structure of a wallet validation response.
- Properties:
  - `valid`: A boolean.
  - `type`: A `WalletType` indicating the type of the wallet.
  - `error`: A `WalletValidationResponseError` containing error details.
- When `valid` is `true`, the response will include `type` indicating the wallet type and `error` will be `undefined`. Conversely, when `valid` is `false`, the response will include `error` with details about the validation error and `type` will be `undefined`.

## Supported Chains

- **EVM addresses**
- **Solana**
- **Bitcoin**
- **Cosmos**

## Contributing

All contributions are welcome! Please feel free to open a Pull Request.
