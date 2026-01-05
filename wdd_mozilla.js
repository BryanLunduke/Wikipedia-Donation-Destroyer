const CONFIG = {
  financials: {
    title: 'Mozilla Financials (As of 2024)',
    stats: 'Revenue: <strong>$653 Million</strong> | Total Assets: <strong>$1.4 Billion</strong> <br>' +
           'CEO Pay: <strong>$6.2 Million</strong>',
    sources: [
      { text: 'IRS Form 990', url: 'https://assets.mozilla.net/annualreport/2024/b200-mozilla-foundation-form-990-public-disclosure-ty23.pdf' },
      { text: 'Annual Report', url: 'https://assets.mozilla.net/annualreport/2024/mozilla-fdn-2023-fs-final-short-1209.pdf' }
    ]
  }
};

WDD.createOverlay(CONFIG.financials);
