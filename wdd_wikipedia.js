// Remove Wikimedia donation banners (everywhere on Wikipedia)
removeElement('div#frb-inline');
removeElement('div#siteNotice');

function removeElement(selector) {
    const elementToRemove = document.querySelector(selector);
    if (elementToRemove) {
        elementToRemove.remove();
    }
}

// Helper: Is this a Wikipedia article page? (for Grokipedia link only)
function isWikipediaArticle() {
  // Primary: MediaWiki global variable (most reliable)
  if (typeof window.wgNamespaceNumber !== 'undefined') {
    return window.wgNamespaceNumber === 0;  // 0 = main/article namespace
  }

  // Fallback: URL-based checks
  const path = window.location.pathname;
  const search = window.location.search;

  // Must look like an article
  if (!path.includes('/wiki/') && !(path.includes('/w/index.php') && search.includes('title='))) {
    return false;
  }

  const isNonArticle = path.startsWith('/wiki/Special:') ||
        path.startsWith('/wiki/Talk:') ||
        path.startsWith('/wiki/User:') ||
        path.startsWith('/wiki/Wikipedia:') ||
        path.startsWith('/wiki/Template:') ||
        path.startsWith('/wiki/Category:') ||
        path.startsWith('/wiki/Help:') ||
        path.startsWith('/wiki/File:') ||
        search.includes('action=edit') ||
        search.includes('action=history') ||
        search.includes('diff=') ||
        document.body.classList.contains('page-Special_') ||
        (document.body.className.includes('ns-') && !document.body.className.includes('ns-0'));

  if (isNonArticle) {
        return false;
    }

    // Must have a real title
    const titleEl = document.querySelector('h1#firstHeading');
    return titleEl && titleEl.textContent.trim().length > 1;
}

function extractPageTitleFromElement(selector) {
    const titleElement = document.querySelector(selector);
    const extractedText = titleElement ? titleElement.textContent.trim() : "";
    return extractedText.length < 3 ? "" : extractedText;
}

function extractPageTitleFromDocumentTitle() {
    return document.title
        .replace(/\s*[-–—]\s*(Wikipedia|Wikipédia|Wikimedia).*$/i, '')
        .replace(/\s*[-–—].*$/, '')
        .trim()
}

// Create and show the overlay on ALL Wikipedia pages
const wdd_div = document.createElement("div");
Object.assign(wdd_div.style, {
    position: "fixed",
    top: "16px",
    left: "50%",
    transform: "translateX(-50%)",
    minWidth: "420px",
    maxWidth: "580px",
    minHeight: "72px",
    backgroundColor: "#2c2c2e",
    color: "#e0e0e0",
    borderRadius: "10px",
    boxShadow: "0 6px 24px rgba(0,0,0,0.5)",
    zIndex: "9999",
    opacity: "0.96",
    padding: "16px 20px 16px 20px",
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    fontSize: "14px",
    lineHeight: "1.45",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    boxSizing: "border-box",
});

// Close button
const closeBtn = document.createElement("button");
Object.assign(closeBtn.style, {
    position: "absolute",
    top: "8px",
    right: "10px",
    background: "none",
    border: "none",
    color: "#aaa",
    fontSize: "18px",
    fontWeight: "bold",
    cursor: "pointer",
    padding: "4px 8px",
    lineHeight: "1",
    borderRadius: "4px",
});
closeBtn.innerHTML = "&times;";
closeBtn.title = "Close";
closeBtn.onclick = () => wdd_div.remove();
wdd_div.appendChild(closeBtn);

// Content container
const content = document.createElement("div");
content.style.textAlign = "center";
content.innerHTML =
    '<div style="font-weight: 600; font-size: 15px; margin-bottom: 6px;">' +
    'Wikimedia Foundation Financials (As of 2024)' +
    '</div>' +
    '<div style="margin-bottom: 4px;">' +
    'Revenue: <strong>$185.4 Million</strong> ' +
    '| Total Assets: <strong>$286.8 Million</strong> <br>' +
    'CEO Pay: <strong>$472,629</strong> | Wikipedia.org Hosting Cost: <strong>$3.1 Million</strong>' +
    '</div>' +
    '<div style="font-size: 13px; opacity: 0.9; margin-top: 12px;">' +
    'Sources: ' +
    '<a href="https://projects.propublica.org/nonprofits/organizations/200049703" ' +
    'target="_blank" ' +
    'style="color: #a5d8ff; text-decoration: none; border-bottom: 1px dotted #a5d8ff;">' +
    'IRS Form 990' +
    '</a>, ' +
    '<a href="https://wikimediafoundation.org/annualreports/2023-2024-annual-report/" ' +
    'target="_blank" ' +
    'style="color: #a5d8ff; text-decoration: none; border-bottom: 1px dotted #a5d8ff;">' +
    'Annual Report' +
    '</a>' +
    '</div>';


// Grokipedia link — only if it's an article page
if (isWikipediaArticle()) {
    const grokLinkContainer = document.createElement("div");
    grokLinkContainer.style.marginTop = "12px";
    grokLinkContainer.style.fontSize = "13px";

    const pageTitle = extractPageTitleFromElement('h1#firstHeading') ||
        extractPageTitleFromElement('h1') ||
        extractPageTitleFromDocumentTitle();

    const grokTitle = pageTitle
        .replace(/\s*\([^)]+\)$/, '')          // remove trailing (disambiguation)
        .replace(/\s+/g, ' ')                  // normalize all whitespace → single space
        .trim()
        .replace(/ /g, '_');

    if (grokTitle) {
        // Encode only special chars (e.g. &, /, ?, etc.) — spaces are already gone
        const encodedTitle = encodeURIComponent(grokTitle);
        const grokipediaUrl = "https://grokipedia.com/page/" + encodedTitle;

        const grokLink = document.createElement("a");
        grokLink.href = grokipediaUrl;
        grokLink.target = "_blank";
        grokLink.textContent = "See if this page is available on Grokipedia";
        grokLink.style.color = "#a5d8ff";
        grokLink.style.textDecoration = "none";
        grokLink.style.borderBottom = "1px dotted #a5d8ff";

        grokLink.onmouseenter = () => {
            grokLink.style.color = "#4dabf7";
        };
        grokLink.onmouseleave = () => {
            grokLink.style.color = "#a5d8ff";
        };

        grokLinkContainer.appendChild(grokLink);
        content.appendChild(grokLinkContainer);
    }
}

// Apply hover effects to all links (sources + Grokipedia if present)
content.querySelectorAll('a').forEach(a => {
    a.onmouseenter = () => {
        a.style.color = "#4dabf7";
    };
    a.onmouseleave = () => {
        a.style.color = "#a5d8ff";
    };
});

wdd_div.appendChild(content);
document.body.appendChild(wdd_div);
