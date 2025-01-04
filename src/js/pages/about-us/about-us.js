// Global
import Glide from '@glidejs/glide';
import Global from '../../base/_global';

export default class aboutPage {
  constructor() {
    
    new Global();
    this.milestoneSlider();

  }

  milestoneSlider() {

    if( document.getElementById("milestone-slide") !== null ){

      const milestoneSlider = new Glide("#milestone-slide", {
        type: "carousel",
        perView: 1,
        focusAt: 0,
        gap: 30,
        animationDuration: 600,
        animationTimingFunc: 'ease-in',
      });

      const milestoneDateSlider = new Glide("#milestone-date-slide", {
        type: "carousel",
        perView: 6,
        focusAt: 0,
        gap: 30,
        animationDuration: 600,
        animationTimingFunc: 'ease-in',
        breakpoints:{
          1201:{
              perView: 3,
          },
        }
      });
      
      milestoneSlider.mount();
      milestoneDateSlider.mount();
      
      milestoneSlider.on('run', (e) => {
        milestoneDateSlider.go(e.direction);
      });

      milestoneDateSlider.on('run', (e) => {
        milestoneSlider.go(e.direction);
      });
  
    }

  }

}

new aboutPage();
