// Global
import Glide from '@glidejs/glide';
import Slick from 'slick-carousel';
import Global from '../../base/_global';

// Modules Import
import Counter from '../../base/modules/_counter';
import checkIn from '../../base/modules/_checkIn';

export default class HomePage {
  constructor() {
    // All time first instance IMPORTANT!!!
    new Global();
    new checkIn();

    this.maskedElements = [];
    window.animateCounter = Counter;

    this.headerSlider();

    for (const slider of document.getElementsByClassName("rev_slider")) {
      this.projectSlider(slider);
    }

  }

  headerSlider() {
    const headerSlider = new Glide('#header-slide', {
        type: 'carousel',
        animationTimingFunc: 'ease-in-out',
        animationDuration: 500,
        autoplay: 10000,
        gap: 0,
        touchAngle: 100,
        touchRatio: 1,
        dragThreshold: 5,
    });
    headerSlider.mount();
  }

  projectSlider(slider) {
    const slides = Array.prototype.slice.call(slider.getElementsByClassName("rev_slide"));

    if (slides.length <= 5) {

      const repaet = Math.floor(5 / slides.length);

      for (let index = 0; index < repaet; index++) {

        slides.forEach(x => {

          slider.appendChild(x.cloneNode(true));

        });

      }

    }

    var rev = $(slider);

    rev.on('init', function (event, slick, currentSlide) {

      var cur = $(slick.$slides[slick.currentSlide]), next = cur.next(), next2 = cur.next().next(), prev = cur.prev(), prev2 = cur.prev().prev();
      prev.addClass('slick-sprev');
      next.addClass('slick-snext');
      prev2.addClass('slick-sprev2');
      next2.addClass('slick-snext2');
      cur.removeClass('slick-snext').removeClass('slick-sprev').removeClass('slick-snext2').removeClass('slick-sprev2');
      slick.$prev = prev;
      slick.$next = next;

    }).on('beforeChange', function (event, slick, currentSlide, nextSlide) {

      var cur = $(slick.$slides[nextSlide]), next = cur.next(), prev = cur.prev();
      slick.$prev.removeClass('slick-sprev');
      slick.$next.removeClass('slick-snext');
      slick.$prev.prev().removeClass('slick-sprev2');
      slick.$next.next().removeClass('slick-snext2');
      prev.addClass('slick-sprev');
      next.addClass('slick-snext');
      prev.prev().addClass('slick-sprev2');
      next.next().addClass('slick-snext2');
      slick.$prev = prev;
      slick.$next = next;
      cur.removeClass('slick-next').removeClass('slick-sprev').removeClass('slick-next2').removeClass('slick-sprev2');

    });

    rev.slick({
      speed: 600,
      dots: false,
      focusOnSelect: true,
      arrows: true,
      prevArrow: `<button class="slick-arrow slick-arrow--prev"><img src="assets/img/icons/main-slider-left.svg" class="img-fluid"></button>`,
      nextArrow: `<button class="slick-arrow slick-arrow--next"><img src="assets/img/icons/main-slider-right.svg" class="img-fluid"></button>`,
      infinite: true,
      centerMode: true,
      slidesPerRow: 1,
      slidesToShow: 1,
      slidesToScroll: 1,
      centerPadding: '0',
      swipe: true,
      customPaging: function (slider, i) {
        return '';
      },
    });

  }

}

new HomePage();
