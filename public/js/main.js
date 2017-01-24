  'use strict';

  $(document).ready(function () { 
       // $("#lbllogfail").hide();
       // $("lbllogDone").hide();
     // $("#signin").click(function (){
      //  var UserName = $("#username").val();
      //  var Password = $("#password").val();

       
      //  if(username === '' && password===''){
        //  $("#lbllogfail").show().delay(5000).fadeOut();
        //  $("#lbllogfail").html("Please Fill username and password.");
      //  }
      //  else{
            //  var dataS = { username : UserName, password : Password };
            //  console.log(dataS);             
            //  $.ajax({
            //  type: "POST",
            //  data :JSON.stringify(dataS),
            //  url: "./login",
            //  contentType: "application/json"
            //  });
        //}

        //var dataS
     // });

     $('#signin').click(function (){
        var username = $('#username').val();
        var password = $('#password').val();
        var dataS = { uname : username, upass : password};
        console.log(dataS);
        console.log(username);
        if(username == "" || password== "")
        {
           $("#lbllogfail").html("Username/Password must be entered.");
        }
        else 
        {
          $.ajax({
              type: "POST",
              data: JSON.stringify(dataS),
              url: "./login",
              contentType: "application/json"
          }).done (function ( data){
            if(data.success == false)
            {
              console.log(data.success);
              $("#lbllogfail").html("Username/Password Incorrect.");
            }
            else{
              location.href='/';
            }
          });
        }
     });

     $('#btnforgot').click(function (){
        if($('#username').val()===''){
          alert('Please enter username');
        }
        else{
          var username = $('#username').val();
           var dataS= {uName : username};
           $.ajax({
             type: "POST",
             data :JSON.stringify(dataS),
             url: "./forgot",
             contentType: "application/json"
           }).done(function( data) {
              if(data.success==true){
                $('#lblSuccess').html('Password sent Successfully');
                $('#username').val('');
              }
              else{
                $('#lblfail').html(data.status);
              }
            
          }).fail(function() {
            
          });
        }
     });


     $("#fileMMS").on('change', function(e){
        console.log(URL.createObjectURL(e.target.files[0]));
        $("#hiddFile").attr("value", URL.createObjectURL(e.target.files[0]) );
     });

      $('#btnData').prop("disabled", true);
      $("#bulkspin").hide(); 
      $(".contact-list-divider").hide();
       $("#impSpin").hide(); 
      

        $("#impcontUpload").on('change',function(e) {

            var ext = $("input#impcontUpload").val().split(".").pop().toLowerCase();
            
            if($.inArray(ext, ["csv"]) == -1) {
              alert('Format not supported Upload only CSV');
              return false;
            }
            
            if (e.target.files != undefined) {
                var reader = new FileReader();
                reader.onload = function(e) {
                  var csvval = e.target.result.split("\n");
                 
                  $("#impSpin").show(); 
                  $('#hiddenCOntacts').attr('value', e.target.result);
               
                  for(var j=1;j<csvval.length -1;j++)
                  { 

                    var csvvalue = csvval[j].split(",");


                    //for(var i =1; i <= csvvalue.length; i++)
                    //{ 
                         
                      var appStr ="<tr> <td class='text-left'>"+csvvalue[0] + " </td> <td class='text-left'> "+ csvvalue[1] + "</td>";
                      appStr+="<td class='text-left'>" + csvvalue[2] + "</td> <td class='text-left'>"+ csvvalue[3] +"</td>";
                      appStr+=" <td class='text-left'>" + csvvalue[4]+"</td><td class='text-left'>" + csvvalue[5] + "</td>";
                      appStr+="<td class='text-left'>"+csvvalue[6]+"</td>";
                      $("#tbContact  > tbody").append(appStr);   
                    //}
                  }
                  $("#impSpin").hide();
                  $("#csvimporthinttitle").show();                  
                  $('#btnData').prop("disabled", false);                
              };
             reader.readAsText(e.target.files.item(0));

          }
          return false;
        });



         $("#profilepic").on('change',function(e) {                    
             var files = $(this).get(0).files;

                if (files.length > 0){
                  // One or more files selected, process the file upload

                  // create a FormData object which will be sent as the data payload in the
                  // AJAX request
                  var formData = new FormData();

                 
                  // loop through all the selected files
                  for (var i = 0; i < files.length; i++) {
                    var file = files[i];
                    console.log(URL.createObjectURL(file) );
                     $('#imgProfile').attr('src',URL.createObjectURL(file));
                    // add the files to formData object for the data payload
                    formData.append('uploads[]', file, file.name);

                    console.log(file, file.name)

                    $("#hddProPic").attr("value",URL.createObjectURL(file));
                  }
                    $.ajax({
                     type: "POST",
                     data : formData,
                     url: "./uploadPhoto",
                     processData: false,
                     contentType: false,
                     success: function(data){
                      console.log('upload successful!');
                    }
                  });

                }
        });

        $(".compose-editor").html("Hello {Column1}, we still haven't received your {Column4} that expired on {Column3}. Please reply to this message with an updated copy or fax to (xxx) xxx-xxxx. Thank you");
        $("#form-control-8").html("Hello {Column1}, we still haven't received your {Column4} that expired on {Column3}. Please reply to this message with an updated copy or fax to (xxx) xxx-xxxx. Thank you");

         $("#impcontUpload1").on('change',function(e) {

            var ext = $("input#impcontUpload1").val().split(".").pop().toLowerCase();
            var numlist ;
            var name;
            var num1;   
            var missingCertificates;
            var expDate;
            if($.inArray(ext, ["csv"]) == -1) {
              alert('Format not supported Upload only CSV');
              return false;
            }
            if (e.target.files != undefined) {
                var reader = new FileReader();
                reader.onload = function(e) {
                  var csvval = e.target.result.split("\n");
                 
                  $('#hiddenCOntacts').attr('value', e.target.result);
                    $("#bulkspin").show(); 
                  for(var j=1;j<csvval.length - 1;j++)
                  {                    
                    var csvvalue = csvval[j].split(",");

                    
                      var appStr ="<tr> <td class='text-left'>"+csvvalue[0] + " </td> <td class='text-left'> "+ csvvalue[1] + "</td>";
                      appStr+="<td class='text-left'>" + csvvalue[2] + "</td> <td class='text-left'>"+ csvvalue[3] +"</td>";
                      appStr+="<td class='text-left'>"+ csvvalue[4] +"</td>";
                      $("#demo-datatables-1  > tbody").append(appStr); 


                      console.log(csvvalue);
                     // for(var i = 1 ; i< csvvalue.length -1 ; i++)  
                     // {
                        console.log(csvvalue[2]);
                        num1 = csvvalue[2];
                        num1 = csvvalue[2].replace('(','');
                        num1 = num1.replace(')','');
                        num1 = num1.replace('-', '');
                        num1 = num1.replace(' ', '');
                        var  mobile = "+91" + num1;
                        if(numlist == null){
                          numlist =  num1 + "," ;
                        }
                        else
                        {
                          numlist = numlist + num1 + "," ;
                        }
                     //}
                    
                  }
                  console.log(numlist);
                  $("#bulkspin").hide(); 
                  var formatnums = numlist.split(',');
                  var newfnums;
                  var num2;
                  
                  $("#txtTo").val(numlist.substring(0, numlist.length-1));                

                 // $("#csvimporthinttitle").show();                  
                  $('#btnData').prop("disabled", false);                
              };
             reader.readAsText(e.target.files.item(0));
          }
          return false;
        });

         $("#btnComposeSend").click(function (){
             
              var nums = $("#txtTo").val().split(',');
              var num1;           
              var mobile;
              var SMSmsg;
              var allconts = $('#hiddenCOntacts').attr('value').split("\n");
              for(var j = 1; j<allconts.length -1; j++){
                var newallcontacts =  allconts[j].split(",");
                 //for(var i =1; i < newallcontacts.length; i++){
                  //console.log('newall '+newallcontacts[2]);
                    num1 = newallcontacts[2].replace('(','');
                    num1 = num1.replace(')','');
                    num1 = num1.replace(' ', '');
                    num1 = num1.replace('-', '');
                    mobile="+91" + num1;
                    SMSmsg ="Hello "+newallcontacts[0] +" "+ newallcontacts[1] + ", we still haven't received your " +  newallcontacts[4]+" that expired on ";
                    SMSmsg+= newallcontacts[3]+". Please reply to this message with an updated copy or fax to (954) 440-7348. Thank you";
                    var dataS = { Mobile : mobile ,Message :SMSmsg };
                   // console.log(mobile);
                    //console.log(SMSmsg);
                    $.ajax({
                         type: "POST",
                         data :JSON.stringify(dataS),
                         url: "./SendSMSSingleBulk",
                         contentType: "application/json"
                       }).done(function( responseData ) {

                        if(responseData.success == true){
                          $( "#tab5").trigger( "click");

                        }
                        
                      }).fail(function() {
                       
                      });
                 //}  
              }
         });


        


     $("#btnSave").click(function(){ 
        var f_name = $("#f_name").val();
      
        var l_name = $("#l_name").val();
        var emailadd = $("#emailadd").val();
        var mobile = $("#mobile").val();
        var j_title = $("#j_title").val();
        var location = $("#txtPlaces").val();
        var notes = $("#notes").val();    
        var dataS= {F_name : f_name, L_name : l_name, Emailadd : emailadd, Mobile : mobile, J_title : j_title, Location : location, Notes : notes};
        $.ajax({
          type: "POST",
          data :JSON.stringify(dataS),
          url: "./newcontact",
          contentType: "application/json"
        }).done(function(data) {
            if(data.success==true){
              $('#f_name').val('');
              $('#m_name').val('');
              $('#l_name').val('');
              $('#emailadd').val('');
              $('#mobile').val('');
              $('#j_title').val('');
              $('#notes').val('');
              $('#txtPlaces').val('');
              $("#lblSuccess").html("Contact Saved Successfully");
              getContacts();
            }
            else
            {
              $("#lblfail").html(data.status);            
            }

        }).fail(function() {
          $("#lblfail").html("error occured during process.");

       });      
     });  

     $("#btnUpdateProfile").click(function (){ 
        $("#spinProfile").show();
        var f_name = $("#f_name").val();
        var l_name = $("#l_name").val();
        var email  =  $("#emailadd").val();
        var id = $("#hidProId").attr("value");
        var userName = $("#u_name").val();
        var userPassword = $("#password").val();
        var phnNum = $("#phoneNUmber").val();


        var dataS = {F_name : f_name, L_name : l_name, Id : id, Email : email, Username : userName, Password : userPassword, PhoneNUm : phnNum};
        
        $.ajax({
            type : "POST",
            data : JSON.stringify(dataS),
            url  : "./updateProfile",
            contentType : "application/json"
        }).done(function (data){
            if(data.success == true){
              console.log("Successfully updated");
              $("#spinProfile").hide();
              $("#lblSuccess").html("Contact Updated Successfully");
            }
            if(data.success==false){
              console.log("operation unsuccessful");
            }
        })

     });

      // $("#impcontUpload").on('change',function(e) {
          //alert('aa');
       //});
     
       

       $(document).on("click", ".scont", function(){
            var contval =  $('#hiddenCOntacts').attr('value');
           
           // console.log(contval);
            var csvval = contval.split("\n");
            
            var m_name="";
            var cmobile;
            var num1;
            var count = 0 ;
            var out = [];   
            var obj = {};         
            var j;

            for( j = 1; j <  csvval.length -1; j++)
            {   
              var csvvalue = csvval[j].split(","); 
              num1 = csvvalue[6].replace('(','');
              num1 = num1.replace(')','');
              num1 = num1.replace(' ', '');
              num1 = num1.replace('-', '');
              var dataS= {F_name : csvvalue[0], M_name : m_name, L_name : csvvalue[1], Emailadd :'', Mobile : '+1' +  num1, J_title : '', Location : csvvalue[2] + "," + csvvalue[3] + "," + csvvalue[4] + "," + csvvalue[5], Notes : ''};
              $.ajax({
                    type: "POST",
                    data :JSON.stringify(dataS),
                    url: "./newcontact",
                    contentType: "application/json"
                  }).done(function(data) {
                      if(data.success==true){                       
                        $("#lblDone").html("Contacts Saved Successfully and "+ count +"  duplicate contacts are not saved.");
                         console.log("saved Successfully" );

                      }
                      else
                      {
                        $("#lblerr").html(data.status);
                        console.log(data.status);            
                      }
                  }).fail(function() {
                    $("#lbllblinfo").html("error occured during process.")
                    console.log("error occured during process.");
                 }); 
            }   
           
            
            

       });

      

       $("ul#contMulti").on("click","li.contact-list-item", function(){
           var mobile = $(this).find("a").attr("data");         
           var newmobile="";
           
            if ($.trim($('#empPhone').val()).length > 0)
            {                
                var numberslst = $('#empPhone').val();  
                if(numberslst.indexOf(mobile) > - 1){
                  $('#empPhone').val('');
                  var list=numberslst.split(',');

                  $.each(list, function(index, element){
                    if(mobile != element){ 
                        if(newmobile=="")                                              
                          newmobile = element;  
                        else
                            newmobile += "," +element;  
                    }                                      

                  });
                  $('#empPhone').val(newmobile);
                  // alert("Number is already added");
                }
                else{
                   newmobile =  $('#empPhone').val() + "," + mobile;
                    $('#empPhone').val(newmobile);
                }
            }   
            else{
              $("#empPhone").val(mobile);
            }

            $("#hidContact").attr("value", $("#empPhone").val());
         
          
        });
       $("ul#contlistSingle").on("click","li.contact-list-item", function(){
           var mobile = $(this).find("a").attr("data");    
            var Id = $(this).find("a").attr("id");       
           var newmobile;
           
            if ($.trim($('#empPhone').val()).length > 0)
            {                
               
            }   
            else{
              $("#empPhone").val(mobile);
            }

            $("#hidContact").attr("value", $("#empPhone").val());
            $("#hidToId").attr("value",Id);
         
          
        });

       $("#").click(function(){
        //var dataS={From : '+918557988984', Body:'Hello test message'};
          $.ajax({
            type:'POST',
            data:dataS,
            url:'/message',
            contentType:"application/json"
          }).done( function ( data ){
              if(data.data.success == true)
              {
                  
              }
          });
       });

       $("#btnSend").click(function (){
          var frommob= $("#lblUsrphn").html();
          var userid= $("#lbluser1").html();
          //console.log('user id from' + userid);
          var userToId =  $("#hidToId").attr("value");
          //console.log('userid to ' + userToId);
          var hiddennumbers =$("#hidContact").attr("value");

          var mmsfile = $("#hiddFile").attr("value");
          console.log(hiddennumbers);
          if(hiddennumbers === undefined){
            console.log('undefined part');
            var cmob = $("#empPhone").val();
            var mobile1 = cmob;
            mobile1 = mobile1.replace('(','');
            mobile1 = mobile1.replace(')','');
            mobile1 = mobile1.replace(' ','');
            mobile1 = mobile1.replace('-','');
            //console.log(mobile1);
            var SMSmsg = $('#smsmsg').val();
            var dataS = {FROM : frommob, Mobile : mobile1, Message :SMSmsg, MMSFILE:mmsfile, userID : userid, useridTO : userToId};
            console.log(dataS);
             $.ajax({
                 type: "POST",
                 data :JSON.stringify(dataS),
                 url: "./SendSMSSingle",
                 contentType: "application/json"
               }).done(function() {
                $('#empPhone').val("");
                $('#msg').val("");
                $("#lblPass").show().delay(5000).fadeOut();;
                $(".spinner").hide();
                $("#btnSend").attr("disabled", false);

              }).fail(function() {
                $("#lblfail").show();
              });
          }
          else
          {
            var cmob =  $("#hidContact").attr("value").split(',');
            $("#btnSend").attr("disabled", true);
           //console.log(cmob);
           $.each(cmob, function(index, element){
              var mobile1 = element;
              mobile1 = mobile1.replace('(','');
              mobile1 = mobile1.replace(')','');
              mobile1 = mobile1.replace(' ','');
              mobile1 = mobile1.replace('-','');
              console.log(mobile1);
              var SMSmsg ="+1" + $('#msg').val();
              var dataS = {FROM : frommob, Mobile : mobile1, Message :SMSmsg, MMSFILE : mmsfile, userID : userid, useridTO : userToId};
              console.log('data ' +dataS);
               $.ajax({
                   type: "POST",
                   data :JSON.stringify(dataS),
                   url: "./SendSMSSingle",
                   contentType: "application/json"
                 }).done(function() {
                  $('#empPhone').val("");
                  $('#msg').val("");
                  $("#lblPass").show().delay(5000).fadeOut();;
                  $(".spinner").hide();
                  $("#btnSend").attr("disabled", false);

                }).fail(function() {
                  $("#lblfail").show();
                });
           });
          }

          console.log(cmob);
         
          


       }); 

  });  

 function getProfile(){
  var userid =$("#lbluser1").html();
  var dataS ={userid:userid};
  console.log(userid);
  $.get("/getProfile",dataS, function ( data ){
       $("#spinProfile").show();

     
        if( data.success == false){

        }
        if(data.success == true){
         
            $.each(data.data , function(index, element){
               $("#f_name").val(element.userFirstname);
               $("#l_name").val(element.userLastName);
               $("#emailadd").val(element.userEmail);
               $("#u_name").val(element.userName);
               $("#password").val(element.userPassword);
               $("#hidProId").attr("value",element.userId);
               $("#lbluser").html(element.username);
                getrole();
                 $("#spinProfile").hide();
            });
        }
     })
 };


    

    function getrole(id){
      $('/getrole' ,{Id : id }, function( data ){
        console.log(data);
        if(data.success==false){
        }
        if(data.success==true){
           $.each(data.data, function(index, element){
              $("#u_role").val(element.role);
              console.log(element.role);
          });
        }
      })
    }

     function getsmslist(){      
      $('#rptspinner').css('display','block');
      var mobilenumer="";
      var name="";
      $.get( "/smsList", function( data ){ 
        if(data.success==false){
          
        }
        if(data.success==true && data.data != null){   
          console.log(data);
          $.each(data.data.smsMessages, function(index, element){  
            var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "June","July", "Aug", "Sept", "Oct", "Nov", "Dec"];

          
            var str = element.date_sent;
            var date = new Date(str);
            var day = date.getDate(); //Date of the month: 2 in our example
            var month = monthNames[date.getMonth()]; //Month of the Year: 0-based index, so 1 in our example
            var year = date.getFullYear()
            var datasend = {phone : element.to};
            $.get('/getUserDetailsPhone',datasend,  function ( data ){
              console.log(data.success);
              if(data.success == true && data == null){
                console.log(data);
                if(data.data.length === 0){
                   console.log("no");

                    var appStr ="<tr><td>" + element.to + "</td><td>admin</td><td>"+element.status+"</td><td>"+element.direction+"</td>";
                    appStr+="<td>"+year +' '+month+' ' +day+"</td>";
                    $("#demo-datatables-1 > tbody").append(appStr);
                  }                 
                else{
                if(data.data[0].Mobile == element.to){ 
                  var appStr ="<tr><td>" + data.data[0].FirstName+" "+ data.data[0].LastName + "</td><td>admin</td><td>"+element.status+"</td>";
                  appStr+="<td>"+element.direction+"</td><td>"+year +' '+month+' ' +day+"</td>";
                  $("#demo-datatables-1 > tbody").append(appStr);
                }               
              }
            }
              else if(data.success == false ){
                console.log("no");
                var appStr ="<tr><td>" + element.to + "</td><td>admin</td><td>"+element.status+"</td><td>"+element.direction+"</td>";
                appStr+="<td>"+year +' '+month+' ' +day+"</td>";
                $("#demo-datatables-1 > tbody").append(appStr);
              }
            })           
          })
           $('#rptspinner').hide();
        }
      });
    }
    function getMessageContacts()
    {$("#spinloadcontact").show();
      
      $.get( "/getcontacts", function( data ){   

        if(data.success==false){
          $(".messenger-sidebar-body").hide();
        }
        //console.log(data);
        if(data.success==true){          
          $.each(data.data, function(index, element){
           var useridFrom = $("#lbluser1").html();              
           var datase = { userTo : element.Id, userFrom :useridFrom};
           var lastmsg ='';
           var format_date='';
            $.get('/getLastMessage', datase, function(dataR){
             // console.log(dataR.data.length);
             if(dataR.success == true){
                $.each(dataR.data, function(inde, elem){
                  lastmsg = elem.messageText;
                  var mDate =new Date(elem.sendDate);
                  var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

                  format_date =  monthNames[mDate.getMonth()] +" "+mDate.getDate();
                  //console.log(elem.messageText);  
                });
              }
              else if(dataR.success== false){
                
                lastmsg = "No Recent Conversations";
              }
            
            if(lastmsg==''){
                lastmsg="No Recent Conversations";
             }
            var createtag ="<li class='messenger-list-item'><a data='" + element.Mobile+ "' id='"+element.Id+"' class='messenger-list-link' href='#0531871454' data-toggle='tab'>";
            createtag+="<div class='messenger-list-avatar'><img class='rounded' width='40' height='40' src='img/nophoto.jpg' alt='" + element.FirstName + " " + element.LastName + "'>";
            createtag+="</div><div class='messenger-list-details'><div class='messenger-list-date'>"+format_date  +"</div> ";
            createtag+="<div class='messenger-list-name'>" + element.FirstName + " "+ element.LastName + "</div><div class='messenger-list-message'><small class='truncate'>"+lastmsg+ "</small>";
            createtag+="</div><input type='hidden' class='hdnServiceCode' name='hiddennumber' value='" + element.Mobile + "'/></div></a></li>";
            $('.messenger-list').append(createtag);  
           }); 
            
        });           
        $("#messengerlist").fadeIn();
        $("#spinloadcontact").hide();
      }     
    }); 
  } 

 $("#btnmsgSend").click(function(){
    
 }); 


   $("ul.messenger-list").on("click","li.messenger-list-item", function(){     
    var idTo = $(this).find("a").attr("id");  
    var numTo = $(this).find("a").attr("data")
    var useridFrom = $("#lbluser1").html();       
    $("#hidToId").attr("value", idTo);
    $("#hidTonum").attr("value",numTo);
    var name = $(this).find('.messenger-list-name').text();
    var _dates = '';
    $('.btn').css('text-transform','capitalize');           
    $('#msgUser').html(name);
    $("ul.conversation").empty();
    var dataSend  = {UserIdTo : idTo, UserIdFrom : useridFrom}
    var  crthtml1="";
    var dataSendDates  = {UserIdTo : idTo, UserIdFrom : useridFrom};
    var crthtml='';
    crthtml ="<li class='conversation-item'><div class='conversation-self'><div class='conversation-avatar'>";
    crthtml+="<img class='rounded' width='36' height='36' src='img/nophoto.jpg' alt='Teddy Wilson'></div>";
    crthtml+="<div class='conversation-messages'>";
     var crthtml2="</div></div></li>";
    $.get( "/getMessagesSent", dataSendDates, function( data ){
      var _dt='';       
         
      $.each(data.data, function(index, element){
        var crthtml1='';       
        var ndate = element.sendDate.split('T')[0];
        if(_dt != ndate){
          _dt = ndate;
           var dthtml="<li class='conversation-item'><div class='divider'><div class='divider-content'>"+ ndate+ "</div><div></li>";
            crthtml1 +="<div class='conversation-message'>"+element.messageText+"</div>";
           $('.conversation').append(dthtml+crthtml+crthtml1+crthtml2);
        }
        else if(_dt==ndate){
           crthtml1 +="<div class='conversation-message'>"+element.messageText+"</div><div class='conversation-timestamp'>15:29:02 PM</div>";
           $('.conversation').append(crthtml+crthtml1+crthtml2);
        }  
      });
    });
   });


   function getSentMessages(){
     
   };

   function getmessngerProfile(){
       $.get( "/getmessngerProfile", function( data ){
          if(data.success==true){
            //console.log("data : " + data);
            $.each(data.data , function(index, element){
              $("#username").html("Welcome  " + element.userName + " !");
            })
          };
       });
   };

   function getuserDetails(){
       $.get( "/getmessngerProfile", function( data ){
          if(data.success==true){
            //console.log("data : " + data);
            $.each(data.data , function(index, element){
              $("#lbluser").html(element.userName);
              $("#lbluser1").html(element.userId);
              $("#lblUsrphn").html(element.userPhone);
              var usrId = $("#lblUsrphn").html();
             // console.log(usrId);
            })
          };
       });
   };

   function getProfileuserDetails(){
       $.get( "/getmessngerProfile", function( data ){
          if(data.success==true){
            //console.log("data : " + data);
            $.each(data.data , function(index, element){
              $("#lbluser").html(element.userName);
              $("#lbluser1").html(element.userId);
              $("#lblUsrphn").html(element.userPhone);
              var usrId = $("#lblUsrphn").html();
               $("#f_name").val(element.userFirstname);
               $("#l_name").val(element.userLastName);
               $("#emailadd").val(element.userEmail);
               $("#u_name").val(element.userName);
               $("#password").val(element.userPassword);
               $("#hidProId").attr("value",element.userId);
               $("#lbluser").html(element.username);
               $("#phoneNUmber").val(element.userPhone);
                getrole();
                 $("#spinProfile").hide();
             // console.log(usrId);
            })
          };
       });
   };
   
  function getContacts()
  {
      $.get( "/getcontacts", function( data ){   

        if(data.success==false){
          $(".contact-sidebar-body").hide();
        }
        if(data.success==true){    
        //console.log(data.data)      ;
          $.each(data.data, function(index, element){
           // console.log(element);
             
            var createtag =" <li class='contact-list-item'><input type='hidden' name='hidToId' id='hidToId'/>";
            createtag+="<a data='" + element.Mobile+ "' id='"+element.Id+"' class='contact-list-link' href='#0531871454' data-toggle='tab'>";
            createtag+="<div class='contact-list-avatar'><img class='rounded' width='40' height='40' src='img/nophoto.jpg' alt='" + element.FirstName + " " + element.LastName + "'>";
            createtag+="</div><div class='contact-list-details'><h5 class='contact-list-name'>";
            createtag+="<span class='truncate'>" + element.FirstName + " "+ element.LastName + "</span></h5><small class='contact-list-email'>";
            createtag+="<span class='truncate'>" + element.Email + "</span></small>";
            createtag+="<input type='hidden' class='hdnServiceCode' name='hiddennumber' value='" + element.Mobile + "'/></div></a></li>";
            $(".contact-list-heading").each(function(){
              if($(this).text().toLowerCase()==='a' && element.FirstName.substring(0,1).toLowerCase()=="a"){    
                $(this).closest(".contact-list-divider").show();                
                $(createtag).insertAfter( $(this).closest(".contact-list-divider") );
              }
              else if($(this).text().toLowerCase()==='b' && element.FirstName.substring(0,1).toLowerCase()=="b"){    
                $(this).closest(".contact-list-divider").show();                                 
                $(createtag).insertAfter( $(this).closest(".contact-list-divider") );
              }
              else if($(this).text().toLowerCase()==='c' && element.FirstName.substring(0,1).toLowerCase()=="c"){   
                $(this).closest(".contact-list-divider").show();                                  
                $(createtag).insertAfter( $(this).closest(".contact-list-divider") );
              }
              else if($(this).text().toLowerCase()==='d' && element.FirstName.substring(0,1).toLowerCase()=="d"){    
                $(this).closest(".contact-list-divider").show();                                 
                $(createtag).insertAfter( $(this).closest(".contact-list-divider") );
              }
              else if($(this).text().toLowerCase()==='e' && element.FirstName.substring(0,1).toLowerCase=="e"){  
                $(this).closest(".contact-list-divider").show();                                   
                $(createtag).insertAfter( $(this).closest(".contact-list-divider") );
              }
              else if($(this).text().toLowerCase()==='f' && element.FirstName.substring(0,1).toLowerCase()=="f"){  
                $(this).closest(".contact-list-divider").show();                                   
                $(createtag).insertAfter( $(this).closest(".contact-list-divider") );
              }
              else if($(this).text().toLowerCase()==='g' && element.FirstName.substring(0,1).toLowerCase()=="g"){   
                $(this).closest(".contact-list-divider").show();                                  
                $(createtag).insertAfter( $(this).closest(".contact-list-divider") );
              }
              else if($(this).text().toLowerCase()==='h' && element.FirstName.substring(0,1).toLowerCase()=="h"){   
                $(this).closest(".contact-list-divider").show();                                  
                $(createtag).insertAfter( $(this).closest(".contact-list-divider") );
              }
              else if($(this).text().toLowerCase()==='i' && element.FirstName.substring(0,1).toLowerCase()=="i"){   
                $(this).closest(".contact-list-divider").show();                                  
                $(createtag).insertAfter( $(this).closest(".contact-list-divider") );
              }
              else if($(this).text().toLowerCase()==='j' && element.FirstName.substring(0,1).toLowerCase()=="j"){   
                $(this).closest(".contact-list-divider").show();                                  
                $(createtag).insertAfter( $(this).closest(".contact-list-divider") );
              }
              else if($(this).text().toLowerCase()==='k' && element.FirstName.substring(0,1).toLowerCase()=="k"){  
                $(this).closest(".contact-list-divider").show();                                   
                $(createtag).insertAfter( $(this).closest(".contact-list-divider") );
              }
              else if($(this).text().toLowerCase()==='l' && element.FirstName.substring(0,1).toLowerCase()=="l"){   
                $(this).closest(".contact-list-divider").show();                                  
                $(createtag).insertAfter( $(this).closest(".contact-list-divider") );
              }
              else if($(this).text().toLowerCase()==='m' && element.FirstName.substring(0,1).toLowerCase()=="m"){   
                $(this).closest(".contact-list-divider").show();                                  
                $(createtag).insertAfter( $(this).closest(".contact-list-divider") );
              }
              else if($(this).text().toLowerCase()==='n' && element.FirstName.substring(0,1).toLowerCase()=="n"){  
                $(this).closest(".contact-list-divider").show();                                   
                $(createtag).insertAfter( $(this).closest(".contact-list-divider") );
              }
              else if($(this).text().toLowerCase()==='o' && element.FirstName.substring(0,1).toLowerCase()=="o"){   
                $(this).closest(".contact-list-divider").show();                                  
                $(createtag).insertAfter( $(this).closest(".contact-list-divider") );
              }
              else if($(this).text().toLowerCase()==='p' && element.FirstName.substring(0,1).toLowerCase()=="p"){   
                $(this).closest(".contact-list-divider").show();                                  
                $(createtag).insertAfter( $(this).closest(".contact-list-divider") );
              }
              else if($(this).text().toLowerCase()==='q' && element.FirstName.substring(0,1).toLowerCase()=="q"){    
                $(this).closest(".contact-list-divider").show();                                 
                $(createtag).insertAfter( $(this).closest(".contact-list-divider") );
              }
              else if($(this).text().toLowerCase()==='r' && element.FirstName.substring(0,1).toLowerCase()=="r"){   
                $(this).closest(".contact-list-divider").show();                                  
                $(createtag).insertAfter( $(this).closest(".contact-list-divider") );
              }
              else if($(this).text().toLowerCase()==='s' && element.FirstName.substring(0,1).toLowerCase()=="s"){  
                $(this).closest(".contact-list-divider").show();                                   
                $(createtag).insertAfter( $(this).closest(".contact-list-divider") );
              }
              else if($(this).text().toLowerCase()==='t' && element.FirstName.substring(0,1).toLowerCase()=="t"){  
                $(this).closest(".contact-list-divider").show();                                   
                $(createtag).insertAfter( $(this).closest(".contact-list-divider") );
              }
              else if($(this).text().toLowerCase()==='u' && element.FirstName.substring(0,1).toLowerCase()=="u"){  
                $(this).closest(".contact-list-divider").show();                                   
                $(createtag).insertAfter( $(this).closest(".contact-list-divider") );
              }
              else if($(this).text().toLowerCase()==='v' && element.FirstName.substring(0,1).toLowerCase()=="v"){  
                $(this).closest(".contact-list-divider").show();                  
                $(createtag).insertAfter( $(this).closest(".contact-list-divider") );
              }
              else if($(this).text().toLowerCase()==='w' && element.FirstName.substring(0,1).toLowerCase()=="w"){   
                $(this).closest(".contact-list-divider").show();                                  
                $(createtag).insertAfter( $(this).closest(".contact-list-divider") );
              }
              else if($(this).text().toLowerCase()==='x' && element.FirstName.substring(0,1).toLowerCase()=="x"){   
                $(this).closest(".contact-list-divider").show();                                  
                $(createtag).insertAfter( $(this).closest(".contact-list-divider") );
              }
              else if($(this).text().toLowerCase()==='v' && element.FirstName.substring(0,1).toLowerCase()=="v"){   
                $(this).closest(".contact-list-divider").show();                                  
                $(createtag).insertAfter( $(this).closest(".contact-list-divider") );
              }
              else if($(this).text().toLowerCase()==='z' && element.FirstName.substring(0,1).toLowerCase()=="z"){   
                $(this).closest(".contact-list-divider").show();                                  
                $(createtag).insertAfter( $(this).closest(".contact-list-divider") );
              }
            }); 
        });           
        $("#contactlist").fadeIn();
        $("#spinloadcontact").hide();
      }     
    }); 
  }     

  //txtSearch

