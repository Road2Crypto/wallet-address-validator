const BOUNCEABLE_TAG = 0x11;
const NON_BOUNCEABLE_TAG = 0x51;
const TEST_ONLY_FLAG = 0x80;

// TON address regex
// User-friendly addresses are base64-url like, 48 chars long.
// Start with E, U, k, K, 0 (or others depending on flags, but mainly these).
// Allowed chars: A-Z, a-z, 0-9, _, -
export const testTon = (): RegExp => /^(E|U|k|K|0)[A-Za-z0-9_-]{47}$/;

function crc16(data: Uint8Array): number {
    let crc = 0;
    for (let i = 0; i < data.length; i++) {
        crc ^= data[i]! << 8;
        for (let bit = 0; bit < 8; bit++) {
            crc = crc & 0x8000 ? ((crc << 1) ^ 0x1021) & 0xffff : (crc << 1) & 0xffff;
        }
    }
    return crc;
}

// Validates a TON user friendly address tag and CRC16 checksum.
export function isValidTon(address: string): boolean {
    if (!testTon().test(address)) return false;

    const binary = atob(address.replace(/-/g, "+").replace(/_/g, "/"));
    const bytes = Uint8Array.from(binary, (character) => character.charCodeAt(0));
    const tag = bytes[0]! & ~TEST_ONLY_FLAG;
    if (tag !== BOUNCEABLE_TAG && tag !== NON_BOUNCEABLE_TAG) return false;
    return crc16(bytes.subarray(0, 34)) === ((bytes[34]! << 8) | bytes[35]!);
}
