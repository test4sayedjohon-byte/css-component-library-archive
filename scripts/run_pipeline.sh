#!/usr/bin/env bash
# Run the ETL data pipeline
set -e
CONFIG="${1:-config.yaml}"
echo "[pipeline] Starting with config: $CONFIG"
node src/index.js --input data/input.csv --output data/output.json
echo "[pipeline] Done."
