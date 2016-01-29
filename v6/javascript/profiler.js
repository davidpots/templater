$(document).ready(function(){

  /* Customer List: populate the dropdown */
  var profileList = $(".customer-select");
  $.each(profiles, function(i,obj) {
    profileList.append($('<option data-name="'+profiles[i].name+'"/>').val(profiles[i].name).text(profiles[i].name));
  });

  /* Customer list: on dropdown change */
  $(".customer-select").change(function () {

    // Unhide the profile
    $('.customer-wrapper').show();

    // Remove any existing photos
    $('.customer-photos li').remove();

    var customer = this.value;

    // Inject the custom gradient
    $('.page-head').css('backgroundImage',profiles[customer].gradient);
    console.log(profiles[customer].gradient);

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
       $.each(obj.photoFile, function(i2,filename) {
        $('.customer-photos').addClass('grid').append( "<li class='grid-item "+ obj.photoType +"'><img src='images/merchants/"+ filename +"' /></li>" );
       });
     });



     // Inject the URL paramater into the template link
     $('.customer-template-link').attr('href','templater.html?customerName=' + profiles[customer].name);

   });



});
//
// $( window ).load(function() {
//
//   $('.grid').masonry({
//     // options...
//     itemSelector: '.grid-item',
//     columnWidth: 200
//   });
//
// });
