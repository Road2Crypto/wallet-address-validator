// evm.ts

import { keccak_256 } from '@noble/hashes/sha3';
import { bytesToHex } from '@noble/hashes/utils';

const EIP1191_CHAIN_IDS = new Set<number>([30, 31]);

// Returns the structural expression for an EVM address.
export const testEVM = (): RegExp => /^0x[a-fA-F0-9]{40}$/;

// Validates EVM address format and mixed case checksum rules for the supplied public chain ID.
export function isValidEvm(address: string, evmChainId?: number): boolean {
    if (!testEVM().test(address)) return false;
    if (evmChainId === undefined) return true;
    if (!Number.isSafeInteger(evmChainId) || evmChainId <= 0) return false;

    const addressBody = address.slice(2);
    const lowercaseBody = addressBody.toLowerCase();
    if (addressBody === lowercaseBody || addressBody === addressBody.toUpperCase()) return true;

    const hashInput = EIP1191_CHAIN_IDS.has(evmChainId)
        ? `${evmChainId}0x${lowercaseBody}`
        : lowercaseBody;
    const hash = bytesToHex(keccak_256(hashInput));
    let checksummedBody = '';

    for (let index = 0; index < lowercaseBody.length; index++) {
        const character = lowercaseBody.charAt(index);
        checksummedBody += Number.parseInt(hash.charAt(index), 16) >= 8
            ? character.toUpperCase()
            : character;
    }

    return addressBody === checksummedBody;
}
