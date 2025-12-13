// Litecoin address regex
// Legacy (L), P2SH (M, 3), Bech32 (ltc1)
export const testLitecoin = (): RegExp => /^(L|M|3)[a-km-zA-HJ-NP-Z0-9]{25,34}$|^ltc1[0-9a-z]{39,59}$/;
