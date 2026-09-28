import { base58CheckDecode } from "../utils/encoding";

const BASE58_ADDRESS = /^T[1-9A-HJ-NP-Za-km-z]{33}$/;

/**
 * TRON Base58Check validator:
 * - Base58 decode must be 25 bytes
 * - First byte (version) must be 0x41
 * - Last 4 bytes equal the first 4 bytes of doubleSHA256(version+payload)
 */
export function isValidTron(address: string): boolean {
    if (!BASE58_ADDRESS.test(address)) return false;
    const body = base58CheckDecode(address);
    return body !== null && body.length === 21 && body[0] === 0x41;
}

/**
 * TRON hex validator:
 * Accepts 41-prefixed 42-hex-char address, with optional 0x prefix (total 44).
 */
export function isValidTronHex(address: string): boolean {
    if (/^0x/i.test(address)) {
        return /^0x41[a-fA-F0-9]{40}$/.test(address);
    }
    return /^41[a-fA-F0-9]{40}$/.test(address);
}
