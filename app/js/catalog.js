$( function() {
  $( "#slider-range" ).slider({
    range: true,
    min: 0,
    max: 1700,
    values: [ 300, 1700 ],
    slide: function( event, ui ) {
      $( "#amount" ).val( `Цена: от ${ui.values[ 0 ]}  до ${ui.values[ 1 ]} руб.` );
    }
  });
  $( "#amount" ).val( `Цена: от ${$( "#slider-range" ).slider( "values", 0 )} 
    до ${$( "#slider-range" ).slider( "values", 1 )} руб.` );
} );
// $('.js-filter-section__row-toggle').toggleClass('open');  
$('.js-filter-section__toggle').on('click', (e) => { 
   $(e.target).closest('.js-filter-section__row-toggle')
    .toggleClass('open')
    .toggleClass('close');

});


$('.js-filter-section__filters').on('click', 'a[data-toggle]', toggleFilter)

function toggleFilter(e) {
  e.preventDefault();
  $(this).toggleClass('open');    
}


if ( $(window).width() < 992 ) {
  $('.js-filter-section__row-toggle').addClass('close').removeClass('open');
  
}
