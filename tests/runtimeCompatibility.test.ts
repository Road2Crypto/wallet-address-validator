// runtimeCompatibility.test.ts

import { readFileSync } from "fs";

const DISTRIBUTION_FILES = ["dist/index.js", "dist/index.mjs"];

describe("runtime compatibility", () => {
    it.each(DISTRIBUTION_FILES)("keeps %s self contained", file => {
        const source = readFileSync(file, "utf8");

        expect(source).not.toMatch(/^\s*import(?:\s+.*?\s+from)?\s*["'][^"']+["'];?\s*$/m);
        expect(source).not.toMatch(/\brequire\(["'][^"']+["']\)/);
        expect(source).not.toMatch(/\bimport\(["'][^"']+["']\)/);
        expect(source).not.toMatch(/(?:\bBuffer\b|\bprocess\s*(?:\.|\[)|\btypeof\s+process\b)/);
    });

    it("publishes with no runtime dependencies", () => {
        const packageMetadata = JSON.parse(readFileSync("package.json", "utf8"));

        expect(packageMetadata.dependencies).toBeUndefined();
        expect(packageMetadata.optionalDependencies).toBeUndefined();
        expect(packageMetadata.peerDependencies).toBeUndefined();
        expect(packageMetadata.bundledDependencies).toBeUndefined();
        expect(packageMetadata.bundleDependencies).toBeUndefined();
    });
});
