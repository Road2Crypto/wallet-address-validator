// XRP address validation
// Classic addresses: start with 'r', Base58 (ripple alphabet), 25-35 chars
// X-addresses: start with 'X', Base58 (ripple alphabet), 46 chars
export const testXrp = (): RegExp =>
  /^(r[1-9A-HJ-NP-Za-km-z]{24,34}|X[1-9A-HJ-NP-Za-km-z]{45})$/;
