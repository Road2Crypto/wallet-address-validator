// Dogecoin address regex
// Starts with D, A, or 9. Base58Check.
export const testDogecoin = (): RegExp => /^(D|A|9)[a-km-zA-HJ-NP-Z0-9]{25,34}$/;
