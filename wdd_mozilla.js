// Show true Mozilla financials
var wdd_div = document.createElement("div");
Object.assign(wdd_div.style, {
  position:        "fixed",
  top:             "16px",
  left:            "50%",
  transform:       "translateX(-50%)",         // true horizontal centering
  minWidth:        "420px",
  maxWidth:        "580px",
  minHeight:       "72px",
  backgroundColor: "#2c2c2e",                   // classy dark grey / near-black
  color:           "#e0e0e0",                   // light text
  borderRadius:    "10px",
  boxShadow:       "0 6px 24px rgba(0,0,0,0.5)",
  zIndex:          "9999",
  opacity:         "0.98",
  padding:         "32px 20px 16px 20px",
  fontFamily:      "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
  fontSize:        "14px",
  lineHeight:      "1.45",
  display:         "flex",
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

// Display the true financial data
var content = document.createElement("div");
content.style.textAlign = "center";
content.innerHTML = 
  '<div style="font-weight: 600; font-size: 15px; margin-bottom: 6px;">' +
    '<strong>Mozilla Financials (As of 2024)</strong>' +
  '</div>' +
  '<div style="margin-bottom: 4px;">' +
    'Revenue: <strong>$653 Million</strong> ' +
    '| Total Assets: <strong>$1.4 Billion</strong> <br>' +
    'CEO Pay: <strong>$6.2 Million</strong></strong>' +
  '</div>' +
  '<div style="font-size: 13px; opacity: 0.9;">' +
    'Sources: ' +
    '<a href="https://assets.mozilla.net/annualreport/2024/b200-mozilla-foundation-form-990-public-disclosure-ty23.pdf" ' +
       'target="_blank" ' +
       'style="color: #a5d8ff; text-decoration: none; border-bottom: 1px dotted #a5d8ff;">' +
       'IRS Form 990' +
    '</a>, ' +
    '<a href="https://assets.mozilla.net/annualreport/2024/mozilla-fdn-2023-fs-final-short-1209.pdf" ' +
       'target="_blank" ' +
       'style="color: #a5d8ff; text-decoration: none; border-bottom: 1px dotted #a5d8ff;">' +
       'Annual Report' +
    '</a>' +
  '</div>';

// Hover effect for links
content.querySelectorAll('a').forEach(a => {
  a.onmouseenter = () => { a.style.color = "#4dabf7"; };
  a.onmouseleave = () => { a.style.color = "#a5d8ff"; };
});

wdd_div.appendChild(content);

// Apply initial theme
applyTheme(currentTheme);

document.body.appendChild(wdd_div);