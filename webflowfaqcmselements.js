$('.faqtext').each(function () {
    let currentElement = $(this);
    let currentElementtext = '#' + currentElement.parent().siblings().text();
    if (location.hash != null && location.hash != "") { // Checks if the current elements hashname matches the the URL hash.
      if (currentElementtext === location.hash) { // If it matches, the element will be shown.
        currentElement.show(); // Shows the element which is in the URL.
      }
    }
  }
  );
  $('.faqbutton').on('click', function (event) { // Adding the on click function to the faqbutton
    // Add hash (#) to URL after click
    let newHash = "#" + $(this).parent().siblings().text();
    if (history.pushState) {
      history.pushState(null, null, newHash);
    }
    else {
      location.hash = newHash;
    }
  });
  $('.faqbutton').on('click', function () {
    // Hides every faqtext
    $('.faqtext').each(function () {
      let currentElement = $(this);
      currentElement.slideUp(400);
      let element = currentElement.siblings().children('img'); // Select arrow element
      element.css({
        transform: 'rotate(0deg)', // Rotate it back to 0 degrees
        transition: 'all 0.4s' // Transition time 0.4s which is the same as the slide
      });
    });
    // Shows or hides the div which contains the faqtext.
    if ($(this).siblings('div').is(":hidden")) {
      $(this).siblings('div').slideDown(400); // Shows faqtext. 
      let element = $(this).children('img'); // Select arrow element 
      element.css({
        transform: 'rotate(180deg)', // Rotate it to 90 degrees.
        transition: 'all 0.4s' // Transition time 0.4s which is the same as the slide
      });
    } else {
      $(this).siblings('div').slideUp(400); // Hides faqtext
      let element = $(this).children('img'); // Select arrow element
      element.css({
        transform: 'rotate(0deg)', // Rotate it back to 0 degrees
        transition: 'all 0.4s' // Transition time 0.4s which is the same as the slide
      });
    }
  });