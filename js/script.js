/******************************************
Treehouse Techdegree:
FSJS project 3 - Interactive form
******************************************/


function isValid() {



}

/* function to set the initial status of the page: focus, field to show/hide,
span for handling errors to create, initialize variables*/
function setPage() {
  // set focus on the first text field
  $("#name").focus();
  //hide the text field for the other-title jobs
  $('#other-title').hide();

  //select credit card as default payment method
  $("#payment option[value='credit card']").attr('selected', true);
  //remove select_method from payment method
  $("#payment option[value='select_method']").remove();
  //hide paypal and bitcoin tags
  $('div p').hide();

  /*create span (and immediately hide it) element to display tip
  for the user on how to compile the name correctly*/
  $("#name").after("<span id='nameValidation'>Name must cointain at least one character</span>");
  $('#nameValidation').hide();

  /*create span (and immediately hide it) element to display tip
  for the user on how to compile the email correctly*/
  $("#mail").after("<span id='emailValidation'>Email should be a valid email address</span>");
  $('#emailValidation').hide();

  /*create span (and immediately hide it) element to display the running total
  for the selected activities*/
  $(".activities").append("<span id='total'>Your total cost is: " + total + "</span>");
  $('#total').show();

  /*create span (and immediately hide it) element to display tip
  for the user on how to select checkboxes*/
  $(".activities").append("<span id='courseValidation'>At least one seminar must be selected</span>");
  $('#courseValidation').hide();


  /*create 3 span to handle cc errore on different elements */
  $("#cc-num").after("<span id='ccValidation'></span>");
  $('#ccValidation').hide();

  $("#zip").after("<span id='zipValidation'></span>");
  $('#zipValidation').hide();

  $("#cvv").after("<span id='cvvValidation'></span>");
  $('#cvvValidation').hide();

  //Initially hide color label and dropdown menu
  $('#colors-js-puns label:eq(0)').hide();
  $('#color').hide();
}


/* function to check if the selected job role is other and, in that case,
the other input must be shown */
function checkJobRole () {

  $('#title').change(function() {
    let selectedJob = $(this).children("option:selected").val();
    if (selectedJob === 'other') {
      $('#other-title').show()
    } else {
      $('#other-title').hide()
    }

  });
}


/*function to dynamically check if the user is giving a valid name
(no empty and no whitespaces) */
function validateName () {
  $('#name').on('input', function validate() {
    //check if input name is empty or just white spaces
    let checkInputName = /^\s*$/.test($('#name').val());
    if(checkInputName === true) {
      $('#nameValidation').show();
      //make the border red if input is wrong
      $('#name').css('border-color', '#cc0000');
      $('#name').addClass('error');
    } else {
      $('#nameValidation').hide();
      //make the border standard if input is right
      $('#name').css('border-color', '');
      $('#name').removeClass('error');
    }
  });
}


/*function to dynamically check if the user is giving a valid email
(no empty and no whitespaces) */
function validateEmail () {
  $('#mail').on('input', function validate() {
    //check if email address is valid (kept it simple)
    let checkInputEmail = /^[^@]+@[^@.]+\.[a-z]+$/i.test($('#mail').val());
    if(checkInputEmail === false) {
      $('#emailValidation').show();
      //make the border red if input is wrong
      $('#mail').css('border-color', '#cc0000');
    } else {
      $('#emailValidation').hide();
      //make the border standard if input is right
      $('#mail').css('border-color', '');
    }
  });
}



function selectShirtColor() {
  //listen for user selection of shirt design and hide/display colors accordingly
  $('#design').change(function() {
    //show color label and dropdown menu
    $('#colors-js-puns label:eq(0)').show();
    $('#color').show();
    //get the value of the shirt selected by the user
    let selectedShirt = $(this).children("option:selected").val();
    $('#design option:eq(0)').hide();
    //display/hide the respective colors
    if (selectedShirt === 'js puns') {
      //hide and show the colors for the respective design
      $('#colors-js-puns option:eq(0), #colors-js-puns option:eq(1), #colors-js-puns option:eq(2)').show();
      $('#colors-js-puns option:eq(3), #colors-js-puns option:eq(4), #colors-js-puns option:eq(5)').hide();
      //auto select the first color
      $("#color option[selected]").attr('selected', false);
      $("#color option[value='cornflowerblue']").attr('selected', true);

    } else if (selectedShirt === 'heart js') {
      //hide and show the colors for the respective design
      $('#colors-js-puns option:eq(3), #colors-js-puns option:eq(4), #colors-js-puns option:eq(5)').show();
      $('#colors-js-puns option:eq(0), #colors-js-puns option:eq(1), #colors-js-puns option:eq(2)').hide();
      //auto select the first color
      $("#color option[selected]").attr('selected', false);
      $("#color option[value='steelblue']").attr('selected', true);
    }
  });
}


//function to enable/disable a single checkbox based on his current status
function toggleDisable(inputCheckbox) {
  //check if checkbox is disabled and enable it
  if (inputCheckbox.prop("disabled") === true) {
      inputCheckbox.attr("disabled", false);
  }
  //check if checkbox is enabled and disable it
  else {
    inputCheckbox.attr("disabled", true);
  }
}


//function to enable/disable conflicting checkboxes based on user selection
function toggleCheckbox (name) {
  //check which checkbox was selected and toggle the conflicting one
  if (name == 'js-frameworks') {
    toggleDisable($("input[name*='express']"));
  }
  else if (name == 'express') {
    toggleDisable($("input[name*='js-frameworks']"));
  }
  else if (name == 'js-libs') {
    toggleDisable($("input[name*='node']"));
  }
  else if (name == 'node') {
    toggleDisable($("input[name*='js-libs']"));
  }
}


