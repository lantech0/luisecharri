(function () {
  var path = window.location.pathname.replace(/\/$/, '');
  var page = path.split('/').pop() || '';

  function isActive(href) {
    if (href === '/') return page === '' || page === 'index.html';
    return page === href.replace(/^\//, '');
  }

  function link(href, label, opts) {
    opts = opts || {};
    var active = isActive(href);
    var aria = active ? ' aria-current="page"' : '';
    if (opts.button) {
      var btnStyle = 'text-decoration:none;' + (active ? 'box-shadow:0 0 0 2px var(--ink);' : '');
      return '<a href="' + href + '" class="btn btn-primary" style="' + btnStyle + '"' + aria + '>' + label + '</a>';
    }
    var style = active
      ? 'color:var(--accent-text);font-weight:600;text-decoration:none;font-size:.9375rem;'
      : 'color:var(--ink);text-decoration:none;font-size:.9375rem;transition:color .15s;';
    return '<a href="' + href + '" style="' + style + '"' + aria + '>' + label + '</a>';
  }

  var navHTML = '<nav aria-label="Main navigation" style="position:sticky;top:0;z-index:50;background:var(--bg);border-bottom:1px solid var(--rule);">'
    + '<div class="container nav-inner">'
      + '<a href="/" style="font-family:\'Fraunces\',Georgia,serif;font-weight:600;font-size:1.05rem;color:var(--ink);text-decoration:none;">Luis Echarri</a>'
      + '<div class="nav-links">'
        + link('/', 'Home')
        + link('/about', 'About')
        + link('/services', 'Services')
        + link('/work', 'Work')
        + link('/contact', 'Get in Touch', { button: true })
      + '</div>'
    + '</div>'
  + '</nav>';

  document.currentScript.insertAdjacentHTML('afterend', navHTML);
})();
