use wasm_bindgen::prelude::*;
use wdd_common::display_financial_overlay;

const HTML: &str = r#"
<div style="font-weight: 600; font-size: 15px; margin-bottom: 6px;">
    <strong>Mozilla Financials (As of 2024)</strong>
</div>
<div style="margin-bottom: 4px;">
    Revenue: <strong>$653 Million</strong> | Total Assets: <strong>$1.4 Billion</strong> <br>
    CEO Pay: <strong>$6.2 Million</strong>
</div>
<div style="font-size: 13px; opacity: 0.9;">
    Sources:
    <a href="https://assets.mozilla.net/annualreport/2024/b200-mozilla-foundation-form-990-public-disclosure-ty23.pdf" target="_blank" style="color: #a5d8ff; text-decoration: none; border-bottom: 1px dotted #a5d8ff;">IRS Form 990</a>,
    <a href="https://assets.mozilla.net/annualreport/2024/mozilla-fdn-2023-fs-final-short-1209.pdf" target="_blank" style="color: #a5d8ff; text-decoration: none; border-bottom: 1px dotted #a5d8ff;">Annual Report</a>
</div>
"#;

#[wasm_bindgen(start)]
pub fn run() -> Result<(), JsValue> {
    console_error_panic_hook::set_once();
    display_financial_overlay(HTML)
}