$( "#txtSearch" ).keypress(function(e) {
 if(e.which == 13) {
  var searchContent = $("#txtSearch").val();
  //console.log("your search content is  : "+ searchContent);    
    location.href='/search?sc='+searchContent;    
 }
}); 

$("#txtmsgSearch").keydown(function(e){
   var searchContent = $("#txtmsgSearch").val(); 
    if(searchContent != ''){
      //console.log(e.which);
     
    var dataS = {SearchCont : searchContent};

    $.get('/searchCont', dataS, function( data ){
        $('.messenger-list').empty();
        if(data.success == true){
        $.each(data.data, function(index, element){
         // console.log(data.data);
           var useridFrom = $("#lbluser1").html();              
           var datase = { userTo : element.Id, userFrom :useridFrom};
           console.log(datase);
           var lastmsg ='';
           var format_date='';
            //$.get('/getLastMessage', datase, function(data){
               // console.log(data);
             //if(data.success == true && data != null && data.length > 0){
                //console.log(data);
               // $.each(data.data, function(inde, elem){
                 // lastmsg = elem.messageText;
              //    var mDate =new Date(elem.sendDate);
               //   var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
             //     format_date =  monthNames[mDate.getMonth()] +" "+mDate.getDate();
                 // console.log(elem.messageText);  
               // });
             // }
            
            if(lastmsg == ''){
                lastmsg = "No Recent Conversations";
             }
            
            var createtag =("<li class='messenger-list-item'><a data='" + element.Mobile+ "' id='"+element.Id+"' class='messenger-list-link' href='#0531871454' data-toggle='tab'><div class='messenger-list-avatar'><img class='rounded' width='40' height='40' src='img/nophoto.jpg' alt='" + element.FirstName + " " + element.LastName + "'></div><div class='messenger-list-details'><div class='messenger-list-date'>"+format_date  +"</div> <div class='messenger-list-name'>" + element.FirstName + " "+ element.LastName + "</div><div class='messenger-list-message'><small class='truncate'>"+lastmsg+ "</small></div><input type='hidden' class='hdnServiceCode' name='hiddennumber' value='" + element.Mobile + "'/></div></a></li>");
            ;
            $('.messenger-list').append(createtag);  
           //}); 
            
        });
        }        
    });
  
  }
});

