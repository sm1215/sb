var site = {
  selectors: ['nav'],
  els: {},
  debounceTimeout: null,

  init: function() {
    this.findEls();
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
  }

}
