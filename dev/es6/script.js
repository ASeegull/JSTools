(function () {
  
  'use strict';

  function preventSubmit(event) {
    event.preventDefault();
  }

  let submit = document.querySelector('input[type=submit]');
  submit.addEventListener('click', preventSubmit, false);

  console.log('ta daaaam');
  
})();