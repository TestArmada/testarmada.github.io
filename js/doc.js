// Handle encapsulation

(function () {

  // Expand automatically if current page is a sublink
  $('.sidebar').find('.sidebar__file-sublink').each(function () {

    var sublinkTitle = encodeURIComponent($(this).text().trim());
    if (window.location.href.indexOf(sublinkTitle) >= 0) {

      // Show current
      $(this).css('display', 'block');

      // Show all sublinks before current
      var encapReached = false;
      $(this).parent().prevAll().each(function () {
        if ($(this).find('.sidebar__file-sublink').length && !encapReached) {
          $(this).find('.sidebar__file-sublink').css('display', 'block');
        } else {
          encapReached = true;
        }
      });

      // Show all sublinks after current
      var endOfSublinks = false;
      $(this).parent().nextAll().each(function () {
        if ($(this).find('.sidebar__file-sublink').length && !endOfSublinks) {
          $(this).find('.sidebar__file-sublink').css('display', 'block');
        } else {
          endOfSublinks = true;
        }
      });

    } // end if

  });

  // Open first sublink if encapsulating title is clicked
  $('li.sidebar__file-links').click(function () {
    window.location = $(this).nextAll().find('.sidebar__file-sublink').first().attr('href');
  });

})();

// Make sidebar sticky depending on scroll
$(document).ready(function () {
  var sidebarOffsetTop = $('.sidebar').offset().top;
  $(window).scroll(function () {
    var distanceFromTop = $(document).scrollTop();
    if (distanceFromTop >= sidebarOffsetTop) {
      $('.sidebar').addClass('sticky');
    } else {
      $('.sidebar').removeClass('sticky');
    }
  });
});
