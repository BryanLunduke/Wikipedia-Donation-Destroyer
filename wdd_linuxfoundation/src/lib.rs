use wasm_bindgen::prelude::*;
use wdd_common::display_financial_overlay;

const HTML: &str = r#"
<div style="font-weight: 600; font-size: 15px; margin-bottom: 6px;">
    <strong>Linux Foundation Financials (As of 2025)</strong>
</div>
<div style="margin-bottom: 4px;">
    Revenue: <strong>$311 Million</strong> | Total Assets: <strong>$224 Million</strong> <br>
    CEO Pay: <strong>$952,166</strong> | Annual Spend on Linux Kernel: <strong>$8.4 Million</strong>
</div>
<div style="font-size: 13px; opacity: 0.9;">
    Sources:
    <a href="https://projects.propublica.org/nonprofits/organizations/460503801" target="_blank" style="color: #a5d8ff; text-decoration: none; border-bottom: 1px dotted #a5d8ff;">IRS Form 990</a>,
    <a href="https://www.linuxfoundation.org/resources/publications/linux-foundation-annual-report-2025" target="_blank" style="color: #a5d8ff; text-decoration: none; border-bottom: 1px dotted #a5d8ff;">Annual Report</a>
</div>
"#;

#[wasm_bindgen(start)]
pub fn run() -> Result<(), JsValue> {
    console_error_panic_hook::set_once();
    display_financial_overlay(HTML)
}