// tsup.config.ts

import { defineConfig } from "tsup";

// Bundles the required Noble hashing code so consumers do not resolve it at runtime.
export default defineConfig({
    noExternal: ["@noble/hashes"],
});
