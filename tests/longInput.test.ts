// longInput.test.ts

import { isWalletValid } from "../src";

const LONG_BASE58_INPUT = "z".repeat(20000);

describe("long input", () => {
    it("rejects oversized Base58 input without decoding it", () => {
        const start = performance.now();

        expect(isWalletValid(LONG_BASE58_INPUT).valid).toBe(false);
        expect(performance.now() - start).toBeLessThan(1000);
    });
});
