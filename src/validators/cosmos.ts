export const testCosmos = () => {
    // regex for cosmos addresses
    // starts with cosmos1
    // followed by 38-39 alphanumeric characters (bech32 data part)
    // total length 45-46
    // Using simple char class [a-z0-9] as per existing pattern compatibility, 
    // or arguably should be [a-z0-9] excluding b, i, o for stricter bech32 if we want, but keeping it simple for now consistent with others.
    // The previous file had specific allowed chars string. I will preserve that if possible or use range.
    // Previous: 'qpzry9x8gf2tvdw0s3jn54khce6mua7l'
    // Let's use the explicit char set for better precision since it was already there.
    const ALLOWED_CHARS = 'qpzry9x8gf2tvdw0s3jn54khce6mua7l';
    return new RegExp('^(cosmos)1([' + ALLOWED_CHARS + ']{38,39})$');
};
