// crypto.test.ts

import { doubleSha256 } from "../src/utils/crypto";

describe("double SHA 256", () => {
    it.each([
        {
            label: "empty bytes",
            input: new Uint8Array(),
            expected: "5df6e0e2761359d30a8275058e299fcc0381534545f55cf43e41983f5d4c9456",
        },
        {
            label: "text bytes",
            input: new TextEncoder().encode("hello"),
            expected: "9595c9df90075148eb06860365df33584b75bff782a510c6cd4883a419833d50",
        },
        {
            label: "subarray bytes",
            input: Uint8Array.from([9, 1, 2, 3, 8]).subarray(1, 4),
            expected: "19c6197e2140b9d034fb20b9ac7bb753a41233caf1e1dafda7316a99cef41416",
        },
    ])("matches the known digest for $label", ({ input, expected }) => {
        expect(Buffer.from(doubleSha256(input)).toString("hex")).toBe(expected);
    });
});
