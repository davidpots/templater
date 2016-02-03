$(document).ready(function(){

  /* Customer List: populate the dropdown */
  var profileList = $(".customer-select");
  $.each(profiles, function(i,obj) {
    profileList.append($('<option data-name="'+profiles[i].name+'"/>').val(profiles[i].name).text(profiles[i].name));
  });

  /* Customer list: on dropdown change */
  $(".customer-select").change(function () {

    // Unhide the profile
    $('.customer-profile').show();

    // Remove any existing photos
    $('.customer-photos li').remove();

    var customer = this.value;

    // Inject the customer logo
    $('.customer-logo').attr('src','images/'+profiles[customer].logo);

    // Inject all customer text-based assets
    $('.customer-name').text(profiles[customer].name);
    $('.customer-bio').text(profiles[customer].bio);
    $('.customer-phone').text(profiles[customer].phone);
    $('.customer-address').text(profiles[customer].address);
    $('.customer-website').text(profiles[customer].website);

     // Inject all photos
     $.each(profiles[customer].photos, function(i,obj) {
       $('.customer-photos').append($('<li><img data-bg-image="'+obj+'" src="'+obj+'" /></li>'));
     });

     // Inject the URL paramater into the template link
     $('.customer-template-link').attr('href','templater.html?customerName=' + profiles[customer].name);

    //  $('.profile-ui h3').show();
    //  $('.profile-logo').attr('src','');
    //  $('.color-list li').remove();
    //  $('.font-list li').remove();
    //  $('.photo-list li').remove();
     //

     //

     //  /* Show the logo for that profile */
     //  $('.profile-logo').attr('src','images/'+profiles[selectedProfile].logo);

     //
    //  /* Show the colors for that profile */
    //  $.each(profiles[selectedProfile].colors, function(i,obj) {
    //    $('.color-list').append($('<li style="background-color: '+obj+'" data-color="'+obj+'"></li>'));
    //  });
     //
    //  /* Show the fonts for that profile */
    //  $.each(profiles[selectedProfile].fonts, function(i,obj) {
    //    $('.font-list').append($('<li style="font-family: '+obj+'" data-font="'+obj+'">'+obj+'</li>'));
    //  });
     //

   });

});
