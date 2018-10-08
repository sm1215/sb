window.addEventListener('DOMContentLoaded', function() {
  site.init();
});
window.addEventListener('scroll', function(e) {
  site.debounce(
    site.scroll.bind(this, e), 
    300
  );
});