var profiles = {
            "Hoover's" : {
                            'name' : "Hoover\'s",
                            'logo' : 'logo-hoovers.png',
                            'fonts' : ['Open Sans','Oswald'],
                            'colors' : ['#FFE001','#C83C09','#F88C00','#009ADD','#B6561B'],
                            'photos' : ['hoovers-1.jpg',
                                        'hoovers-2.jpg',
                                        'hoovers-3.jpg',
                                        'hoovers-4.jpg',
                                        'hoovers-5.jpg']
                          },

            "Eagle Transmission" : {
                            'name' : "Eagle Transmission",
                            'logo' : 'logo-eagletransmission.png',
                            'fonts' : ['Helvetica Neue','PT Sans Narrow'],
                            'colors' : ['#D9242A','#173785','#304050','#DEE7F1'],
                            'photos' : ['eagle-1.jpg',
                                        'eagle-2.jpg',
                                        'eagle-3.jpg',
                                        'eagle-4.jpg']
                          },

            "Elements" : {
                            'name' : 'Elements',
                            'logo' : 'logo-elements.png',
                            'fonts' : ['Playfair Display','Tahoma'],
                            'colors' : ['#B3F4F6','#1BB5CA','#76899E','#F2EFEC','#D1C5B7','#DF3B39'],
                            'photos' : ['elements-1.jpg',
                                        'elements-2.jpg',
                                        'elements-3.jpg',
                                        'elements-4.jpg']
                          },
}

$(document).ready(function(){

  /* PROFILE LIST: populate the dropdown */
  var profileList = $("#profile-list");
  $.each(profiles, function(i,obj) {
    profileList.append($('<option data-name="'+profiles[i].name+'"/>').val(profiles[i].name).text(profiles[i].name));
  });

  /* TEMPLATE LIST: populate the dropdown */
  var templateList = $("#template-list");
  $.each($('.tmark'), function(i,obj) {
    templateList.append($('<option data-name="'+ $(obj).data('name') + '"/>').val($(obj).data('name')).text($(obj).data('name')));
  });


  /* TEMPLATE LIST: on dropdown change */
  $("#template-list").change(function () {

    /* Boring UI prep stuff */
    $('.tmark').hide();
    $('.active-template').removeClass('active-template');
    $('.template-item').show();

    var selectedTemplate = this.value;
    $('.tmark[data-name="'+selectedTemplate+'"]').show().addClass('active-template');

    $('.primary-text--input').val( $('.active-template .tmark-text-primary').text() );
    $('.secondary-text--input').val( $('.active-template .tmark-text-secondary').text() );

    if ( $('.active-template .tmark-bg-image').length == 0 ) {
       $('.template-item--bg-image').hide();
    }
    if ( $('.active-template .tmark-bg-color').length == 0 ) {
       $('.template-item--bg-color').hide();
    }
    if ( $('.active-template .tmark-text-primary').length == 0 ) {
       $('.template-item--text-primary').hide();
    }
    if ( $('.active-template .tmark-text-secondary').length == 0 ) {
       $('.template-item--text-secondary').hide();
    }

  });

  /* PROFILE LIST: on dropdown change */
  $("#profile-list").change(function () {

     $('.profile-ui h3').show();
     $('.profile-logo').attr('src','');
     $('.color-list li').remove();
     $('.font-list li').remove();
     $('.photo-list li').remove();

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

     /* Show the photos for that profile */
     $.each(profiles[selectedProfile].photos, function(i,obj) {
       $('.photo-list').append($('<li><img data-bg-image="'+obj+'" src="images/merchants/'+obj+'" /></li>'));
     });
   });

  /* Set active input or textarea on click */
  $('.layout-ui input, .layout-ui textarea').focus(function(){
    $('.layout-ui .active').removeClass('active');
    $(this).addClass('active');
  });

  /* Color click events */
  $(document).on('click','.color-list li',function(){
    clr = $(this).data('color');

    if ( $('.active').data('bg-color') ) {
      $('.active').val(clr);
      $('.tmark-bg-color').css('backgroundColor',clr);
    }

    if ( $('.active').data('color-text') ) {
      // $('.active').val(clr);
      $('.tmark-text-primary').css('color',clr);
      $('.tmark-text-secondary').css('color',clr);
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

  /* Background image click events */
  $(document).on('click','.photo-list li img',function(){
    image = $(this).data('bg-image');

    if ( $('.active').data('bg-image') ) {
      $('input.active').val(image);
      $('.tmark-bg-image').css('background-image','url(images/merchants/'+image+')');
    }
  });




  /* Text updating */

      /* Primary text */

          function updateTextPrimary(){
            var input = $(".primary-text--input").val();
            $(".tmark-text-primary").text(input);
          }

          $('.primary-text--input').keyup(function(){
            updateTextPrimary();
          });

      /* Secondary text */

          function updateTextSecondary(){
            var input = $(".secondary-text--input").val();
            $(".tmark-text-secondary").text(input);
          }

          $('.secondary-text--input').keyup(function(){
            updateTextSecondary();
          });





});
