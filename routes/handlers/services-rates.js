module.exports = (req, res) => res.render('services-rates', {
  title: `${res.__('brand.name')} - ${res.__('content.services-rates')}`,
  description: `${res.__('routes.services-rates.description')}`
});
