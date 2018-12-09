const express = require('express');
const router = express.Router();

router.use(require('./middleware/locale'));

router.get('/', (req, res) => res.render('landing', {
  title: `${res.__('brand.name')} - ${res.__('brand.description')}, ${res.__('contact.city')}`,
  description: res.__('brand.service-description')
}));

module.exports = router;
