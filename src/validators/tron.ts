import { doubleSha256 } from "../utils/crypto";
import { base58Decode } from "../utils/encoding";

/**
 * TRON Base58Check validator:
 * - Base58 decode must be 25 bytes
 * - First byte (version) must be 0x41
 * - Last 4 bytes equal the first 4 bytes of doubleSHA256(version+payload)
 */
export function isValidTron(address: string): boolean {
    // Quick prefilter: TRON Base58 is usually 34 chars and starts with T, but rely on full check below.
    const decoded = base58Decode(address);
    if (!decoded || decoded.length !== 25) return false;

    const body = decoded.slice(0, 21); // version(1) + payload(20)
    const checksum = decoded.slice(21); // 4 bytes
    if (body[0] !== 0x41) return false;

    const hash = doubleSha256(body);
    for (let i = 0; i < 4; i++) {
        if (checksum[i] !== hash[i]) return false;
    }
    return true;
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
