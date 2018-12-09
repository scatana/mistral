module.exports = (req, res) => res.render('landing', {
  title: `${res.__('brand.name')} - ${res.__('brand.description')}, ${res.__('contact.city')}`,
  description: res.__('brand.service-description')
});
