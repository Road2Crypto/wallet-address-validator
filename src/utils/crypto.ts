// crypto.ts

import { sha256 } from '@noble/hashes/sha2';

// Returns the double SHA 256 digest used by Base58 checksum validators.
export function doubleSha256(data: Uint8Array): Uint8Array {
    return sha256(sha256(data));
}
