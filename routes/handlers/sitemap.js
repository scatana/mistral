module.exports = (req, res) => {
  res.set('Content-Type', 'application/xml');
  res.send(`<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
  <url>
    <loc>https://www.valentinacatana.com/en/</loc>
    <xhtml:link
      rel="alternate"
      hreflang="fr"
      href="https://www.valentinacatana.com/fr/"/>
    <xhtml:link
      rel="alternate"
      hreflang="ro"
      href="https://www.valentinacatana.com/ro/"/>
    <xhtml:link
      rel="alternate"
      hreflang="en"
      href="https://www.valentinacatana.com/en/"/>
  </url>
  <url>
    <loc>https://www.valentinacatana.com/fr/</loc>
    <xhtml:link
      rel="alternate"
      hreflang="en"
      href="https://www.valentinacatana.com/en/"/>
    <xhtml:link
      rel="alternate"
      hreflang="ro"
      href="https://www.valentinacatana.com/ro/"/>
    <xhtml:link
      rel="alternate"
      hreflang="fr"
      href="https://www.valentinacatana.com/fr/"/>
  </url>
  <url>
    <loc>https://www.valentinacatana.com/ro/</loc>
    <xhtml:link
      rel="alternate"
      hreflang="en"
      href="https://www.valentinacatana.com/en/"/>
    <xhtml:link
      rel="alternate"
      hreflang="fr"
      href="https://www.valentinacatana.com/fr/"/>
    <xhtml:link
      rel="alternate"
      hreflang="ro"
      href="https://www.valentinacatana.com/ro/"/>
  </url>
</urlset>`);
};
