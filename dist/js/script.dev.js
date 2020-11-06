"use strict";

document.addEventListener('DOMContentLoaded', function () {
  initCustomSlider({
    section: '.customSlider',
    arrows: true,
    dots: true,
    transition: 500,
    autoplay: false,
    timerTime: 5000,
    touches: true
  });
});