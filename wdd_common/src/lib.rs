use wasm_bindgen::prelude::*;
use wasm_bindgen::JsCast;
use web_sys::{Element, HtmlElement, NodeList};

fn set_styles(el: &Element, styles: &[(&str, &str)]) -> Result<(), JsValue> {
    let style = el.unchecked_ref::<HtmlElement>().style();
    for (prop, value) in styles {
        style.set_property(prop, value)?;
    }
    Ok(())
}

fn add_link_hover(link: &Element) -> Result<(), JsValue> {
    let link_clone_enter = link.clone();
    let enter_closure = Closure::<dyn Fn()>::new(move || {
        let _ = link_clone_enter
            .unchecked_ref::<HtmlElement>()
            .style()
            .set_property("color", "#4dabf7");
    });
    link.add_event_listener_with_callback("mouseenter", enter_closure.as_ref().unchecked_ref())?;
    enter_closure.forget();

    let link_clone_leave = link.clone();
    let leave_closure = Closure::<dyn Fn()>::new(move || {
        let _ = link_clone_leave
            .unchecked_ref::<HtmlElement>()
            .style()
            .set_property("color", "#a5d8ff");
    });
    link.add_event_listener_with_callback("mouseleave", leave_closure.as_ref().unchecked_ref())?;
    leave_closure.forget();

    Ok(())
}

#[wasm_bindgen]
pub fn display_financial_overlay(content_html: &str) -> Result<(), JsValue> {
    console_error_panic_hook::set_once();

    let window = web_sys::window().expect("should have a window");
    let document = window.document().expect("should have a document");

    let overlay = document.create_element("div")?;

    set_styles(&overlay, &[
        ("position", "fixed"),
        ("top", "16px"),
        ("left", "50%"),
        ("transform", "translateX(-50%)"),
        ("min-width", "420px"),
        ("max-width", "580px"),
        ("min-height", "72px"),
        ("background-color", "#2c2c2e"),
        ("color", "#e0e0e0"),
        ("border-radius", "10px"),
        ("box-shadow", "0 6px 24px rgba(0,0,0,0.5)"),
        ("z-index", "9999"),
        ("opacity", "0.96"),
        ("padding", "16px 20px 16px 20px"),
        ("font-family", "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"),
        ("font-size", "14px"),
        ("line-height", "1.45"),
        ("display", "flex"),
        ("align-items", "center"),
        ("justify-content", "center"),
        ("box-sizing", "border-box"),
    ])?;

    // Close button
    let close_btn = document.create_element("button")?;
    set_styles(&close_btn, &[
        ("position", "absolute"),
        ("top", "8px"),
        ("right", "10px"),
        ("background", "none"),
        ("border", "none"),
        ("color", "#aaa"),
        ("font-size", "18px"),
        ("font-weight", "bold"),
        ("cursor", "pointer"),
        ("padding", "4px 8px"),
        ("line-height", "1"),
        ("border-radius", "4px"),
    ])?;
    close_btn.set_inner_html("&times;");
    close_btn.set_attribute("title", "Close")?;

    let overlay_clone = overlay.clone();
    let close_closure = Closure::<dyn Fn()>::new(move || {
        overlay_clone.remove();
    });
    close_btn.add_event_listener_with_callback("click", close_closure.as_ref().unchecked_ref())?;
    close_closure.forget();

    overlay.append_child(&close_btn)?;

    // Content div
    let content = document.create_element("div")?;
    set_styles(&content, &[("text-align", "center")])?;
    content.set_inner_html(content_html);

    // Apply hover to all links in content
    let links: NodeList = content.query_selector_all("a")?;

    for i in 0..links.length() {
        if let Some(node) = links.item(i) {
            if let Some(link) = node.dyn_ref::<Element>() {
                let _ = add_link_hover(link);
            }
        }
    }

    overlay.append_child(&content)?;
    document
        .body()
        .expect("should have a body")
        .append_child(&overlay)?;

    Ok(())
}