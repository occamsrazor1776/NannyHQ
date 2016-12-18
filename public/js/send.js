
(function ($) {	

	$(document).ready(function(){
		$(".spinner").hide();
		$("#lblPass").hide();	 

  });

   $('#btnSend').click(function(){
    var mobile = $('#empPhone').val();
    mobile = mobile.replace('(','');
    mobile = mobile.replace(')','');
    mobile = mobile.replace(' ','');
    mobile = mobile.replace('-','');
    console.log(mobile);
    var SMSmsg = $('#smsmsg').val();
    var dataS = { Mobile : mobile ,Message :SMSmsg };
    $("#btnSend").attr("disabled", true);	
    $(".spinner").show();
    $.ajax({
     type: "POST",
     data :JSON.stringify(dataS),
     url: "./SendSMSSingle",
     contentType: "application/json"
   }).done(function() {
    $('#empPhone').val("");
    $('#smsmsg').val("");
    $("#lblPass").show().delay(5000).fadeOut();;
    $(".spinner").hide();
    $("#btnSend").attr("disabled", false);
  }).fail(function() {
    $("#lblfail").show();
  });
});

$(document).on('click', '.contact-list-link', function(){
    var id= $(this).attr("Id");
    $.get( './getSinglecontact', {  Id : id} , function(data){
     $.each(data,function(index, element){
      $("#empPhone").val(element.Mobile);                 
    });
   })
});

$("#btncancel").click(function() {
    $("#0531871454").hide();

});

})(jQuery);