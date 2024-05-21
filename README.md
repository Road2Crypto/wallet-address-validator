# road2crypto-wallet-address-validator

A simple utility to validate cryptocurrency wallet addresses for EVM, Solana, and Bitcoin chains.

## Installation

To install the package, run:

```sh
npm install road2crypto-wallet-address-validator
```

## Usage

Import the `isWalletValid` function and use it to validate wallet addresses.

```typescript
import isWalletValid from "road2crypto-wallet-address-validator";

const result = isWalletValid("your_wallet_address_here");

if (!result.valid) {
  console.error("Error message:", result.error?.message);
} else {
  console.log("Valid address of type:", result.type);
}
```

### Example

```typescript
import isWalletValid from "road2crypto-wallet-address-validator";
import {
  ValidationErrorMessage,
  WalletType,
} from "road2crypto-wallet-address-validator/dist/types";

const addresses = [
  "0x742d35Cc6634C0532925a3b844Bc454e4438f44e", // EVM
  "3J98t1WpEZ73CNmQviecrnyiWrnqRhWNLy", // Bitcoin
  "9A5oG2fXhxpBnh9qVHVk3dxp4Up1gkp8q5vj5rwiUJr", // Solana
  "invalid_address",
];

addresses.forEach((address) => {
  const result = isWalletValid(address);
  if (!result.valid) {
    if (result.error?.message === ValidationErrorMessage.EMPTY_ADDRESS) {
      console.log(`Address: ${address} is invalid: Address is empty`);
    } else if (
      result.error?.message === ValidationErrorMessage.INVALID_ADDRESS
    ) {
      console.log(
        `Address: ${address} is invalid: Address format is incorrect`
      );
    }
  } else {
    console.log(`Address: ${address} is valid and of type ${result.type}`);
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

## Error Messages

The possible error messages are:

- `ValidationErrorMessage.EMPTY_ADDRESS`: The provided address is empty.
- `ValidationErrorMessage.INVALID_ADDRESS`: The provided address does not match any supported wallet address patterns.

## Supported Chains

- **EVM (Ethereum Virtual Machine)**
- **Solana**
- **Bitcoin**
