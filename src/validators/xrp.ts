import { doubleSha256 } from "../utils/crypto";
import { base58DecodeXrp } from "../utils/encoding";

const CLASSIC_ADDRESS_VERSION = 0x00;
const X_ADDRESS_PAYLOAD_LENGTH = 31;
const X_ADDRESS_MAINNET_PREFIX = Uint8Array.from([0x05, 0x44]);
const X_ADDRESS_TESTNET_PREFIX = Uint8Array.from([0x04, 0x93]);

function hasPrefix(value: Uint8Array, prefix: Uint8Array): boolean {
    if (value.length < prefix.length) return false;

    for (let i = 0; i < prefix.length; i++) {
        if (value[i] !== prefix[i]) return false;
    }

    return true;
}

function decodeCheckedXrp(value: string): Uint8Array | null {
    const decoded = base58DecodeXrp(value);
    if (!decoded || decoded.length < 5) return null;

    const payload = decoded.slice(0, -4);
    const checksum = decoded.slice(-4);
    const hash = doubleSha256(payload);

    for (let i = 0; i < 4; i++) {
        if (checksum[i] !== hash[i]) return null;
    }

    return payload;
}

export function isValidXrpClassicAddress(address: string): boolean {
    const payload = decodeCheckedXrp(address);
    return payload !== null && payload.length === 21 && payload[0] === CLASSIC_ADDRESS_VERSION;
}

export function isValidXrpXAddress(address: string): boolean {
    const payload = decodeCheckedXrp(address);
    if (!payload || payload.length !== X_ADDRESS_PAYLOAD_LENGTH) return false;

    const isMainnet = hasPrefix(payload, X_ADDRESS_MAINNET_PREFIX);
    const isTestnet = hasPrefix(payload, X_ADDRESS_TESTNET_PREFIX);
    if (!isMainnet && !isTestnet) return false;

    const flag = payload[22];
    if (flag >= 2) return false;

    if (flag === 0) {
        for (let i = 23; i < payload.length; i++) {
            if (payload[i] !== 0) return false;
        }
    }

    return true;
}

export function isValidXrp(address: string): boolean {
    return isValidXrpClassicAddress(address) || isValidXrpXAddress(address);
}
