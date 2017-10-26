//Слайдер сертификатов
$('.js-certificates__list').slick({
  infinite: true,
  speed: 300,
  slidesToShow: 3,
  slidesToScroll: 1,
  variableWidth: true,
  nextArrow: $('.certificates--next'),
  prevArrow: $('.certificates--prev'),
  responsive: [
    {
      breakpoint: 1200,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
        infinite: true,
        dots: false
      }
    },
    {
      breakpoint: 768,
      settings: {
        variableWidth: false,
        slidesToShow: 2,
        slidesToScroll: 1
      }
    },
    {
      breakpoint: 600,
      settings: {
        variableWidth: false,
        slidesToShow: 1,
        slidesToScroll: 1
      }
    }
    // You can unslick at a given breakpoint now by adding:
    // settings: "unslick"
    // instead of a settings object
  ]
});

//слайдер продуктов на стр products-card.html

$('.js-gallery__thumbs').slick({
  infinite: true,  
  speed: 300,
  slidesToShow: 6,
  slidesToScroll: 1,
  focusOnSelect: true,
  asNavFor: '.js-gallery__outter',
  nextArrow: $('.js-gallery__control-prev'),
  prevArrow:  $('.js-gallery__control-next'),
  responsive: [
    {
      breakpoint: 1200,
      settings: {
        slidesToShow: 4, 
      }
    },
    {
      breakpoint: 991,
      settings: {
        slidesToShow: 3, 
      }
    },
    {
      breakpoint: 768,  
      settings: {
        slidesToShow: 3, 
      }
    },
    {
      breakpoint: 468,
      settings: {
        slidesToShow: 1, 
        slidesToScroll: 1
      }
    }
  ]
});

$('.js-gallery__outter').slick({
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: false,
  fade: true,
  asNavFor: '.js-gallery__thumbs'
});


//слайдер продуктов на стр appointment.html

$('.js-gallery__clinics__thumbs').slick({
  infinite: true,  
  speed: 300,
  slidesToShow: 3,
  slidesToScroll: 1,
  focusOnSelect: true,
  asNavFor: '.js-gallery__clinics',
  nextArrow: $('.js-gallery__control-next'),
  prevArrow: $('.js-gallery__control-prev'),
  responsive: [
    {
      breakpoint: 468,
      settings: {
        slidesToShow: 1, 
        slidesToScroll: 1
      }
    }
  ]
});

$('.js-gallery__clinics').slick({
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: false,
  fade: true,
  asNavFor: '.js-gallery__clinics__thumbs'
});

//слайдер популярных товаров
$('.popular--right__list').slick( {
  infinite: true,
  speed: 300,
  slidesToShow: 3,
  slidesToScroll: 1,
  variableWidth: true,
  nextArrow: $('.popular--next'),
  prevArrow: $('.popular--prev'),
  responsive: [
    {
      breakpoint: 1200,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1
      }
    },
    {
      breakpoint: 769,
      settings: {
        variableWidth: false,
        slidesToShow: 1,
        slidesToScroll: 1
      }
    }
  ]
} );

//слайдер отзывов на главной странице
$('.reviews__list').slick({
  infinite: true,
  speed: 300,
  slidesToShow: 3,
  slidesToScroll: 1,
  variableWidth: true,
  nextArrow: $('.reviews--next'),
  prevArrow: $('.reviews--prev'),
  responsive: [
    {
      breakpoint: 1200,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1
      }
    },
    {
      breakpoint: 769,
      settings: {
        variableWidth: false,
        slidesToShow: 2,
        slidesToScroll: 1
      }
    },
    {
      breakpoint: 600,
      settings: {
        variableWidth: false,
        slidesToShow: 1,
        slidesToScroll: 1
      }
    }
  ]
});


//слайдер брэндов на главной странице

const configSliderBrands = {
  infinite: true,
  ots: false,
  speed: 300,
  slidesToShow: 4,
  slidesToScroll: 1,
  nextArrow: $('.brands--next'),
  prevArrow: $('.brands--prev'),
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
      }
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
      }
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        infinite: true
      }
    }
    // You can unslick at a given breakpoint now by adding:
    // settings: "unslick"
    // instead of a settings object
  ]
}

//Слайдер brands
$('.brands__list').slick( configSliderBrands );

const compaireModule = (function () {
  let init = () => {
    setUpListeners();
  }

  let windowWidth = $(window).width();
  let productsLenght = $('.js-compaire-products__list li').length;
  let productsTable = $('.compaire-products__table li');
  let productsBlock = $('.compaire-products');

  function sliderCompaire() {
    if (productsLenght > 4 || windowWidth < 992) {
      console.log( windowWidth );
      $('.compaire__control').show();
      $('.table-value-wrap').removeClass().addClass('js-compaire-products__item');
  
      let responsiveArr =  [{
          breakpoint: 991,
          settings: {
            slidesToShow: 3, 
            slidesToScroll: 1
          }
        }, {
          breakpoint: 768,
          settings: {
            slidesToShow: 2, 
            slidesToScroll: 1
          }
        }, {
          breakpoint: 480,
          settings: {
            slidesToShow: 1, 
            slidesToScroll: 1
          }
        }
      ]
  
      $('.js-compaire-products__list').slick({
        infinite: true,  
        speed: 300,
        slidesToShow: 4,
        slidesToScroll: 1,
        focusOnSelect: true,
        asNavFor: '.js-compaire-products__item',
        nextArrow: $('.js-compaire__control-next'),
        prevArrow: $('.js-compaire__control-prev'),
        responsive: responsiveArr
      });
  
      $('.js-compaire-products__item').slick({
        infinite: true,  
        speed: 300,
        slidesToShow: 4,
        slidesToScroll: 1,
        //variableWidth: true,
        focusOnSelect: true,      
        arrows: false,
        asNavFor: '.js-compaire-products__list', 
        responsive: responsiveArr
      });
    }
  }

  sliderCompaire();

  let setUpListeners = () => { }

  return {
    init
  }
})();

compaireModule.init();