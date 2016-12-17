'use strict';

(function ($) {
    $(".spinner").hide(); //$("#fileInput")[0].files[0]

    $(document).on('click', '.contact-list-link', function(){
      var id= $(this).attr("Id");
      $.get( './getSinglecontact', {  Id : id} , function(data){
       $.each(data,function(index, element){  
        $("#lblSuccess").html('');    
        $("#lblfail").html('');                 
        $("#c_f_name").val(element.FirstName);
        $("#c_m_name").val(element.MiddleNamw);
        $("#c_l_name").val(element.LastName);
        $("#c_email").val(element.Email);
        $("#c_mobile").val(element.Mobile);
        $("#c_JobTitleText").val(element.jobTitle);
        $("#txtPlaces").val(element.Location);
        $("#c_notes").val(element.Notes);
        $("#c_name").html(element.FirstName+" "+ element.MiddleName +" "+element.LastName);
        $("#c_JobTitle").html(element.jobTitle);
        if(element.ProfilePic != null)
          $("#c_img").attr("src",element.ProfilePic);

        $("#hidId").val (element.Id);
        var hfval = $("#hidId").attr ("value");  
      });
     })
      $("#contctSettings").hide();
      $("#0531871454").show();
    });


   // $("#impcontUpload").change(function() {
     //var filename =   $('#iupload').val().replace(/C:\\fakepath\\/i, '');
    // alert(filename);
    
    //});

     
  

    $("#btnUpContact").click(function () {
     var f_name = $("#c_f_name").val();
     var m_name = $("#c_m_name").val();
     var l_name = $("#c_l_name").val();
     var emailadd = $("#c_email").val();
     var mobile = $("#c_mobile").val();
     var j_title = $("#c_JobTitleText").val();
     var c_comp = $("#txtPlaces").val();
     var notes = $("#c_notes").val();
     var id = $("#hidId").attr ("value");
     var dataS= {F_name : f_name, M_name : m_name, L_name : l_name, Emailadd : emailadd, Mobile : mobile, J_title : j_title, Location : c_comp, Notes : notes,Id : id };
             //$(".spinner").show();  
      $.ajax({
          type: "POST",
          data :JSON.stringify(dataS),
          url: "./updateContact",
          contentType: "application/json",
          success: function( data ){
            if(data.success==true){
              $("#lblSuccess").html("Contact Saved Successfully");
            }
            else
            {
              $("#lblfail").html(data.status);            
            }
          },
          error: function( data ){
            $("#lblfail").html(data.status);      
          }          
      });
    });

    $("#btnCancel").click(function (){
      $("#0531871454").hide();
      $("#contctSettings").show();
    });

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

     // if ($item.hasClass(this.CssClasses.ACTIVE)) $item.removeClass(this.CssClasses.ACTIVE);

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
