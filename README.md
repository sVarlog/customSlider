# customSlider | sVarlog
____
CustomSlider is a custom slider made using destructuring, promises. To connect the slider, use the files (dist / js / slider.prod.js and dist / style / slider.min.css) that are in the dist folder.
____
# HTML structure
____
```html
<div class="customSlider">
    <div class="sliderWrapp">
        <div class="sliderInner">
            <div class="item"><!-- Your content --></div>
            <div class="item"><!-- Your content --></div>
            <div class="item"><!-- Your content --></div>
        </div>
    </div>        
</div>
```
____
# JS
To initialize the slider, add a call to the ** initCustomSlider () ** function with passing arguments.
```JavaScript
initCustomSlider({
    section: '.customSlider',
    arrows: true,
    dots: true,
    transition: 500,
    autoplay: false,
    timerTime: 5000,
    touches: true
});
```
+ 'section:' - section
+ 'arrows:' - if you need arrows use true, default - true
+ 'dots:' - if you need dots use true, default - true
+ 'transition:' - time change slides, default - 500ms
+ 'autoplay:' - autoplay, default - false
+ 'timerTime:' - if autoplay trut, use 'timerTime' for set autoplay time, default - 10000ms
+ 'touches:' - support touchscreen, default - true
