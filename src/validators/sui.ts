// Sui address regex
// 0x prefix followed by 64 hex characters
export const testSui = (): RegExp => /^0x[a-fA-F0-9]{64}$/;
