// Read URL params
function getUrlVars() {
  // look for comment by SpaceLobster to make the orig post's code return an object instead of array
  var params = {}, d = function (s) { return s ? decodeURIComponent(s.replace(/\+/, " ")) : null; }
  if(window.location.search) $.each(window.location.search.substring(1).split('&'), function(i, v) {
  var pair = v.split('=');
  params[d(pair[0])] = d(pair[1]);
  });
  return params;
}
var urlVars = getUrlVars();





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

  /* TEMPLATE UI: BG Radio Buttons */
  function bgTypeUIPrep() {
    if($('input[value=bgColorOnly').is(':checked')) {
      $('.template-item--bg-image').hide();
      $('.template-item--bg-color').show();
      $('.tmark-text-primary').removeClass('has-text-shadow');
      $('.tmark-bg-image').hide();
      $('.tmark-bg-color').show();
      $('.tmark-bg-color').removeClass('bg-screen');
    }
    if($('input[value=bgImageColor').is(':checked')) {
      $('.template-item--bg-image').show();
      $('.template-item--bg-color').show();
      $('.tmark-text-primary').removeClass('has-text-shadow');
      $('.tmark-bg-image').show();
      $('.tmark-bg-image').addClass('bg-desaturate');
      $('.tmark-bg-color').addClass('bg-screen');
      $('.tmark-bg-color').show();
    }
    if($('input[value=bgImageOnly').is(':checked')) {
      $('.template-item--bg-color').hide();
      $('.template-item--bg-image').show();
      $('.tmark-text-primary').addClass('has-text-shadow');
      $('.tmark-bg-image').show();
      $('.tmark-bg-image').removeClass('bg-desaturate');
      $('.tmark-bg-color').hide();
    }
  }
  bgTypeUIPrep(); // check on page load

  $('input[type=radio]').click(function() {
     bgTypeUIPrep(); // check if the radio buttons are clicked
  });

  /* TEMPLATE LIST: on dropdown change */
  $("#template-list").change(function () {

    $('.template-ui-wrapper').show();

    /* Boring UI prep stuff */
    $('.tmark').hide();
    $('.active-template').removeClass('active-template');
    $('.template-item').show();

    var selectedTemplate = this.value;
    $('.tmark[data-name="'+selectedTemplate+'"]').show().addClass('active-template');

    $('.primary-text--input').val( $('.active-template .tmark-text-primary').text() );
    $('.secondary-text--input').val( $('.active-template .tmark-text-secondary').text() );

    // if ( $('.active-template .tmark-bg-image').length == 0 ) {
    //    $('.template-item--bg-image').hide();
    // }
    // if ( $('.active-template .tmark-bg-color').length == 0 ) {
    //    $('.template-item--bg-color').hide();
    // }
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
       $('.photo-list').append($('<li><img data-bg-image="'+obj+'" src="'+obj+'" /></li>'));
     });

   });

   // If a customer name is passed via the URL param of 'customerName', auto-change the customer dropdown accordingly
   // via http://stackoverflow.com/a/18665043 which I don't understand, but hey...
   if ( urlVars.customerName != null ) {
     var mySelect = $('#profile-list');
     var toSwtichTo = $('#profile-list option[value="'+urlVars.customerName+'"]');
     var myVal = $(toSwtichTo, mySelect).attr('value');
     mySelect.val(myVal).trigger('change');
   }





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

    if ( $('.active').data('text-primary') ) {
      // $('.active').val(clr);
      $('.tmark-text-primary').css('color',clr);
    }

    if ( $('.active').data('text-secondary') ) {
      // $('.active').val(clr);
      $('.tmark-text-secondary').css('color',clr);
    }

  });

  /* Font click events */
  $(document).on('click','.font-list li',function(){
    fnt = $(this).data('font');

    if ( $('.active').data('font-face') ) {
      // $('input.active').val(fnt);
      $('.tmark-text-primary').css('font-family',fnt);
      $('.tmark-text-secondary').css('font-family',fnt);
    }
  });

  /* Background image click events */
  $(document).on('click','.photo-list li img',function(){
    image = $(this).data('bg-image');

    if ( $('.active').data('bg-image') ) {
      $('input.active').val(image);
      $('.tmark-bg-image').css('background-image','url('+image+')');
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


      /* Scale, via http://codepen.io/davidpots/pen/gPjbzy */

          var baseFontSize = $('.tmark-text-container').css('font-size');
          baseFontSize = parseInt(baseFontSize, 10);
          var scaleMultiplier = 1;

          $(".scaleSlider").on("input", function(){
            scaleMultiplier = baseFontSize * (this.value/50);
            $('.tmark-text-container').css('font-size',scaleMultiplier);
          });


});
