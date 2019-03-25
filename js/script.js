/******************************************
Treehouse Techdegree:
FSJS project 3 - Interactive form
******************************************/


//listen for user selection of shirt design and hide/display colors accordingly
$('#design').change(function() {
  //get the value of the shirt selected by the user
  let selectedShirt = $(this).children("option:selected").val();
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


//initialize total sum
let total = 0;
//flag to pass to the function to signal if it's a sum or a subctraction
let operationFlag = 0;


manageCheboxes();
choosePaymentMethod();
