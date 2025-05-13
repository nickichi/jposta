#!/bin/bash

URL="https://www.post.japanpost.jp/zipcode/dl/utf/zip/utf_ken_all.zip"
ZIP_FILE="utf_ken_all.zip"
CSV_FILE="utf_ken_all.csv"
TEMP_CSV="temp_utf_ken_all.csv"

echo "[INFO] Downloading from $URL..."
wget -q "$URL" -O "$ZIP_FILE"

echo "[INFO] Unzipping $ZIP_FILE to $TEMP_CSV..."
unzip -q -p "$ZIP_FILE" > "$TEMP_CSV"

echo "[INFO] Temporary file created:"
ls -l "$TEMP_CSV"

if [ -f "$CSV_FILE" ]; then
    echo "[INFO] $CSV_FILE exists. Comparing with $TEMP_CSV..."
    if diff "$CSV_FILE" "$TEMP_CSV" > /dev/null; then
        echo "[INFO] No changes detected. Not updating the file."
        rm "$TEMP_CSV"
        echo "[INFO] Temporary file $TEMP_CSV removed."
    else
        echo "[INFO] Changes detected. Showing first 10 lines of diff:"
        diff "$CSV_FILE" "$TEMP_CSV" | head -n 10
        echo "[INFO] Updating $CSV_FILE with new data."
        mv "$TEMP_CSV" "$CSV_FILE"
        echo "[INFO] $CSV_FILE updated."
    fi
else
    echo "[INFO] $CSV_FILE does not exist. Creating new file."
    mv "$TEMP_CSV" "$CSV_FILE"
    echo "[INFO] $CSV_FILE created."
fi

echo "[INFO] Cleaning up..."
rm -f "$ZIP_FILE"
echo "[INFO] Done."