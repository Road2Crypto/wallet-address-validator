import { isAddress } from "web3-validator";
import { WalletType } from "../types/wallet";

// Regexes for Bitcoin addresses
const p2pkh = /^[13][a-km-zA-HJ-NP-Z0-9]{25,34}$/;
const p2sh = /^3[a-km-zA-HJ-NP-Z0-9]{25,34}$/;
const bech32 = /^(bc1)[0-9a-z]{39,59}$/;

// Combine the above Bitcoin regexes into a single regex
export const regexBitcoin = new RegExp(`${p2pkh.source}|${p2sh.source}|${bech32.source}`);

// Regex for Solana addresses
export const regexSolana = new RegExp(/^[1-9A-HJ-NP-Za-km-z]{44}$/);

// Create a partial record that maps wallet types to their corresponding regex patterns
export const allWalletRegexes: Partial<Record<WalletType, RegExp>> = {
    [WalletType.SOLANA]: regexSolana,
    [WalletType.BITCOIN]: regexBitcoin,
};

// Function to validate EVM address
export const isValidEvmAddress = (address: string) => Boolean(address.startsWith('0x') && isAddress(address));
