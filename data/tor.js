const CONFIG = {
  financials: {
    title: 'Tor Project Financials (As of 2024)',
    stats:  'Revenue: <strong>$7.2 Million</strong> ' +
    '| Total Assets: <strong>$6.6 Million</strong> <br>' +
    'Executive Director Pay: <strong>$173,648</strong>' ,
    sources: [
      { text: 'IRS Form 990', url: 'https://projects.propublica.org/nonprofits/organizations/208096820' },
    ]
  }
}

NPDD.createOverlay(
  CONFIG.financials
)