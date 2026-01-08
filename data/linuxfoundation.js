const CONFIG = {
  financials: {
    title: 'Linux Foundation Financials (As of 2025)',

    stats: 'Revenue: <strong>$311 Million</strong> | Total Assets: <strong>$224 Million</strong> <br>' +
           'CEO Pay: <strong>$952,166</strong>' +
           '| Annual Spend on Linux Kernel: <strong>$8.4 Million</strong>',
    sources: [
      { text: 'IRS Form 990', url: 'https://projects.propublica.org/nonprofits/organizations/460503801' },
      { text: 'Annual Report', url: 'https://www.linuxfoundation.org/resources/publications/linux-foundation-annual-report-2025' }
    ]
  }
}

NPDD.createOverlay(
  CONFIG.financials
)