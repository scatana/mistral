module.exports = (req, res) => res.render('services-rates', {
  title: `${res.__('brand.name')} - ${res.__('ui.nav-menu.services-rates')}`,
  description: `${res.__('routes.services-rates.description')}`
});
