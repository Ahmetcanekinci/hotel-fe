// Global
import Glide from '@glidejs/glide';
import Global from '../../base/_global';

// Modules Import
import Counter from '../../base/modules/_counter';

export default class HomePage {
  constructor() {
    // All time first instance IMPORTANT!!!
    new Global();

    this.maskedElements = [];
    window.animateCounter = Counter;
    this.enableSlider();

  }

  enableSlider() {
    new Glide('#main-slider').mount();
  }

}

new HomePage();
