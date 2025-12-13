export const testCosmos = () => {
    const ALLOWED_CHARS = 'qpzry9x8gf2tvdw0s3jn54khce6mua7l';
    return new RegExp('^(cosmos)1([' + ALLOWED_CHARS + ']+)$'); // cosmos + bech32 separated by '1'
};
