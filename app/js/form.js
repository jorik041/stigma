const formModule = (function(){
  const init = function() {
    setupListeners();
  }
  
  
  //переменные
  const form = document.querySelector('.js-form');
  const submit = document.querySelector('.js-bottom');
  const input = document.querySelectorAll('.js-form input');
  const clearInput = document.querySelectorAll('.js-clear');
  const phone = document.getElementById('phone');
  const textarea = document.querySelector('textarea');

  const setupListeners = function() {
    form.addEventListener('submit', submitForm);
  }

  textarea.onblur = function() {
    if (this.value) { 
      this.classList.add("uses");
    } else {
      this.classList.remove('uses');
    }
  };

  input.forEach(( input, ndx) => {
    input.addEventListener('blur', function() {

      if (this.value) { 
        this.classList.add("uses");
      } else {
        this.classList.remove('uses');
      }

      if (!this.value) { 
        
        this.classList.add("error");
        this.parentNode.nextElementSibling.classList.add('show_msg');
      } else if ( isNaN(this.value) && this.getAttribute('name') === 'phone') {
        this.value = ' ';
        this.classList.add("error");
        this.parentNode.nextElementSibling.innerHTML = 'Вы ввели не число. Исправьте, пожалуйста.';
        this.parentNode.nextElementSibling.classList.add('show_msg');
      }
  
    
    });

    input.addEventListener('focus', function() {
      if (this.className == 'error') { // сбросить состояние "ошибка", если оно есть
        this.className = "";
        this.parentNode.nextElementSibling.classList.remove('show_msg');
      }
    });

  });

  clearInput.forEach( clear => {
    clear.addEventListener('click', function () {

      if(!input.value) {
        this.previousElementSibling.classList.remove('error');
        this.parentNode.nextElementSibling.innerHTML = ' ';
      }
 
    }) 
  });

  // ф-ция с помощью регулярногшо выражения проверяет валидность номера
  function isValidPhone(myPhone) {
    var re = /^\d[\d\(\)\ -]{4,14}\d$/;
    return re.test(myPhone);
  }

  function submitForm(e) {
    
    input.forEach(( input, ndx) => {
      
      if(!input.value) {
        input.classList.add("error");
        input.parentNode.nextElementSibling.classList.add('show_msg');
      } else if( !isValidPhone(phone) ) {
        phone.value = ' ';
        phone.classList.add("error");
        phone.parentNode.nextElementSibling.innerHTML = 'Вы ввели не корректный номер телефона. Исправьте, пожалуйста.';
        phone.parentNode.nextElementSibling.classList.add('show_msg');
      }
    });
      
    e.preventDefault();
  }

  return {
    init
  }
})();
formModule.init();

// Iterate over each select element
$('select').each(function () {
  
  // Cache the number of options
  var $this = $(this),
      numberOfOptions = $(this).children('option').length,
      firstOption = $(this).children('.placeholder').text();
  
  // Hides the select element
  $this.addClass('s-hidden');

  // Wrap the select element in a div
  $this.wrap('<div class="select"></div>');

  // Insert a styled div to sit over the top of the hidden select element
  $this.after('<div class="styledSelect"></div>');

  // Cache the styled div
  var $styledSelect = $this.next('div.styledSelect');

  // Show the first select option in the styled div
  $styledSelect.html( `<div class="placeholder">${firstOption}</div>` );
  $styledSelect.append( '<div class="selected__option"></div>' );

  const selectedOption = $styledSelect.children('div.selected__option');
  
  // Insert an unordered list after the styled div and also cache the list
  var $list = $('<ul />', {
      'class': 'options'
  }).insertAfter($styledSelect);

  // Insert a list item into the unordered list for each select option
  for (var i = 0; i < numberOfOptions; i++) {
      $('<li />', {
          text: $this.children('option').eq(i).text(),
          rel: $this.children('option').eq(i).val()
      }).appendTo($list);
  }

  // Cache the list items
  var $listItems = $list.children('li');

  // Show the unordered list when the styled div is clicked (also hides it if the div is clicked again)
  $styledSelect.click(function (e) {
      e.stopPropagation();
      // $('div.styledSelect.active').each(function () {
      //   $(this).removeClass('active').next('ul.options').hide();
      // });
      $(this).toggleClass('active').next('ul.options').toggle();

  });

  // Hides the unordered list when a list item is clicked and updates the styled div to show the selected list item
  // Updates the select element to have the value of the equivalent option
  $listItems.click(function (e) {
      e.stopPropagation();

      selectedOption.text($(this).text()).removeClass('active');

      $styledSelect.addClass('selected');
      $this.val($(this).attr('rel'));
      $list.hide();
      /* alert($this.val()); Uncomment this for demonstration! */
  });

  // Hides the unordered list when clicking outside of it
  $(document).click(function () {
      $styledSelect.removeClass('active');
      $list.hide();
  });
  
  });