module.exports = (req, res) => res.render('services-rates', {
  title: `${res.__('brand.name')} - ${res.__('routes.services-rates.title')}`,
  description: `${res.__('routes.services-rates.description')}`
});
