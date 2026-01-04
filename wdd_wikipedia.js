// Remove Wikimedia donation banners
var banner1 = document.querySelector('div#siteNotice');
if (banner1) banner1.remove();

var banner2 = document.querySelector('div#frb-inline');
if (banner2) banner2.remove();

// Show true Wikimedia financials
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
  opacity:         "0.96",
  padding:         "16px 20px 16px 20px",
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

// Display the true financial data
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
  '<div style="font-size: 13px; opacity: 0.9;">' +
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

// Hover effect for links
content.querySelectorAll('a').forEach(a => {
  a.onmouseenter = () => { a.style.color = "#4dabf7"; };
  a.onmouseleave = () => { a.style.color = "#a5d8ff"; };
});

wdd_div.appendChild(content);
document.body.appendChild(wdd_div);