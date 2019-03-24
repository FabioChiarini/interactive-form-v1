/******************************************
Treehouse Techdegree:
FSJS project 3 - Interactive form
******************************************/

// set focus on the first text field
$("#name").focus();
//hide the text field for the other-title jobs
$('#other-title').hide();

//listen for user selection of shirt design and hide/display colors accordingly
$('#design').change(function() {
  //get the value of the shirt selected by the user
  let selectedShirt = $(this).children("option:selected").val();
  //display/hide the respective colors
  if (selectedShirt === 'js puns') {
      $('#colors-js-puns option:eq(0), #colors-js-puns option:eq(1), #colors-js-puns option:eq(2)').show();
      $('#colors-js-puns option:eq(3), #colors-js-puns option:eq(4), #colors-js-puns option:eq(5)').hide();

    } else if (selectedShirt === 'heart js') {
      $('#colors-js-puns option:eq(3), #colors-js-puns option:eq(4), #colors-js-puns option:eq(5)').show();
      $('#colors-js-puns option:eq(0), #colors-js-puns option:eq(1), #colors-js-puns option:eq(2)').hide();
    }

});
