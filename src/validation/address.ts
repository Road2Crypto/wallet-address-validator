// Regex for Bitcoin addresses
export const testBitcoin = (): RegExp => {
    const p2pkh = /^[13][a-km-zA-HJ-NP-Z0-9]{25,34}$/ // P2PKH starts with 1
    const p2sh = /^3[a-km-zA-HJ-NP-Z0-9]{25,34}$/ // P2SH starts with 3
    const bech32 = /^(bc1)[0-9a-z]{39,59}$/ // Bech32 (P2WPKH or P2WSH) starts with bc1
    return new RegExp(`${p2pkh.source}|${p2sh.source}|${bech32.source}`)
}

// Regex for Solana addresses
export const testSolana = (): RegExp => /^[1-9A-HJ-NP-Za-km-z]{32,44}$/

// Regex for EVM addresses
export const testEVM = (): RegExp => /^0x[a-fA-F0-9]{40}$/

export const testCosmos = () => {
    const ALLOWED_CHARS = 'qpzry9x8gf2tvdw0s3jn54khce6mua7l'
    return new RegExp('^(cosmos)1([' + ALLOWED_CHARS + ']+)$') // cosmos + bech32 separated by '1'
}
