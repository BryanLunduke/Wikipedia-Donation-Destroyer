# Contributing to Wikipedia Donation Destroyer

Thanks for your interest in contributing! This project is a Rust + WebAssembly port of a simple Chrome extension that removes donation banners and displays financial information on Wikipedia, Mozilla, and Linux Foundation sites.

The codebase is structured as a Cargo workspace with shared DOM logic and specialized modules.

## Prerequisites

- Rust toolchain (stable) – automatically installed via `rust-toolchain.toml`
- [wasm-pack](https://rustwasm.github.io/wasm-pack/installer/) (install with `cargo install wasm-pack`)
- **(Highly recommended for releases)** Binaryen (`wasm-opt`) for significant Wasm size reduction:
  - **Windows**: Install via Chocolatey (`choco install binaryen`) or download from [Binaryen releases](https://github.com/WebAssembly/binaryen/releases)
  - **macOS**: `brew install binaryen`
  - **Linux**: `sudo apt install binaryen` (or equivalent for your distro), or download from releases

## Building the Extension

The project has four crates:
- `wdd_common` (shared DOM logic, rlib)
- `wdd_wikipedia`, `wdd_mozilla`, `wdd_linuxfoundation` (each produces a cdylib → Wasm module)

Build each module individually (order doesn't matter):

```powershell
# Wikipedia module
cd wdd_wikipedia
wasm-pack build --target web --release --out-dir ../pkg-wikipedia

# Mozilla module
cd ../wdd_mozilla
wasm-pack build --target web --release --out-dir ../pkg-mozilla

# Linux Foundation module
cd ../wdd_linuxfoundation
wasm-pack build --target web --release --out-dir ../pkg-linuxfoundation

cd ..
```

### Optimize Wasm Size (Strongly Recommended for Releases)

`wasm-opt` can reduce each `.wasm` file by 20–50% with no functionality loss. Run it after building:

```powershell
wasm-opt -Oz --enable-mutable-globals -o pkg-wikipedia/wdd_wikipedia_bg.wasm pkg-wikipedia/wdd_wikipedia_bg.wasm
wasm-opt -Oz --enable-mutable-globals -o pkg-mozilla/wdd_mozilla_bg.wasm pkg-mozilla/wdd_mozilla_bg.wasm
wasm-opt -Oz --enable-mutable-globals -o pkg-linuxfoundation/wdd_linuxfoundation_bg.wasm pkg-linuxfoundation/wdd_linuxfoundation_bg.wasm
```

- `-Oz` = maximum size optimization
- `--enable-mutable-globals` = required for wasm-bindgen compatibility
- The command overwrites the original file with the optimized version

If you skip this step, the extension will still work, but the Wasm files will be noticeably larger.

## Testing the Extension

1. Build all modules (and optionally optimize with `wasm-opt`).
2. Open Chrome and go to `chrome://extensions/`.
3. Enable "Developer mode" (top right).
4. Click "Load unpacked" and select the **root folder** of this repository (where `manifest.json` and `wrapper.js` are).

The extension should now work on Wikipedia, Mozilla, and Linux Foundation sites.

## Making Changes

- Shared DOM code (overlay creation, styling, close button, link hovers) lives in `wdd_common/src/lib.rs`.
- Site-specific logic and HTML content lives in the respective crate's `src/lib.rs`.
- The unified content script is `wrapper.js` (detects the domain and loads the correct Wasm module).

After changes:
- Rebuild only the affected module(s).
- Reload the extension in `chrome://extensions/` (click the refresh icon on the extension card).

## Creating a Release

1. Ensure all code is tested and up-to-date.
2. Clean old builds:
   ```powershell
   rmdir /s /q pkg-wikipedia pkg-mozilla pkg-linuxfoundation
   ```
3. Rebuild all modules.
4. **Run `wasm-opt`** on each `.wasm` file (see above) — this is important for keeping release zips small.
5. Zip the **contents** of the root folder (including the three `pkg-*` folders, `manifest.json`, `wrapper.js`, etc.).
6. Create a new GitHub Release and upload the zip.

## Style & Conventions

- Follow Rust formatting: `cargo fmt`
- Clippy: `cargo clippy`
- Keep financial numbers and sources up-to-date (verify via official reports).

Pull requests are welcome! Please open an issue first for major changes.