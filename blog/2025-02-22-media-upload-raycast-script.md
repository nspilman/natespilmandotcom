---
favorite: true
title: Creating a media upload script for Raycast
description: Building my Raycast tool belt
date: 2025-02-22
published: true
---
Okay, so day 2 of Raycast blog work. I haven't blogged as much because it is still not a seamless experience - so I'm using Raycast to pull out those seams. 

After much back and forth with Claude, I got a functioning script and this overview. 

----

## Raycast to Supabase Image Upload

A Raycast script that uploads clipboard images to Supabase storage with preserved image quality.

## Core Implementation
```bash
# Key components
TEMP_FILE=$(mktemp).png
pngpaste "$TEMP_FILE_INITIAL"
sips --matchTo '/ColorSync/Profiles/Display P3.icc' "$TEMP_FILE"
curl -X POST "$SUPABASE_URL/storage/v1/object/$BUCKET_NAME/$PATH"
```

## Development Challenges
1. Clipboard Data Handling
   - Text data instead of binary
   - Screen capture instead of clipboard
   - Color profile loss

2. Image Quality
   - Initial washed-out colors
   - Fixed via sips color profile management
   - Display P3 profile preservation

## Current Function
1. Accepts folder path and filename
2. Captures clipboard image via pngpaste
3. Processes with sips for color fidelity
4. Uploads to Supabase bucket
5. Returns public URL

## Required Setup
- Supabase credentials in .env
- pngpaste installation
- Raycast scripts directory access

## Limitations
- PNG format only
- macOS specific
- Requires manual filename input

---

And just like that, we've uploaded this image to supabase. 

*Image generated in Midjourney with the prompt `we out here --p` to generate in my "personal Style"*
![An image of a man with his eyes closed as the universe appears to explode out of his head in dramatic colors](https://ihkgojiseqpwinwdowvm.supabase.co/storage/v1/object/public/natespilmanblog/2025-02-22/weoutherepioneer.png)

## Current state
I now have two `Raycast` scripts to assist in publishing blog posts. 
1) my blog post publishing script that I run via `option + shift + Enter`
2) my image bucket uploader script. I've assigned this to `option + Shift + u`. I can now upload any image directly to bucket storage and get the url back for embedding. 

Next I need to think of other macros to build!! As soon as I'm doing a multi-part process more than once in a short period of time, it's `Raycast script` time. 

I'm still in awe of the power and simplicity of Raycast.
## Full Script 

