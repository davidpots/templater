var profiles = {
            "Hoover's" : {
                            'name' : "Hoover\'s",
                            'logo' : 'logo-hoovers.png',
                            'fonts' : ['Open Sans','Oswald'],
                            'colors' : ['#FFE001','#C83C09','#F88C00','#009ADD','#B6561B'],
                            'photos' : ['','']
                          },

            "Eagle Transmission" : {
                            'name' : "Eagle Transmission",
                            'logo' : 'logo-eagletransmission.png',
                            'fonts' : ['Helvetica Neue','PT Sans Narrow'],
                            'colors' : ['#D9242A','#173785','#304050','#DEE7F1'],
                            'photos' : ['','']
                          },

            "Elements" : {
                            'name' : 'Elements',
                            'logo' : 'logo-elements.png',
                            'fonts' : ['Playfair Display','Tahoma'],
                            'colors' : ['#B3F4F6','#1BB5CA','#76899E','#F2EFEC','#D1C5B7','#DF3B39'],
                            'photos' : ['','']
                          },
}

$(document).ready(function(){

  /* populate the profiles dropdown */
  var profileList = $("#profile-list");
  $.each(profiles, function(i,obj) {
    profileList.append($('<option data-name="'+profiles[i].name+'"/>').val(profiles[i].name).text(profiles[i].name));
  });

  $("#profile-list").change(function () {

     $('.profile-ui h3').show();
     $('.profile-logo').attr('src','');
     $('.color-list li').remove();
     $('.font-list li').remove();

     var selectedProfile = this.value;

     /* Show the logo for that profile */
     $('.profile-logo').attr('src','images/'+profiles[selectedProfile].logo);

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

    if ( $('.active').data('color-background') ) {
      $('.active').val(clr);
      $('.result-ui').css('backgroundColor',clr);
    }

    if ( $('.active').data('color-text') ) {
      // $('.active').val(clr);
      $('#primary-text--result').css('color',clr);
    }

  });

  /* Font click events */
  $(document).on('click','.font-list li',function(){
    fnt = $(this).data('font');

    if ( $('.active').data('font-face') ) {
      // $('input.active').val(fnt);
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
