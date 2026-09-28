const BOUNCEABLE_TAG = 0x11;
const NON_BOUNCEABLE_TAG = 0x51;
const TEST_ONLY_FLAG = 0x80;
const RAW_ADDRESS = /^(0|-?[1-9][0-9]{0,2}):[0-9a-fA-F]{64}$/;

// TON address regex
// User friendly addresses are standard or URL safe base64, 48 chars long.
// Start with E, U, k, K, 0 (or others depending on flags, but mainly these).
// Allowed chars: letters, digits, plus, slash, underscore, and dash
export const testTon = (): RegExp => /^(E|U|k|K|0)[A-Za-z0-9+/_-]{47}$/;

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

// Validates a TON raw address with a signed 8 bit workchain, or a user friendly address tag and CRC16 checksum.
export function isValidTon(address: string): boolean {
    const raw = RAW_ADDRESS.exec(address);
    if (raw) return Number(raw[1]) >= -128 && Number(raw[1]) <= 127;

    if (!testTon().test(address)) return false;

    const binary = atob(address.replace(/-/g, "+").replace(/_/g, "/"));
    const bytes = Uint8Array.from(binary, (character) => character.charCodeAt(0));
    const tag = bytes[0]! & ~TEST_ONLY_FLAG;
    if (tag !== BOUNCEABLE_TAG && tag !== NON_BOUNCEABLE_TAG) return false;
    return crc16(bytes.subarray(0, 34)) === ((bytes[34]! << 8) | bytes[35]!);
}
