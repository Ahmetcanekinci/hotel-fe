// Global
import Glide from '@glidejs/glide';
import Slick from 'slick-carousel';
import Global from '../../base/_global';

// Modules Import
import Counter from '../../base/modules/_counter';
import checkIn from '../../base/modules/_checkIn';

export default class HomePage {
  constructor() {

    new Global();
    new checkIn();

    window.animateCounter = Counter;

    this.glides = [];
    this.mountedGlides = [];
    this.slide = null;
    this.glides = Array.prototype.slice.call( document.getElementsByClassName("gallery-slider") );
    if (this.glides.length > 0) {
      for (const el of this.glides) {
          if ( document.getElementsByClassName("gallery-slider") !== null ) {
              this.enableGlide(el);
              window.addEventListener("resize", this.enableGlide.bind(this, el) );
          }
      }
    }
    
    for (const slider of document.getElementsByClassName("rev_slider")) {
      this.projectSlider(slider);
    }
    
    this.headerSlider();
    this.customersSlider();
    this.videoClickEvent();
    this.tabController();

  }

  headerSlider() {

    const headerSlide = document.querySelector("#header-slide");
    const slideCount = headerSlide.querySelectorAll(".glide__slide").length;

    if (slideCount >= 2) {
      const headerSlider = new Glide("#header-slide", {
        type: "carousel",
        animationTimingFunc: "ease-in-out",
        animationDuration: 500,
        autoplay: 10000,
        gap: 0,
        touchAngle: 100,
        touchRatio: 1,
        dragThreshold: 5,
      });
  
      headerSlider.mount();
    } else {
      headerSlide.classList.add("slider-inactive")
    }
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

  videoClickEvent(){
    
    var video = document.getElementById("myVideo"); 
    var playBtn = document.getElementById("play-video")
    var pauseBtn = document.getElementById("pause-video")

    if( video !== null) {

      playBtn.addEventListener("click", function() {
  
        playBtn.classList.remove("show")
        playBtn.classList.add("hide")
  
        pauseBtn.classList.add("show")
        pauseBtn.classList.remove("hide")
  
        video.play(); 
  
      });
  
      pauseBtn.addEventListener("click", function() {
  
        playBtn.classList.add("show")
        playBtn.classList.remove("hide")
  
        pauseBtn.classList.add("hide")
        pauseBtn.classList.remove("show")
  
        video.pause(); 
      
      });
  
      video.addEventListener("ended", function() {
  
        playBtn.classList.add("show")
        playBtn.classList.remove("hide")
  
        pauseBtn.classList.add("hide")
        pauseBtn.classList.remove("show")
  
      });

    }

  }

  customersSlider() {

    const customersSlider = document.getElementById("customers-slide");

    if (customersSlider) {
      const glide = new Glide(customersSlider, {
        type: "carousel",
        animationDuration: 400,
        autoplay: 10000,
        perView: 4,
        gap: 40,
        breakpoints: {
          1800: {
            perView: 3,
          },
          769: {
            perView: 1,
            gap: 20,
            peek: 40,
          },
        },
      });
    
      glide.mount();
    }

  }
  
  enableGlide(glide) {
      const slideEvents = (slides) => {
          let elems = document
              .getElementById("gallery-slide")
              .querySelectorAll(".glide__slide");
          let active = null;

          for (let i = 0; i < elems.length; i++) {
              let slide = elems[i];

              slide.classList.remove("prev-first");
              slide.classList.remove("prev-second");

              if (slide.classList.contains("glide__slide--active")) {
                  active = slide;
              }
          }

          if (active) {
              let first = active.previousElementSibling;
              let second = first.previousElementSibling;

              first.classList.add("prev-first");
              first.classList.remove("prev-second");
              second.classList.add("prev-second");
          }
      };

      const index = this.mountedGlides.map((x) => x.selector).indexOf(glide);

      if (index !== -1) {
          this.mountedGlides[index].destroy();
          this.mountedGlides.splice(index, 1);
      }

      const option = {
          type: "carousel",
          perView: 3,
          focusAt: "center",
          animationDuration: 400,
          gap: 0,
          peek: 150,
          breakpoints: {
              1200: {
                  perView: 1,
                  peek: 35,
              },
          },
      };

      let slide = new Glide(glide, option);
      slide.on("mount.after", () => {});

      slide.mount({
          flow: (glide, components, events) => {
              let i = {
                  slideEvents: (e) => {
                      slideEvents(e);
                  },
              };

              return (
                  events.on(["mount.after", "run.after"], () => {
                      i.slideEvents(components.Html.slides);
                  }),
                  i
              );
          },
      });

      this.mountedGlides.push(slide);
  }
    
  tabController() {

    const section = document.getElementById('accordion-card');
    
    const btns = section.getElementsByClassName('accordion-box');
    
    for (const btn of btns ) {
        
        btn.addEventListener('click', this.tabEvents.bind(this, btn, section) );

    }

  }

  tabEvents( btn, section, ev ) {
    
    const target = ( btn.hasAttribute('data-target') ? section.querySelector( btn.getAttribute('data-target') ) : null );
    
    if( !target ) return false;

    if ( target.classList.contains('show') ) {

        ev.preventDefault();
        ev.stopPropagation();

    }
    
  }

}

new HomePage();
