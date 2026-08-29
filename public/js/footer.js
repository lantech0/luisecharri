(function () {
  var footerHTML = '<footer style="border-top:1px solid var(--rule);padding:2.5rem 0;margin-top:4rem;">'
    + '<div class="container" style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:1rem;">'
      + '<span style="font-size:.875rem;color:var(--ink);opacity:.7;">&copy; ' + new Date().getFullYear() + ' Luis Echarri</span>'
      + '<div style="display:flex;flex-wrap:wrap;gap:1rem 1.5rem;">'
        + '<a href="/" style="font-size:.875rem;color:var(--ink);text-decoration:none;">Home</a>'
        + '<a href="/about" style="font-size:.875rem;color:var(--ink);text-decoration:none;">About</a>'
        + '<a href="/services" style="font-size:.875rem;color:var(--ink);text-decoration:none;">Services</a>'
        + '<a href="/work" style="font-size:.875rem;color:var(--ink);text-decoration:none;">Work</a>'
        + '<a href="/contact" style="font-size:.875rem;color:var(--ink);text-decoration:none;">Contact</a>'
      + '</div>'
    + '</div>'
  + '</footer>';

  document.currentScript.insertAdjacentHTML('afterend', footerHTML);
})();
