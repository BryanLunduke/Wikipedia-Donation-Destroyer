const CONFIG = {
  financials: {
    title: 'Internet Archive Financials (As of 2024)',
    stats: 'Revenue: <strong>$26.8 Million</strong> ' +
    '| Total Assets: <strong>$10.7 Million</strong> <br>',
    sources: [
      { text: 'IRS Form 990', url: 'https://projects.propublica.org/nonprofits/organizations/943242767' },
    ]
  }
}

NPDD.createOverlay(
  CONFIG.financials
)