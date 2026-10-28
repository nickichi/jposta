#!/bin/bash
set -euo pipefail

URL="https://www.post.japanpost.jp/service/search/zipcode/download/utf/zip/utf_ken_all.zip"
ZIP_FILE="utf_ken_all.zip"
CSV_FILE="utf_ken_all.csv"
TEMP_CSV="temp_utf_ken_all.csv"
# The full dataset has ~120,000 rows; anything far below that means a broken download
MIN_LINES=100000

trap 'rm -f "$ZIP_FILE" "$TEMP_CSV"' EXIT

wget -q "$URL" -O "$ZIP_FILE"

unzip -q -p "$ZIP_FILE" "$CSV_FILE" > "$TEMP_CSV"

LINES=$(wc -l < "$TEMP_CSV")
if [ "$LINES" -lt "$MIN_LINES" ]; then
    echo "Downloaded CSV has only $LINES lines (expected >= $MIN_LINES). Aborting." >&2
    exit 1
fi

if [ -f "$CSV_FILE" ] && cmp -s "$CSV_FILE" "$TEMP_CSV"; then
    echo "No changes detected. Not updating the file."
else
    echo "Changes detected. Updating the file."
    mv "$TEMP_CSV" "$CSV_FILE"
fi
