// When the user scrolls down 50px from the top of the document, resize the header's font size
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    document.getElementById("header").style.fontSize = "5.5vw";
  } else {
    document.getElementById("header").style.fontSize = "9vw";
  }
}