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
