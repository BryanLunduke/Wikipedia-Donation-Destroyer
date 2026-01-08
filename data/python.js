const CONFIG = {
  financials: {
    title: 'Python Software Foundation Financials (As of 2024)',
    stats:  'Revenue: <strong>$4 Million</strong> ' +
    '| Total Assets: <strong>$3.3 Million</strong> <br>' +
    'Expenses: <strong>$5.7 Million</strong> ' +
    '| Executive Director Pay: <strong>$145k</strong> <br>' +  'Declined ' +  '</a> to continue DEI policies.' , 
    sources: [
      { text: '1 Million Grant', url: 'https://x.com/LundukeJournal/status/1982993216476524910' },
      { text: 'IRS Form 990', url: 'https://projects.propublica.org/nonprofits/organizations/43594598' },
      { text: 'Annual Reports', url: 'https://www.python.org/psf/records/' }, 
    ]
  }
}

NPDD.createOverlay(
  CONFIG.financials
)