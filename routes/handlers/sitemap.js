module.exports = (req, res) => {
  const base = "https://www.valentinacatana.com";
  const locales = res.getLocales();
  const routes = res.__('routes');

  let output = '<?xml version="1.0" encoding="UTF-8"?>\n';
  output += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n';

  locales.forEach(locale => {
    output += '<url>\n';
    output += `<loc>${base}/${locale}</loc>\n`;

    locales.forEach(loc => {
      output += `<xhtml:link rel="alternate" hreflang="${loc}" href="${base}/${loc}"/>\n`;
    });

    output += '</url>\n';
  });

  locales.forEach(locale => {
    for (route in routes) {
      if (routes[route]._type === 'get') {
        output += '<url>\n';
        output += `<loc>${base}/${locale}/${res.__({ phrase: 'routes.' + route + '.path', locale })}</loc>\n`;

        locales.forEach(loc => {
          output += `<xhtml:link rel="alternate" hreflang="${loc}" href="${base}/${loc}/${res.__({ phrase: 'routes.' + route + '.path', locale: loc })}"/>\n`;
        });

        output += '</url>\n';
      }
    }
  });

  output += '</urlset>\n';

  res.set('Content-Type', 'application/xml');
  res.send(output);
};
