#!/bin/bash

URL="https://www.post.japanpost.jp/zipcode/dl/utf/zip/utf_ken_all.zip"
ZIP_FILE="utf_ken_all.zip"
CSV_FILE="utf_ken_all.csv"
TEMP_CSV="temp_utf_ken_all.csv"

wget -q "$URL" -O "$ZIP_FILE"

unzip -q -p "$ZIP_FILE" > "$TEMP_CSV"

if [ -f "$CSV_FILE" ]; then
    if diff "$CSV_FILE" "$TEMP_CSV" > /dev/null; then
        echo "No changes detected. Not updating the file."
        rm "$TEMP_CSV"
    else
        echo "Changes detected. Updating the file."
        mv "$TEMP_CSV" "$CSV_FILE"
    fi
else
    echo "New file downloaded. Updating the file."
    mv "$TEMP_CSV" "$CSV_FILE"
fi

rm -f "$ZIP_FILE"