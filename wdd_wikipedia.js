// Remove Wikimedia donation banners (everywhere on Wikipedia)
var banner1 = document.querySelector('div#siteNotice');
if (banner1) banner1.remove();

var banner2 = document.querySelector('div#frb-inline');
if (banner2) banner2.remove();

// Helper: Is this a Wikipedia article page? (for Grokipedia link only)
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
  opacity:         "0.98",
  padding:         "32px 20px 16px 20px",
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

var themes = {
  default: {
    background: "#2c2c2e",
    color: "#ffffff",
    linkColor: "#a5d8ff",
    hoverColor: "#4dabf7",
    textShadow: "0 1px 2px rgba(0,0,0,0.5)",
    btnColor: "#aaa"
  },
  pride: {
    background: "linear-gradient(180deg, #E40303 16.66%, #FF8C00 16.66%, #FF8C00 33.32%, #FFED00 33.32%, #FFED00 49.98%, #008026 49.98%, #008026 66.64%, #004DFF 66.64%, #004DFF 83.3%, #750787 83.3%)",
    color: "#ffffff",
    linkColor: "#ffffff",
    hoverColor: "#eeeeee",
    textShadow: "0 1px 3px rgba(0,0,0,0.9)",
    btnColor: "#ffffff"
  },
  trans: {
    background: "linear-gradient(180deg, #5BCEFA 20%, #F5A9B8 20%, #F5A9B8 40%, #FFFFFF 40%, #FFFFFF 60%, #F5A9B8 60%, #F5A9B8 80%, #5BCEFA 80%)",
    color: "#000000",
    linkColor: "#004a99",
    hoverColor: "#002a55",
    textShadow: "0 1px 1px rgba(255,255,255,0.5)",
    btnColor: "#000000"
  }
};

var currentTheme = localStorage.getItem('wdd_theme') || 'default';
var themeOrder = ['default', 'pride', 'trans'];

function applyTheme(themeName) {
  var t = themes[themeName] || themes.default;
  wdd_div.style.background = t.background;
  wdd_div.style.color = t.color;
  wdd_div.style.textShadow = t.textShadow;
  
  closeBtn.style.color = t.btnColor;
  themeBtn.style.color = t.btnColor;
  
  var links = content.querySelectorAll('a');
  links.forEach(a => {
    a.style.color = t.linkColor;
    a.style.borderBottomColor = t.linkColor;
    a.onmouseenter = () => { a.style.color = t.hoverColor; };
    a.onmouseleave = () => { a.style.color = t.linkColor; };
  });

  localStorage.setItem('wdd_theme', themeName);
  currentTheme = themeName;
}

var themeBtn = document.createElement("button");
Object.assign(themeBtn.style, {
  position:        "absolute",
  top:             "8px",
  right:           "40px",
  background:      "none",
  border:          "none",
  cursor:          "pointer",
  fontSize:        "18px",
  lineHeight:      "1",
  padding:         "4px",
  borderRadius:    "4px",
});
themeBtn.innerText = "🎨";
themeBtn.title = "Switch Theme";
themeBtn.onclick = function() {
  var currentIndex = themeOrder.indexOf(currentTheme);
  var nextIndex = (currentIndex + 1) % themeOrder.length;
  applyTheme(themeOrder[nextIndex]);
};
wdd_div.appendChild(themeBtn);

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
  }
}

// Apply hover effects to all links (sources + Grokipedia if present)
content.querySelectorAll('a').forEach(a => {
  a.onmouseenter = () => { a.style.color = "#4dabf7"; };
  a.onmouseleave = () => { a.style.color = "#a5d8ff"; };
});

wdd_div.appendChild(content);

// Apply initial theme (must be done after content is added so links exist)
applyTheme(currentTheme);

document.body.appendChild(wdd_div);
