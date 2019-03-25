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


//get if a checkbox is checked/unchecked
$('.activities input').click(function(){
  $(this).attr('checked', true);
  console.log($(this).is(":checked"));


});
/*Some events are at the same day and time as others.
If the user selects a workshop, don't allow selection of a workshop at the same day and time --
you should disable the checkbox and visually indicate that the workshop in the competing time slot isn't available.
When a user unchecks an activity, make sure that competing activities (if there are any) are no longer disabled.
As a user selects activities, a running total should display below the list of checkboxes.
For example, if the user selects "Main Conference", then Total: $200 should appear.
If they add 1 workshop, the total should change to Total: $300.*/
