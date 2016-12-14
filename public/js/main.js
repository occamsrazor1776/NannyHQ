  'use strict';

  $(document).ready(function () { 
      $(".contact-list-divider").hide();

     $("#btnSave").click(function(){ 
        var f_name = $("#f_name").val();
        var m_name = $("#m_name").val();
        var l_name = $("#l_name").val();
        var emailadd = $("#emailadd").val();
        var mobile = $("#mobile").val();
        var j_title = $("#j_title").val();
        var location = $("#txtPlaces").val();
        var notes = $("#notes").val();    
        var dataS= {F_name : f_name, M_name : m_name, L_name : l_name, Emailadd : emailadd, Mobile : mobile, J_title : j_title, Location : location, Notes : notes};
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
     
  });      

  function getContacts()
  {
      $.get( "/getcontacts", function( data ){   

        if(data.success==false){
          $(".contact-sidebar-body").hide();
        }

        if(data.success==true){          
          $.each(data.data, function(index, element){
            var createtag =(" <li class='contact-list-item'><a id='"+element.Id+"' class='contact-list-link' href='#0531871454' data-toggle='tab'><div class='contact-list-avatar'><img class='rounded' width='40' height='40' src='img/nophoto.jpg' alt='" + element.FirstName + " " + element.LastName + "'></div><div class='contact-list-details'><h5 class='contact-list-name'><span class='truncate'>" + element.FirstName + " "+ element.LastName + "</span></h5><small class='contact-list-email'><span class='truncate'>" + element.Email + "</span></small><input type='hidden' class='hdnServiceCode' name='hiddennumber' value='" + element.Mobile + "'/></div></a></li>");
           
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
