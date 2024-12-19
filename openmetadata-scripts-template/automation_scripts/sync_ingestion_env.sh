#!/bin/bash
for folder in metadata airflow_provider_openmetadata _openmetadata_testutils; do
    src="/home/openmetadata-dev/ingestion/src/$folder/"
    dest="/home/openmetadata-dev/env/lib64/python3.9/site-packages/$folder/"

    if [[ -d "$src" && -d "$dest" ]]; then
        rsync -av --existing "$src" "$dest"
        echo "Đã đồng bộ: $folder"
    else
        echo "Bỏ qua vì không tìm thấy: $folder"
    fi
done