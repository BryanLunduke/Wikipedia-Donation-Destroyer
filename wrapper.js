async function loadAndRun() {
    const hostname = location.hostname.toLowerCase();

    let pkgFolder = null;

    if (hostname.includes("wikipedia.org")) {
        pkgFolder = "pkg-wikipedia";
    } else if (hostname.includes("mozilla.org") || hostname.includes("mozilla.com")) {
        pkgFolder = "pkg-mozilla";
    } else if (hostname.includes("linuxfoundation.org")) {
        pkgFolder = "pkg-linuxfoundation";
    }

    if (pkgFolder) {
        try {
            // Map pkg folder to crate name (e.g., pkg-wikipedia → wdd_wikipedia.js)
            const crateName = "wdd_" + pkgFolder.split("-")[1];
            const glueUrl = chrome.runtime.getURL(`${pkgFolder}/${crateName}.js`);

            console.log("Loading Wasm glue from:", glueUrl);  // Debug log — check console

            const { default: init } = await import(glueUrl);
            await init();  // Runs the #[wasm_bindgen(start)] automatically
        } catch (e) {
            console.error("Failed to load/run Wasm module:", e);
        }
    }
}

loadAndRun();