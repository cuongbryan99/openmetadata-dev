#!/bin/bash

# Define paths
SOURCE_ARCHIVE="/home/openmetadata-dev/openmetadata-dist/target/openmetadata-1.6.1.tar.gz"
DEST_FOLDER="/home/openmetadata-dev/openmetadata-release"
TEMPLATE_FILE="/home/openmetadata-dev/openmetadata-scripts-template/config_templates/openmetadata_template.yaml"
TARGET_CONFIG="$DEST_FOLDER/conf/openmetadata.yaml"

# Extract the archive
if [ -d "$DEST_FOLDER" ]; then
    echo "Removing existing folder: $DEST_FOLDER"
    rm -rf "$DEST_FOLDER"
fi

echo "Extracting archive from $SOURCE_ARCHIVE to $DEST_FOLDER"
tar -xzf $SOURCE_ARCHIVE -C /home/openmetadata-dev/
mv /home/openmetadata-dev/openmetadata-1.6.1 /home/openmetadata-dev/openmetadata-release

# Copy configuration template
if [ -f "$TEMPLATE_FILE" ]; then
    echo "Copying template file $TEMPLATE_FILE to $TARGET_CONFIG"
    cp "$TEMPLATE_FILE" "$TARGET_CONFIG"
else
    echo "Error: Template file $TEMPLATE_FILE does not exist."
    exit 1
fi

# Kill process using port 8585
PORT=8585
PID=$(lsof -t -i:$PORT)
if [ -n "$PID" ]; then
    echo "Killing process $PID using port $PORT"
    kill -9 $PID
else
    echo "No process found on port $PORT"
fi

# Execute commands in the release folder
cd "$DEST_FOLDER" || { echo "Failed to change directory to $DEST_FOLDER"; exit 1; }

# Run bootstrap script

# echo "Running bootstrap script: bootstrap/openmetadata-ops.sh drop-create"
# echo "DELETE" | sh bootstrap/openmetadata-ops.sh drop-create

# Start OpenMetadata server
echo "Starting OpenMetadata server with: bin/openmetadata-server-start.sh conf/openmetadata.yaml"
sh bin/openmetadata-server-start.sh conf/openmetadata.yaml