$("#txtContSearch").keydown(function(e){  
     var searchContent = $("#txtContSearch").val(); 
     console.log(e.which);
    if(searchContent != ''){
    var dataS = {SearchCont : searchContent};

    $.get('/searchCont', dataS, function( data ){
       if(data.success==true){    
        $('li.contact-list-item').empty();
        //console.log(data.data);       

          $.each(data.data, function(index, element){
           // console.log(element);
             
            var createtag =(" <li class='contact-list-item'><input type='hidden' name='hidToId' id='hidToId'/><a data='" + element.Mobile+ "' id='"+element.Id+"' class='contact-list-link' href='#0531871454' data-toggle='tab'><div class='contact-list-avatar'><img class='rounded' width='40' height='40' src='img/nophoto.jpg' alt='" + element.FirstName + " " + element.LastName + "'></div><div class='contact-list-details'><h5 class='contact-list-name'><span class='truncate'>" + element.FirstName + " "+ element.LastName + "</span></h5><small class='contact-list-email'><span class='truncate'>" + element.Email + "</span></small><input type='hidden' class='hdnServiceCode' name='hiddennumber' value='" + element.Mobile + "'/></div></a></li>");
           
            $(createtag).insertAfter( $(this).closest(".contact-list-divider") );
            $(".contact-list-heading").each(function(){
              if($(this).text().toLowerCase()==='a' && searchContent.substring(0,1).toLowerCase()=="a"){    
                $(this).closest(".contact-list-divider").show();                
                $(createtag).insertAfter( $(this).closest(".contact-list-divider") );

              }
              else if($(this).text().toLowerCase()==='b' && searchContent.substring(0,1).toLowerCase()=="b"){    
                $(this).closest(".contact-list-divider").show();                                 
                $(createtag).insertAfter( $(this).closest(".contact-list-divider") );
                console.log("b");
              }
              else if($(this).text().toLowerCase()==='c' && searchContent.substring(0,1).toLowerCase()=="c"){   
                $(this).closest(".contact-list-divider").show();                                  
                $(createtag).insertAfter( $(this).closest(".contact-list-divider") );
              }
              else if($(this).text().toLowerCase()==='d' && searchContent.substring(0,1).toLowerCase()=="d"){    
                $(this).closest(".contact-list-divider").show();                                 
                $(createtag).insertAfter( $(this).closest(".contact-list-divider") );
              }
              else if($(this).text().toLowerCase()==='e' && searchContent.substring(0,1).toLowerCase=="e"){  
                $(this).closest(".contact-list-divider").show();                                   
                $(createtag).insertAfter( $(this).closest(".contact-list-divider") );
              }
              else if($(this).text().toLowerCase()==='f' && searchContent.substring(0,1).toLowerCase()=="f"){  
                $(this).closest(".contact-list-divider").show();                                   
                $(createtag).insertAfter( $(this).closest(".contact-list-divider") );
              }
              else if($(this).text().toLowerCase()==='g' && searchContent.substring(0,1).toLowerCase()=="g"){   
                $(this).closest(".contact-list-divider").show();                                  
                $(createtag).insertAfter( $(this).closest(".contact-list-divider") );
              }
              else if($(this).text().toLowerCase()==='h' && searchContent.substring(0,1).toLowerCase()=="h"){   
                $(this).closest(".contact-list-divider").show();                                  
                $(createtag).insertAfter( $(this).closest(".contact-list-divider") );
              }
              else if($(this).text().toLowerCase()==='i' && searchContent.substring(0,1).toLowerCase()=="i"){   
                $(this).closest(".contact-list-divider").show();                                  
                $(createtag).insertAfter( $(this).closest(".contact-list-divider") );
              }
              else if($(this).text().toLowerCase()==='j' && searchContent.substring(0,1).toLowerCase()=="j"){   
                $(this).closest(".contact-list-divider").show();                                  
                $(createtag).insertAfter( $(this).closest(".contact-list-divider") );
              }
              else if($(this).text().toLowerCase()==='k' && searchContent.substring(0,1).toLowerCase()=="k"){  
                $(this).closest(".contact-list-divider").show();                                   
                $(createtag).insertAfter( $(this).closest(".contact-list-divider") );
              }
              else if($(this).text().toLowerCase()==='l' && searchContent.substring(0,1).toLowerCase()=="l"){   
                $(this).closest(".contact-list-divider").show();                                  
                $(createtag).insertAfter( $(this).closest(".contact-list-divider") );
              }
              else if($(this).text().toLowerCase()==='m' && searchContent.substring(0,1).toLowerCase()=="m"){   
                $(this).closest(".contact-list-divider").show();                                  
                $(createtag).insertAfter( $(this).closest(".contact-list-divider") );
              }
              else if($(this).text().toLowerCase()==='n' && searchContent.substring(0,1).toLowerCase()=="n"){  
                $(this).closest(".contact-list-divider").show();                                   
                $(createtag).insertAfter( $(this).closest(".contact-list-divider") );
              }
              else if($(this).text().toLowerCase()==='o' && searchContent.substring(0,1).toLowerCase()=="o"){   
                $(this).closest(".contact-list-divider").show();                                  
                $(createtag).insertAfter( $(this).closest(".contact-list-divider") );
              }
              else if($(this).text().toLowerCase()==='p' && searchContent.substring(0,1).toLowerCase()=="p"){   
                $(this).closest(".contact-list-divider").show();                                  
                $(createtag).insertAfter( $(this).closest(".contact-list-divider") );
              }
              else if($(this).text().toLowerCase()==='q' && searchContent.substring(0,1).toLowerCase()=="q"){    
                $(this).closest(".contact-list-divider").show();                                 
                $(createtag).insertAfter( $(this).closest(".contact-list-divider") );
              }
              else if($(this).text().toLowerCase()==='r' && searchContent.substring(0,1).toLowerCase()=="r"){   
                $(this).closest(".contact-list-divider").show();                                  
                $(createtag).insertAfter( $(this).closest(".contact-list-divider") );
              }
              else if($(this).text().toLowerCase()==='s' && searchContent.substring(0,1).toLowerCase()=="s"){  
                $(this).closest(".contact-list-divider").show();                                   
                $(createtag).insertAfter( $(this).closest(".contact-list-divider") );
              }
              else if($(this).text().toLowerCase()==='t' && searchContent.substring(0,1).toLowerCase()=="t"){  
                $(this).closest(".contact-list-divider").show();                                   
                $(createtag).insertAfter( $(this).closest(".contact-list-divider") );
              }
              else if($(this).text().toLowerCase()==='u' && searchContent.substring(0,1).toLowerCase()=="u"){  
                $(this).closest(".contact-list-divider").show();                                   
                $(createtag).insertAfter( $(this).closest(".contact-list-divider") );
              }
              else if($(this).text().toLowerCase()==='v' && searchContent.substring(0,1).toLowerCase()=="v"){  
                $(this).closest(".contact-list-divider").show();                  
                $(createtag).insertAfter( $(this).closest(".contact-list-divider") );
              }
              else if($(this).text().toLowerCase()==='w' && searchContent.substring(0,1).toLowerCase()=="w"){   
                $(this).closest(".contact-list-divider").show();                                  
                $(createtag).insertAfter( $(this).closest(".contact-list-divider") );
              }
              else if($(this).text().toLowerCase()==='x' && searchContent.substring(0,1).toLowerCase()=="x"){   
                $(this).closest(".contact-list-divider").show();                                  
                $(createtag).insertAfter( $(this).closest(".contact-list-divider") );
              }
              else if($(this).text().toLowerCase()==='v' && searchContent.substring(0,1).toLowerCase()=="v"){   
                $(this).closest(".contact-list-divider").show();                                  
                $(createtag).insertAfter( $(this).closest(".contact-list-divider") );
              }
              else if($(this).text().toLowerCase()==='z' && searchContent.substring(0,1).toLowerCase()=="z"){   
                $(this).closest(".contact-list-divider").show();                                  
                $(createtag).insertAfter( $(this).closest(".contact-list-divider") );
              }
            }); 
        });           
        $("#contactlist").fadeIn();
        $("#spinloadcontact").hide();
      }     
    });
  
}
});



