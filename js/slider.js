function initCustomSlider({arrows, dots, section, transition = 1000, autoplay, timerTime = 10000}) {
    try{
        const slider = document.querySelector(`${section}`),
              sliderWrapp = slider.querySelector('.sliderWrapp'),
              sliderInner = sliderWrapp.querySelector('.sliderInner'),
              sliderItems = sliderInner.querySelectorAll('.item');
        let arrowsState = null,
            dotsState = null,
            timer = null,
            firstClone = null,
            lastClone = null,
            transitionTime = transition / 1000,
            currStep = 1;

        if(sliderItems.length > 1) {
            sliderInner.style.width = `${(sliderItems.length * 100) + 200}%`;
            firstClone = sliderItems[0].cloneNode(true),
            lastClone = sliderItems[sliderItems.length - 1].cloneNode(true);
            sliderInner.append(firstClone);
            sliderInner.prepend(lastClone);
            new Promise((resolve, reject) => {
                setTimeout(() => {
                    sliderInner.style.transition = '0s';
                }, 0)
            })
            .then(
                setTimeout(() => {
                    sliderInner.style.transform = `translateX(-${currStep * sliderItems[0].offsetWidth}px)`;
                }, 0)
            )
            .then(
                setTimeout(() => {
                    sliderInner.style.transition = `${transitionTime}s`;
                }, 200)
            )
        } else {
            sliderInner.style.width = `${sliderItems.length * 100}%`;
        }

        if(arrows == true) {
            let arrowsArea = document.createElement('div'),
                arrPrev = document.createElement('div'),
                arrNext = document.createElement('div');
            arrowsArea.classList.add('arrows');
            arrPrev.classList.add('arrPrev');
            arrNext.classList.add('arrNext');
            arrowsArea.append(arrPrev, arrNext);
            slider.append(arrowsArea);
            arrowsState = arrowsArea;
        }

        if(dots == true) {
            let dotsArea = document.createElement('div');
            dotsArea.classList.add('dots');
            for (let i = 0; i < sliderItems.length; i++) {
                let dot = document.createElement('div');
                dot.setAttribute('data-dot', i);
                dot.classList.add('dot');
                if(i == 0){
                    dot.classList.add('active');
                }
                dotsArea.append(dot);
            }
            slider.append(dotsArea);
            dotsState = dotsArea;
        }

        const events = () => {
            const changeDot = (num) => {
                if(dotsState) {
                    let dots = dotsState.querySelectorAll('.dot');
                    dots.forEach(el => {
                        el.classList.remove('active');
                        if(el.dataset.dot == num) {
                            el.classList.add('active');
                        }
                    });
                }
            };

            const changeSlide = (num) => {
                const autoplayInit = () => {
                    clearInterval(timer);
                    timer = setInterval(() => {
                        changeSlide('next');
                    }, timerTime);
                };

                if(num == 'next') {
                    currStep += 1;
                    if(currStep > sliderItems.length) {
                        currStep = 0;
                    }
                    if(currStep == sliderItems.length) {
                        new Promise((resolve, reject) => {
                            setTimeout(() => {
                                sliderInner.style.transform = `translateX(${-(sliderWrapp.offsetWidth * currStep)}px)`;                
                                changeDot(currStep - 1);
                            }, 0)
                        }).then(
                            setTimeout(() => {
                                currStep = 0;
                                sliderInner.style.transition = '0s';
                                sliderInner.style.transform = `translateX(${-(sliderWrapp.offsetWidth * currStep)}px)`;
                            },  transition)
                        ).then(
                            setTimeout(() => {
                                sliderInner.style.transition = `${transitionTime}s`;
                            }, (transition + 50))
                        )
                    } else if(currStep < sliderItems.length) {
                        sliderInner.style.transform = `translateX(${-(sliderWrapp.offsetWidth * currStep)}px)`;
                        if(dotsState) {
                            changeDot(currStep - 1);
                        }
                    }
                    if(autoplay) {
                        autoplayInit();
                    }
                } else if(num == 'prev') {
                    currStep -= 1;
                    if(currStep == 0) {
                        new Promise((resolve, reject) => {
                            setTimeout(() => {
                                sliderInner.style.transform = `translateX(${-(sliderWrapp.offsetWidth * currStep)}px)`;                
                                changeDot(sliderItems.length - 1);
                                console.log(sliderItems.length);
                            }, 0)
                        }).then(
                            setTimeout(() => {
                                currStep = sliderItems.length;
                                sliderInner.style.transition = '0s';
                                sliderInner.style.transform = `translateX(${-(sliderWrapp.offsetWidth * sliderItems.length)}px)`;
                            },  transition)
                        ).then(
                            setTimeout(() => {
                                sliderInner.style.transition = `${transitionTime}s`;
                            }, (transition + 50))
                        )
                    } else if(currStep >= -1) {
                        sliderInner.style.transform = `translateX(${-(sliderWrapp.offsetWidth * currStep)}px)`;
                        if(dotsState) {
                            changeDot(currStep - 1);
                        }
                    }
                    if(autoplay) {
                        autoplayInit();
                    }
                } else if(typeof(num) === 'number') {
                    sliderInner.style.transform = `translateX(${-(sliderWrapp.offsetWidth * (num + 1))}px)`;                
                    changeDot(num);
                }
            };

            if(arrowsState) {
                let arrPrev = arrowsState.querySelector('.arrPrev'),
                    arrNext = arrowsState.querySelector('.arrNext');

                arrNext.addEventListener('click', () => {
                    changeSlide('next');
                });
                arrPrev.addEventListener('click', () => {
                    changeSlide('prev');
                });
            }

            if(dotsState) {
                let dots = dotsState.querySelectorAll('.dot');
                dots.forEach(el => {
                    el.addEventListener('click', function() {
                        changeSlide(+el.dataset.dot);
                    });
                });
            }

            if(autoplay) {
                timer = setInterval(() => {
                    changeSlide('next');
                }, timerTime);
            }
        };
        events();
    } catch(e) {
        console.log(e);
    }
}
document.addEventListener('DOMContentLoaded', function() {
    initCustomSlider({
        section: '.customSlider',
        arrows: true,
        dots: true,
        transition: 1000,
        autoplay: true,
        timerTime: 5000
    });
});