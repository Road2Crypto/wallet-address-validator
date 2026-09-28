import { Bech32Encoding, bech32WordsToBytes, decodeBech32 } from "../utils/bech32";

const SHELLEY_PREFIXES = ["addr", "addr_test", "stake", "stake_test"];
const SHELLEY_MIN_PAYLOAD_LENGTH = 29;

/**
 * Cardano address validator
 * 
 * Supports:
 * - Shelley (Bech32): Starts with 'addr1' or 'addr_test1', alphanumeric, length variable (usually ~100 chars, max 108 for mainnet)
 * - Byron (Base58): Starts with 'Ae2' or 'DdzFF', length variable
 * - Stake (Bech32): Starts with 'stake1'
 */
export const testCardano = (): RegExp => {
    // Shelley: addr1... (mainnet) or addr_test1... (testnet), or stake1...
    // Allows alphanumeric Bech32 charset.
    // Length: typically longer, e.g., 50+ chars.
    const shelley = /^(addr1|addr_test1|stake1|stake_test1)[a-z0-9]+$/;

    // Byron: Base58, starts with Ae2 (legacy) or DdzFF (legacy HD)
    // Base58 charset: [1-9A-HJ-NP-Za-km-z]
    const byron = /^((Ae2|DdzFF)[1-9A-HJ-NP-Za-km-z]+)$/;

    return new RegExp(`${shelley.source}|${byron.source}`);
};

// Validates Cardano address format and the bech32 prefix, checksum, and payload of Shelley addresses.
export function isValidCardano(address: string): boolean {
    if (!testCardano().test(address)) return false;
    if (/^(Ae2|DdzFF)/.test(address)) return true;

    const decoded = decodeBech32(address);
    if (!decoded || decoded.encoding !== Bech32Encoding.BECH32 || !SHELLEY_PREFIXES.includes(decoded.hrp)) return false;

    const payload = bech32WordsToBytes(decoded.words);
    return payload !== null && payload.length >= SHELLEY_MIN_PAYLOAD_LENGTH;
}
