const CONFIG = {
  bannerSelectors: [
    'div#siteNotice', 
    'div#frb-inline',
    '.frb-inline',
    '#centralNotice'
  ],
  
  financials: {
    title: 'Wikimedia Foundation Financials (As of 2024)',
    stats: 'Revenue: <strong>$185.4 Million</strong> | Total Assets: <strong>$286.8 Million</strong> <br>' +
           'CEO Pay: <strong>$472,629</strong> | Wikipedia.org Hosting Cost: <strong>$3.1 Million</strong>',
    sources: [
      { text: 'IRS Form 990', url: 'https://projects.propublica.org/nonprofits/organizations/200049703' },
      { text: 'Annual Report', url: 'https://wikimediafoundation.org/annualreports/2023-2024-annual-report/' }
    ]
  }
};

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

  // Exclude non-article namespaces/special pages
  const excludedPrefixes = [
    '/wiki/Special:', '/wiki/Talk:', '/wiki/User:', '/wiki/Wikipedia:',
    '/wiki/Template:', '/wiki/Category:', '/wiki/Help:', '/wiki/File:'
  ];
  
  if (excludedPrefixes.some(prefix => path.startsWith(prefix))) return false;
  
  if (search.includes('action=edit') || search.includes('action=history') || search.includes('diff=')) return false;
  
  if (document.body.classList.contains('page-Special_') || 
     (document.body.className.includes('ns-') && !document.body.className.includes('ns-0'))) {
    return false;
  }

  // Must have a real title
  const titleEl = document.querySelector('h1#firstHeading');
  return titleEl && titleEl.textContent.trim().length > 1;
}

function getPageTitle() {
  let titleElement = document.querySelector('h1#firstHeading') || document.querySelector('h1');
  let pageTitle = titleElement ? titleElement.textContent.trim() : '';

  if (!pageTitle || pageTitle.length < 3) {
    pageTitle = document.title
      .replace(/\s*[-–—]\s*(Wikipedia|Wikipédia|Wikimedia).*$/i, '')
      .replace(/\s*[-–—].*$/, '')
      .trim();
  }
  
  return pageTitle
    .replace(/\s*\([^)]+\)$/, '') // remove trailing (disambiguation)
    .replace(/\s+/g, ' ')        // normalize whitespace
    .trim();
}

function createGrokipediaLink() {
  if (!isWikipediaArticle()) return null;

  const pageTitle = getPageTitle();
  const grokTitle = pageTitle.replace(/ /g, '_');

  if (grokTitle) {
    const encodedTitle = encodeURIComponent(grokTitle);
    const grokipediaUrl = "https://grokipedia.com/page/" + encodedTitle;

    const grokLink = document.createElement("a");
    grokLink.className = 'npdd-link';
    grokLink.href = grokipediaUrl;
    grokLink.target = "_blank";
    grokLink.textContent = "See if this page is available on Grokipedia";
    
    return grokLink;
  }
  return null;
}

// Execution
NPDD.removeElements(CONFIG.bannerSelectors);

const extraElements = [];
const grokLink = createGrokipediaLink();
if (grokLink) extraElements.push(grokLink);

NPDD.createOverlay({
  ...CONFIG.financials,
  extraElements: extraElements
});