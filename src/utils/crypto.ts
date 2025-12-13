import { createHash } from 'crypto';

export function doubleSha256(data: Uint8Array): Uint8Array {
    const h1 = createHash('sha256').update(Buffer.from(data)).digest();
    const h2 = createHash('sha256').update(h1).digest();
    return new Uint8Array(h2);
}
