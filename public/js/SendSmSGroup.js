(function ($) {	
	var hv = $('#ethanMobile').attr("value");
	var hv1 = $('#sophiaMobile').attr("value");
	var hv2 = $('#abbeyMobile').attr("value");
	var hv3 = $('#AdelaideMobile').attr("value");
	var hv4 = $('#AgathaMobile').attr("value");
	var hv5 = $('#ameliaMobile').attr("value");
	var hv6 = $('#avaMobile').attr("value");
	var hv7 = $('#BeatrixMobile').attr("value");
	var hv8 = $('#bradMobile').attr("value");
	var hv9 = $('#brendaMobile').attr("value");
	var hv10 = $('#charlotteMobile').attr("value");
	var hv11 = $('#christinaMobile').attr("value");
	var hv12 = $('#claraMobile').attr("value");
	var hv13 = $('#DanielMobile').attr("value");
	var hv14 = $('#DracieMobile').attr("value");
	var hv15 = $('#DaveMobile').attr("value");
	var hv16 = $('#ellaMobile').attr("value");
	var hv17 = $('#ethanMobile').attr("value");
	var hv18 = $('#HarryMobile').attr("value");
	var hv19 = $('#HarryWMobile').attr("value");
	var hv20 = $('#JessicaMobile').attr("value");
	var hv21 = $('#JohnMobile').attr("value");
	var hv22 = $('#markMobile').attr("value");
	var hv23 = $('#miaMobile').attr("value");
 	var hv24 = $('#rubyMobile').attr("value");
	var hv25 = $('#sophiaMobile').attr("value");

	$(document).ready(function (){
		$("#lblPass").hide();
		$("#lblfail").hide();
		$("#spinload").hide();
	});
	
	$("#btncancel").click(function() {
	  	$("#0531871454").show();
	});

	$("#btnSendAll").click(function() {

		$( "ul.contact-list li.contact-list-item" ).addClass("active");	
		$("#empPhone").val(hv + ',' + hv1 + ',' + hv2 + ',' + hv3 + ',' + hv4 + ',' + hv5 + ',' + hv6 + ',' + hv7 + ',' + hv8 + ',' + hv9 + ',' + hv10 + ',' + hv11 + ',' + hv12 + ',' + hv13 + ',' + hv14 + ',' + hv15 + ',' + hv16 + ',' + hv17 + ',' + hv18 + ',' + hv19 + ',' + hv20 + ',' + hv21 + ',' + hv22 + ',' + hv23 + ',' + hv24 + ',' + hv25);
	});

	$("#btnSend").click(function (){
		var str = ['+918126763474', '+918557988984', '+918909373895'];
		var SMSmsg = $('#msg').val();
		$("#spinload").show();	
		$.each(str, function( index, value ) {
			var dataS = { Mobile : value ,Message :SMSmsg };
  			alert( index + ": " + value );
  			$.ajax({
	        type: "POST",
	        data :JSON.stringify(dataS),
	        url: "./SendSMSSingle",
	        contentType: "application/json"
	    }).done(function() {
    		$('#empPhone').val("");
    		$('#msg').val("");
    		$("#lblPass").show();
    		$("#spinload").hide();
  		}).fail(function() {
		    $("#lblfail").show();
		 });
		});
	});



	

	
})(jQuery);