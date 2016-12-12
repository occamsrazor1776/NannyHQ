'use strict';

(function ($) {
  $(document).ready(function(){   
 
      $.get( "/getcontacts", function( data ){
        $.each(data, function(index, element){
         
         var createtag =(" <li class='contact-list-item'><a id='"+element.Id+"' class='contact-list-link' href='#0531871454' data-toggle='tab'><div class='contact-list-avatar'><img class='rounded' width='40' height='40' src='img/3002121059.jpg' alt='" + element.FirstName + " " + element.LastName + "'></div><div class='contact-list-details'><h5 class='contact-list-name'><span class='truncate'>" + element.FirstName + " "+ element.LastName + "</span></h5><small class='contact-list-email'><span class='truncate'>" + element.Email + "</span></small></div></a></li>");
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
      }); 
  

         $(document).on('click', '.contact-list-link', function(){
              var id= $(this).attr("Id");
              $.get( './getSinglecontact', {  Id : id} , function(data){
                 $.each(data,function(index, element){
                    $("#c_f_name").val(element.FirstName);
                    $("#c_m_name").val(element.MiddleNamw);
                    $("#c_l_name").val(element.LastName);
                    $("#c_email").val(element.Email);
                    $("#c_mobile").val(element.Mobile);
                    $("#c_JobTitleText").val(element.jobTitle);
                    $("#c_company").val(element.Employer);
                    $("#c_notes").val(element.Notes);
                    $("#c_name").html(element.FirstName+" "+ element.MiddleNamw +" "+element.LastName);
                    $("#c_JobTitle").html(element.jobTitle);
                    $("#hidId").val (element.Id);
                    var hfval = $("#hidId").attr ("value");                 
                 });
              })
           });

         $("#btnUpContact").click(function () {
            var f_name = $("#c_f_name").val();
                 var m_name = $("#c_m_name").val();
                 var l_name = $("#c_l_name").val();
                 var emailadd = $("#c_email").val();
                 var mobile = $("#c_mobile").val();
                 var j_title = $("#c_JobTitleText").val();
                 var c_comp = $("#c_company").val();
                 var notes = $("#c_notes").val();
                 var id = $("#hidId").attr ("value");
                 var dataS= {F_name : f_name, M_name : m_name, L_name : l_name, Emailadd : emailadd, Mobile : mobile, J_title : j_title, Employer : c_comp, Notes : notes,Id : id };
                   $.ajax({
                    type: "POST",
                    data :JSON.stringify(dataS),
                    url: "./updateContact",
                    contentType: "application/json"
                  }).done(function() {                   
                    //$("#lblSucess").val("Contact Saved Successfully");
                  }).fail(function() {
                   // $("#lbllblfail").val("error occured during process.");
                 });
         });
              
    });


    
  
  

     
   

  "use strict";

  var Contacts = {
    Constants: {
      MEDIA_QUERY_BREAKPOINT: '992px'
    },
    CssClasses: {
      CONTACT_LIST: 'contact-list',
      CONTACT_LIST_ITEM: 'contact-list-item',
      CONTACT_LIST_LINK: 'contact-list-link',
      CONTACT_CONTENT: 'contact-content',
      ACTIVE: 'active',
      HOVER: 'hover'
    },
    init: function init() {
      this.$window = $(window);
      this.$list = $('.' + this.CssClasses.CONTACT_LIST);
      this.$items = $('.' + this.CssClasses.CONTACT_LIST_ITEM);
      this.$links = $('.' + this.CssClasses.CONTACT_LIST_LINK);
      this.$content = $('.' + this.CssClasses.CONTACT_CONTENT);
      this.$backBtns = this.$content.find('[data-toggle="tab"]');
      this.breakpoint = null;

      this.bindEvents();
    },
    bindEvents: function bindEvents() {
      this.$items.on('mouseenter.e.contact', this.handleItemMouseEnter.bind(this));
      this.$items.on('mouseleave.e.contact', this.handleItemMouseLeave.bind(this));

      this.$links.on('click.e.contact', this.handleLinkClick.bind(this));
      this.$links.add(this.$backBtns).on('shown.bs.tab', this.handleTabShown.bind(this));

      this.breakpoint = window.matchMedia('(max-width: ' + this.Constants.MEDIA_QUERY_BREAKPOINT + ')');
      this.breakpoint.addListener(this.handleMediaQueryChange.bind(this));
    },
    handleItemMouseEnter: function handleItemMouseEnter(evt) {
      $(evt.currentTarget).addClass(this.CssClasses.HOVER);
    },
    handleItemMouseLeave: function handleItemMouseLeave(evt) {
      $(evt.currentTarget).removeClass(this.CssClasses.HOVER);
    },
    handleLinkClick: function handleLinkClick(evt) {
      var $link = $(evt.currentTarget),
          $item = $link.closest('.' + this.CssClasses.CONTACT_LIST_ITEM);

      if ($item.hasClass(this.CssClasses.ACTIVE)) $item.removeClass(this.CssClasses.ACTIVE);

      this.rememberScrollbarPos();
    },
    handleTabShown: function handleTabShown(evt) {
      var $trigger = $(evt.currentTarget),
          $activeLink = this.getActiveLink();

      if (!$trigger.is($activeLink)) {
        this.scrollTo(this.rememberedScrollbarPos());
      } else {
        this.scrollTo(0);
      }
    },
    handleMediaQueryChange: function handleMediaQueryChange(evt) {
      var $target = this[this.mediaQueryMatches() ? 'getBackBtn' : 'getActiveLink']();

      $target.length && $target.trigger('click');
    },
    mediaQueryMatches: function mediaQueryMatches() {
      return this.breakpoint.matches;
    },
    rememberScrollbarPos: function rememberScrollbarPos() {
      this.ypos = this.$window.scrollTop();
    },
    rememberedScrollbarPos: function rememberedScrollbarPos() {
      return this.ypos;
    },
    getActiveItem: function getActiveItem() {
      return this.$items.filter('.' + this.CssClasses.ACTIVE);
    },
    getActiveContact: function getActiveContact() {
      return this.$content.filter('.' + this.CssClasses.ACTIVE);
    },
    getActiveLink: function getActiveLink() {
      var $activeItem = this.getActiveItem();
      return $activeItem.find('[data-toggle="tab"]');
    },
    getBackBtn: function getBackBtn() {
      var $activeTab = this.getActiveContact();
      return $activeTab.find('[data-toggle="tab"]');
    },
    scrollTo: function scrollTo(ypos) {
      this.$window.scrollTop(ypos);
    }
  };

  Contacts.init();
})(jQuery);
