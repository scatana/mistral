const express = require('express');
const router = express.Router();

// redirect based on the detected locale
router.get('/', function (req, res) {
    res.redirect(303, '/' + req.getLocale());
});

// Google site verification
router.get('/googleac28af5e7ded36ba.html', function (req, res) {
    res.send('google-site-verification: googleac28af5e7ded36ba.html');
});

// Sitemap
router.get('/sitemap.xml', function (req, res) {
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
        </urlset>
    `);
});

module.exports = router;
