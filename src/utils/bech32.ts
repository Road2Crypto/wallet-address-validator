// bech32.ts

const CHARSET = 'qpzry9x8gf2tvdw0s3jn54khce6mua7l';
const GENERATORS = [0x3b6a57b2, 0x26508e6d, 0x1ea119fa, 0x3d4233dd, 0x2a1462b3];
const CHECKSUM_LENGTH = 6;
const SEGWIT_MAX_LENGTH = 90;

// Checksum constants that tell BIP 173 bech32 apart from BIP 350 bech32m.
export enum Bech32Encoding {
    BECH32 = 1,
    BECH32M = 0x2bc830a3,
}

export interface Bech32Decoded {
    hrp: string;
    words: number[];
    encoding: Bech32Encoding;
}

function polymod(values: number[]): number {
    let checksum = 1;
    for (let i = 0; i < values.length; i++) {
        const top = checksum >>> 25;
        checksum = ((checksum & 0x1ffffff) << 5) ^ values[i]!;
        for (let j = 0; j < 5; j++) {
            if ((top >>> j) & 1) checksum ^= GENERATORS[j]!;
        }
    }
    return checksum;
}

// Decodes a bech32 or bech32m string and verifies its checksum, leaving length limits to each address format.
export function decodeBech32(value: string): Bech32Decoded | null {
    for (let i = 0; i < value.length; i++) {
        const code = value.charCodeAt(i);
        if (code < 33 || code > 126) return null;
    }

    const lowercase = value.toLowerCase();
    if (value !== lowercase && value !== value.toUpperCase()) return null;

    const separator = lowercase.lastIndexOf('1');
    if (separator < 1 || separator + CHECKSUM_LENGTH + 1 > lowercase.length) return null;

    const hrp = lowercase.slice(0, separator);
    const values: number[] = [];
    for (let i = 0; i < hrp.length; i++) values.push(hrp.charCodeAt(i) >>> 5);
    values.push(0);
    for (let i = 0; i < hrp.length; i++) values.push(hrp.charCodeAt(i) & 31);

    const words: number[] = [];
    for (let i = separator + 1; i < lowercase.length; i++) {
        const word = CHARSET.indexOf(lowercase.charAt(i));
        if (word === -1) return null;
        words.push(word);
    }

    const checksum = polymod(values.concat(words));
    if (checksum !== Bech32Encoding.BECH32 && checksum !== Bech32Encoding.BECH32M) return null;
    return { hrp, words: words.slice(0, -CHECKSUM_LENGTH), encoding: checksum };
}

// Converts 5 bit bech32 words to bytes and rejects leftover bits that are not zero padding.
export function bech32WordsToBytes(words: number[]): Uint8Array | null {
    const bytes: number[] = [];
    let accumulator = 0;
    let bits = 0;
    for (let i = 0; i < words.length; i++) {
        accumulator = ((accumulator << 5) | words[i]!) & 0xfff;
        bits += 5;
        while (bits >= 8) {
            bits -= 8;
            bytes.push((accumulator >>> bits) & 0xff);
        }
    }

    if (bits >= 5 || ((accumulator << (8 - bits)) & 0xff) !== 0) return null;
    return Uint8Array.from(bytes);
}

// Validates a BIP 173 or BIP 350 segwit address for the given human readable part.
export function isValidSegwitAddress(address: string, hrp: string): boolean {
    if (address.length > SEGWIT_MAX_LENGTH) return false;

    const decoded = decodeBech32(address);
    if (!decoded || decoded.hrp !== hrp || decoded.words.length === 0) return false;

    const version = decoded.words[0]!;
    const program = bech32WordsToBytes(decoded.words.slice(1));
    if (!program || program.length < 2 || program.length > 40 || version > 16) return false;
    if (version === 0 && program.length !== 20 && program.length !== 32) return false;
    return decoded.encoding === (version === 0 ? Bech32Encoding.BECH32 : Bech32Encoding.BECH32M);
}
