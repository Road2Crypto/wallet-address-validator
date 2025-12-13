import { base58Decode } from "../utils/encoding";

// Keep simple regex helpers for quick prefiltering
export const testSolana = (): RegExp => /^[1-9A-HJ-NP-Za-km-z]{32,44}$/;

/**
 * Strict Solana validator:
 * - Base58 decode must succeed
 * - Decoded length must be exactly 32 bytes (ed25519 public key)
 */
export function isValidSolana(address: string): boolean {
    const decoded = base58Decode(address);
    return decoded !== null && decoded.length === 32;
}
