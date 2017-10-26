//sticky navigation 
const nav = document.querySelector('.js-nav');
const topOfNav = nav.offsetTop;
const burger = document.querySelector('.js-burger');
const menu = document.querySelector('.menu-left');
const searchIcon = document.querySelector('.menu__search');
const searchBlock = document.querySelector('.search-block');
const submenu = document.querySelector('.nav__submenu-wrap');
const close =  document.querySelector('.js-close');
const body = document.querySelector('body');

const modalCallback = document.querySelector('.js-modal-callback');
const callbackBtn = document.querySelector('.js-callback');
const modalOpen = document.querySelector('.modal-open');
const modalOverlay = document.querySelector('.modal-overlay');
const modalBackdrop = document.querySelector('.modal-backdrop');

const clearCard = document.querySelectorAll('.js-clear-card');
//const closeCardItem = document.querySelector('.modal__row');



function fadeIn(elem) {
  elem.style.display = "flex";
  requestAnimationFrame(() => elem.style.opacity = 1);
}

function fixNav() {

  if( window.innerWidth > 992 ) {

    if( window.scrollY >= topOfNav ) {
      document.body.style.paddingTop = nav.offsetHeight + 'px';
      document.body.classList.add('fixed-nav');
    } else {
      if (!menu.classList.contains('open')) {
        document.body.style.paddingTop = 0;      
        document.body.classList.remove('fixed-nav');
        document.body.classList.remove('open');
      }
    }
  }

}

window.addEventListener('scroll', fixNav);


//burger & left menu open


function burgerOpen() {
  this.classList.toggle('open');
  menu.classList.toggle('open');
  

  if(!burger.classList.contains('open')) {
    searchBlock.classList.remove('open');
    searchBlock.style.left = '';
    modalBackdrop.classList.remove('in');
    menu.classList.remove('open-serch-on-mobile');
  } 

}

burger.addEventListener('click', burgerOpen);

const menuWidth = menu.offsetWidth;

function showSearchBlock(e) {
  e.preventDefault();

  searchBlock.classList.toggle('open');

  if ( window.innerWidth < 481 ) {
    menu.classList.add('open-serch-on-mobile');
    searchBlock.style.left = '85px';
  } else {
    if( searchBlock.classList.contains('open') ) {
      searchBlock.style.left = `${menuWidth}px`;
      modalBackdrop.classList.add('in');
    } else {
      searchBlock.style.left = '';
      modalBackdrop.classList.remove('in');
    }
  }
  
}

searchIcon.addEventListener('click', showSearchBlock );

window.addEventListener("resize", function(){
  const menuWidth = menu.offsetWidth;
  if(burger.classList.contains('open')) {
    searchBlock.style.left = `${menuWidth}px`;
  }

  if( menu.classList.contains('open-serch-on-mobile') ) {
    searchBlock.style.left = `${ menuWidth - 190 }px`;
  }
});

function closeMenuAndSearch() {
  if(burger.classList.contains('open') || searchBlock.classList.contains('open')) {
    searchBlock.classList.remove('open');
    menu.classList.remove('open');
    burger.classList.remove('open');
    searchBlock.style.left = '';
    modalBackdrop.classList.remove('in');
  }
}

modalBackdrop.addEventListener('click', closeMenuAndSearch);

function showModal(e) {
  e.preventDefault();
  fadeIn(modalCallback);
  body.classList.add('modal-open');
}

callbackBtn.addEventListener('click', showModal);

function closeModal(parent) {
  const modalWrap = parent;
  
  if ( modalWrap.parentElement != null ) {
    modalWrap.style.display = "none";
    modalWrap.style.opacity = 0;
  }

  modalWrap.style.display = "none";
  requestAnimationFrame(() => modalWrap.style.opacity = 0);
  body.classList.remove('modal-open');
  
}

close.addEventListener('click', () => { closeModal( modalCallback ) });


clearCard.forEach( element => {

  element.addEventListener('click', function() { 
    const closeCardItem = this.parentElement.parentElement;
    closeModal(closeCardItem);
  });

});


$('.nav__submenu-wrap').hover(
  function() {
    $(this).siblings().css( "border-color", "var(--main-color)" );
  }, 
  function() {
    $(this).siblings().css( "border-color", "transparent" );
  }
);

//табы на странице products-card.html

function chekTabs() {
  $('.character-tabs__wrapp input').each((index, value) => {
    let val = $(value);
    
    
    if (val.is(':checked')) {
      let checkedInput = val.attr('id');
      $(`.${checkedInput}`).fadeIn();
    }
  });
}

chekTabs();


$('.character-tabs__wrapp').on('change', changeTabs);

function changeTabs(e) {
  let target = $(e.target);
  $('.character-tabs__content section').each( (index, value) => $(value).hide() );
  
  $('.character-tabs__wrapp input').each((index, value) => {
    let val = $(value);
    val.removeAttr('checked');
  });
  target.attr('checked', 'checked');  
  
  chekTabs();  
}


function carouselRightHeight() {
  $('.js-certificates--right').height($('.certificates__list').height());
  if($(window).width() > 768 ) {
    
    $('.js-carousel--right').height($('.reviews__list').height());
    
    $(window).resize(function(){
      $('.js-carousel--right').height($('.reviews__list').height());
      $('.js-certificates--right').height($('.certificates__list').height());
    });
  }
} 
carouselRightHeight();

$(window).resize(function(){
  carouselRightHeight();
  insertAfter();
});

function insertAfter() {
  if ($(window).width() < 769 ) {
    $('.product-card__right').insertAfter('.gallery');
  } else {
    $('.product-card__right').insertAfter('.product-card__left')
  }
};
insertAfter();

//

