$(function () {
  'use strict'

  let offsetY = 0;
  let $navbar = $('.navbar');
  let $navpanel = $('.offcanvas-collapse');

  $('[data-toggle="offcanvas"]').on('click', function () {
    $navpanel.toggleClass('open');
    updateNavbar();
  })

  function updateNavbar() {
    offsetY = $(window).scrollTop();

    if (offsetY > 0 || $navpanel.hasClass('open')) {
      $navbar.css({'background':'#fff', 'box-shadow':'0 0 5px #555'});
      $navbar.removeClass('navbar-dark').addClass('navbar-light');
    } else {
      $navbar.css({'background':'transparent', 'box-shadow':'none'});
      $navbar.removeClass('navbar-light').addClass('navbar-dark');
    }
  }
  updateNavbar();

  $(window).scroll(updateNavbar);
});
