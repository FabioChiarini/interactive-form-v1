/******************************************
Treehouse Techdegree:
FSJS project 3 - Interactive form
******************************************/


//listen for user selection of shirt design and hide/display colors accordingly
$('#design').change(function() {
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


/*function to dynamically check if the user is giving a valid name
(no empty and no whitespaces) */
function validateName () {
  $('#name').on('input', function validateName() {
    //check if input name is empty or just white spaces
    let checkInputName = /^\s*$/.test($('#name').val());
    if(checkInputName === true) {
      $('#nameValidation').show();
      //make the border red if input is wrong
      $('#name').css('border-color', '#cc0000');
    } else {
      $('#nameValidation').hide();
      //make the border standard if input is right
      $('#name').css('border-color', '');
    }
  });
}


/*function to dynamically check if the user is giving a valid email
(no empty and no whitespaces) */
function validateEmail () {
  $('#mail').on('input', function validateEmail() {
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


//initialize total sum
let total = 0;
//flag to pass to the function to signal if it's a sum or a subctraction
let operationFlag = 0;
//variable to check if at least one checbox is checked
let checkedStatus = false;

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

























validateName();
validateEmail();
manageCheboxes();
choosePaymentMethod();
