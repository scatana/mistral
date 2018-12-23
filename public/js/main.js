$(function () {
  'use strict'

  $('[data-toggle="offcanvas"]').on('click', function () {
    $('.offcanvas-collapse').toggleClass('open')
  })

  let offsetY = 0;
  let $navbar = $(".navbar");

  $(window).scroll(function(){
    offsetY = $(window).scrollTop();

    if( offsetY > 0 ){
      $navbar.css({'box-shadow':'0 0 5px #ccc'});
    } else {
      $navbar.css({'box-shadow':'none'});
    }
  });
});
