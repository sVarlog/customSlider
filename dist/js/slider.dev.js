"use strict";

function initCustomSlider(_ref) {
  var arrows = _ref.arrows,
      dots = _ref.dots,
      section = _ref.section,
      _ref$transition = _ref.transition,
      transition = _ref$transition === void 0 ? 500 : _ref$transition,
      _ref$touches = _ref.touches,
      touches = _ref$touches === void 0 ? true : _ref$touches,
      _ref$autoplay = _ref.autoplay,
      autoplay = _ref$autoplay === void 0 ? false : _ref$autoplay,
      _ref$timerTime = _ref.timerTime,
      timerTime = _ref$timerTime === void 0 ? 10000 : _ref$timerTime;

  try {
    var slider = document.querySelector("".concat(section)),
        sliderWrapp = slider.querySelector('.sliderWrapp'),
        sliderInner = sliderWrapp.querySelector('.sliderInner'),
        sliderItems = sliderInner.querySelectorAll('.item');
    var arrowsState = null,
        dotsState = null,
        timer = null,
        firstClone = null,
        lastClone = null,
        transitionTime = transition / 1000,
        currStep = 1,
        swipeState = 0;

    if (sliderItems.length > 1) {
      sliderInner.style.width = "".concat(sliderItems.length * 100 + 200, "%");
      firstClone = sliderItems[0].cloneNode(true), lastClone = sliderItems[sliderItems.length - 1].cloneNode(true);
      sliderInner.append(firstClone);
      sliderInner.prepend(lastClone);
      new Promise(function (resolve, reject) {
        setTimeout(function () {
          sliderInner.style.transition = '0s';
        }, 0);
      }).then(setTimeout(function () {
        sliderInner.style.transform = "translateX(-".concat(currStep * sliderItems[0].offsetWidth, "px)");
      }, 0)).then(setTimeout(function () {
        sliderInner.style.transition = "".concat(transitionTime, "s");
      }, 200));
    } else {
      sliderInner.style.width = "".concat(sliderItems.length * 100, "%");
    }

    if (arrows == true) {
      var arrowsArea = document.createElement('div'),
          arrPrev = document.createElement('div'),
          arrNext = document.createElement('div');
      arrowsArea.classList.add('arrows');
      arrPrev.classList.add('arrPrev');
      arrNext.classList.add('arrNext');
      arrowsArea.append(arrPrev, arrNext);
      slider.append(arrowsArea);
      arrowsState = arrowsArea;
    }

    if (dots == true) {
      var dotsArea = document.createElement('div');
      dotsArea.classList.add('dots');

      for (var i = 0; i < sliderItems.length; i++) {
        var dot = document.createElement('div');
        dot.setAttribute('data-dot', i);
        dot.classList.add('dot');

        if (i == 0) {
          dot.classList.add('active');
        }

        dotsArea.append(dot);
      }

      slider.append(dotsArea);
      dotsState = dotsArea;
    }

    var events = function events() {
      var changeDot = function changeDot(num) {
        if (dotsState) {
          var _dots = dotsState.querySelectorAll('.dot');

          _dots.forEach(function (el) {
            el.classList.remove('active');

            if (el.dataset.dot == num) {
              el.classList.add('active');
            }
          });
        }
      };

      var autoplayInit = function autoplayInit() {
        if (timer) {
          clearInterval(timer);
        }

        timerInit();
      };

      var changeSlide = function changeSlide(num) {
        if (num == 'next') {
          currStep += 1;

          if (currStep == sliderItems.length) {
            new Promise(function (resolve, reject) {
              resolve(setTimeout(function () {
                sliderInner.style.transform = "translateX(".concat(-(sliderWrapp.offsetWidth * currStep), "px)");
                changeDot(sliderItems.length - 1);
              }, 0));
            }).then(new Promise(function (resolve, reject) {
              resolve(setTimeout(function () {
                currStep = 0;
                sliderInner.style.transition = '0s';
                sliderInner.style.transform = "translateX(".concat(-(sliderWrapp.offsetWidth * currStep), "px)");
              }, transition));
            })).then(sliderInner.style.transition = "".concat(transitionTime, "s"));
          } else if (currStep < sliderItems.length) {
            sliderInner.style.transition = "".concat(transitionTime, "s");
            sliderInner.style.transform = "translateX(".concat(-(sliderWrapp.offsetWidth * currStep), "px)");

            if (dotsState) {
              changeDot(currStep - 1);
            }
          }

          if (autoplay) {
            autoplayInit();
          }
        } else if (num == 'prev') {
          currStep -= 1;

          if (currStep <= 0) {
            new Promise(function (resolve, reject) {
              resolve(setTimeout(function () {
                sliderInner.style.transform = "translateX(".concat(-(sliderWrapp.offsetWidth * currStep), "px)");
                changeDot(sliderItems.length - 1);
              }, 0));
            }).then(new Promise(function (resolve, reject) {
              resolve(setTimeout(function () {
                currStep = sliderItems.length;
                sliderInner.style.transition = '0s';
                sliderInner.style.transform = "translateX(".concat(-(sliderWrapp.offsetWidth * currStep), "px)");
              }, transition));
            })).then(sliderInner.style.transition = "".concat(transitionTime, "s"));
          } else if (currStep > 0) {
            sliderInner.style.transition = "".concat(transitionTime, "s");
            sliderInner.style.transform = "translateX(".concat(-(sliderWrapp.offsetWidth * currStep), "px)");

            if (dotsState) {
              changeDot(currStep - 1);
            }
          }

          if (autoplay) {
            autoplayInit();
          }
        } else if (typeof num === 'number') {
          sliderInner.style.transform = "translateX(".concat(-(sliderWrapp.offsetWidth * (num + 1)), "px)");
          changeDot(num);
        }

        swipeState = 1;
      };

      var timerInit = function timerInit() {
        timer = setInterval(function () {
          changeSlide('next');
        }, timerTime);
      };

      var startX;

      var touchesInit = function touchesInit() {
        sliderInner.querySelectorAll('.item').forEach(function (el) {
          el.addEventListener('touchstart', function (e) {
            touchMove(el, e);
            clearInterval(timer);
          });
          el.addEventListener('touchend', function (e) {
            swipeState = 0;

            if (autoplay) {
              autoplayInit();
            }
          });
        });

        function touchMove(el, e) {
          startX = e.touches[0].pageX;

          var moveInit = function moveInit(ev) {
            var newPosX = ev.touches[0].pageX;

            if (newPosX < startX - 75) {
              if (swipeState == 0) {
                changeSlide('next');
                el.removeEventListener('touchmove', function (ev) {
                  moveInit(ev);
                });
              }
            } else if (newPosX > startX + 75) {
              if (swipeState == 0) {
                changeSlide('prev');
                el.removeEventListener('touchmove', function (ev) {
                  moveInit(ev);
                });
              }
            }
          };

          el.addEventListener('touchmove', function (ev) {
            moveInit(ev);
          });
        }
      };

      if (touches) {
        touchesInit();
      }

      if (arrowsState) {
        var _arrPrev = arrowsState.querySelector('.arrPrev'),
            _arrNext = arrowsState.querySelector('.arrNext');

        _arrNext.addEventListener('click', function () {
          changeSlide('next');
        });

        _arrPrev.addEventListener('click', function () {
          changeSlide('prev');
        });
      }

      if (dotsState) {
        var _dots2 = dotsState.querySelectorAll('.dot');

        _dots2.forEach(function (el) {
          el.addEventListener('click', function () {
            changeSlide(+el.dataset.dot);
          });
        });
      }

      if (autoplay) {
        timerInit();
      }
    };

    events();
  } catch (e) {
    console.log(e);
  }
}