# wallet-address-validator

A simple utility to validate cryptocurrency wallet addresses for EVM, Solana, and Bitcoin chains.

## Installation

To install the package, run:

```sh
npm install wallet-address-validator
```

## Usage

Import the `checkCryptoAddress` function and use it to validate wallet addresses.

```typescript
import checkCryptoAddress from "wallet-address-validator";
import { ValidationError } from "wallet-address-validator/dist/types";

const result = checkCryptoAddress("your_wallet_address_here");

if (result.error) {
  console.error("Invalid address:", result.error);
} else {
  console.log("Valid address");
}
```

### Example

```typescript
import checkCryptoAddress from "wallet-address-validator";
import { ValidationError } from "wallet-address-validator/dist/types";

const addresses = [
  "0x742d35Cc6634C0532925a3b844Bc454e4438f44e", // EVM
  "3J98t1WpEZ73CNmQviecrnyiWrnqRhWNLy", // Bitcoin
  "9A5oG2fXhxpBnh9qVHVk3dxp4Up1gkp8q5vj5rwiUJr", // Solana
  "invalid_address",
];

addresses.forEach((address) => {
  const result = checkCryptoAddress(address);
  if (result.error) {
    if (result.error === ValidationError.EMPTY_ADDRESS) {
      console.log(`Address: ${address} is invalid: Address is empty`);
    } else if (result.error === ValidationError.INVALID_ADDRESS) {
      console.log(
        `Address: ${address} is invalid: Address format is incorrect`
      );
    }
  } else {
    console.log(`Address: ${address} is valid`);
  }
});
```

## Supported Chains

- **EVM (Ethereum Virtual Machine)**
- **Solana**
- **Bitcoin**

## Function Details

### `checkCryptoAddress(address: string): { error: ValidationError  | null }`

- **Parameters**:

  - `address` (string): The cryptocurrency wallet address to validate.

- **Returns**:
  - The `checkCryptoAddress` function returns an object with an `error` property. The possible values of `error` are:
    - `null`: The address is valid.
    - `ValidationError.EMPTY_ADDRESS`: The provided address is empty.
    - `ValidationError.INVALID_ADDRESS`: The provided address does not match any supported wallet address patterns.
