# Assets Directory

Place your application icons and images here:

- `icon.png` - Linux icon (512x512 PNG recommended)
- `icon.icns` - macOS icon
- `icon.ico` - Windows icon

## Creating Icons

You can use online tools or ImageMagick to create icons from a single source image:

```bash
# Install ImageMagick
sudo apt install imagemagick

# Create PNG icon (512x512)
convert your-image.png -resize 512x512 icon.png

# Create ICO (Windows)
convert icon.png -define icon:auto-resize=256,128,96,64,48,32,16 icon.ico

# Create ICNS (macOS) - requires additional tools
# https://github.com/actaeon/icns-tools
```

## Default Icon

If you don't provide custom icons, Electron will use the default icon.

