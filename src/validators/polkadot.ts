import { blake2b } from "@noble/hashes/blake2";
import { base58Decode } from "../utils/encoding";

const SS58_CHECKSUM_PREFIX = Uint8Array.from([0x53, 0x53, 0x35, 0x38, 0x50, 0x52, 0x45]); // ASCII for SS58PRE
const SS58_ADDRESS_LENGTH = 35;
const POLKADOT_NETWORK_PREFIX = 0;

// Polkadot address regex
// Validates that it starts with '1' and follows with valid base58 characters
// Length is approximately 47-48 characters for standard addresses
export const testPolkadot = (): RegExp => /^1[a-km-zA-HJ-NP-Z1-9]{46,47}$/;

// Validates a Polkadot SS58 address network prefix, 32 byte account, and BLAKE2b checksum.
export function isValidPolkadot(address: string): boolean {
    if (!testPolkadot().test(address)) return false;

    const decoded = base58Decode(address);
    if (!decoded || decoded.length !== SS58_ADDRESS_LENGTH || decoded[0] !== POLKADOT_NETWORK_PREFIX) return false;

    const hash = blake2b.create({ dkLen: 64 }).update(SS58_CHECKSUM_PREFIX).update(decoded.subarray(0, 33)).digest();
    return hash[0] === decoded[33] && hash[1] === decoded[34];
}
