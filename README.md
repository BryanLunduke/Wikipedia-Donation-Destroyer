# Donation-Destroyer
_Donation Destroyer_ removes the donation popups of "non-profit" foundation websites, replacing it with their actual financials.

In other words, _Donation Destroyer_:
1. Blocks adware popups like: _"Donate or our totally non-profit foundation will die in 3 minutes!"_.
2. Displays the true financials of said foundations in a small, closable box.
3. Provides a _"See if this page is available on Grokipedia"_ link.

<img width="1240" height="383" alt="Screenshot 2026-01-04 at 11 41 36 AM" src="https://github.com/user-attachments/assets/1964f3bb-f5ec-4361-8ed0-8eaf71c70804" />

Currently, _Donation Destroyer_ supports the following foundation-based sites:
- _Wikipedia (Wikimedia Foundation)_
- _Mozilla Foundation_
- _Linux Foundation_

<img width="976" height="417" alt="MozillaScreenshot" src="https://github.com/user-attachments/assets/32bb72c3-1d89-4590-8c9a-4a6af3d9f78f" />

The code is delibarately:
- simple
- without:
    - data collection
    - trackers
    - advertisement

## Installation

### Chromium-based browsers
1. Download the extension source files.
2. Within Chrome, go to `chrome://extensions/` and enable **Developer mode**.
3. Click **Load unpacked** and select the extension folder.

### Firefox-based browsers
1. Download the extension source files.
2. Within _Firefox_, go to `about:debugging#/runtime/this-firefox`.
3. Click **Load Temporary Add-on...**.
4. Select the `manifest.firefox.json` file from the extension folder.
