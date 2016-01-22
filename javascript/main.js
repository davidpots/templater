var profiles = {
            "Hoover's" : {
                            'name' : "Hoover\'s",
                            'logo' : '',
                            'fonts' : ['Open Sans','Georgia'],
                            'colors' : ['#FFE001','#C83C09','#F88C00','#009ADD','#B6561B'],
                            'photos' : ['','']
                          },
            "Elements" : {
                            'name' : 'Elements',
                            'logo' : '',
                            'fonts' : ['Courier','Tahoma'],
                            'colors' : ['#B3F4F6','#1BB5CA','#76899E','#F2EFEC','#D1C5B7','#DF3B39'],
                            'photos' : ['','']
                          },
}

// var profiles = [
//                   { 'name' : 'Hoover\'s',
//                     'logo' : '',
//                     'fonts' : ['',''],
//                     'colors' : ['#FFE001','#C83C09','#F88C00','#009ADD','#B6561B'],
//                     'photos' : ['',''] },
//                   { 'name' : 'Elements',
//                     'logo' : '',
//                     'fonts' : ['',''],
//                     'colors' : ['#B3F4F6','#1BB5CA','#76899E','#F2EFEC','#D1C5B7','#DF3B39'],
//                     'photos' : ['',''] }
// ];





$(document).ready(function(){

  /* populate the profiles dropdown */
  var profileList = $("#profile-list");
  $.each(profiles, function(i,obj) {
    profileList.append($('<option data-name="'+profiles[i].name+'"/>').val(profiles[i].name).text(profiles[i].name));
  });

  $("#profile-list").change(function () {

     $('.profile-ui h3').show();
     $('.color-list li').remove();
     $('.font-list li').remove();

     var selectedProfile = this.value;

     /* Show the colors for that profile */
     $.each(profiles[selectedProfile].colors, function(i,obj) {
       $('.color-list').append($('<li style="background-color: '+obj+'" data-color="'+obj+'"></li>'));
     });

     /* Show the fonts for that profile */
     $.each(profiles[selectedProfile].fonts, function(i,obj) {
       $('.font-list').append($('<li style="font-family: '+obj+'" data-font="'+obj+'">'+obj+'</li>'));
     });
   });


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
  $(document).on('click','.color-list li',function(){
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
  $(document).on('click','.font-list li',function(){
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
