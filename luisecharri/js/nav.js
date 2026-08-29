(function () {
  var path = window.location.pathname;
  var page = path.split('/').pop() || '';

  function isActive(href) {
    if (href === '/') return page === '' || page === 'index.html';
    return page === href.replace(/^\//, '');
  }

  function link(href, label) {
    var active = isActive(href);
    var style = active
      ? 'color:var(--accent);font-weight:600;text-decoration:none;font-size:.9375rem;'
      : 'color:var(--ink);text-decoration:none;font-size:.9375rem;transition:color .15s;';
    var aria = active ? ' aria-current="page"' : '';
    return '<a href="' + href + '" style="' + style + '"' + aria + '>' + label + '</a>';
  }

  var navHTML = '<nav aria-label="Main navigation" style="position:sticky;top:0;z-index:50;background:var(--bg);border-bottom:1px solid var(--rule);">'
    + '<div class="container" style="display:flex;align-items:center;justify-content:space-between;height:64px;">'
      + '<a href="/" style="font-family:\'Fraunces\',Georgia,serif;font-weight:600;font-size:1.05rem;color:var(--ink);text-decoration:none;">Luis Echarri</a>'
      + '<div style="display:flex;align-items:center;gap:2rem;">'
        + link('/', 'Home')
        + link('/about', 'About')
        + link('/services', 'Services')
        + link('/work', 'Work')
        + '<a href="/contact" class="btn btn-primary">Get in Touch</a>'
      + '</div>'
    + '</div>'
  + '</nav>';

  document.currentScript.insertAdjacentHTML('afterend', navHTML);
})();
