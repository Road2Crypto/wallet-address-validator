// Aptos address regex
// 0x prefix followed by 64 hex characters
// Note: Aptos usually uses 32 bytes (64 hex chars), same as Sui.
export const testAptos = (): RegExp => /^0x[a-fA-F0-9]{64}$/;
