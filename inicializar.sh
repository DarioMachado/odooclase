#!/bin/bash

# Define the relative path to the source folder
# Example: if your source folder is in the same directory as this script,
# you can just put its name here
SOURCE_FOLDER="exorcismo/juego"

# Define the destination folder
DESTINATION_FOLDER="$HOME/juego"

# Use rsync to copy the folder, overwriting files in the destination
rsync -av --delete "$SOURCE_FOLDER/" "$DESTINATION_FOLDER/"

echo "Folder has been copied successfully."
