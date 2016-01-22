$(document).ready(function(){

  /* Color setup */
  $('.color-list li').each(function(index){
    $(this).css('backgroundColor',$(this).data('color'));
  });

  /* Set active input or textarea on click */
  $('.layout-ui input, .layout-ui textarea').focus(function(){
    $('.layout-ui .active').removeClass('active');
    $(this).addClass('active');
  });

  /* Color click events */
  $('.color-list li').click(function(){
    clr = $(this).data('color');

    if ( $('input.active').data('color-background') ) {
      $('input.active').val(clr);
      $('.result-ui').css('backgroundColor',clr);
    }

    if ( $('input.active').data('color-text') ) {
      $('input.active').val(clr);
      $('#primary-text--result').css('color',clr);
    }

  });

  /* Font click events */
  $('.font-list li').click(function(){
    fnt = $(this).data('font');

    if ( $('input.active').data('font-face') ) {
      $('input.active').val(fnt);
      $('.result-ui').css('font-family',fnt);
    }
  });




  /* Text updating */

  function updateText(){
    var input = $("#primary-text--input").val();
    $("#primary-text--result").text(input);
  }
  updateText();

  $('#primary-text--input').keyup(function(){
    updateText();
  });





});
