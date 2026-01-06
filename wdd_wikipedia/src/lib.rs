use wasm_bindgen::prelude::*;
use wasm_bindgen::JsCast;
use web_sys::{window, HtmlElement};
use js_sys::{self, Reflect};
use regex::Regex;
use wdd_common::display_financial_overlay;

fn remove_banners() -> Result<(), JsValue> {
    let window = window().expect("should have a window");
    let document = window.document().expect("should have a document");

    if let Ok(Some(el)) = document.query_selector("div#siteNotice") {
        el.remove();
    }
    if let Ok(Some(el)) = document.query_selector("div#frb-inline") {
        el.remove();
    }
    Ok(())
}

fn is_wikipedia_article() -> Result<bool, JsValue> {
    let window = window().expect("should have a window");
    let document = window.document().expect("should have a document");

    // Primary: wgNamespaceNumber
    if let Ok(val) = Reflect::get(&window, &"wgNamespaceNumber".into()) {
        if let Some(num) = val.as_f64() {
            return Ok(num == 0.0);
        }
    }

    let location = window.location();
    let pathname = location.pathname()?;
    let search = location.search()?;

    if !pathname.contains("/wiki/") && !(pathname.contains("/w/index.php") && search.contains("title=")) {
        return Ok(false);
    }

    // Exclude non-articles
    if pathname.starts_with("/wiki/Special:")
        || pathname.starts_with("/wiki/Talk:")
        || pathname.starts_with("/wiki/User:")
        || pathname.starts_with("/wiki/Wikipedia:")
        || pathname.starts_with("/wiki/Template:")
        || pathname.starts_with("/wiki/Category:")
        || pathname.starts_with("/wiki/Help:")
        || pathname.starts_with("/wiki/File:")
        || search.contains("action=edit")
        || search.contains("action=history")
        || search.contains("diff=")
    {
        return Ok(false);
    }

    let body = document.body().expect("should have a body");
    let html_body: &HtmlElement = body.unchecked_ref();

    if html_body.class_list().contains("page-Special_") {
        return Ok(false);
    }
    let class_name = body.class_name();
    if class_name.contains("ns-") && !class_name.contains("ns-0") {
        return Ok(false);
    }

    if let Ok(Some(el)) = document.query_selector("h1#firstHeading") {
        if let Some(text) = el.text_content() {
            if text.trim().len() > 1 {
                return Ok(true);
            }
        }
    }

    Ok(false)
}

fn get_page_title() -> Result<String, JsValue> {
    let window = window().expect("should have a window");
    let document = window.document().expect("should have a document");
    let mut title = String::new();

    // Try #firstHeading
    if let Ok(Some(el)) = document.query_selector("h1#firstHeading") {
        if let Some(text) = el.text_content() {
            title = text.trim().to_string();
        }
    }

    // Fallback to any h1
    if title.len() < 3 {
        if let Ok(Some(el)) = document.query_selector("h1") {
            if let Some(text) = el.text_content() {
                title = text.trim().to_string();
            }
        }
    }

    // Fallback to document.title cleanup
    if title.len() < 3 {
        title = document.title();
        // Remove Wikipedia suffix
        let re1 = Regex::new(r"\s*[-–—]\s*(Wikipedia|Wikipédia|Wikimedia).*$")
            .map_err(|e| JsValue::from_str(&e.to_string()))?;
        title = re1.replace(&title, "").trim().to_string();

        // Remove any remaining dash suffix
        let re2 = Regex::new(r"\s*[-–—].*$")
            .map_err(|e| JsValue::from_str(&e.to_string()))?;
        title = re2.replace(&title, "").trim().to_string();
    }

    // Remove trailing (disambiguation)
    let disambig_re = Regex::new(r"\s*\([^)]+\)$")
        .map_err(|e| JsValue::from_str(&e.to_string()))?;
    title = disambig_re.replace(&title, "").trim().to_string();

    // Normalize whitespace
    title = title.split_whitespace().collect::<Vec<_>>().join(" ");

    Ok(title)
}

fn build_grok_link() -> Result<Option<String>, JsValue> {
    let title = get_page_title()?;
    if title.len() < 3 {
        return Ok(None);
    }
    let grok_title = title.replace(' ', "_");
    let encoded = js_sys::encode_uri_component(&grok_title);
    let url = format!("https://grokipedia.com/page/{}", encoded);

    let html = format!(
        r#"<div style="margin-top: 12px; font-size: 13px;">
            <a href="{}" target="_blank" style="color: #a5d8ff; text-decoration: none; border-bottom: 1px dotted #a5d8ff;">
                See if this page is available on Grokipedia
            </a>
        </div>"#,
        url
    );
    Ok(Some(html))
}

const BASE_HTML: &str = r#"
<div style="font-weight: 600; font-size: 15px; margin-bottom: 6px;">
    Wikimedia Foundation Financials (As of 2024)
</div>
<div style="margin-bottom: 4px;">
    Revenue: <strong>$185.4 Million</strong> | Total Assets: <strong>$286.8 Million</strong> <br>
    CEO Pay: <strong>$472,629</strong> | Wikipedia.org Hosting Cost: <strong>$3.1 Million</strong>
</div>
<div style="font-size: 13px; opacity: 0.9; margin-top: 12px;">
    Sources:
    <a href="https://projects.propublica.org/nonprofits/organizations/200049703" target="_blank" style="color: #a5d8ff; text-decoration: none; border-bottom: 1px dotted #a5d8ff;">IRS Form 990</a>,
    <a href="https://wikimediafoundation.org/annualreports/2023-2024-annual-report/" target="_blank" style="color: #a5d8ff; text-decoration: none; border-bottom: 1px dotted #a5d8ff;">Annual Report</a>
</div>
"#;

#[wasm_bindgen(start)]
pub fn run() -> Result<(), JsValue> {
    remove_banners()?;

    let mut html = BASE_HTML.to_string();

    if is_wikipedia_article()? {
        if let Some(grok_html) = build_grok_link()? {
            html.push_str(&grok_html);
        }
    }

    display_financial_overlay(&html)
}