function searchText(){
  var searchContent = GetParameterValues('sc');
  console.log(searchContent);
  var dataS = {SearchCont : searchContent};
  $.get('/searchC',dataS, function( data){
    console.log(data);
    if(data.success == true){
      if(data.data.length===0){
          $('#lblfail').html('No Data Found');
      }
      else{
        $.each(data.data, function(index, element){ 
          var appStr ="<tr><td>"+element.FirstName+" "+ element.LastName +"</td><td>"+element.Mobile+"</td><td>"+element.Email+"</td><td>"+element.Location+"</td><td>"+element.jobTitle+"</td><td>";
          $("#demo-datatables-1 > tbody").append(appStr);
        });       
      }
    }
  })
}    

function GetParameterValues(param) {
  var url = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
  for (var i = 0; i < url.length; i++) {
    var urlparam = url[i].split('=');
    if (urlparam[0] == param) {
      return urlparam[1];
    }
  }
}        


   function formWizardBasicExample() {
    var $formWizard = $('#demo-form-wizard-1');

    $formWizard.bootstrapWizard({
      nextSelector: '.btn-next',
      tabClass: 'steps'
    });
  }

  function formWizardWithValidationExample() {
    var $formWizard = $('#demo-form-wizard-2');

    $formWizard.bootstrapWizard({
      nextSelector: '.btn-next',
      tabClass: 'steps',
      onNext: function onNext(tab, navigation, index) {
        return $formWizard.valid();
      },
      onTabClick: function onTabClick(tab, navigation, index) {
        return $formWizard.valid();
      }
    });
  }

  function inputMaskBasicExample() {
    var $inputmask = $('#demo-inputmask');

    $inputmask.find(':input').each(function (idx, el) {
      $(this).inputmask();
    });
  }

   function fileUploaderBasicExample() {
    var $uploader = $('#demo-uploader');
    $uploader.fileupload({
      autoUpload: true,
      filesContainer: '.file-list'

    });    
  }
  function datatablesBasicTableExample() {
    var $datatables = $('#demo-datatables-1');
    $datatables.DataTable({
      dom: "<'row'<'col-sm-6'i><'col-sm-6'f>>" + "<'table-responsive'tr>" + "<'row'<'col-sm-6'l><'col-sm-6'p>>",
      language: {
        paginate: {
          previous: '&laquo;',
          next: '&raquo;'
        },
        search: "_INPUT_",
        searchPlaceholder: "Search…"
      },
      order: [[5, "desc"]]
    });
  }

  datatablesBasicTableExample();
  // Form wizards
  formWizardBasicExample();
  formWizardWithValidationExample();

  // Input masks
  inputMaskBasicExample();
  $("#upfile").change(function() {
       if ($(".file-list :not(:contains(li))") ){
         $("#btnUploadFile").attr('disabled','disabled');
    }
    else
       $("#btnUploadFile").attr('disabled','enabled');  
    });


   // File uploader
  fileUploaderBasicExample();