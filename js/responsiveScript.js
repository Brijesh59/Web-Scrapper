$(document).ready(function(){
  $(".responsiveBtn").on('click',function(){
    $(".container").addClass("slideOutUp");
    $("#rightBar").css('display','inline-block');
    $("#rightBar").addClass("slideInUp");
  });
});
