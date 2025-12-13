// Regex for Bitcoin addresses
export const testBitcoin = (): RegExp => {
    const p2pkh = /^[13][a-km-zA-HJ-NP-Z0-9]{25,34}$/; // P2PKH starts with 1 or 3
    const p2sh = /^3[a-km-zA-HJ-NP-Z0-9]{25,34}$/; // P2SH starts with 3
    const bech32 = /^(bc1)[0-9a-z]{39,59}$/; // Bech32 starts with bc1
    return new RegExp(`${p2pkh.source}|${p2sh.source}|${bech32.source}`);
};
