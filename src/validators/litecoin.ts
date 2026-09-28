import { base58CheckDecode } from "../utils/encoding";
import { isValidSegwitAddress } from "../utils/bech32";

const BASE58_ADDRESS = /^(L|M|3)[a-km-zA-HJ-NP-Z0-9]{25,34}$/; // Legacy (L), P2SH (M, 3)
const SEGWIT_ADDRESS = /^(ltc1[0-9a-z]{39,59}|LTC1[0-9A-Z]{39,59})$/; // Bech32 starts with ltc1, or LTC1 when fully uppercase

// Litecoin address regex
export const testLitecoin = (): RegExp => new RegExp(`${BASE58_ADDRESS.source}|${SEGWIT_ADDRESS.source}`);

// Validates Litecoin segwit checksums and Base58Check version and checksum for legacy and P2SH addresses.
export function isValidLitecoin(address: string): boolean {
    if (SEGWIT_ADDRESS.test(address)) return isValidSegwitAddress(address, "ltc");
    if (!BASE58_ADDRESS.test(address)) return false;

    const body = base58CheckDecode(address);
    return body !== null && body.length === 21 && (body[0] === 0x30 || body[0] === 0x32 || body[0] === 0x05);
}
