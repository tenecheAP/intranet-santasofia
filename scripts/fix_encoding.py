import sys

def fix_encoding(input_file, output_file):
    print(f"Reading from {input_file}...")
    try:
        with open(input_file, 'r', encoding='utf-8') as f:
            lines = f.readlines()
    except UnicodeDecodeError:
        print("Error: Input file is not valid UTF-8")
        return

    fixed_lines = []
    error_count = 0
    fixed_count = 0

    print("Processing lines...")
    for line in lines:
        try:
            # The encoding artifact: UTF-8 bytes were interpreted as CP437 (or similar)
            # and then saved again as UTF-8.
            # To reverse: encode back to CP437 bytes, then decode as UTF-8.
            fixed_line = line.encode('cp437').decode('utf-8')
            if fixed_line != line:
                fixed_count += 1
            fixed_lines.append(fixed_line)
        except (UnicodeEncodeError, UnicodeDecodeError):
            # If it fails, it might be that the line was actually correct 
            # or used a different corruption pattern. Keep original.
            # However, for this specific case, usually the whole file has issues 
            # or just strings.
            fixed_lines.append(line)
            error_count += 1

    print(f"Writing to {output_file}...")
    with open(output_file, 'w', encoding='utf-8') as f:
        f.writelines(fixed_lines)

    print(f"Done. Fixed {fixed_count} lines. {error_count} lines could not be converted (kept original).")

if __name__ == "__main__":
    fix_encoding('intranet_backup_utf8.sql', 'intranet_backup_fixed.sql')
