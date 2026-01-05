const WDD = {
  removeElements: (selectors) => {
    if (!selectors || !Array.isArray(selectors)) return;
    selectors.forEach(sel => {
      try {
        const elements = document.querySelectorAll(sel);
        elements.forEach(el => el.remove());
      } catch (e) {
        console.warn('[WDD] Error removing element:', sel, e);
      }
    });
  },

  createOverlay: (config) => {
    const { title, stats, sources, extraElements } = config;
    
    const div = document.createElement('div');
    div.className = 'wdd-overlay';
    
    const close = document.createElement('button');
    close.className = 'wdd-close-btn';
    close.innerHTML = '&times;';
    close.title = 'Close';
    close.onclick = () => div.remove();
    div.appendChild(close);
    
    const content = document.createElement('div');
    content.className = 'wdd-content';
    
    // Title
    if (title) {
        const titleDiv = document.createElement('div');
        titleDiv.className = 'wdd-title';
        titleDiv.innerHTML = title;
        content.appendChild(titleDiv);
    }
    
    // Stats
    if (stats) {
        const statsDiv = document.createElement('div');
        statsDiv.className = 'wdd-data';
        statsDiv.innerHTML = stats; 
        content.appendChild(statsDiv);
    }
    
    // Sources
    if (sources && sources.length) {
      const srcDiv = document.createElement('div');
      srcDiv.className = 'wdd-sources';
      srcDiv.innerHTML = 'Sources: ';
      
      sources.forEach((src, idx) => {
        const a = document.createElement('a');
        a.className = 'wdd-link';
        a.href = src.url;
        a.target = '_blank';
        a.textContent = src.text;
        srcDiv.appendChild(a);
        if (idx < sources.length - 1) {
          srcDiv.appendChild(document.createTextNode(', '));
        }
      });
      content.appendChild(srcDiv);
    }

    // Extra custom elements (like Grokipedia link)
    if (extraElements && Array.isArray(extraElements)) {
        const extraContainer = document.createElement('div');
        extraContainer.className = 'wdd-extra';
        extraElements.forEach(el => extraContainer.appendChild(el));
        content.appendChild(extraContainer);
    }
    
    div.appendChild(content);
    document.body.appendChild(div);
  }
};
