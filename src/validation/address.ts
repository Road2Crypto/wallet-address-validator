import { createHash } from 'crypto';

// Regex for Bitcoin addresses
export const testBitcoin = (): RegExp => {
    const p2pkh = /^[13][a-km-zA-HJ-NP-Z0-9]{25,34}$/; // P2PKH starts with 1 or 3
    const p2sh = /^3[a-km-zA-HJ-NP-Z0-9]{25,34}$/; // P2SH starts with 3
    const bech32 = /^(bc1)[0-9a-z]{39,59}$/; // Bech32 starts with bc1
    return new RegExp(`${p2pkh.source}|${p2sh.source}|${bech32.source}`);
};

// Keep simple regex helpers for quick prefiltering
export const testSolana = (): RegExp => /^[1-9A-HJ-NP-Za-km-z]{32,44}$/;
export const testEVM = (): RegExp => /^0x[a-fA-F0-9]{40}$/;

export const testCosmos = () => {
    const ALLOWED_CHARS = 'qpzry9x8gf2tvdw0s3jn54khce6mua7l';
    return new RegExp('^(cosmos)1([' + ALLOWED_CHARS + ']+)$'); // cosmos + bech32 separated by '1'
};

// Base58 utilities (Bitcoin alphabet)
const BASE58_ALPHABET = '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz';
const BASE58_INDEX: Record<string, number> = {};
for (let i = 0; i < BASE58_ALPHABET.length; i++) {
    const ch = BASE58_ALPHABET.charAt(i);
    BASE58_INDEX[ch] = i;
}

/**
 * Decode Base58 string into bytes. Returns null for invalid characters.
 */
function base58Decode(input: string): Uint8Array | null {
    if (input.length === 0) return new Uint8Array([]);
    const base = 58;
    const base256 = 256;

    // Count leading zeros
    let zeros = 0;
    while (zeros < input.length && input.charAt(zeros) === '1') zeros++;

    // Convert characters to base58 digits
    const digits: number[] = [];
    for (let i = 0; i < input.length; i++) {
        const ch = input.charAt(i);
        const v = BASE58_INDEX[ch];
        if (v === undefined) return null;
        digits.push(v);
    }

    // Convert base58 digits to base256 bytes
    const out: number[] = [];
    for (let i = 0; i < digits.length; i++) {
        let carry: number = digits[i]!;
        for (let j = 0; j < out.length; j++) {
            const prev = out[j]!;
            const x = prev * base + carry;
            out[j] = x % base256;
            carry = Math.floor(x / base256);
        }
        while (carry > 0) {
            out.push(carry % base256);
            carry = Math.floor(carry / base256);
        }
    }

    // Add leading zeros
    for (let i = 0; i < zeros; i++) out.push(0);

    return new Uint8Array(out.reverse());
}

function doubleSha256(data: Uint8Array): Uint8Array {
    const h1 = createHash('sha256').update(Buffer.from(data)).digest();
    const h2 = createHash('sha256').update(h1).digest();
    return new Uint8Array(h2);
}

/**
 * Strict Solana validator:
 * - Base58 decode must succeed
 * - Decoded length must be exactly 32 bytes (ed25519 public key)
 */
export function isValidSolana(address: string): boolean {
    const decoded = base58Decode(address);
    return decoded !== null && decoded.length === 32;
}

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
