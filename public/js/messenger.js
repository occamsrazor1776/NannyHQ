(function($) {
  "use strict";

  $(document).ready(function (){

  

                      
});

  var Messenger = {
    Constants: {
      CUSTOM_SCROLLBAR_ALWAYS_VISIBLE: true,
      CUSTOM_SCROLLBAR_DISTANCE: '4px',
      CUSTOM_SCROLLBAR_HEIGHT: '100%',
      CUSTOM_SCROLLBAR_SIZE: '7px',
      CUSTOM_SCROLLBAR_START: 'bottom',
      CUSTOM_SCROLLBAR_WIDTH: '100%',
      MEDIA_QUERY_BREAKPOINT: '992px'
    },
    CssClasses: {
      LAYOUT: 'layout',
      LAYOUT_HEADER: 'layout-header',

      MESSENGER_LIST: 'messenger-list',
      MESSENGER_LIST_ITEM: 'messenger-list-item',
      MESSENGER_LIST_LINK: 'messenger-list-link',
      MESSENGER_CONTENT: 'messenger-content',
      MESSENGER_SCROLLABLE_CONTENT: 'messenger-scrollable-content',

      CUSTOM_SCROLLBAR: 'messenger-scrollbar',
      CUSTOM_SCROLLBAR_BAR: 'messenger-scrollbar-gripper',
      CUSTOM_SCROLLBAR_RAIL: 'messenger-scrollbar-track',
      CUSTOM_SCROLLBAR_WRAPPER: 'messenger-scrollable-area',

      ACTIVE: 'active',
      HOVER: 'hover'
    },
    KeyCodes: {
      OPEN_SQUARE_BRACKET: 219,
      CLOSE_SQUARE_BRACKET: 221,
    },
    init: function() {
      this.$window    = $(window);
      this.$offset    = $('.' + this.CssClasses.LAYOUT_HEADER);
      this.$list      = $('.' + this.CssClasses.MESSENGER_LIST);
      this.$items     = $('.' + this.CssClasses.MESSENGER_LIST_ITEM);
      this.$links     = $('.' + this.CssClasses.MESSENGER_LIST_LINK);
      this.$content   = $('.' + this.CssClasses.MESSENGER_CONTENT);
      this.$backBtns  = this.$content.find('[data-toggle="tab"]');
      this.breakpoint = null;

      this.bindEvents();
    },
    bindEvents: function() {
      this.$items.on('mouseenter.e.messenger', this.handleItemMouseEnter.bind(this));
      this.$items.on('mouseleave.e.messenger', this.handleItemMouseLeave.bind(this));

      this.$links.on('click.e.messenger', this.handleLinkClick.bind(this));
      this.$window.on('resize.e.messenger', this.handleWindowResize.bind(this));

      this.$links.add(this.$backBtns)
        .on('shown.bs.tab', this.handleTabShown.bind(this))
        .on('hidden.bs.tab', this.handleTabHidden.bind(this));

      this.breakpoint = window.matchMedia('(max-width: ' + this.Constants.MEDIA_QUERY_BREAKPOINT + ')');
      this.breakpoint.addListener(this.handleMediaQueryChange.bind(this));
    },
    handleItemMouseEnter: function(evt) {
      $(evt.currentTarget).addClass(this.CssClasses.HOVER);
    },
    handleItemMouseLeave: function(evt) {
      $(evt.currentTarget).removeClass(this.CssClasses.HOVER);
    },
    handleLinkClick: function(evt) {
      var $link = $(evt.currentTarget),
          $item = $link.closest('.' + this.CssClasses.MESSENGER_LIST_ITEM);

      if ($item.hasClass(this.CssClasses.ACTIVE))
        $item.removeClass(this.CssClasses.ACTIVE);

      this.rememberScrollbarPos();
    },
    handleWindowResize: function(evt) {
      this.adjustActiveConversation();
      this.updateCustomScrollBar();
    },
    handleTabShown: function(evt) {
      var $trigger  = $(evt.currentTarget),
        $activeLink = this.getActiveLink();

      if ($trigger.is($activeLink)) {
        var $scrollableArea = this.getScrollableArea();

        this.adjustActiveConversation();
        this.addCustomScrollbarTo($scrollableArea);
      } else {
        this.scrollTo(this.rememberedScrollbarPos());
      }
    },
    handleTabHidden: function(evt) {
      var $trigger = $(evt.currentTarget),
          $prevTab = $($trigger.attr('href')),
          $scrollableArea = $prevTab.find(
            '.' + this.CssClasses.MESSENGER_SCROLLABLE_CONTENT);

      $prevTab.removeAttr('style');
      this.removeCustomScrollbarFrom($scrollableArea);
    },
    handleMediaQueryChange: function(evt) {
      var $target = this[this.mediaQueryMatches() ?
        'getBackBtn' : 'getActiveLink']();

      $target.length && $target.trigger('click');
      this.resetActiveConversation();
    },
    mediaQueryMatches: function() {
      return this.breakpoint.matches;
    },
    rememberScrollbarPos: function() {
      this.ypos = this.$window.scrollTop();
    },
    rememberedScrollbarPos: function() {
      return this.ypos;
    },
    getActiveItem: function() {
      return this.$items.filter('.' + this.CssClasses.ACTIVE);
    },
    getActiveConversation: function() {
      return this.$content.filter('.' + this.CssClasses.ACTIVE);
    },
    getActiveLink: function() {
      var $activeItem = this.getActiveItem();
      return $activeItem.find('[data-toggle="tab"]');
    },
    getBackBtn: function() {
      var $activeConversation = this.getActiveConversation();
      return $activeConversation.find('[data-toggle="tab"]');
    },
    getScrollableArea: function() {
      var $activeConversation = this.getActiveConversation();
      return $activeConversation.find('.' + this.CssClasses.MESSENGER_SCROLLABLE_CONTENT);
    },
    adjustActiveConversation: function() {
      var $activeConversation = this.getActiveConversation();

      if (this.mediaQueryMatches() && $activeConversation.length)
        $activeConversation.height(this.calculateTabHeight())
    },
    resetActiveConversation: function() {
      var $activeConversation = this.getActiveConversation();
      $activeConversation.length && $activeConversation.removeAttr('style');
    },
    addCustomScrollbarTo: function($el) {
      $el.slimScroll(this.getCustomScrollbarOptions());
    },
    updateCustomScrollBar: function() {
      var $target = this.getScrollableArea(),
          options = this.getCustomScrollbarOptions();

      $target.slimScroll(options);
    },
    removeCustomScrollbarFrom: function($el) {
      var options = this.getCustomScrollbarOptions();
      options.destroy = true;

      $el.slimScroll(options).off()
        .removeAttr('style');
    },
    scrollTo: function(ypos) {
      this.$window.scrollTop(ypos);
    },
    calculateTabHeight: function() {
      var height = this.$window.height(),
          offset = this.$offset.height();

      return height - offset;
    },
    getCreateOptions: function(prefix, callback) {
      var regex = new RegExp('^' + prefix + '(_)?', 'i'),
        options = {};

      $.each(this, function(prop, obj) {
        if (!$.isPlainObject(obj)) return;

        $.each(obj, function(key, val) {
          if (regex.test(key)) {
            key = key.replace(regex, '').replace(/_/g, '-');
            key = $.camelCase(key.toLowerCase());

            (callback && callback(options, prop, key, val)) ||
            (options[key] = val);
          }
        });
      });

      return options;
    },
    getCustomScrollbarOptions: function() {
      return this.getCreateOptions('custom_scrollbar',
        function(options, prop, key, val) {
          key = prop === 'CssClasses' ? key + 'Class' : key;
          return (options[key] = val);
        });
    }
  };

  Messenger.init();

})(jQuery);
