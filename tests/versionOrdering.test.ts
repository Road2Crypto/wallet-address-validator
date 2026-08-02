// versionOrdering.test.ts

import { execFileSync } from "child_process";

const VERSION_CHECK_SCRIPT = ".github/scripts/assertVersionNotLower.js";

const checkVersion = (currentVersion: string, targetVersion: string): void => {
    execFileSync(process.execPath, [VERSION_CHECK_SCRIPT, currentVersion, targetVersion], {
        stdio: "pipe",
    });
};

describe("semantic version ordering", () => {
    it.each([
        ["1.6.0", "1.6.0"],
        ["1.6.0", "1.7.0"],
        ["1.6.0-rc.1", "1.6.0"],
        ["1.6.0", "1.6.1-rc.1"],
        ["1.6.0-alpha", "1.6.0-alpha.1"],
    ])("accepts %s to %s", (currentVersion, targetVersion) => {
        expect(() => checkVersion(currentVersion, targetVersion)).not.toThrow();
    });

    it.each([
        ["1.7.0", "1.6.0"],
        ["1.6.0", "1.6.0-rc.1"],
        ["1.6.0-rc.2", "1.6.0-rc.1"],
        ["1.6.0-alpha.1", "1.6.0-alpha"],
    ])("rejects %s to %s", (currentVersion, targetVersion) => {
        expect(() => checkVersion(currentVersion, targetVersion)).toThrow();
    });
});