//function to manage checkboxes, total costs selected for the user and conflicting option
function manageCheboxes() {
  //get if a checkbox is checked/unchecked
  $('.activities input').click(function(){
    //call the function to check if at least one checkbox is checked
    isChecked()
    //if no checkbox is checked display the tip for the user. Otherwise hide it
    if(!checkedStatus) {
      $('#courseValidation').show();
    }
    else {
      $('#courseValidation').hide();
    }
    //check if a checkbox is being checked or unchecked
    if ($(this).is(":checked") === true) {
      //set the flag to 0, which means a sum
      operationFlag = 0;
      //check which checkbox is being checked and add the respective ammount
      updateTotal($(this).attr('name'), operationFlag)
      toggleCheckbox($(this).attr('name'));
    } else {
      //set the flag to 1, which means a subctraction
      operationFlag = 1;
      //check which checkbox is being unchecked and subtact the respective ammount
      updateTotal($(this).attr('name'), operationFlag)
      toggleCheckbox($(this).attr('name'));
    }
    $('#total').html("Your total cost is: " + total);
  });
}


//function to update total cost of seminars
function updateTotal(name, flag) {
  //check flag value, if 0 it is a sum
  if (flag === 0){
    if (name === 'all'){
      total += 200;
    } else {
      total += 100;
    }
  //check flag value, if different from 0 it is a subctraction
  } else {
    if (name === 'all'){
      total -= 200;
    } else {
      total -= 100;
    }
  }
}


//function to check if at least one checkbox is checked
function isChecked () {
  /*variable used to update the checkedStatus: if at the end of the function it
  is still 0, it means that there are no checked checkbox.*/
  var flag = 0;
  //loop through all the checkboxes
  for (var i = 0; i < $('.activities :input').length; i += 1){
    //check if a checkbox is checked
    if ($('.activities input:eq('+i+')').is(':checked')) {
      checkedStatus = true;
      flag = 1;
      break;
    }
  }
  //if no checkboxes are checked update checkedStatus
  if (flag === 0) {
    checkedStatus = false;
  }
}


//function to display the correct/necessary info for the chosen payment method
function showPaymentMethod(paymentMethod){
  if (paymentMethod === 'credit card') {
    $('div p').hide();
    $('#credit-card').show();
  }
  else if (paymentMethod === 'paypal') {
    $('#credit-card').hide();
    $('div p:eq(1)').hide();
    $('div p:eq(0)').show();
  }
  else {
    $('#credit-card').hide();
    $('div p:eq(0)').hide();
    $('div p:eq(1)').show();
  }
}


/*function that let the user choose his payment method and display
the necessary information accordingly*/
function choosePaymentMethod(){
  //event listener on payment method dropdown menu
  $('#payment').change(function(){
    //get chosen payment method
    let selectedPaymentMethod = $(this).children("option:selected").val();
    //display just the information need for that payment method
    showPaymentMethod(selectedPaymentMethod);
  });
}


/* function that dinamically handle errors on cc input for 3 fields:
cc number, zip code, cvv. For each field the errors checked are:
1) input is empty (or all whitespaces)
2) input is too short
3) input is too long
*/
function ccErrorHandler(maxLength, minLength, input, fieldToValidate, length, error) {
  //first check if input is empty
  let checkEmpty = /^\s*$/.test(input.val());
  if(checkEmpty === true) {
    fieldToValidate.text('Insert ' + error + ' number');
    fieldToValidate.show();
    //make the border red if input is wrong
    input.css('border-color', '#cc0000');
  } else {
    //If not empty, check the length of the input and display an error message accordingly
      if(length < minLength) {
        fieldToValidate.text(error + ' number is too short');
        fieldToValidate.show();
        //make the border red if input is wrong
        input.css('border-color', '#cc0000');
      } else if (length >= minLength && length <= maxLength) {
        fieldToValidate.hide();
        //make the border standard if input is right
        input.css('border-color', '');
      }
      else
      {
          fieldToValidate.text(error + ' number is too long');
          fieldToValidate.show();
          //make the border red if input is wrong
          fieldToValidate.css('border-color', '#cc0000');
        }
    }
  }


/*function to dynamically check if the user is giving a valid credit card number,
zip code and cvv */
function validateCreditCard () {
  //check errors on cc number
  $('#cc-num').on('input', function validateCCNumber() {
    let ccLength = $('#cc-num').val().length;
    ccErrorHandler(16, 13, $('#cc-num'), $('#ccValidation'), ccLength, 'cc');
  });
  //check errors on zip number
  $('#zip').on('input', function validateZipNumber() {
    let zipLength = $('#zip').val().length;
    ccErrorHandler(5, 5, $('#zip'), $('#zipValidation'), zipLength, 'zip');
  });
  //check errors on cvv number
  $('#cvv').on('input', function validateCvvNumber() {
    let cvvLength = $('#cvv').val().length;
    ccErrorHandler(3, 3, $('#cvv'), $('#cvvValidation'), cvvLength, 'cvv');
  });
}




$('form').submit(function(e) {
  if ($('.error')[0]) {
    e.preventDefault();
    alert('Please check that all the fields have been compiled correctly')
  }
});













//initialize total sum
let total = 0;
//flag to pass to the function to signal if it's a sum or a subctraction
let operationFlag = 0;
//variable to check if at least one checbox is checked
let checkedStatus = false;


setPage();
checkJobRole();
validateName();
validateEmail();
selectShirtColor();
manageCheboxes();
choosePaymentMethod();
validateCreditCard();
