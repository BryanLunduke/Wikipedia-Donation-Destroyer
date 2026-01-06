// Remove Wikimedia donation banners (everywhere on Wikipedia)
var banner1 = document.querySelector('div#siteNotice');
if (banner1) banner1.remove();

var banner2 = document.querySelector('div#frb-inline');
if (banner2) banner2.remove();

// The keys in this map are titles of Wikipedia articles for unsafe software,
// the values are a tuple of alternative's name and a link to it (source code if available)
const memSafeAlternatives = new Map([
  [
    "sudo",
    {
      name: "sudo-rs",
      url: "https://github.com/trifectatechfoundation/sudo-rs"
    }
  ],
  [
    "GNU Core Utilities",
    {
      name: "uutils coreutils",
      url: "https://github.com/uutils/coreutils"
    }
  ],
  [
    "Microsoft Azure",
    {
      name: "Microsoft Azure (by 2030)",
      url: "https://azure.microsoft.com"
    }
  ],
  [
    "FFmpeg",
    {
      name: "ffmpeg-rs (fund this instead of Wikipedia)",
      url: "https://typememetics.institute/fundraiser/ffmpeg-rs"
    }
  ],
  // Add more here
]);

// Helper: Is this a Wikipedia article page? (for Grokipedia and memory safe alternatives links only)
function isWikipediaArticle() {
  // Primary: MediaWiki global variable (most reliable)
  if (typeof window.wgNamespaceNumber !== 'undefined') {
    return window.wgNamespaceNumber === 0;  // 0 = main/article namespace
  }

  // Fallback: URL-based checks
  var path = window.location.pathname;
  var search = window.location.search;

  // Must look like an article
  if (!path.includes('/wiki/') && !(path.includes('/w/index.php') && search.includes('title='))) {
    return false;
  }

  // Exclude non-article namespaces/special pages
  if (
    path.startsWith('/wiki/Special:') ||
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
    (document.body.className.includes('ns-') && !document.body.className.includes('ns-0'))
  ) {
    return false;
  }

  // Must have a real title
  var titleEl = document.querySelector('h1#firstHeading');
  return titleEl && titleEl.textContent.trim().length > 1;
}

// Create and show the overlay on ALL Wikipedia pages
var wdd_div = document.createElement("div");
Object.assign(wdd_div.style, {
  position:        "fixed",
  top:             "16px",
  left:            "50%",
  transform:       "translateX(-50%)",
  minWidth:        "420px",
  maxWidth:        "580px",
  minHeight:       "72px",
  backgroundColor: "#2c2c2e",
  color:           "#e0e0e0",
  borderRadius:    "10px",
  boxShadow:       "0 6px 24px rgba(0,0,0,0.5)",
  zIndex:          "9999",
  opacity:         "0.96",
  padding:         "16px 20px 16px 20px",
  fontFamily:      "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
  fontSize:        "14px",
  lineHeight:      "1.45",
  display:         "flex",
  flexDirection:   "column",
  alignItems:      "center",
  justifyContent:  "center",
  boxSizing:       "border-box",
});

// Close button
var closeBtn = document.createElement("button");
Object.assign(closeBtn.style, {
  position:        "absolute",
  top:             "8px",
  right:           "10px",
  background:      "none",
  border:          "none",
  color:           "#aaa",
  fontSize:        "18px",
  fontWeight:      "bold",
  cursor:          "pointer",
  padding:         "4px 8px",
  lineHeight:      "1",
  borderRadius:    "4px",
});
closeBtn.innerHTML = "&times;";
closeBtn.title = "Close";
closeBtn.onclick = function() { 
  wdd_div.remove(); 
};
wdd_div.appendChild(closeBtn);

// Content container
var content = document.createElement("div");
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
// and a memory safe alternative link - (not an em-dash!) if there is one.
if (isWikipediaArticle()) {
  var grokLinkContainer = document.createElement("div");
  grokLinkContainer.style.marginTop = "12px";
  grokLinkContainer.style.fontSize = "13px";

  var pageTitle = "";
  var titleElement = document.querySelector('h1#firstHeading');
  if (titleElement) {
    pageTitle = titleElement.textContent.trim();
  }

  if (!pageTitle) {
    titleElement = document.querySelector('h1');
    if (titleElement) pageTitle = titleElement.textContent.trim();
  }

  if (!pageTitle || pageTitle.length < 3) {
    pageTitle = document.title
      .replace(/\s*[-–—]\s*(Wikipedia|Wikipédia|Wikimedia).*$/i, '')
      .replace(/\s*[-–—].*$/, '')
      .trim();
  }

  // Clean up disambiguation, collapse whitespace to single spaces first
  pageTitle = pageTitle
    .replace(/\s*\([^)]+\)$/, '')          // remove trailing (disambiguation)
    .replace(/\s+/g, ' ')                  // normalize all whitespace → single space
    .trim();

  // Critical fix: replace spaces with underscores for Grokipedia URL format
  var grokTitle = pageTitle.replace(/ /g, '_');

  if (grokTitle) {
    // Encode only special chars (e.g. &, /, ?, etc.) — spaces are already gone
    var encodedTitle = encodeURIComponent(grokTitle);
    var grokipediaUrl = "https://grokipedia.com/page/" + encodedTitle;

    var grokLink = document.createElement("a");
    grokLink.href = grokipediaUrl;
    grokLink.target = "_blank";
    grokLink.textContent = "See if this page is available on Grokipedia";
    grokLink.style.color = "#a5d8ff";
    grokLink.style.textDecoration = "none";
    grokLink.style.borderBottom = "1px dotted #a5d8ff";

    grokLink.onmouseenter = () => { grokLink.style.color = "#4dabf7"; };
    grokLink.onmouseleave = () => { grokLink.style.color = "#a5d8ff"; };

    grokLinkContainer.appendChild(grokLink);
    content.appendChild(grokLinkContainer);

    // Check if a memory safe alternative to presented software exists
    if (memSafeAlternatives.has(pageTitle)) {  
      console.log(memSafeAlternatives.get(pageTitle));
      const { name, url } = memSafeAlternatives.get(pageTitle);
      
      const safeAlternativeLinkContainer = document.createElement("div");
      safeAlternativeLinkContainer.style.marginTop = "15px";
      safeAlternativeLinkContainer.style.fontSize = "15px"; // A bit bigger than Grokipedia link. This is important!

      // Plain text explanation
      const textNode = document.createTextNode(
        "The software this article describes was/is being written in a memory-unsafe language. Please consider using the following memory-safe alternative: "
      );

      // Link to the alternative
      console.log(pageTitle);
      const linkNode = document.createElement("a");
      linkNode.textContent = name;
      linkNode.href = url;
      linkNode.target = "_blank";
      linkNode.style.color = "#a5d8ff";
      linkNode.style.textDecoration = "none";
      linkNode.style.borderBottom = "1px dotted #a5d8ff";

      linkNode.onmouseenter = () => { linkNode.style.color = "#4dabf7"; };
      linkNode.onmouseleave = () => { linkNode.style.color = "#a5d8ff"; };
      
      safeAlternativeLinkContainer.appendChild(textNode);
      safeAlternativeLinkContainer.appendChild(linkNode);
      content.appendChild(safeAlternativeLinkContainer);
    }
  }
}

// Apply hover effects to all links (sources + Grokipedia if present)
content.querySelectorAll('a').forEach(a => {
  a.onmouseenter = () => { a.style.color = "#4dabf7"; };
  a.onmouseleave = () => { a.style.color = "#a5d8ff"; };
});

wdd_div.appendChild(content);
document.body.appendChild(wdd_div);