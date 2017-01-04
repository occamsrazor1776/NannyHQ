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
           }).done(function() {
            
          }).fail(function() {
           
          });
        }
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
                         
                      var appStr ="<tr> <td class='text-left'>"+csvvalue[0] + " </td> <td class='text-left'> "+ csvvalue[1] + "</td> <td class='text-left'>" + csvvalue[2] + "</td> <td class='text-left'>"+ csvvalue[3] +"</td> <td class='text-left'>" + csvvalue[4]+"</td><td class='text-left'>" + csvvalue[5] + "</td><td class='text-left'>"+csvvalue[6]+"</td>";
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


                    // add the files to formData object for the data payload
                    formData.append('uploads[]', file, file.name);

                    console.log(file, file.name)
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

                    
                      var appStr ="<tr> <td class='text-left'>"+csvvalue[0] + " </td> <td class='text-left'> "+ csvvalue[1] + "</td> <td class='text-left'>" + csvvalue[2] + "</td> <td class='text-left'>"+ csvvalue[3] +"</td><td class='text-left'>"+ csvvalue[4] +"</td>";
                      $("#demo-datatables-1  > tbody").append(appStr); 


                      console.log(csvvalue.length);
                      for(var i = 1 ; i< csvval.length -1 ; i++)  
                      {
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
                     }
                    
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
              for(var j = 1; j<allconts.length; j++){
                var newallcontacts =  allconts[j].split(",");
                 for(var i =1; i < newallcontacts.length; i++){
                    num1 = newallcontacts[2].replace('(','');
                    num1 = num1.replace(')','');
                    num1 = num1.replace(' ', '');
                    num1 = num1.replace('-', '');
                    mobile="+91" + num1;
                    SMSmsg ="Hello "+newallcontacts[0] +" "+ newallcontacts[1] + ", we still haven't received your " +  newallcontacts[4]+" that expired on "+ newallcontacts[3]+". Please reply to this message with an updated copy or fax to (954) 440-7348. Thank you";
                    var dataS = { Mobile : mobile ,Message :SMSmsg };
                    console.log(mobile);
                    console.log(SMSmsg);
                    $.ajax({
                         type: "POST",
                         data :JSON.stringify(dataS),
                         url: "./SendSMSSingle",
                         contentType: "application/json"
                       }).done(function() {
                        
                      }).fail(function() {
                       
                      });
                 }  
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
           var newmobile;
           
            if ($.trim($('#empPhone').val()).length > 0)
            {                
               
            }   
            else{
              $("#empPhone").val(mobile);
            }

            $("#hidContact").attr("value", $("#empPhone").val());
         
          
        });

       $("#btnSend").click(function (){
          var frommob= $("#lblUsrphn").html();
          var userid= $("#lbluser1").html();
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
              var dataS = {FROM: frommob , Mobile : mobile1 ,Message :SMSmsg, userID : userid};
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


       }); 

  });  

 function getProfile(){
  $.get("/getProfile", function ( data ){
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

    function getMessageContacts()
    {
      $.get( "/getcontacts", function( data ){   

        if(data.success==false){
          $(".messenger-sidebar-body").hide();
        }
        console.log(data);
        if(data.success==true){          
          $.each(data.data, function(index, element){
            var createtag =("<li class='messenger-list-item'><a data='" + element.Mobile+ "' id='"+element.Id+"' class='messenger-list-link' href='#0531871454' data-toggle='tab'><div class='messenger-list-avatar'><img class='rounded' width='40' height='40' src='img/nophoto.jpg' alt='" + element.FirstName + " " + element.LastName + "'></div><div class='messenger-list-details'><div class='messenger-list-date'>jun 22</div> <div class='messenger-list-name'>" + element.FirstName + " "+ element.LastName + "</div><div class='messenger-list-message'><small class='truncate'>dummy message</small></div><input type='hidden' class='hdnServiceCode' name='hiddennumber' value='" + element.Mobile + "'/></div></a></li>");
             $(createtag).insertAfter( $('.messenger-list'));
          
        });           
        $("#messengerlist").fadeIn();
        $("#spinloadcontact").hide();
      }     
    }); 
  } 

   $("ul#msglist").on("click","li.messenger-list-item", function(){
           var mobile = $(this).find("a").attr("data");         
           var newmobile; 
      });

   function getmessngerProfile(){
       $.get( "/getmessngerProfile", function( data ){
          if(data.success==true){
            console.log("data : " + data);
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
              console.log(usrId);
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
        console.log(data.data)      ;
          $.each(data.data, function(index, element){
             
            var createtag =(" <li class='contact-list-item'><a data='" + element.Mobile+ "' id='"+element.Id+"' class='contact-list-link' href='#0531871454' data-toggle='tab'><div class='contact-list-avatar'><img class='rounded' width='40' height='40' src='img/nophoto.jpg' alt='" + element.FirstName + " " + element.LastName + "'></div><div class='contact-list-details'><h5 class='contact-list-name'><span class='truncate'>" + element.FirstName + " "+ element.LastName + "</span></h5><small class='contact-list-email'><span class='truncate'>" + element.Email + "</span></small><input type='hidden' class='hdnServiceCode' name='hiddennumber' value='" + element.Mobile + "'/></div></a></li>");
           
            $(".contact-list-heading").each(function(){
              if($(this).text()==='A' && element.FirstName.substring(0,1)=="A"){    
                $(this).closest(".contact-list-divider").show();                
                $(createtag).insertAfter( $(this).closest(".contact-list-divider") );
              }
              else if($(this).text()==='B' && element.FirstName.substring(0,1)=="B"){    
                $(this).closest(".contact-list-divider").show();                                 
                $(createtag).insertAfter( $(this).closest(".contact-list-divider") );
              }
              else if($(this).text()==='C' && element.FirstName.substring(0,1)=="C"){   
                $(this).closest(".contact-list-divider").show();                                  
                $(createtag).insertAfter( $(this).closest(".contact-list-divider") );
              }
              else if($(this).text()==='D' && element.FirstName.substring(0,1)=="D"){    
                $(this).closest(".contact-list-divider").show();                                 
                $(createtag).insertAfter( $(this).closest(".contact-list-divider") );
              }
              else if($(this).text()==='E' && element.FirstName.substring(0,1)=="E"){  
                $(this).closest(".contact-list-divider").show();                                   
                $(createtag).insertAfter( $(this).closest(".contact-list-divider") );
              }
              else if($(this).text()==='F' && element.FirstName.substring(0,1)=="F"){  
                $(this).closest(".contact-list-divider").show();                                   
                $(createtag).insertAfter( $(this).closest(".contact-list-divider") );
              }
              else if($(this).text()==='G' && element.FirstName.substring(0,1)=="G"){   
                $(this).closest(".contact-list-divider").show();                                  
                $(createtag).insertAfter( $(this).closest(".contact-list-divider") );
              }
              else if($(this).text()==='H' && element.FirstName.substring(0,1)=="H"){   
                $(this).closest(".contact-list-divider").show();                                  
                $(createtag).insertAfter( $(this).closest(".contact-list-divider") );
              }
              else if($(this).text()==='I' && element.FirstName.substring(0,1)=="I"){   
                $(this).closest(".contact-list-divider").show();                                  
                $(createtag).insertAfter( $(this).closest(".contact-list-divider") );
              }
              else if($(this).text()==='J' && element.FirstName.substring(0,1)=="J"){   
                $(this).closest(".contact-list-divider").show();                                  
                $(createtag).insertAfter( $(this).closest(".contact-list-divider") );
              }
              else if($(this).text()==='K' && element.FirstName.substring(0,1)=="K"){  
                $(this).closest(".contact-list-divider").show();                                   
                $(createtag).insertAfter( $(this).closest(".contact-list-divider") );
              }
              else if($(this).text()==='L' && element.FirstName.substring(0,1)=="L"){   
                $(this).closest(".contact-list-divider").show();                                  
                $(createtag).insertAfter( $(this).closest(".contact-list-divider") );
              }
              else if($(this).text()==='M' && element.FirstName.substring(0,1)=="M"){   
                $(this).closest(".contact-list-divider").show();                                  
                $(createtag).insertAfter( $(this).closest(".contact-list-divider") );
              }
              else if($(this).text()==='N' && element.FirstName.substring(0,1)=="N"){  
                $(this).closest(".contact-list-divider").show();                                   
                $(createtag).insertAfter( $(this).closest(".contact-list-divider") );
              }
              else if($(this).text()==='O' && element.FirstName.substring(0,1)=="O"){   
                $(this).closest(".contact-list-divider").show();                                  
                $(createtag).insertAfter( $(this).closest(".contact-list-divider") );
              }
              else if($(this).text()==='P' && element.FirstName.substring(0,1)=="P"){   
                $(this).closest(".contact-list-divider").show();                                  
                $(createtag).insertAfter( $(this).closest(".contact-list-divider") );
              }
              else if($(this).text()==='Q' && element.FirstName.substring(0,1)=="Q"){    
                $(this).closest(".contact-list-divider").show();                                 
                $(createtag).insertAfter( $(this).closest(".contact-list-divider") );
              }
              else if($(this).text()==='R' && element.FirstName.substring(0,1)=="R"){   
                $(this).closest(".contact-list-divider").show();                                  
                $(createtag).insertAfter( $(this).closest(".contact-list-divider") );
              }
              else if($(this).text()==='S' && element.FirstName.substring(0,1)=="S"){  
                $(this).closest(".contact-list-divider").show();                                   
                $(createtag).insertAfter( $(this).closest(".contact-list-divider") );
              }
              else if($(this).text()==='T' && element.FirstName.substring(0,1)=="T"){  
                $(this).closest(".contact-list-divider").show();                                   
                $(createtag).insertAfter( $(this).closest(".contact-list-divider") );
              }
              else if($(this).text()==='U' && element.FirstName.substring(0,1)=="U"){  
                $(this).closest(".contact-list-divider").show();                                   
                $(createtag).insertAfter( $(this).closest(".contact-list-divider") );
              }
              else if($(this).text()==='V' && element.FirstName.substring(0,1)=="V"){  
                $(this).closest(".contact-list-divider").show();                  
                $(createtag).insertAfter( $(this).closest(".contact-list-divider") );
              }
              else if($(this).text()==='W' && element.FirstName.substring(0,1)=="W"){   
                $(this).closest(".contact-list-divider").show();                                  
                $(createtag).insertAfter( $(this).closest(".contact-list-divider") );
              }
              else if($(this).text()==='X' && element.FirstName.substring(0,1)=="X"){   
                $(this).closest(".contact-list-divider").show();                                  
                $(createtag).insertAfter( $(this).closest(".contact-list-divider") );
              }
              else if($(this).text()==='V' && element.FirstName.substring(0,1)=="V"){   
                $(this).closest(".contact-list-divider").show();                                  
                $(createtag).insertAfter( $(this).closest(".contact-list-divider") );
              }
              else if($(this).text()==='Z' && element.FirstName.substring(0,1)=="Z"){   
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