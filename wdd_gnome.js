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
    '<strong> GNOME Foundation Financials (As of 2024) </strong>' +
  '</div>' +
  '<div style="margin-bottom: 4px;">' +
    'Total Assets: <strong>$1.1M Million</strong>' +
    '| Expenses: <strong>$1.68 Million</strong> <br> Total Liablilities $61.4K ' +
  '</div>' +
  '<div style="font-size: 13px; opacity: 0.9;">' +
    'Sources: ' +
    '<a href="https://projects.propublica.org/nonprofits/organizations/43572618" ' +
       'target="_blank" ' +
       'style="color: #a5d8ff; text-decoration: none; border-bottom: 1px dotted #a5d8ff;">' +
       'Project Propublica' +
    '</a>, ' +
    '<a href="https://foundation.gnome.org/reports/2023-2024-annual-report" ' +
       'target="_blank" ' +
       'style="color: #a5d8ff; text-decoration: none; border-bottom: 1px dotted #a5d8ff;">' +
       'GNOME Foundation Annual Report' +
    '</a>, ' +
  '</div>';

// Hover effect for links
content.querySelectorAll('a').forEach(a => {
  a.onmouseenter = () => { a.style.color = "#4dabf7"; };
  a.onmouseleave = () => { a.style.color = "#a5d8ff"; };
});

wdd_div.appendChild(content);
document.body.appendChild(wdd_div);