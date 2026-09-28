import { base58CheckDecode } from "../utils/encoding";
import { isValidSegwitAddress } from "../utils/bech32";

// Litecoin address regex
// Legacy (L), P2SH (M, 3), Bech32 (ltc1)
export const testLitecoin = (): RegExp => /^(L|M|3)[a-km-zA-HJ-NP-Z0-9]{25,34}$|^ltc1[0-9a-z]{39,59}$/;

// Validates Litecoin segwit checksums and Base58Check version and checksum for legacy and P2SH addresses.
export function isValidLitecoin(address: string): boolean {
    if (!testLitecoin().test(address)) return false;
    if (address.startsWith("ltc1")) return isValidSegwitAddress(address, "ltc");

    const body = base58CheckDecode(address);
    return body !== null && body.length === 21 && (body[0] === 0x30 || body[0] === 0x32 || body[0] === 0x05);
}
