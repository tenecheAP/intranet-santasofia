const fs = require('fs');

// CP437 Character mapping (index = byte value)
// We only need the top half (128-255) because 0-127 are ASCII and match.
const cp437Top = [
    '\u00c7', '\u00fc', '\u00e9', '\u00e2', '\u00e4', '\u00e0', '\u00e5', '\u00e7',
    '\u00ea', '\u00eb', '\u00e8', '\u00ef', '\u00ee', '\u00ec', '\u00c4', '\u00c5',
    '\u00c9', '\u00e6', '\u00c6', '\u00f4', '\u00f6', '\u00f2', '\u00fb', '\u00f9',
    '\u00ff', '\u00d6', '\u00dc', '\u00a2', '\u00a3', '\u00a5', '\u20a7', '\u0192',
    '\u00e1', '\u00ed', '\u00f3', '\u00fa', '\u00f1', '\u00d1', '\u00aa', '\u00ba',
    '\u00bf', '\u2310', '\u00ac', '\u00bd', '\u00bc', '\u00a1', '\u00ab', '\u00bb',
    '\u2591', '\u2592', '\u2593', '\u2502', '\u2524', '\u2561', '\u2562', '\u2556',
    '\u2555', '\u2563', '\u2551', '\u2557', '\u255d', '\u255c', '\u255b', '\u2510',
    '\u2514', '\u2534', '\u252c', '\u251c', '\u2500', '\u253c', '\u255e', '\u255f',
    '\u255a', '\u2554', '\u2569', '\u2566', '\u2560', '\u2550', '\u256c', '\u2567',
    '\u2568', '\u2564', '\u2565', '\u2559', '\u2558', '\u2552', '\u2553', '\u256b',
    '\u256a', '\u2518', '\u250c', '\u2588', '\u2584', '\u258c', '\u2590', '\u2580',
    '\u03b1', '\u00df', '\u0393', '\u03c0', '\u03a3', '\u03c3', '\u00b5', '\u03c4',
    '\u03a6', '\u0398', '\u03a9', '\u03b4', '\u221e', '\u03c6', '\u03b5', '\u2229',
    '\u2261', '\u00b1', '\u2265', '\u2264', '\u2320', '\u2321', '\u00f7', '\u2248',
    '\u00b0', '\u2022', '\u00b7', '\u221a', '\u207f', '\u00b2', '\u25a0', '\u00a0'
];

// Invert map: Char -> Byte
const charToCp437 = new Map();
cp437Top.forEach((char, index) => {
    charToCp437.set(char, 128 + index);
});

// Add ASCII
for (let i = 0; i < 128; i++) {
    charToCp437.set(String.fromCharCode(i), i);
}

function fixLine(line) {
    // Attempt to convert the string chars back to bytes using CP437 map
    const bytes = [];
    for (const char of line) {
        if (charToCp437.has(char)) {
            bytes.push(charToCp437.get(char));
        } else {
            // Character not in CP437. This implies this part of the string 
            // wasn't corrupted in the standard checks or is a later edit?
            // If we fail to map, we can't reconstruct the UTF-8 bytes.
            // Returning null signals failure for this line.
            return null;
        }
    }

    // Now decode bytes as UTF-8
    try {
        const buffer = Buffer.from(bytes);
        const decoded = buffer.toString('utf8');

        // Double check: If we re-encode to CP437 chars, do we get the original line?
        // This validates the round trip.
        // Actually, simple check: does the decoded string look "better"?
        // Or if the buffer is valid UTF-8. 
        // Buffer.toString('utf8') replaces invalid sequences with replacement char.
        // We can check if replacement char exists.

        if (decoded.includes('\uFFFD')) {
            return null; // Invalid UTF-8 result
        }

        return decoded;
    } catch (e) {
        return null;
    }
}

const inputFile = 'intranet_backup_utf8.sql';
const outputFile = 'intranet_backup_fixed.sql';

try {
    const rawContent = fs.readFileSync(inputFile, 'utf8');
    const lines = rawContent.split(/\r?\n/);
    const outputLines = [];
    let fixedCount = 0;

    for (const line of lines) {
        // Optimization: Only try to fix if line contains suspicious chars?
        // But "├" is common box drawing in DOS, but rare in SQL except as noise.
        // Let's try to fix ALL lines. If fix returns null or is identical, keep original.

        const fixed = fixLine(line);
        if (fixed && fixed !== line) {
            outputLines.push(fixed);
            fixedCount++;
        } else {
            outputLines.push(line);
        }
    }

    fs.writeFileSync(outputFile, outputLines.join('\n'), 'utf8');
    console.log(`Success! Fixed ${fixedCount} lines. Output saved to ${outputFile}`);

} catch (err) {
    console.error("Error:", err);
}
