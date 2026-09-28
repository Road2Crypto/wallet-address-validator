// encoding.test.ts

import { base58CheckDecode } from "../src/utils/encoding";

describe("Base58Check decoding", () => {
    it("returns the version and payload bytes when the checksum matches", () => {
        const body = base58CheckDecode("1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa");

        expect(body).not.toBeNull();
        expect(body!.length).toBe(21);
        expect(body![0]).toBe(0x00);
    });

    it.each([
        { label: "checksum mismatch", input: "1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNb" },
        { label: "character outside the Base58 alphabet", input: "1A1zP1eP5QGefi2DMPTfTL5SLmv7Div0Na" },
        { label: "input shorter than a checksum", input: "1" },
    ])("returns null for $label", ({ input }) => {
        expect(base58CheckDecode(input)).toBeNull();
    });
});
