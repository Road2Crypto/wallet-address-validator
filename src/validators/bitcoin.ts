import { doubleSha256 } from "../utils/crypto";
import { base58Decode } from "../utils/encoding";

// Regex for Bitcoin addresses
export const testBitcoin = (): RegExp => {
    const p2pkh = /^[13][a-km-zA-HJ-NP-Z0-9]{25,34}$/; // P2PKH starts with 1 or 3
    const p2sh = /^3[a-km-zA-HJ-NP-Z0-9]{25,34}$/; // P2SH starts with 3
    const bech32 = /^(bc1)[0-9a-z]{39,59}$/; // Bech32 starts with bc1
    return new RegExp(`${p2pkh.source}|${p2sh.source}|${bech32.source}`);
};

// Validates Bitcoin bech32 format and Base58Check version and checksum for P2PKH and P2SH addresses.
export function isValidBitcoin(address: string): boolean {
    if (!testBitcoin().test(address)) return false;
    if (address.startsWith("bc1")) return true;

    const decoded = base58Decode(address);
    if (!decoded || decoded.length !== 25) return false;
    if (decoded[0] !== 0x00 && decoded[0] !== 0x05) return false;

    const hash = doubleSha256(decoded.slice(0, 21));
    for (let i = 0; i < 4; i++) {
        if (decoded[21 + i] !== hash[i]) return false;
    }
    return true;
}
