(function($) {

  $(document).ready(function () {
     
  });

   


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
        }).done(function() {
          $('#f_name').val('');
          $('#m_name').val('');
          $('#l_name').val('');
          $('#emailadd').val('');
          $('#mobile').val('');
          $('#j_title').val('');
          $('#employer').val('');
          $('#notes').val('');
          $("#lblSucess").val("Contact Saved Successfully");

        }).fail(function() {
          $("#lbllblfail").val("error occured during process.");
       });      
     });
      


  'use strict';


       
      

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
  

})(jQuery);
