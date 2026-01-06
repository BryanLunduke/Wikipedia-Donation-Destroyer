const DD = {
  removeElements: (selectors) => {
    if (!selectors || !Array.isArray(selectors)) return;
    selectors.forEach(sel => {
      try {
        const elements = document.querySelectorAll(sel);
        elements.forEach(el => el.remove());
      } catch (e) {
        console.warn('[DD] Error removing element:', sel, e);
      }
    });
  },

  createOverlay: (config) => {
    const { title, stats, sources, extraElements } = config;
    
    const div = document.createElement('div');
    div.className = 'dd-overlay';
    
    const close = document.createElement('button');
    close.className = 'dd-close-btn';
    close.innerHTML = '&times;';
    close.title = 'Close';
    close.onclick = () => div.remove();
    div.appendChild(close);
    
    const content = document.createElement('div');
    content.className = 'dd-content';
    
    // Title
    if (title) {
        const titleDiv = document.createElement('div');
        titleDiv.className = 'dd-title';
        titleDiv.innerHTML = title;
        content.appendChild(titleDiv);
    }
    
    // Stats
    if (stats) {
        const statsDiv = document.createElement('div');
        statsDiv.className = 'dd-data';
        statsDiv.innerHTML = stats; 
        content.appendChild(statsDiv);
    }
    
    // Sources
    if (sources && sources.length) {
      const srcDiv = document.createElement('div');
      srcDiv.className = 'dd-sources';
      srcDiv.innerHTML = 'Sources: ';
      
      sources.forEach((src, idx) => {
        const a = document.createElement('a');
        a.className = 'dd-link';
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
        extraContainer.className = 'dd-extra';
        extraElements.forEach(el => extraContainer.appendChild(el));
        content.appendChild(extraContainer);
    }
    
    div.appendChild(content);
    document.body.appendChild(div);
  }
};
