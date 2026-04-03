// Base58 utilities (Bitcoin alphabet)
const BASE58_ALPHABET = '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz';
const XRP_BASE58_ALPHABET = 'rpshnaf39wBUDNEGHJKLM4PQRST7VWXYZ2bcdeCg65jkm8oFqi1tuvAxyz';

function createBase58Index(alphabet: string): Record<string, number> {
    const index: Record<string, number> = {};
    for (let i = 0; i < alphabet.length; i++) {
        const ch = alphabet.charAt(i);
        index[ch] = i;
    }
    return index;
}

const BASE58_INDEX = createBase58Index(BASE58_ALPHABET);
const XRP_BASE58_INDEX = createBase58Index(XRP_BASE58_ALPHABET);

/**
 * Decode Base58 string into bytes. Returns null for invalid characters.
 */
function decodeBase58(input: string, alphabet: string, alphabetIndex: Record<string, number>): Uint8Array | null {
    if (input.length === 0) return new Uint8Array([]);
    const base = 58;
    const base256 = 256;

    // Count leading zeros
    let zeros = 0;
    while (zeros < input.length && input.charAt(zeros) === alphabet.charAt(0)) zeros++;

    // Convert characters to base58 digits
    const digits: number[] = [];
    for (let i = 0; i < input.length; i++) {
        const ch = input.charAt(i);
        const v = alphabetIndex[ch];
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

export function base58Decode(input: string): Uint8Array | null {
    return decodeBase58(input, BASE58_ALPHABET, BASE58_INDEX);
}

export function base58DecodeXrp(input: string): Uint8Array | null {
    return decodeBase58(input, XRP_BASE58_ALPHABET, XRP_BASE58_INDEX);
}
