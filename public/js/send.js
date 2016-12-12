

(function ($) {	

	$(document).ready(function(){		
		  $.get( "/getcontacts", function( data ){
			  $.each(data, function(index, element){
	 				console.log(element.FirstName);
			  });	                
	      });  
	});
	 
	$('#btnSend').click(function(){
		var mobile = $('#empPhone').val();
		var SMSmsg = $('#smsmsg').val();
		var dataS = { Mobile : mobile ,Message :SMSmsg };	
		$("#spinload").show();
		$.ajax({
	        type: "POST",
	        data :JSON.stringify(dataS),
	        url: "./SendSMSSingle",
	        contentType: "application/json"
	    }).done(function() {
    		$('#empPhone').val("");
    		$('#smsmsg').val("");
    		$("#lblPass").show();
    		$("#spinload").hide();
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