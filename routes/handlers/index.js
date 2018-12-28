const sitemap = require('./sitemap');

function contact(req, res) {
  const data = {
    title: `${res.__('brand.name')} - ${res.__('routes.contact.title')}`,
    description: `${res.__('routes.contact.description')}`,
    headerTitle: res.__('routes.contact.title'),
    route: req.route // needed for the footer
  };

  res.render('contact', data);
}

function landing(req, res) {
  const data = {
    title: `${res.__('brand.name')} - ${res.__('brand.description')}, ${res.__('contact.city')}`,
    description: res.__('brand.service-description')
  };

  res.render('landing', data);
}

function services(req, res) {
  const data = {
    title: `${res.__('brand.name')} - ${res.__('routes.services.title')}`,
    description: `${res.__('routes.services.description')}`,
    headerTitle: res.__('routes.services.title'),
    route: req.route // needed for the footer
  };

  res.render('services', data);
}

function testimonials(req, res) {
  const data = {
    title: `${res.__('brand.name')} - ${res.__('routes.testimonials.title')}`,
    description: `${res.__('routes.testimonials.description')}`,
    headerTitle: res.__('routes.testimonials.title'),
    route: req.route // needed for the footer
  };

  res.render('testimonials', data);
}

module.exports = {
  contact,
  landing,
  services,
  sitemap,
  testimonials
}
