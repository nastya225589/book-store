svg4everybody(); // иницализация полифила для IE

$(document).ready(function(){
  $('#main-nav__toggle').on('click', function() {
    $('#main-nav').toggleClass('main-nav--open');
  });

  $("[data-main-nav]").hide();
  $('#main-nav__toggle').on('click', function(){
    $('[data-main-nav]').slideToggle(250);
    return false;
  });

});

// Если на проекте нет jQuery, но хочется $( document ).ready... (IE9+)
// function ready(fn) {
//   if (document.attachEvent ? document.readyState === "complete" : document.readyState !== "loading"){
//     fn();
//   } else {
//     document.addEventListener('DOMContentLoaded', fn);
//   }
// }
//
// ready(function(){
//   // code
// });
