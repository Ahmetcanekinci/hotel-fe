// Global
import Glide from '@glidejs/glide';
import Global from '../../base/_global';

export default class projectListPage {
  constructor() {
  
    new Global();
    this.availabilitySlider();
    
  }

  availabilitySlider() {

    const availabilitySlides = document.querySelectorAll('.availability-slider');

      availabilitySlides.forEach((slide, index) => {

        slide.id = `availability-slide-${index + 1}`;

        const glide = new Glide(`#${slide.id}`, {
          type: 'carousel',
          animationDuration: 500,
          autoplay: 0,
          animationTimingFunc: 'ease-in-out',
          startAt: 0,
          perView: 1,
          gap: 40,
          peek: 0,
          touchAngle: 100,
          touchRatio: 1,
          dragThreshold: 5,
          breakpoints:{
              992:{
                  gap: 5,
              }
          }
        });

        glide.mount();
      });

    }
  
}

new projectListPage();
