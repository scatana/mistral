const sitemap = require('./sitemap');

function contact(req, res) {
  res.render('contact');
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
    route: req.route
  }

  res.render('services', data);
}

function testimonials(req, res) {
  res.render('testimonials');
}

module.exports = {
  contact,
  landing,
  services,
  sitemap,
  testimonials
}
