const nodemailer = require('nodemailer');

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
    testimonials: require('../data/testimonials_' + res.getLocale() + '.json'),
    route: req.route // needed for the footer
  };

  res.render('testimonials', data);
}

function thanks(req, res) {
  const data = {
    headerTitle: res.__('strings.thank-you')
  };

  const MAIL_TRANSPORT_USER = process.env.MAIL_TRANSPORT_USER;
  const MAIL_TRANSPORT_SECRET = process.env.MAIL_TRANSPORT_SECRET;
  const r = /(https?|mailto|ftp):/;

  if (r.test(req.body.message)) {
      res.render('thanks', data);
  } else if (MAIL_TRANSPORT_USER && MAIL_TRANSPORT_SECRET) {
      const transporter = nodemailer.createTransport({
          service: 'Gmail',
          auth: {
              user: MAIL_TRANSPORT_USER,
              pass: MAIL_TRANSPORT_SECRET
          }
      });

      const mailOptions = {
          from: '"Impresii clienți" <impresii@valentinacatana.com>',
          to: 'valentina.catana@gmail.com',
          subject: 'Impresii clienți',
          html: '<b>' + req.body.name + '</b><p>' + req.body.message + '</p>'
      };

      transporter.sendMail(mailOptions, function (error, info) {});
  }

  res.render('thanks', data);
}

module.exports = {
  contact,
  landing,
  services,
  sitemap,
  testimonials,
  thanks
}
