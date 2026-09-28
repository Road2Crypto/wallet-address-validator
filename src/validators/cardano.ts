import { Bech32Encoding, bech32WordsToBytes, decodeBech32 } from "../utils/bech32";
import { base58Decode } from "../utils/encoding";

const SHELLEY_PREFIXES = ["addr", "addr_test", "stake", "stake_test"];
const SHELLEY_MIN_PAYLOAD_LENGTH = 29;
const BYRON_MAX_LENGTH = 104; // Mainnet Byron addresses are 59 characters (Ae2) or 104 characters (DdzFF)
const CBOR_UINT_EXTRA_BYTES: Record<number, number> = { 0x18: 1, 0x19: 2, 0x1a: 4 };

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

function crc32(data: Uint8Array): number {
    let crc = 0xffffffff;
    for (let i = 0; i < data.length; i++) {
        crc ^= data[i]!;
        for (let bit = 0; bit < 8; bit++) {
            crc = crc & 1 ? (crc >>> 1) ^ 0xedb88320 : crc >>> 1;
        }
    }
    return (crc ^ 0xffffffff) >>> 0;
}

// Validates the Byron CBOR layout [tag 24 payload, CRC32 of that payload] with a payload that starts with its 28 byte address root.
function isValidByron(address: string): boolean {
    if (address.length > BYRON_MAX_LENGTH) return false;

    const decoded = base58Decode(address);
    if (!decoded || decoded.length < 5 || decoded[0] !== 0x82 || decoded[1] !== 0xd8 || decoded[2] !== 0x18 || decoded[3] !== 0x58) return false;

    const payloadEnd = 5 + decoded[4]!;
    const payload = decoded.subarray(5, payloadEnd);
    if (payload.length !== decoded[4] || payload[0] !== 0x83 || payload[1] !== 0x58 || payload[2] !== 0x1c) return false;

    const crcHeader = decoded[payloadEnd];
    if (crcHeader === undefined) return false;
    const crcExtraBytes = crcHeader < 0x18 ? 0 : CBOR_UINT_EXTRA_BYTES[crcHeader];
    if (crcExtraBytes === undefined || decoded.length !== payloadEnd + 1 + crcExtraBytes) return false;

    let crc = crcExtraBytes === 0 ? crcHeader : 0;
    for (let i = payloadEnd + 1; i < decoded.length; i++) crc = crc * 256 + decoded[i]!;
    return crc === crc32(payload);
}

// Validates Cardano Byron addresses and the bech32 prefix, checksum, and payload of Shelley addresses.
export function isValidCardano(address: string): boolean {
    if (!testCardano().test(address)) return false;
    if (/^(Ae2|DdzFF)/.test(address)) return isValidByron(address);

    const decoded = decodeBech32(address);
    if (!decoded || decoded.encoding !== Bech32Encoding.BECH32 || !SHELLEY_PREFIXES.includes(decoded.hrp)) return false;

    const payload = bech32WordsToBytes(decoded.words);
    return payload !== null && payload.length >= SHELLEY_MIN_PAYLOAD_LENGTH;
}
