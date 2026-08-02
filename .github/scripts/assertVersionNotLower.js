// assertVersionNotLower.js

const versionPattern = /^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)(?:-((?:0|[1-9]\d*|\d*[A-Za-z-][0-9A-Za-z-]*)(?:\.(?:0|[1-9]\d*|\d*[A-Za-z-][0-9A-Za-z-]*))*))?(?:\+[0-9A-Za-z-]+(?:\.[0-9A-Za-z-]+)*)?$/;

// Parses a Semantic Version into identifiers that follow precedence rules.
const parseVersion = (value) => {
    const match = versionPattern.exec(value);
    if (!match) {
        throw new Error(`VERSION_INVALID: ${value}`);
    }

    return {
        core: match.slice(1, 4).map(BigInt),
        prerelease: match[4]?.split(".") ?? [],
    };
};

const current = parseVersion(process.argv[2]);
const target = parseVersion(process.argv[3]);
let comparison = 0;

for (let index = 0; index < current.core.length && comparison === 0; index += 1) {
    comparison = target.core[index] > current.core[index] ? 1 : target.core[index] < current.core[index] ? -1 : 0;
}

if (comparison === 0 && current.prerelease.length !== 0 && target.prerelease.length === 0) {
    comparison = 1;
}

if (comparison === 0 && current.prerelease.length === 0 && target.prerelease.length !== 0) {
    comparison = -1;
}

for (let index = 0; index < Math.max(current.prerelease.length, target.prerelease.length) && comparison === 0; index += 1) {
    const currentPart = current.prerelease[index];
    const targetPart = target.prerelease[index];

    if (currentPart === undefined) {
        comparison = 1;
    } else if (targetPart === undefined) {
        comparison = -1;
    } else if (currentPart !== targetPart) {
        const currentNumeric = /^\d+$/.test(currentPart);
        const targetNumeric = /^\d+$/.test(targetPart);

        if (currentNumeric && targetNumeric) {
            comparison = BigInt(targetPart) > BigInt(currentPart) ? 1 : -1;
        } else if (currentNumeric !== targetNumeric) {
            comparison = currentNumeric ? 1 : -1;
        } else {
            comparison = targetPart > currentPart ? 1 : -1;
        }
    }
}

if (comparison < 0) {
    throw new Error(`VERSION_DOWNGRADE: ${process.argv[3]} is lower than ${process.argv[2]}`);
}
