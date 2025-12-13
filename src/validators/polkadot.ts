// Polkadot address regex
// Validates that it starts with '1' and follows with valid base58 characters
// Length is approximately 47-48 characters for standard addresses
export const testPolkadot = (): RegExp => /^1[a-km-zA-HJ-NP-Z1-9]{46,47}$/;
