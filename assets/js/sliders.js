// const Flickity = require('flickity');

module.exports = () => {

  const imgSliders = document.querySelectorAll('.image-slider');

  if (imgSliders.length) {
    imgSliders.forEach((imgSlider) => {
      var flkty = new Flickity( imgSlider, {
        // options
        contain: true,
        cellSelector: '.image-slider__image',
        initialIndex: 0,
        imagesLoaded: true,
        wrapAround: true,
        autoPlay: 5000,
        arrowShape: {
          x0: 10,
          x1: 40, y1: 30,
          x2: 42.5, y2: 27.5,
          x3: 15
        }
      });
    });
  }

  const contentSliders = document.querySelectorAll('.slider');

  if (contentSliders.length) {
    contentSliders.forEach((contentSlider) => {
      var flkty = new Flickity( contentSlider, {
        // options
        contain: true,
        cellSelector: '.slide',
        initialIndex: 0,
        imagesLoaded: true,
        wrapAround: true,
        autoPlay: 5000,
        arrowShape: {
          x0: 10,
          x1: 40, y1: 30,
          x2: 42.5, y2: 27.5,
          x3: 15
        }
      });
    });
  }
}
