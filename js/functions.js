var site = {
  selectors: ['nav', '.glider'],
  els: {},
  debounceTimeout: null,
  navHover: false,
  navTimer: undefined,

  init: function() {
    this.findEls();
    this.scroll();
    this.navLeave();
  },

  findEls: function() {
    this.selectors.forEach(function(selector) {
      var pattern = new RegExp(/[.#\s]/g);
      var key = selector.replace(pattern, '');
      var selected = document.querySelectorAll(selector);      
      selected.length > 1 ? site.els[key] = selected : site.els[key] = selected[0];
    });
  },

  debounce: function(func, wait, immediate) {
    return function() {
      var context = this,
        args = arguments;
      
      var later = function() {
        site.debounceTimeout = null;        
        if (!immediate) {
          func.apply(context, args);
        }
      };

      var callNow = immediate && !site.debounceTimeout;
      clearTimeout(site.debounceTimeout);
      site.debounceTimeout = setTimeout(later, wait);

      if (callNow) {
        func.apply(context, args);
      }
    }.apply(func);
  },

  scroll: function(event) {
    var verticalOffset = window.pageYOffset 
    || document.documentElement.scrollTop 
    || document.body.scrollTop || 0;
    
    if (site.els.nav) {
      var action;
      verticalOffset > 0 ? action = 'add' : action = 'remove';
      site.els.nav.classList[action]('on');
    }
  },

  navEnter: function(e) {
    site.navHover = true;
    var bg = $(e.target).find('.bg');
    site.moveGlider(bg);

    if (site.navTimer) {
      window.clearTimeout(site.navTimer);
    }
  },

  navLeave: function(e) {
    if (!site.navHover) {
      var active = $(site.els.nav).find('.active .bg');
      site.moveGlider(active);
    } else {
      site.navTimer = setTimeout(function() {
        site.navHover = false;
        site.navLeave();
      }, 750);
    }
  },

  moveGlider: function(target) {
    var pageOffset = $(target).offset().left;
    var relativeOffset = parseInt($(target).css('left')) || Math.abs($(target).position().left);
    var left =  pageOffset + relativeOffset;
    var width = $(target).width();

    $(site.els.glider).animate({
      left: left + 'px',
      width: width + 'px'
    }, 200);
  }
}
