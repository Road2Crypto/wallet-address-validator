import { base58CheckDecode } from "../utils/encoding";

// Dogecoin address regex
// Starts with D, A, or 9. Base58Check.
export const testDogecoin = (): RegExp => /^(D|A|9)[a-km-zA-HJ-NP-Z0-9]{25,34}$/;

// Validates Dogecoin Base58Check version and checksum for P2PKH and P2SH addresses.
export function isValidDogecoin(address: string): boolean {
    if (!testDogecoin().test(address)) return false;

    const body = base58CheckDecode(address);
    return body !== null && body.length === 21 && (body[0] === 0x1e || body[0] === 0x16);
}
