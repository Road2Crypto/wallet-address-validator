# Multi-Chain Crypto Wallet Address Validator (r2c-wallet-validator)

**r2c-wallet-validator** is a comprehensive, lightweight, and high-performance utility to validate cryptocurrency wallet addresses across multiple blockchains. Built for Web3 developers, DApps, and crypto exchanges who need reliable address validation.

Maintained by [Road2Crypto.com](https://road2crypto.com).

[![Build and Test](https://github.com/Road2Crypto/wallet-address-validator/actions/workflows/build-test.yml/badge.svg)](https://github.com/Road2Crypto/wallet-address-validator/actions/workflows/build-test.yml)
[![Publish Package](https://github.com/Road2Crypto/wallet-address-validator/actions/workflows/publish.yml/badge.svg?event=release)](https://github.com/Road2Crypto/wallet-address-validator/actions/workflows/publish.yml)
[![npm version](https://img.shields.io/npm/v/r2c-wallet-validator.svg)](https://www.npmjs.com/package/r2c-wallet-validator)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
  - [Basic Example](#basic-example)
  - [Advanced Example](#advanced-example)
- [API Reference](#api-reference)
  - [Functions](#functions)
  - [Types](#types)
- [Supported Chains](#supported-chains)
- [Contributing](#contributing)
- [License](#license)

## Features

- 🚀 **Multi-Chain Support**: Validate addresses for EVM (Ethereum, Polygon, BSC), Solana, Bitcoin, Polkadot, Cosmos, TRON, and Cardano.
- 📦 **Zero Dependencies**: Exceptionally lightweight and bloat-free.
- 🌳 **Tree-Shakable**: Optimized for modern bundlers (Webpack, Rollup, Vite) with `sideEffects: false`.
- ⚡ **High Performance**: Regex-based and algorithmic validation for maximum speed.
- 🛡️ **TypeScript**: Native TypeScript support with comprehensive type definitions (`.d.ts`).
- 🔍 **Detailed Errors**: Granular error reporting for easier debugging and UI feedback.
- Supported chains: [Chains](#supported-chains)

## Installation

```sh
npm install r2c-wallet-validator
# or
yarn add r2c-wallet-validator
# or
pnpm add r2c-wallet-validator
```

## Usage

### Basic Example

```typescript
// Simple validation example
import { isWalletValid } from "r2c-wallet-validator";

const result = isWalletValid("0x742d35Cc6634C0532925a3b844Bc454e4438f44e");

if (!result.valid) {
  console.error("Error message:", result.error?.message);
} else {
  console.log("Wallet address type:", result.type); // WalletType.EVM
}
```

### Advanced Example

```typescript
// Advanced usage with all supported address types
import {
  isWalletValid,
  ValidationErrorMessage,
  WalletType,
} from "r2c-wallet-validator";

// 1. Validate specific chains (only check Bitcoin and EVM)
const specificResult = isWalletValid(
  "0x742d35Cc6634C0532925a3b844Bc454e4438f44e",
  {
    chains: [WalletType.BITCOIN, WalletType.EVM],
  }
); // Valid, type: EVM

// 2. Validate against a single specific chain
const singleChainResult = isWalletValid("InvalidBitcoin", {
  chains: [WalletType.BITCOIN],
}); // Invalid

const addresses = [
  "0x742d35Cc6634C0532925a3b844Bc454e4438f44e", // EVM
  "3J98t1WpEZ73CNmQviecrnyiWrnqRhWNLy", // Bitcoin
  "9A5oG2fXhxpBnh9qVHVk3dxp4Up1gkp8q5vj5rwiUJr", // Solana
  "TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t", // TRON
  "cosmos1hsk6jryyqjfhp5dhc55tc9jtckygx0eph6dd02", // Cosmos
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
        console.log(
          `Address: ${address} is invalid: Address format is incorrect.`
        );
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
      case WalletType.COSMOS:
        console.log(`Address: ${address} is valid and of type Cosmos.`);
        break;
      case WalletType.TRON:
        console.log(`Address: ${address} is valid and of type TRON.`);
        break;
      default:
        console.log(`Address: ${address} is valid but of unknown type.`);
        break;
    }
  }
});
```

## API Reference

### Functions

#### `isWalletValid(address: string, options?: ValidationOptions): WalletValidationResponse`

Validates a cryptocurrency wallet address.

**Parameters:**

- `address` (string): The cryptocurrency wallet address to validate
- `options` (optional): Configuration object
  - `chains` (WalletType[]): Array of allowed wallet types to validate against. If provided, the address must match one of the specified types.

**Returns:**

- `WalletValidationResponse`: An object containing validation results:
  - When valid: `{ valid: true, type: WalletType }`
  - When invalid: `{ valid: false, error: { statusCode: number, message: ValidationErrorMessage } }`

### Types

#### `ValidationErrorMessage`

```typescript
enum ValidationErrorMessage {
  EMPTY_ADDRESS = "The provided address is empty.",
  INVALID_ADDRESS = "The provided address does not match any supported wallet address patterns.",
}
```

#### `WalletType`

```typescript
enum WalletType {
  EVM = "evm",
  SOLANA = "solana",
  BITCOIN = "bitcoin",
  COSMOS = "cosmos",
  TRON = "tron",
}
```

#### `WalletValidationResponseError`

```typescript
interface WalletValidationResponseError {
  statusCode: number;
  message: ValidationErrorMessage;
}
```

#### `WalletValidationResponse`

```typescript
interface WalletValidationResponse {
  valid: boolean;
  type?: WalletType;
  error?: WalletValidationResponseError;
}
```

#### `ValidationOptions`

```typescript
interface ValidationOptions {
  chains?: WalletType[];
}
```

## Supported Chains

| Chain    | Description                                                                        | Example Address                                                      |
| -------- | ---------------------------------------------------------------------------------- | -------------------------------------------------------------------- |
| EVM      | Ethereum, Polygon, BSC, Arbitrum, Optimism, and other EVM-compatible chains        | `0x742d35Cc6634C0532925a3b844Bc454e4438f44e`                         |
| Solana   | Solana blockchain addresses (strict 32-byte Base58 public keys)                    | `9A5oG2fXhxpBnh9qVHVk3dxp4Up1gkp8q5vj5rwiUJr`                        |
| Bitcoin  | Bitcoin addresses (Legacy and SegWit)                                              | `3J98t1WpEZ73CNmQviecrnyiWrnqRhWNLy`                                 |
| Cosmos   | Cosmos Hub and other Cosmos ecosystem chains                                       | `cosmos107ws4033624838304933629538356788950853`                      |
| TRON     | TRON mainnet (Base58Check `T...` or hex `41...` with optional `0x` prefix)         | `TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t`                                 |
| Cardano  | Cardano addresses (Shelley `addr1...`, `stake1...` and Byron `Ae2...`, `DdzFF...`) | `addr1q9...`                                                         |
| Polkadot | Polkadot Mainnet addresses (SS58 format starting with `1`)                         | `131MmXTN7xzy6wcb9di1JgChVoGjBfXMpphcGkGT6btu5YTo`                   |
| Litecoin | Litecoin addresses (Legacy `L...`, P2SH `M...`/`3...`, Bech32 `ltc1...`)           | `ltc1q063s48wwx45y2y7zz6pf70x96009942d93g3k5`                        |
| Dogecoin | Dogecoin addresses (Legacy `D...`, Multisig `A...`/`9...`)                         | `DS76q997iL4d4c539k7fA6k4q997iL4d4c`                                 |
| Sui      | Sui addresses (Hex `0x...`, approx 66 chars)                                       | `0x1a052c15a0c3241b1842b1096053f0b2a8d3ccdd5a747926b471e956bc1b38f8` |
| Aptos    | Aptos addresses (Hex `0x...`, approx 66 chars)                                     | `0x83e24403164007f3544d03e92e5e1e76b1f236e7a63d91f24d9c4912e75e927c` |
| TON      | TON addresses (Base64-like `E...`/`U...`/`k...`/`0...` 48 chars)                   | `EQCD39VS5jcptHL8vMjEXrzGaRcCVYto7HUn4bpAOg8GB0aH`                   |

## Contributing

All contributions are welcome! Please feel free to open a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
