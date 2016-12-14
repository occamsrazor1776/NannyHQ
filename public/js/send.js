

(function ($) {	

	$(document).ready(function(){
		$(".spinner").hide();
		$("#lblPass").hide();
		 $.get( "/getcontacts", function( data ){

        	if(data.success==true){
			$.each(data.data, function(index, element){
         
         var createtag =(" <li class='contact-list-item'><a id='"+element.Id+"' class='contact-list-link' href='#0531871454' data-toggle='tab'><div class='contact-list-avatar'><img class='rounded' width='40' height='40' src='img/nophoto.jpg' alt='" + element.FirstName + " " + element.LastName + "'></div><div class='contact-list-details'><h5 class='contact-list-name'><span class='truncate'>" + element.FirstName + " "+ element.LastName + "</span></h5><small class='contact-list-email'><span class='truncate'>" + element.Email + "</span></small><input type='hidden' class='hdnServiceCode' name='hiddennumber' value='" + element.Mobile + "'/></div></a></li>");
          // $("ul.contact-list").prepend(createtag);
             if(element.FirstName.substring(0,1)=="A"){
             $(".contact-list-heading").each(function(){
                if($(this).text()==='A'){                    
                    $(createtag).insertAfter( $(this).closest(".contact-list-divider") );
                  }                  
              });            
           }
          if(element.FirstName.substring(0,1)=="B"){
            $(".contact-list-heading").each(function(){
              if($(this).text()==='B'){                    
                  $(createtag).insertAfter( $(this).closest(".contact-list-divider") );
                }

            });  
          }
          if(element.FirstName.substring(0,1)=="C"){
            $(".contact-list-heading").each(function(){
              if($(this).text()==='C'){                    
                  $(createtag).insertAfter( $(this).closest(".contact-list-divider") );
                }                  
            });  
          }
          
          
           if(element.FirstName.substring(0,1)=="D"){
            $(".contact-list-heading").each(function(){
              if($(this).text()==='D'){                    
                  $(createtag).insertAfter( $(this).closest(".contact-list-divider") );
                }                  
            });  
          }
          if(element.FirstName.substring(0,1)=="E"){
            $(".contact-list-heading").each(function(){
              if($(this).text()==='E'){                    
                  $(createtag).insertAfter( $(this).closest(".contact-list-divider") );
                }                  
            });  
          }
           if(element.FirstName.substring(0,1)=="F"){
            $(".contact-list-heading").each(function(){
              if($(this).text()==='F'){                    
                  $(createtag).insertAfter( $(this).closest(".contact-list-divider") );
                }                  
            });  
          }
          if(element.FirstName.substring(0,1)=="G"){
            $(".contact-list-heading").each(function(){
              if($(this).text()==='G'){                    
                  $(createtag).insertAfter( $(this).closest(".contact-list-divider") );
                }                  
            });  
          }
         if(element.FirstName.substring(0,1)=="H"){
            $(".contact-list-heading").each(function(){
              if($(this).text()==='H'){                    
                  $(createtag).insertAfter( $(this).closest(".contact-list-divider") );
                }                  
            });  
          }
          if(element.FirstName.substring(0,1)=="I"){
            $(".contact-list-heading").each(function(){
              if($(this).text()==='I'){                    
                  $(createtag).insertAfter( $(this).closest(".contact-list-divider") );
                }                  
            });  
          }
          if(element.FirstName.substring(0,1)=="J"){
            $(".contact-list-heading").each(function(){
              if($(this).text()==='J'){                    
                  $(createtag).insertAfter( $(this).closest(".contact-list-divider") );
                }                  
            });  
          }
          if(element.FirstName.substring(0,1)=="K"){
            $(".contact-list-heading").each(function(){
              if($(this).text()==='K'){                    
                  $(createtag).insertAfter( $(this).closest(".contact-list-divider") );
                }                  
            });  
          }
          if(element.FirstName.substring(0,1)=="L"){
            $(".contact-list-heading").each(function(){
              if($(this).text()==='L'){                    
                  $(createtag).insertAfter( $(this).closest(".contact-list-divider") );
                }                  
            });  
          }
          if(element.FirstName.substring(0,1)=="M"){
            $(".contact-list-heading").each(function(){
              if($(this).text()==='M'){                    
                  $(createtag).insertAfter( $(this).closest(".contact-list-divider") );
                }                  
            });  
          }
          if(element.FirstName.substring(0,1)=="N"){
            $(".contact-list-heading").each(function(){
              if($(this).text()==='N'){                    
                  $(createtag).insertAfter( $(this).closest(".contact-list-divider") );
                }                  
            });  
          }
          if(element.FirstName.substring(0,1)=="O"){
            $(".contact-list-heading").each(function(){
              if($(this).text()==='O'){                    
                  $(createtag).insertAfter( $(this).closest(".contact-list-divider") );
                }                  
            });  
          }
          if(element.FirstName.substring(0,1)=="P"){
            $(".contact-list-heading").each(function(){
              if($(this).text()==='P'){                    
                  $(createtag).insertAfter( $(this).closest(".contact-list-divider") );
                }                  
            });  
          }
          if(element.FirstName.substring(0,1)=="Q"){
            $(".contact-list-heading").each(function(){
              if($(this).text()==='Q'){                    
                  $(createtag).insertAfter( $(this).closest(".contact-list-divider") );
                }                  
            });  
          }
          if(element.FirstName.substring(0,1)=="R"){
            $(".contact-list-heading").each(function(){
              if($(this).text()==='R'){                    
                  $(createtag).insertAfter( $(this).closest(".contact-list-divider") );
                }                  
            });  
          }
          if(element.FirstName.substring(0,1)=="S"){
            $(".contact-list-heading").each(function(){
              if($(this).text()==='S'){                    
                  $(createtag).insertAfter( $(this).closest(".contact-list-divider") );
                }                  
            });  
          }
          if(element.FirstName.substring(0,1)=="T"){
            $(".contact-list-heading").each(function(){
              if($(this).text()==='T'){                    
                  $(createtag).insertAfter( $(this).closest(".contact-list-divider") );
                }                  
            });  
          }
          if(element.FirstName.substring(0,1)=="U"){
            $(".contact-list-heading").each(function(){
              if($(this).text()==='U'){                    
                  $(createtag).insertAfter( $(this).closest(".contact-list-divider") );
                }                  
            });  
          }
          if(element.FirstName.substring(0,1)=="V"){
            $(".contact-list-heading").each(function(){
              if($(this).text()==='V'){                    
                  $(createtag).insertAfter( $(this).closest(".contact-list-divider") );
                }                  
            });  
          }
          if(element.FirstName.substring(0,1)=="W"){
            $(".contact-list-heading").each(function(){
              if($(this).text()==='W'){                    
                  $(createtag).insertAfter( $(this).closest(".contact-list-divider") );
                }                  
            });  
          }
          if(element.FirstName.substring(0,1)=="X"){
            $(".contact-list-heading").each(function(){
              if($(this).text()==='sX'){                    
                  $(createtag).insertAfter( $(this).closest(".contact-list-divider") );
                }                  
            });  
          }
          if(element.FirstName.substring(0,1)=="Y"){
            $(".contact-list-heading").each(function(){
              if($(this).text()==='Y'){                    
                  $(createtag).insertAfter( $(this).closest(".contact-list-divider") );
                }                  
            });  
          }
          if(element.FirstName.substring(0,1)=="Z"){
            $(".contact-list-heading").each(function(){
              if($(this).text()==='Z'){                    
                  $(createtag).insertAfter( $(this).closest(".contact-list-divider") );
                }                  
            });  
          }  
           
        }); 
        }                       
      });     
    });
	 
	$('#btnSend').click(function(){
		var mobile = $('#empPhone').val();
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