```bash
#!/bin/bash

# Required parameters:
# @raycast.schemaVersion 1
# @raycast.title Upload to Supabase
# @raycast.mode fullOutput
# @raycast.packageName Supabase

# Optional parameters:
# @raycast.icon 📤
# @raycast.argument1 { "type": "text", "placeholder": "Folder path (e.g., images/blog)", "optional": false }
# @raycast.argument2 { "type": "text", "placeholder": "File name (without extension)", "optional": false }
# @raycast.needsConfirmation true
# @raycast.description Upload clipboard content to Supabase Storage

echo "🔍 Debug: Script starting"

# Source environment variables
if [ -f "$(dirname "$0")/.env" ]; then
    echo "📁 Debug: Found .env file"
    source "$(dirname "$0")/.env"
else
    echo "❌ Error: .env file not found at $(dirname "$0")/.env"
    exit 1
fi

# Check for required tools
if ! command -v pngpaste &> /dev/null; then
    echo "⚠️ pngpaste not found. Installing..."
    brew install pngpaste
fi

if ! command -v magick &> /dev/null; then
    echo "⚠️ ImageMagick not found. Installing..."
    brew install imagemagick
fi

# Get arguments
FOLDER_PATH=$1
FILE_NAME=$2

# Create temporary directory
TEMP_DIR=$(mktemp -d)
echo "📋 Debug: Created temp directory at $TEMP_DIR"

# Get clipboard info for format detection
CLIPBOARD_INFO=$(osascript -e 'clipboard info')
echo "📎 Debug: Clipboard info: $CLIPBOARD_INFO"

# Determine desired output format from clipboard info
# Prioritize actual image formats over text representations
if [[ $CLIPBOARD_INFO == *"«class JPEG»"* || $CLIPBOARD_INFO == *"JPEG picture"* ]]; then
    FORMAT="jpg"
    MIME_TYPE="image/jpeg"
    echo "📄 Debug: JPEG format detected in clipboard"
elif [[ $CLIPBOARD_INFO == *"«class GIFf»"* || $CLIPBOARD_INFO == *"GIF picture"* ]]; then
    FORMAT="gif"
    MIME_TYPE="image/gif"
    echo "📄 Debug: GIF format detected in clipboard"
elif [[ $CLIPBOARD_INFO == *"TIFF"* ]]; then
    FORMAT="tiff"
    MIME_TYPE="image/tiff"
    echo "📄 Debug: TIFF format detected in clipboard"
else
    FORMAT="png"
    MIME_TYPE="image/png"
    echo "📄 Debug: Defaulting to PNG format"
fi

# Set up temp file paths
TEMP_PNG="$TEMP_DIR/initial.png"
TEMP_FILE="$TEMP_DIR/image.$FORMAT"

# First capture with pngpaste
if pngpaste "$TEMP_PNG"; then
    echo "✅ Successfully captured clipboard to PNG"
    
    # Verify the captured PNG
    if ! magick identify "$TEMP_PNG" &>/dev/null; then
        echo "❌ Invalid image captured"
        rm -rf "$TEMP_DIR"
        exit 1
    fi
    
    if [ "$FORMAT" = "png" ]; then
        echo "📄 Using PNG format directly"
        mv "$TEMP_PNG" "$TEMP_FILE"
    else
        echo "🔄 Converting from PNG to $FORMAT"
        if magick "$TEMP_PNG" -quality 100 "$TEMP_FILE"; then
            # Verify conversion worked
            ACTUAL_FORMAT=$(magick identify -format "%m" "$TEMP_FILE")
            echo "📄 Debug: Actual output format: $ACTUAL_FORMAT"
            
            if [[ $ACTUAL_FORMAT != *"$FORMAT"* ]]; then
                echo "⚠️ Format conversion failed, falling back to PNG"
                FORMAT="png"
                MIME_TYPE="image/png"
                mv "$TEMP_PNG" "$TEMP_FILE"
            else
                echo "✅ Successfully converted to $FORMAT"
            fi
        else
            echo "⚠️ Conversion failed, falling back to PNG"
            FORMAT="png"
            MIME_TYPE="image/png"
            mv "$TEMP_PNG" "$TEMP_FILE"
        fi
    fi
else
    echo "❌ Failed to capture image from clipboard"
    rm -rf "$TEMP_DIR"
    exit 1
fi

CLIPBOARD_SIZE=$(wc -c < "$TEMP_FILE" | tr -d ' ')
echo "📤 Debug: File size: $CLIPBOARD_SIZE bytes"

# Remove leading/trailing slashes from folder path
FOLDER_PATH=$(echo $FOLDER_PATH | sed 's:^/::' | sed 's:/$::')
FULL_PATH="${FOLDER_PATH}/${FILE_NAME}.${FORMAT}"

echo "📂 Debug: Target path will be: $FULL_PATH"

# Check if file has content
if [ "$CLIPBOARD_SIZE" -eq 0 ]; then
    echo "❌ Error: No content was saved!"
    rm -rf "$TEMP_DIR"
    exit 1
fi

echo "🚀 Debug: Starting upload to Supabase"
echo "📤 Uploading to: $FULL_PATH"
echo "📍 Using bucket: $BUCKET_NAME"

# Upload to Supabase
RESPONSE=$(curl -s -X POST "$SUPABASE_URL/storage/v1/object/$BUCKET_NAME/$FULL_PATH" \
    -H "Authorization: Bearer $SUPABASE_KEY" \
    -H "Content-Type: $MIME_TYPE" \
    --data-binary "@$TEMP_FILE")

# Clean up temp directory
rm -rf "$TEMP_DIR"
echo "🧹 Debug: Cleaned up temp directory"

if [[ $RESPONSE == *"Key"* ]]; then
    echo "✅ Upload successful!"
    echo "🔗 URL: $SUPABASE_URL/storage/v1/object/public/$BUCKET_NAME/$FULL_PATH"
    echo "$RESPONSE"
else
    echo "❌ Upload failed!"
    echo "Error: $RESPONSE"
    exit 1
fi
```