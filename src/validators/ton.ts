// TON address regex
// User-friendly addresses are base64-url like, 48 chars long.
// Start with E, U, k, K, 0 (or others depending on flags, but mainly these).
// Allowed chars: A-Z, a-z, 0-9, _, -
export const testTon = (): RegExp => /^(E|U|k|K|0)[A-Za-z0-9_-]{47}$/;
